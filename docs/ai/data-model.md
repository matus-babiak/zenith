# Dátový model — Zenith

**Stav:** Persistencia výhradne cez Neon (`/api/state`). Prehliadač nič neukladá.  
**Posledné overenie:** 28. 8. 2026, `index.html` + `api/state.js`.

## Aktuálny stav

- Tabuľka Neon: `zenith_state` (id=1, `payload` JSONB). Vzniká `CREATE TABLE IF NOT EXISTS`, žiadny DROP.
- API: `GET`/`PUT` `/api/state`. Telo PUT: `{ "payload": { entries, ideas, manifest, anchor, principles } }`.
- Env: `DATABASE_URL`, `ZENITH_SAVE_KEY` (hlavička `x-zenith-key`), `SITE_PASSWORD` (cookie brána na Vercel). Hodnoty nie sú v gite.
- Pri načítaní: prázdny stav v pamäti, potom `GET /api/state`. Ak Neon prázdny alebo starý formát (`schema` ≠ 2), server vráti prázdny stav a prepíše riadok. Ukážkové dáta sa nenačítavajú.
- Ak API nie je (lokálny `serve.py`, 503, 401), zápisy sa neukladajú. Na produkcii (Vercel + env) ide všetko do Neon.
- Starý kľúč `localStorage` `zenith.v1` sa pri štarte vymaže (jednorazový cleanup v prehliadači).
- Jednorazové vyčistenie Neon: `node scripts/clear-neon-state.js --confirm` (s `DATABASE_URL`) alebo `--via-api https://…` (s `ZENITH_SAVE_KEY`).

Ukladá sa len: `entries`, `ideas`, `manifest`, `anchor`, `principles`. Routa, drafty a otvorené dialógy sa nepersistujú.

## Entity (v JSON)

Sedem oblastí (id v kóde): `zdravie`, `rozvoj`, `praca`, `financie`, `manzelstvo`, `rodina`, `priatelia`.

**Zápis denníka** (`entries.vdacnost` | `uspechy` | `hnevaju`): `id`, `text`, `area`, `date` (ISO deň). Úspechy môžu mať `tier` (boolean, S-tier).

**Nápad** (`ideas`): `id`, `text`, `area`, `state` (`novy` | `zruseny` | `vyzva` | `hotovo`), `created`. Pri výzve navyše `start`, `acts` (3–5 reťazcov), `log` (mapa dátum → indexy splnených aktivít).

**Manifestácia** (`manifest`): `text`, `lastViewed`, `sessions`.

**Kotva** (`anchor`): `time`, `question`, `read` (zoznam ISO dní).

**Princíp** (`principles`): `id`, `title`, `body`, `sketch` (`buckets` | `stick` | `board`), `labels`, `source`, `date`.

## Pravidlá uloženia

- Jedna tabuľka, jeden riadok. Nie sedem tabuliek.
- Tajomstvá len env. Nekomitovať `.env` ani dump payloadu.
- `ZENITH_SAVE_KEY` v nasadenom `zenith-config.js` je viditeľný v zdroji stránky. Bráni to náhodnému curl, nie cielenému útoku. Kto má URL aj kľúč, vidí zápisy.

## Pravidlo pre agentov

Nemazať tabuľku. DROP zakázaný. Polia meniť len podľa `payload` tvaru, alebo zadanie musí povedať migráciu tohto JSON.
