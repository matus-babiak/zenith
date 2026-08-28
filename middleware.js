import { next } from "@vercel/functions";

const COOKIE = "zenith_gate";
const PREFIX = "zenith.gate.v1:";

export const config = {
  matcher: "/(.*)",
};

function parseCookies(header) {
  const out = {};
  if (!header) return out;
  for (const part of header.split(";")) {
    const i = part.indexOf("=");
    if (i < 0) continue;
    const k = part.slice(0, i).trim();
    const v = part.slice(i + 1).trim();
    try {
      out[k] = decodeURIComponent(v);
    } catch (err) {
      out[k] = v;
    }
  }
  return out;
}

function safeEqual(a, b) {
  if (typeof a !== "string" || typeof b !== "string") return false;
  if (a.length !== b.length) return false;
  let x = 0;
  for (let i = 0; i < a.length; i++) x |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return x === 0;
}

async function tokenFor(secret) {
  const data = new TextEncoder().encode(PREFIX + secret);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, "0")).join("");
}

function isPublicPath(path) {
  return path === "/gate.html" || path === "/favicon-32.png" || path === "/apple-touch-icon.png";
}

export default async function middleware(request) {
  const pwd = process.env.SITE_PASSWORD || "";
  const url = new URL(request.url);
  const path = url.pathname;

  if (!pwd) {
    if (process.env.VERCEL_ENV === "production") {
      return new Response("Nastav SITE_PASSWORD vo Vercel env.", {
        status: 503,
        headers: { "content-type": "text/plain; charset=utf-8" },
      });
    }
    return next();
  }

  if (request.method === "GET" && isPublicPath(path)) return next();

  const expected = await tokenFor(pwd);
  const got = parseCookies(request.headers.get("cookie"))[COOKIE] || "";
  if (safeEqual(got, expected)) return next();

  if (path === "/gate" && request.method === "POST") {
    let raw = "";
    try {
      raw = await request.text();
    } catch (err) {
      raw = "";
    }
    const submitted = new URLSearchParams(raw).get("heslo") || "";
    const ok = safeEqual(await tokenFor(submitted), expected);
    const secure = url.protocol === "https:" ? "; Secure" : "";
    if (ok) {
      return new Response(null, {
        status: 303,
        headers: {
          Location: url.origin + "/",
          "Set-Cookie": COOKIE + "=" + expected + "; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000" + secure,
        },
      });
    }
    return new Response(null, {
      status: 303,
      headers: { Location: url.origin + "/gate.html?err=1" },
    });
  }

  if (path.startsWith("/api/")) {
    return new Response(JSON.stringify({ error: "unauthorized" }), {
      status: 401,
      headers: { "content-type": "application/json" },
    });
  }

  return new Response(null, {
    status: 303,
    headers: { Location: url.origin + "/gate.html" },
  });
}
