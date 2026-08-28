# Architektúra — Zenith

**Stav:** Aplikácia je v **koreni** repo (nie v podpriečinku). AI development vrstva existuje.  
**Posledné overenie:** 28. 8. 2026. Vlastník extrahoval prototyp z `Zenith-claude/` do hlavného priečinka Zenith. Priečinok `Zenith-claude/` už nie je.  
**Režim:** C — je apka (aj AI systém).

Koreň **nemá** `src/`. Vstup je `index.html` (Claude Design). `package.json` má Lucide a `@neondatabase/serverless`. Runtime UI ostáva HTML, nie Vite/React.

## Čo je aplikácia

| Súbor | Úloha |
| --- | --- |
| `index.html` | Jedna stránka: UI, routy, logika |
| `zenith-sketch.js` | SVG nákresy Princípov |
| `support.js` | Runtime Claude Design (`DCLogic`) |
| `icon-vrchol.png` | Znak v chrome |
| `apple-touch-icon.png` | 180×180 ikona na iOS plochu |
| `favicon-32.png` | Favicon |
| `manifest.webmanifest` | PWA / Add to Home Screen |
| `vendor/lucide.min.js` | Čiarové ikony menu |
| `api/state.js` | GET/PUT stavu do Neon |
| `vercel.json` | SPA fallback + build config |
| `middleware.js` | Heslo pred obsahom na Vercel |
| `gate.html` | Formulár hesla |
| `.env.example` | `DATABASE_URL`, `ZENITH_SAVE_KEY`, `SITE_PASSWORD` (prázdne) |
| `package.json` | Lucide, Neon driver, `@vercel/functions` |
| `CLAUDE.md` | Záväzné pravidlá textu, písma a leadu |
| `_ds/organic-eda8c3eb-c6eb-4bf8-95bd-88eeab88f6bf/` | Design systém |
| `scripts/serve.py` | Lokálny statický server so SPA fallbackom |
| `scripts/check-routes.py` | Overenie ciest a ikon |

## Ako sa to správa

- Obrazovka je `state.route` napojená na URL. Cesty: `/`, `/vdacnost`, `/uspechy`, `/napady`, `/hnevaju`, `/manifestacia`, `/kotva`, `/principy`.
- Hranica široká / telefón: `window.innerWidth >= 900`.
- Dáta: Neon tabuľka `zenith_state` (jeden riadok JSONB) cez `/api/state`. Prehliadač nič neukladá. Routa sa neukladá.
- `DATABASE_URL`, `ZENITH_SAVE_KEY` a `SITE_PASSWORD` len v env (Vercel / `.env`). Nie v gite.
- Na Vercel: bez cookie z hesla middleware presmeruje na `/gate.html`. Lokálny `serve.py` bránu nespúšťa.

## Ako sa spúšťa (dnes)

Lokálne UI: `python3 scripts/serve.py` (port 4173). API/Neon lokálne cez `npx vercel dev` po vyplnení `.env`.

Nasadenie: GitHub na Vercel, env `DATABASE_URL`, `ZENITH_SAVE_KEY`, `SITE_PASSWORD`. Hodnoty sem do chatu nedávať.

## Čo je AI vrstva (nie obrazovky)

- `docs/ai/`
- `.cursor/rules|skills|commands`
- koreňový `AGENTS.md` → `docs/ai/AGENTS.md`
- `README.md`
- git: [github.com/matus-babiak/zenith](https://github.com/matus-babiak/zenith.git)

Ľudský workflow: `/zenith-rebuild` → `/zenith-plan` → schválenie → `/zenith-implement`.

## Obrazovka → logika → dáta

`index.html` → `/api/state` (Neon) → `zenith-sketch.js` na Princípoch.

## Konflikty (kód je pravda)

1. `CLAUDE.md` žiada **Fredoka**. `index.html` nastavuje **Nunito** 900. V kóde platí Nunito, kým sa to nezmení.
2. `package.json` má Lucide a Neon driver. Nestavať z toho druhú React/Vite apku.

## Pravidlo

Ďalšia stavba nadväzuje na súbory v **koreni**. Nestavať druhú React apku vedľa. `index.html` sa nemeň bez schváleného zadania.
