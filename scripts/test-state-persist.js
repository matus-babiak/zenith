#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const INDEX = path.join(ROOT, "index.html");
const MARKER = "zenith-persist-test-" + Date.now();

function fail(msg) {
  console.error("FAIL", msg);
  process.exit(1);
}

function checkIndexHtml() {
  const body = fs.readFileSync(INDEX, "utf8");
  const required = [
    "flushPersist",
    "pagehide",
    "credentials: 'same-origin'",
    "keepalive: true",
    "_dirty",
    "_wasHydrated",
    "this._hydrateGen = 0",
  ];
  for (const token of required) {
    if (!body.includes(token)) fail("index.html missing " + token);
  }
  if (/const gen = \+\+this\._hydrateGen/.test(body)) {
    fail("index.html still uses ++this._hydrateGen without safe init");
  }
  console.log("OK index.html persist hooks");
}

function saveWarnFor(state) {
  if (!state._wasHydrated) return "";
  if (!state._allowRemote) return "Offline";
  if (state._saveError) return "Chyba uloženia";
  return "";
}

function makeHarness(fetchImpl) {
  const state = {
    _hydrated: false,
    _wasHydrated: false,
    _allowRemote: false,
    _dirty: false,
    _hydrateGen: 0,
    _saveError: false,
    _putTimer: null,
    data: { entries: { vdacnost: [] } },
    snapshot() {
      return { schema: 2, entries: this.data.entries, ideas: [], manifest: {}, anchor: {}, principles: [] };
    },
    applyPayload(payload) {
      if (payload && payload.entries) this.data.entries = payload.entries;
    },
    putRemote(snap) {
      return fetchImpl("/api/state", { method: "PUT", body: JSON.stringify({ payload: snap }) }).then((r) => {
        if (!r.ok) throw new Error("save failed");
        this._saveError = false;
      }).catch(() => {
        this._saveError = true;
      });
    },
    flushPersist() {
      if (!this._hydrated || !this._allowRemote) return;
      if (this._putTimer) {
        clearTimeout(this._putTimer);
        this._putTimer = null;
      }
      return this.putRemote(this.snapshot());
    },
    hydrateRemote() {
      this._hydrated = false;
      this._wasHydrated = false;
      this._allowRemote = false;
      this._dirty = false;
      this._hydrateGen = (this._hydrateGen || 0) + 1;
      const gen = this._hydrateGen;
      return fetchImpl("/api/state", { method: "GET" }).then((r) => {
        if (r.status === 503 || r.status === 401) return null;
        if (!r.ok) return null;
        this._allowRemote = true;
        return r.json();
      }).then((data) => {
        if (gen !== this._hydrateGen) return;
        if (!data) return;
        if (this._dirty) {
          this.flushPersist();
          return;
        }
        if (data.payload && data.payload.entries) {
          this.applyPayload(data.payload);
        }
      }).catch(() => {
        this._allowRemote = false;
      }).finally(() => {
        if (gen !== this._hydrateGen) return;
        this._hydrated = true;
        this._wasHydrated = true;
      });
    },
  };
  return state;
}

async function checkSaveFlow() {
  const calls = [];
  const server = {
    vdacnost: [{ id: "srv", text: "from server", area: "zdravie", date: "2099-01-02" }],
  };
  const fetchOk = (url, opts) => {
    calls.push({ url, method: opts.method });
    if (opts.method === "GET") {
      return Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve({ payload: { entries: { vdacnost: server.vdacnost } } }),
      });
    }
    if (opts.method === "PUT") {
      const body = JSON.parse(opts.body);
      server.vdacnost = body.payload.entries.vdacnost;
      return Promise.resolve({ ok: true, status: 200 });
    }
    return Promise.resolve({ ok: false, status: 405 });
  };

  const app = makeHarness(fetchOk);
  await app.hydrateRemote();
  if (!app._hydrated) fail("save flow: _hydrated false after GET 200");
  if (!app._wasHydrated) fail("save flow: _wasHydrated false after GET 200");
  if ((app.data.entries.vdacnost || []).length !== 1) fail("save flow: server data not applied");
  app.data.entries.vdacnost.unshift({ id: "local", text: "new", area: "zdravie", date: "2099-01-03" });
  await app.flushPersist();
  const puts = calls.filter((c) => c.method === "PUT");
  if (puts.length !== 1) fail("save flow: expected 1 PUT, got " + puts.length);
  if (saveWarnFor(app)) fail("save flow: unexpected saveWarn on success");
  console.log("OK save flow issued 1 PUT");

  const fetch401 = () => Promise.resolve({ ok: false, status: 401 });
  const offline = makeHarness(fetch401);
  await offline.hydrateRemote();
  if (!offline._hydrated) fail("offline flow: _hydrated false after GET 401");
  if (saveWarnFor(offline) !== "Offline") fail("offline flow: expected Offline warning");
  console.log("OK offline flow shows warning after GET 401");
}

async function roundtripDatabase() {
  const url = process.env.DATABASE_URL || "";
  const key = process.env.ZENITH_SAVE_KEY || "";
  if (!url || !key) {
    console.log("SKIP database roundtrip (DATABASE_URL or ZENITH_SAVE_KEY not set)");
    return;
  }

  const { neon } = require("@neondatabase/serverless");
  const db = neon(url);
  await db`CREATE TABLE IF NOT EXISTS zenith_state (
    id integer PRIMARY KEY,
    payload jsonb NOT NULL,
    updated_at timestamptz NOT NULL DEFAULT now()
  )`;

  const rows = await db`SELECT payload FROM zenith_state WHERE id = 1`;
  const before = rows[0] ? rows[0].payload : null;

  const testPayload = before && before.entries
    ? JSON.parse(JSON.stringify(before))
    : {
        schema: 2,
        entries: { vdacnost: [], uspechy: [], hnevaju: [] },
        ideas: [],
        manifest: { text: "", lastViewed: null, sessions: 0 },
        anchor: { time: "12:30", question: "test", read: [] },
        principles: [],
      };

  testPayload.schema = 2;
  testPayload.entries.vdacnost = [
    { id: MARKER, text: "test entry", area: "zdravie", date: "2099-01-01" },
  ].concat((testPayload.entries.vdacnost || []).filter((e) => e.id !== MARKER));

  await db`
    INSERT INTO zenith_state (id, payload, updated_at)
    VALUES (1, ${JSON.stringify(testPayload)}::jsonb, now())
    ON CONFLICT (id) DO UPDATE SET payload = EXCLUDED.payload, updated_at = now()
  `;

  const afterWrite = await db`SELECT payload FROM zenith_state WHERE id = 1`;
  const written = afterWrite[0] ? afterWrite[0].payload : null;
  const found = (written.entries.vdacnost || []).some((e) => e.id === MARKER);
  if (!found) fail("roundtrip write did not persist marker entry");

  if (before) {
    await db`
      INSERT INTO zenith_state (id, payload, updated_at)
      VALUES (1, ${JSON.stringify(before)}::jsonb, now())
      ON CONFLICT (id) DO UPDATE SET payload = EXCLUDED.payload, updated_at = now()
    `;
  } else {
    await db`DELETE FROM zenith_state WHERE id = 1`;
  }

  console.log("OK database roundtrip");
}

async function main() {
  checkIndexHtml();
  await checkSaveFlow();
  await roundtripDatabase();
  console.log("PASS: state roundtrip");
}

main().catch((err) => {
  console.error("FAIL", err.message || err);
  process.exit(1);
});
