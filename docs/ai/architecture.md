# Architektúra — Zenith

**Stav:** Aplikácia je v **koreni** repo (nie v podpriečinku). AI development vrstva existuje.  
**Posledné overenie:** 28. 8. 2026. Vlastník extrahoval prototyp z `Zenith-claude/` do hlavného priečinka Zenith. Priečinok `Zenith-claude/` už nie je.  
**Režim:** C — je apka (aj AI systém).

Koreň **nemá** `src/`. Vstup je `index.html` (Claude Design). `package.json` existuje **len** kvôli Lucide; runtime apky ostáva HTML, nie Vite/React.

## Čo je aplikácia

| Súbor | Úloha |
| --- | --- |
| `index.html` | Jedna stránka: UI, routy, logika, persistencia |
| `zenith-sketch.js` | SVG nákresy Princípov |
| `support.js` | Runtime Claude Design (`DCLogic`) |
| `icon-vrchol.png` | Znak v chrome (nočné čierne pozadie, Z + šípka) |
| `vendor/lucide.min.js` | Čiarové ikony menu (Lucide UMD) |
| `package.json` | Jediná npm závislosť: `lucide` (vendoruje sa do `vendor/`) |
| `CLAUDE.md` | Záväzné pravidlá textu, písma a leadu |
| `_ds/organic-eda8c3eb-c6eb-4bf8-95bd-88eeab88f6bf/` | Design systém, ktorý apka načíta |
| `scripts/serve.py` | Lokálny server, SPA fallback na `index.html` |
| `scripts/check-routes.py` | Overenie čistých ciest (HTTP 200) |

Nepoužité design systémy (modernist, classical) sa do koreňa nepreniesli.

Žiadny backend, žiadna databáza, žiadne API, žiadne prihlásenie, žiadny CI okrem tohto overovacieho skriptu.

## Ako sa to správa

- Obrazovka je `state.route` napojená na URL cez `history.pushState` / `popstate`. Cesty: `/`, `/vdacnost`, `/uspechy`, `/napady`, `/hnevaju`, `/manifestacia`, `/kotva`, `/principy`.
- Hranica široká / telefón: `window.innerWidth >= 900`.
- Dáta: `localStorage` kľúč `zenith.v1` (routa sa tam neukladá).
- Po každom `componentDidUpdate` sa persistuje obsah denníkov, nie URL.

## Čo je AI vrstva (nie obrazovky)

- `docs/ai/`
- `.cursor/rules|skills|commands`
- koreňový `AGENTS.md` → `docs/ai/AGENTS.md`
- `README.md`
- git: [github.com/matus-babiak/zenith](https://github.com/matus-babiak/zenith.git)

## Ako sa spúšťa (dnes)

Z koreňa: `python3 scripts/serve.py` (predvolený port 4173) a otvoriť `http://127.0.0.1:4173/`. Čisté cesty ako `/uspechy` vráti `index.html`. Holý `python3 -m http.server` na tých cestách vráti 404.

Ľudský workflow: `/zenith-rebuild` → `/zenith-plan` → schválenie → `/zenith-implement`.

## Obrazovka → logika → dáta

`index.html` (`class Component`) → `state` + `localStorage` → `zenith-sketch.js` na Princípoch.

## Konflikty (kód je pravda)

1. `CLAUDE.md` žiada **Fredoka**. `index.html` nastavuje **Nunito** 900. V kóde platí Nunito, kým sa to nezmení.
2. `package.json` je v koreni kvôli Lucide. Nestavať z toho druhú React/Vite apku.

## Pravidlo

Ďalšia stavba nadväzuje na súbory v **koreni**. Nestavať druhú React apku vedľa. `index.html` sa nemeň bez schváleného zadania.
