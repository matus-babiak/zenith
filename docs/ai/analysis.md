# Audit snímok — 27. 8. 2026

Toto nie je denný zdroj pravdy. Je to záznam toho, čo bolo v priečinku **pred** vznikom AI systému. Aktuálne fakty sú v ostatných súboroch `docs/ai/`.

## Fáza 1 — stav projektu

Priečinok `/Users/matus/Developer/Zenith` bol prázdny (`ls -la` ukázal len `.` a `..`).

| Oblasť | Nález |
| --- | --- |
| Package manager | žiadny |
| Framework | žiadny |
| Frontend / backend | žiadny kód |
| Databáza / API / auth / routing | neexistujú |
| Obrazovky / komponenty / business logika | neexistujú |
| Testy / deployment | neexistujú |
| Cursor rules / commands | neexistovali |
| Dokumentácia | neexistovala |
| Git | nie |

## Fáza 2 — produkt

Jediné overené produktové tvrdenie z vlastníka: aplikácia sa bude volať Zenith a má sa začať tvoriť. Všetko ostatné (pre koho, aký problém, MVP) je **neznáme**.

## Fáza 3 — architektúra

Žiadna. Mapa obrazovka → kód → dáta → testy je neaplikovateľná.

## Fáza 4 — business rules v kóde

Žiadne aplikačné pravidlá v kóde. Procesné pravidlá vznikli až s týmto AI systémom.

## Fáza 5 — pôvodná dokumentácia

| Kategória | Nález |
| --- | --- |
| Aktuálna | nič |
| Zastaraná | nič (nebolo čo zostarnúť) |
| Duplicitná | nič |
| Konfliktná | nič |
| Chýbajúca | takmer všetko, čo AI potrebuje na rozvoj aplikácie: produkt, stack, dáta, UI, pravidlá, workflow |

Žiadny konflikt dokumentácia vs. kód, lebo nebola ani dokumentácia ani kód.

## Čo tento snímok úmyselne nie je

Nie je to opis budúcej aplikácie. Nie je to sľub stacku. Po vzniku kódu sa má aktualizovať `architecture.md` a priatelia, nie tento súbor.
