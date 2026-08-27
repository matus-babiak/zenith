# Architektúra — Zenith

**Stav:** Aplikačná architektúra neexistuje.  
**Posledné overenie:** 27. 8. 2026. Zdroj: reálny obsah priečinka, nie predpoklad.

## Čo v projekte je

Iba AI development infraštruktúra:

- `docs/ai/` — knowledge base
- `.cursor/` — rules, skills, commands
- `AGENTS.md` — vstupný bod pre agentov
- `README.md` — ľudský vstupný bod
- git remote: `https://github.com/matus-babiak/zenith.git`

Tieto súbory **nie sú** aplikácia. Nemenia sa nimi obrazovky, dáta ani business logika, lebo tie ešte nie sú.

## Čo v projekte nie je (overené absenciou súborov)

| Oblasť | Nález |
| --- | --- |
| Package manager / závislosti | žiadny `package.json`, `pnpm-lock.yaml`, `yarn.lock`, `Cargo.toml`, `pyproject.toml`, `go.mod`, `Gemfile`, `composer.json` |
| Framework | neznámy, nie je zvolený |
| Frontend | žiadny `src/`, `app/`, `pages/`, UI kód |
| Backend | žiadny server, API, handlers |
| Databáza | žiadna schéma, migrácie, ORM |
| Autentifikácia | neexistuje |
| Routing | neexistuje |
| State management | neexistuje |
| Testy | žiadne testovacie súbory ani konfigurácia |
| Deployment | žiadny Dockerfile, CI, hosting konfigurácia |
| Git | remote je `https://github.com/matus-babiak/zenith.git` (v čase prvého auditu priečinok git ešte nemal) |

## Vrstvy

Rozdelenie UI / business logika / dáta **zatiaľ neexistuje**. Až vznikne kód, sem zapísať:

- kde je UI
- kde sú pravidlá a výpočty
- kde sú dátové operácie
- ako časti komunikujú
- hlavné entry pointy
- ako sa aplikácia spúšťa, buildí a nasadzuje

## Obrazovka → komponenty → logika → dáta → testy

Neaplikovateľné. Žiadne obrazovky.

## Pravidlo pre agentov

Nestavaj architektúru „ako sa to zvyčajne robí“. Stack, štruktúra priečinkov a spôsob spustenia sa smú objaviť v kóde až po schválenom implementačnom zadaní, ktoré ich výslovne obsahuje. Kým vlastník stack nezvolí, je **neznámy**.
