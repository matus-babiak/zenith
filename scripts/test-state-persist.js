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
  ];
  for (const token of required) {
    if (!body.includes(token)) fail("index.html missing " + token);
  }
  console.log("OK index.html persist hooks");
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
        anchor: {
          time: "12:30",
          question: "test",
          read: [],
        },
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
  await roundtripDatabase();
  console.log("PASS: state roundtrip");
}

main().catch((err) => {
  console.error("FAIL", err.message || err);
  process.exit(1);
});
