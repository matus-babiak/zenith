# Golden example — Planning Agent na aktuálnom stave

Tento príklad je viazaný na overený stav z 27. 8. 2026: **prázdny projekt, žiadna aplikácia**. Nie je to vymyslená obrazovka ani budúci stack.

## Používateľská požiadavka

> Chcem začať tvoriť novú aplikáciu, ktorá sa bude volať Zenith.

## 1. Pochopenie

Chceš založiť novú aplikáciu s názvom Zenith. Ešte si nepovedal, pre koho je, aký problém rieši, ani akú prvú vec má človek v aplikácii zvládnuť.

## 2. Kontrola produktu

`docs/ai/product.md`: názov Zenith je jediné produktové rozhodnutie. Pre koho, aký problém, MVP, obrazovky — **neznáme**.

## 3. Kontrola kódu

Priečinok projektu neobsahuje aplikačný kód. Nie je `src/`, nie sú závislosti, nie je databáza, nie sú testy, v čase prvého auditu nebol ani git. Existuje len (alebo má existovať) AI infraštruktúra v `docs/ai/` a `.cursor/`.

## 4. Návrh, ktorý by bol zlý

Postaviť „typickú“ webovú apku s prihlásením, dashboardom a databázou. To by si vymyslelo produkt aj technológie. Harness to zakazuje.

## 5. Riziká

- Vznikne aplikácia, ktorú si nechcel.
- Vyberie sa stack, ktorý nechceš udržiavať.
- Scope „celá aplikácia“ sa nedá overiť naraz.

## 6. Otázky (tu Planning Agent zastaví)

Kým na toto neodpovieš, **nevznikne implementačné zadanie** a **nespustí sa implementácia**.

1. Pre koho je Zenith? (ty sám, tím, zákazníci, konkrétna skupina…)
2. Aký konkrétny problém im to má v prvom rade vyriešiť?
3. Aká je prvá vec, ktorú má človek v aplikácii dokázať urobiť, aby si povedal „toto už je Zenith“?
4. Máš preferenciu, kde to má bežať? Napr. web v prehliadači, telefón, desktop. Ak nie, povedz „zatiaľ neviem“.
5. Máš preferenciu technológií, alebo to máme navrhnúť až podľa odpovedí 1–3?

## 7. Čo by sa stalo po tvojich odpovediach

Planning Agent by navrhol **iba prvú slajsu** (nie celý produkt), ľudskou rečou, s tým čo ostane neskôr. Po tvojom schválení by vzniklo implementačné zadanie.

Nižšie je **vzor zadania**, nie schválená práca. Zámerne používa fiktívne odpovede označené ako príklad, aby bolo vidieť tvar. Tieto odpovede **nie sú** stav projektu.

### Príklad (iba tvar, nie rozhodnutie)

Predpoklad čisto na ukážku formátu, **nepoužívať ako fakt**:

- pre koho: zatiaľ len ty
- problém: chceš si zapisovať jeden denný cieľ
- prvá vec: otvoriť aplikáciu a vidieť jednu stránku s názvom Zenith
- platforma: web
- stack: ešte nechceš voliť — agent by sa mal ešte spýtať, alebo navrhnúť jednu konkrétnu voľbu na schválenie, nie ju ticho zapracovať

Až by si schválil aj stack a slajsu, zadanie by mohlo vyzerať takto:

```markdown
# Implementačné zadanie — Zenith

## Schválené
- Kto schválil: (vlastník)
- Dátum: (až po skutočnom schválení)
- Ľudská požiadavka: začať Zenith; prvá slajsa = jedna webová stránka s názvom

## Overený stav pred prácou
- Žiadny aplikačný kód, žiadny package manifest.
- product.md: názov Zenith, zvyšok podľa vtedy doplnených rozhodnutí.

## Cieľ
- Vytvoriť najmenší spustiteľný web, ktorý po spustení ukáže názov Zenith.
- Zaznamenať zvolený stack do architecture.md a prvú obrazovku do ui-ux.md.

## Mimo scope
- Žiadne prihlásenie, databáza, ďalšie stránky, deploy, dizajn systém.
- Žiadne ďalšie funkcie „keď už tam sme“.

## Kroky
1. Overiť, že aplikačný kód stále neexistuje (alebo zodpovedá zadaniu).
2. Vytvoriť len súbory potrebné na jednu stránku a spustenie.
3. Aktualizovať docs/ai/architecture.md, ui-ux.md, product.md podľa skutočnosti.
4. Overiť spustenie podľa sekcie Overenie.

## Súbory
- Vytvoriť: len tie, ktoré slajsa potrebuje (vymenovať až po schválení stacku).
- Nemenať: .cursor/ rules a skills, harness, business-rules procesnú časť.

## Patterns a pravidlá
- Žiadny existujúci aplikačný pattern (greenfield).
- Dodržať business-rules.md (kritické) a harness.md (kým aplikácia neexistuje).

## Overenie
- Používateľský scenár: človek spustí dohodnutý príkaz a v prehliadači vidí text Zenith.
- Príkazy: doplniť po voľbe stacku.
- Ak príkazy ešte neexistujú: najprv ich slajsa musí zaviesť, potom ich spustiť.

## Dokumentácia
- architecture.md, ui-ux.md, product.md (MVP slajsa), data-model.md (stále žiadne dáta, to napísať výslovne).

## Stop
- Zastaviť, ak vlastník neschválil stack, alebo ak by implementácia ťahala databázu / auth / ďalšie stránky.
```

## 8. Rozhodnutie v tomto príklade

Na aktuálnom kóde (prázdny projekt) je správne rozhodnutie Planning Agenta: **zastaviť na otázkach**. Implementácia celej aplikácie z vety „chcem začať Zenith“ by porušila harness aj business rules.
