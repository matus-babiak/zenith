# Zenith — AI Knowledge Base

Zdroj pravdy pre AI development. Nie špekulácia.

**Overené:** 28. 8. 2026. Režim **C — je apka**: `index.html` v koreni, AI systém je. Git: [github.com/matus-babiak/zenith](https://github.com/matus-babiak/zenith.git).

## Ako čítať

1. „Neznáme“ sa nedopĺňa odhadom.
2. Ak kód a docs nesedia, **kód je technická pravda**. Konflikt sa pomenuje.
3. `product` / `architecture` / `data-model` / `ui-ux` opisujú apku v koreni (`index.html`).

## Mapa

| Dokument | Účel |
| --- | --- |
| [product.md](product.md) | Produkt a mantinely |
| [architecture.md](architecture.md) | Prototyp vs AI vrstva |
| [data-model.md](data-model.md) | `localStorage` `zenith.v1` |
| [business-rules.md](business-rules.md) | Proces + pravidlá apky |
| [ui-ux.md](ui-ux.md) | Obrazovky, CLAUDE.md, telefón |
| [brand/icon-vrchol.png](brand/icon-vrchol.png) | Znak vrchol (v apke ako `icon-vrchol.png`, nočné pozadie) |
| [workflow.md](workflow.md) | Ľudský pipeline |
| [AGENTS.md](AGENTS.md) | Správanie agentov |
| [agent.md](agent.md) | Odkaz na AGENTS.md |
| [harness.md](harness.md) | Zákazy |
| [golden-example.md](golden-example.md) | Historický príklad triage |
| [bootstrap-prompt.md](bootstrap-prompt.md) | Prenosný vstupný prompt |
| [analysis.md](analysis.md) | Snímok posledného rebuildu |
| [pending-implementation.md](pending-implementation.md) | Schválené zadanie alebo prázdny stav |

Aplikácia: `index.html`, `zenith-sketch.js`, `support.js`, `CLAUDE.md`.

## Zdroj pravdy

| Otázka | Kde |
| --- | --- |
| Čo má produkt robiť? | `product.md` a kód v koreni (`index.html`) |
| Ako je to postavené? | kód, kontrola voči `architecture.md` |
| Ako sa správať ako agent? | `AGENTS.md` |
| Čo je zakázané? | `harness.md` |
| Text, písmo, lead v UI? | `CLAUDE.md` a `ui-ux.md` |
| Ako znova zosúladiť docs? | `/zenith-rebuild` |

## Spustenie

- `/zenith-plan` — plán, nemení apku
- `/zenith-implement` — kód podľa schváleného zadania (základ: koreň, `index.html`)
- `/zenith-rebuild` — upratať docs/agentov podľa dneška, nestavať produkt
