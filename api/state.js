const { neon } = require("@neondatabase/serverless");

const MAX_BYTES = 1500000;
const SCHEMA = 2;

function emptyPayload() {
  return {
    schema: SCHEMA,
    entries: { vdacnost: [], uspechy: [], hnevaju: [] },
    ideas: [],
    manifest: { text: "", lastViewed: null, sessions: 0 },
    anchor: {
      time: "12:30",
      question:
        "Som to stále ja, alebo len ďalší, čo iba reaguje? Tvorím tú realitu, alebo na ňu iba reagujem?",
      read: [],
    },
    principles: [],
  };
}

function needsMigration(payload) {
  return !payload || payload.schema !== SCHEMA;
}

function send(res, code, body) {
  res.statusCode = code;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(body));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on("data", (c) => {
      size += c.length;
      if (size > MAX_BYTES) {
        reject(new Error("too large"));
        return;
      }
      chunks.push(c);
    });
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

function authorized(req) {
  const expected = process.env.ZENITH_SAVE_KEY || "";
  if (!expected) return false;
  const got = String(req.headers["x-zenith-key"] || "");
  return got === expected;
}

function snapshotOk(p) {
  if (!p || typeof p !== "object" || Array.isArray(p)) return false;
  return (
    p.entries &&
    typeof p.entries === "object" &&
    Array.isArray(p.ideas) &&
    p.manifest &&
    typeof p.manifest === "object" &&
    p.anchor &&
    typeof p.anchor === "object" &&
    Array.isArray(p.principles)
  );
}

async function sql() {
  const url = process.env.DATABASE_URL || "";
  if (!url) return null;
  const client = neon(url);
  await client`CREATE TABLE IF NOT EXISTS zenith_state (
    id integer PRIMARY KEY,
    payload jsonb NOT NULL,
    updated_at timestamptz NOT NULL DEFAULT now()
  )`;
  return client;
}

async function upsertPayload(db, payload) {
  await db`
    INSERT INTO zenith_state (id, payload, updated_at)
    VALUES (1, ${JSON.stringify(payload)}::jsonb, now())
    ON CONFLICT (id) DO UPDATE SET payload = EXCLUDED.payload, updated_at = now()
  `;
}

module.exports = async function handler(req, res) {
  if (!process.env.DATABASE_URL || !process.env.ZENITH_SAVE_KEY) {
    return send(res, 503, { error: "not configured" });
  }
  if (!authorized(req)) {
    return send(res, 401, { error: "unauthorized" });
  }
  let db;
  try {
    db = await sql();
  } catch (err) {
    return send(res, 500, { error: "database" });
  }
  if (!db) return send(res, 503, { error: "not configured" });

  if (req.method === "GET") {
    try {
      const rows = await db`SELECT payload FROM zenith_state WHERE id = 1`;
      const payload = rows[0] ? rows[0].payload : null;
      if (needsMigration(payload)) {
        const empty = emptyPayload();
        await upsertPayload(db, empty);
        return send(res, 200, { payload: empty });
      }
      return send(res, 200, { payload });
    } catch (err) {
      return send(res, 500, { error: "database" });
    }
  }

  if (req.method === "PUT") {
    let raw;
    try {
      raw = await readBody(req);
    } catch (err) {
      return send(res, 413, { error: "too large" });
    }
    let parsed;
    try {
      parsed = JSON.parse(raw || "{}");
    } catch (err) {
      return send(res, 400, { error: "invalid json" });
    }
    const payload = parsed.payload;
    if (!snapshotOk(payload)) {
      return send(res, 400, { error: "invalid payload" });
    }
    try {
      await upsertPayload(db, Object.assign({}, payload, { schema: SCHEMA }));
      return send(res, 200, { ok: true });
    } catch (err) {
      return send(res, 500, { error: "database" });
    }
  }

  res.setHeader("Allow", "GET, PUT");
  return send(res, 405, { error: "method" });
};
