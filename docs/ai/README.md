# Zenith — AI Knowledge Base

Toto je zdroj pravdy pre budúci AI development. Nie je to marketingový text a nie je to špekulácia.

**Overené:** 27. 8. 2026. Aplikačný kód stále nie je. Git remote: [github.com/matus-babiak/zenith](https://github.com/matus-babiak/zenith.git). V čase prvého auditu bol priečinok prázdny (bez kódu, gitu aj dokumentácie).

## Ako čítať tieto dokumenty

1. Ak dokument hovorí **neznáme**, agent to nesmie doplniť vlastnou predstavou.
2. Ak sa dokument a kód nezhodujú, **kód je technická pravda**. Konflikt sa musí pomenovať, dokument sa nesmie potichu prepísať.
3. Aplikácia ešte neexistuje. Dokumenty `product`, `architecture`, `data-model` a `ui-ux` sú pripravené miesta pre budúce fakty, nie opis niečoho, čo už beží.

## Mapa dokumentov

| Dokument | Účel |
| --- | --- |
| [product.md](product.md) | Čo aplikácia je, pre koho, aký problém rieši, MVP, mimo scope |
| [architecture.md](architecture.md) | Technológie, vrstvy, spustenie, build, deploy |
| [data-model.md](data-model.md) | Dáta, entity, vzťahy, uloženie |
| [business-rules.md](business-rules.md) | Pravidlá, ktoré sa nesmú porušiť |
| [ui-ux.md](ui-ux.md) | Obrazovky, toky, UX rozhodnutia |
| [workflow.md](workflow.md) | Ako prebieha plánovanie a implementácia |
| [agent.md](agent.md) | Úlohy agentov, ľudská komunikácia, kedy sa pýtať |
| [harness.md](harness.md) | Ochrana pred nebezpečnými zmenami |
| [golden-example.md](golden-example.md) | Overený príklad Planning Agenta na aktuálnom stave |
| [analysis.md](analysis.md) | Jednorazový audit zo 27. 8. 2026 (historický snímok, nie denný zdroj pravdy) |
| [pending-implementation.md](pending-implementation.md) | Schválené zadanie čakajúce na `/zenith-implement` (alebo prázdny stav) |

## Zdroj pravdy

| Otázka | Kde hľadať |
| --- | --- |
| Čo má produkt robiť? | `product.md`, potom reálne správanie kódu |
| Ako je systém postavený? | kód, kontrolovaný voči `architecture.md` |
| Aké dáta existujú? | kód a schéma, kontrolované voči `data-model.md` |
| Čo sa nesmie porušiť? | `business-rules.md` + kód |
| Ako hovoriť s človekom? | `agent.md` |
| Ako plánovať / implementovať? | `workflow.md` |
| Čo je zakázané? | `harness.md` |

## Spustenie agentov

- Plánovanie: `/zenith-plan` — nemení aplikáciu
- Implementácia: `/zenith-implement` — až po schválení, podľa implementačného zadania

Schválené zadanie sa ukladá do `docs/ai/pending-implementation.md` (súbor vznikne až keď existuje schválený plán).
