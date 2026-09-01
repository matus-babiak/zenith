# Implementačné zadanie — Zenith

## Schválené
- Kto schválil: vlastník (správa „Ano“)
- Dátum: 2026-09-01
- Ľudská požiadavka: Opraviť persistenciu dát po reštarte PWA. Diagnostika: neinicializovaný `_hydrateGen` blokuje celú hydratáciu a PUT; produkcia navyše vracia GET 401 kvôli prázdnemu `ZENITH_SAVE_KEY` v builde.

## Overený stav pred prácou
- `index.html`: `_hydrateGen` sa nepoužíva s inicializáciou; `++undefined` → `NaN`, stráže v `hydrateRemote` vždy return.
- `_hydrated` / `_wasHydrated` ostávajú false → `flushPersist()` nikdy neodošle PUT, `saveWarn` sa neukáže.
- Produkcia (deploy `de059a3`): GET `/api/state` 401, žiadny PUT v logoch.
- `scripts/test-state-persist.js` len grepuje reťazce, neoveruje správanie.
- Relevantné dokumenty: `docs/ai/data-model.md`, `docs/ai/architecture.md`

## Cieľ
- Opraviť bug `_hydrateGen` tak, aby hydratácia dokončila, PUT/GET flow fungoval a pri zlyhaní API používateľ videl „Offline“.
- Doplniť behaviorálny test, ktorý zachytí regresiu (0 PUT pri zdanlivo OK kóde).
- Aktualizovať dokumentáciu o overení build-time `ZENITH_SAVE_KEY`.

## Mimo scope
- Zmena Vercel env hodnôt (vlastník manuálne: `ZENITH_SAVE_KEY` dostupný pri builde, redeploy bez cache).
- localStorage fallback.
- DROP databázy, zmena middleware, veľký refaktor.

## Kroky
1. V `index.html` `componentDidMount`: `this._hydrateGen = 0`.
2. V `hydrateRemote()`: nahradiť `const gen = ++this._hydrateGen` bezpečnou inkrementáciou `(this._hydrateGen || 0) + 1`.
3. Rozšíriť `scripts/test-state-persist.js` o behaviorálny harness (falošný fetch): po simulovanom GET 200 + `flushPersist` presne 1 PUT; pri GET 401 `_hydrated === true` a offline stav.
4. Spustiť `python3 scripts/check-routes.py` a `node scripts/test-state-persist.js`.
5. Aktualizovať `docs/ai/data-model.md` (poznámka o build-time kľúči a teste).

## Súbory
- Vytvoriť: nič
- Upraviť: `index.html`, `scripts/test-state-persist.js`, `docs/ai/data-model.md`
- Nemenať: `api/state.js`, `middleware.js`, `vercel.json` (okrem docs)

## Patterns a pravidlá
- Existujúci pattern: Neon cez `/api/state`, `_allowRemote` / `_hydrated` guardy.
- `CLAUDE.md`: žiadne em dash v UI textoch.

## Riziká (harness)
- Tajomstvá do gitu: OK
- DROP/wipe DB: OK
- Nezvratné migrácie: OK
- Mazanie produkčných dát: OK
- Zmena Vercel env: VYŽADUJE SCHVÁLENIE (manuálne u vlastníka, mimo implementácie)
- Redeploy produkcie: VYŽADUJE SCHVÁLENIE (manuálne u vlastníka)
- Výslovne schválené nebezpečné príkazy: žiadne

## Overenie
- Používateľský scenár: Uložiť vetu vo vďačnosti, zavrieť PWA, znova otvoriť, veta v histórii. V hlavičke nie „Offline“ (po oprave env + deploy).
- Príkaz (povinné, spustiteľné lokálne):
  ```bash
  python3 scripts/check-routes.py && node scripts/test-state-persist.js
  ```
- Assertion / očakávaný výsledok: oba exit 0; výstup obsahuje `OK save flow issued 1 PUT` a `PASS: state roundtrip`
- Súbor testu: `scripts/test-state-persist.js`

## Dokumentácia
- `docs/ai/data-model.md`: build-time `ZENITH_SAVE_KEY`, behaviorálny test

## Stop
- Zastaviť a spýtať sa, ak behaviorálny test nie je možný bez refaktoru mimo scope.
