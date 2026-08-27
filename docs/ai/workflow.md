# Workflow — plánovanie a implementácia

Zenith sa vyvíja v dvoch oddelených krokoch. Človek najprv hovorí s Planning Agentom. Až keď návrh schváli, Implementation Agent smie meniť aplikáciu.

```
ľudská veta
    → /zenith-plan
    → pochopenie + kontrola dokumentácie + kontrola kódu
    → otázky, ak niečo chýba
    → návrh ľudskou rečou
    → tvoje schválenie
    → implementačné zadanie
    → /zenith-implement
    → overenie aktuálneho stavu
    → implementácia v scope
    → overenie podľa zadania
```

## Čo spúšťa kto

| Krok | Spustenie | Smie meniť aplikáciu? |
| --- | --- | --- |
| Plánovanie | `/zenith-plan` + tvoja veta | nie |
| Implementácia | `/zenith-implement` + schválené zadanie | áno, len podľa zadania |

Planning Agent môže zapisovať len do `docs/ai/` (napr. schválené zadanie). Nesmie vytvárať ani upravovať aplikačný kód, závislosti, schému, CI ani konfiguráciu behu.

## Kroky Planning Agenta (povinné poradie)

1. **Pochopenie** — zopakovať zámer vlastnými slovami, bez žargónu.
2. **Produkt** — prečítať `product.md`. Skontrolovať, či požiadavka sedí s tým, čím má Zenith byť. Ak produkt nie je definovaný, povedať to na rovinu.
3. **Dokumentácia** — prečítať len relevantné časti `docs/ai/` (architektúra, dáta, UI, pravidlá, harness).
4. **Kód** — overiť reálny stav súborov. Netvrdiť, že niečo existuje, kým to agent nevidel.
5. **Dotknuté časti** — čo by sa zmenilo, čo by ostalo.
6. **Pravidlá** — `business-rules.md` + `harness.md`.
7. **Riziká** — čo sa môže pokaziť, vrátane „toto by postavilo celú apku naraz“.
8. **Otázky** — ak chýba zámer, scope, stack, alebo by agent musel hádať. **Bez odpovedí nepokračovať k implementačnému zadaniu.**
9. **Návrh** — najmenšia správna zmena, ľudskou rečou.
10. **Overenie** — ako spoznáme, že je to hotové; čo sa nesmie zmeniť.
11. **Schválenie** — počkať. Neschvaľovať si návrh sám.
12. **Implementačné zadanie** — až po súhlase. Technicky presné, pripravené na `/zenith-implement`.

## Kedy zastaviť plánovanie

Zastaviť a pýtať sa, ak platí hociktoré:

- produktový zámer nie je v dokumentácii a človek ho nedopovedal
- požiadavka dáva zmysel viacerými nezlučiteľnými spôsobmi
- agent by musel zvoliť stack, obrazovky alebo dátový model za človeka
- zmena by zmazala existujúce správanie, dáta, alebo prekročila harness
- nie je jasné, čo je „hotovo“

## Overenie (Validation Gate)

Planning Agent musí v návrhu aj v zadaní uviesť:

- čo sa má zmeniť
- čo sa nesmie zmeniť
- ako overiť správanie (používateľský scenár)
- aký konkrétny príkaz / test sa má **lokálne spustiť**
- pri prvej slajse: kostru tohto overenia (skript alebo jednoduchý test v stacku zo zadania — nie druhý framework navyše)

Funkcia nie je dokončená, kým Implementation Agent overenie nespustil a neprešlo. Pri opakovanom zlyhaní platí Loop Guard v `harness.md`.

## Uloženie schváleného zadania

Po schválení Planning Agent zapíše zadanie do `docs/ai/pending-implementation.md`.

Po úspešnej implementácii Implementation Agent súbor vyprázdni alebo nahradí krátkou poznámkou „žiadne čakajúce zadanie“ a aktualizuje relevantné `docs/ai/` fakty.

## Šablóna implementačného zadania

```markdown
# Implementačné zadanie — Zenith

## Schválené
- Kto schválil:
- Dátum:
- Ľudská požiadavka:

## Overený stav pred prácou
- Čo agent overil v kóde / priečinku:
- Relevantné dokumenty:

## Cieľ
- Presne čo má vzniknúť alebo sa zmeniť:

## Mimo scope
- Čo sa nesmie robiť:

## Kroky
1. ...

## Súbory
- Vytvoriť:
- Upraviť:
- Nemenať:

## Patterns a pravidlá
- Existujúci pattern na dodržanie (ak žiadny, napísať „žiadny, greenfield slajsa“):
- Business rules, ktoré platia:

## Overenie
- Používateľský scenár:
- Príkaz na lokálne spustenie:
- Očakávaný výsledok:
- Kostra testu (súbor / skript):

## Dokumentácia
- Ktoré súbory v docs/ai/ aktualizovať:

## Stop
- Zastaviť a spýtať sa, ak:
```

## Kroky Implementation Agenta

1. Prečítať zadanie (text po `/zenith-implement` alebo `pending-implementation.md`).
2. Overiť, že aktuálny kód stále sedí s „overeným stavom“ v zadaní.
3. Ak nesedí zásadný predpoklad — zastaviť, nehádaj.
4. Implementovať len cieľ, nič navyše.
5. Logovať shell, zápis aplikačných súborov a vonkajšie API do `.cursor/logs/agent-trace.log`.
6. Spustiť overenie zo zadania. Ak zlyhá, opravovať len v limite Loop Guard (max 10 pokusov, 3× rovnaká chyba → zastaviť).
7. Aktualizovať dokumentáciu, ak sa zmenil systémový fakt.
8. `docs/ai/pending-implementation.md` po úspechu vymeň za krátku poznámku, že žiadne zadanie nečaká.
9. Stručne povedať, čo sa zmenilo a ako to overil. Tajomstvá do odpovede nedávať.
