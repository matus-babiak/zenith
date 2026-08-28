#!/usr/bin/env node
"use strict";

const { neon } = require("@neondatabase/serverless");

const EMPTY = {
  schema: 2,
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

function usage() {
  console.error(`Usage:
  DATABASE_URL=... node scripts/clear-neon-state.js --confirm
  ZENITH_SAVE_KEY=... node scripts/clear-neon-state.js --confirm --via-api https://your-site.vercel.app

Vymaže obsah tabuľky zenith_state (nahradí prázdnym payloadom). Tabuľku nemaže.
Bez --confirm skript nič neurobí.`);
}

function hasFlag(name) {
  return process.argv.includes(name);
}

async function clearViaDatabase() {
  const url = process.env.DATABASE_URL || "";
  if (!url) {
    console.error("Chýba DATABASE_URL.");
    process.exit(1);
  }
  const db = neon(url);
  await db`CREATE TABLE IF NOT EXISTS zenith_state (
    id integer PRIMARY KEY,
    payload jsonb NOT NULL,
    updated_at timestamptz NOT NULL DEFAULT now()
  )`;
  await db`
    INSERT INTO zenith_state (id, payload, updated_at)
    VALUES (1, ${JSON.stringify(EMPTY)}::jsonb, now())
    ON CONFLICT (id) DO UPDATE SET payload = EXCLUDED.payload, updated_at = now()
  `;
}

async function clearViaApi(baseUrl) {
  const key = process.env.ZENITH_SAVE_KEY || "";
  if (!key) {
    console.error("Chýba ZENITH_SAVE_KEY.");
    process.exit(1);
  }
  const url = baseUrl.replace(/\/$/, "") + "/api/state";
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      "x-zenith-key": key,
    },
    body: JSON.stringify({ payload: EMPTY }),
  });
  if (!res.ok) {
    const body = await res.text();
    console.error("API odpoveď:", res.status, body.slice(0, 200));
    process.exit(1);
  }
}

async function main() {
  if (hasFlag("--help") || hasFlag("-h")) {
    usage();
    process.exit(0);
  }
  if (!hasFlag("--confirm")) {
    console.error("Bez --confirm sa dáta nemažú. Pridaj --confirm, ak to naozaj chceš.");
    usage();
    process.exit(1);
  }

  const viaApiIdx = process.argv.indexOf("--via-api");
  if (viaApiIdx >= 0) {
    const baseUrl = process.argv[viaApiIdx + 1];
    if (!baseUrl || baseUrl.startsWith("-")) {
      console.error("Chýba URL za --via-api.");
      usage();
      process.exit(1);
    }
    await clearViaApi(baseUrl);
    console.log("OK: Neon stav vymazaný cez API.");
    return;
  }

  await clearViaDatabase();
  console.log("OK: Neon stav vymazaný (prázdny payload).");
}

main().catch((err) => {
  console.error("Chyba:", err.message || err);
  process.exit(1);
});
