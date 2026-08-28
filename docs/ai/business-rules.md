# Business rules — Zenith

**Posledné overenie:** 28. 8. 2026. Aplikačné pravidlá z `index.html` a `CLAUDE.md`.

## Kritické

Porušenie by mohlo zničiť dôveru, dáta alebo zmysel produktu.

1. **Nevymýšľať produkt.** Ak `product.md` hovorí „neznáme“, agent to nesmie nahradiť vlastným príbehom o používateľoch, funkciách alebo trhu.
2. **Kód je technická pravda.** Ak dokument a kód nesedia, pomenovať konflikt. Dokument neprepísať potichu.
3. **Plánovanie nemení aplikáciu.** Planning Agent nesmie upravovať aplikačný kód, schému, konfiguráciu behu ani závislosti aplikácie.
4. **Bez schválenia žiadna implementácia.** Implementation Agent pracuje len so schváleným zadaním. Nesmie si rozšíriť scope.
5. **Žiadne tajomstvá v repozitári ani v kóde.** Heslá a kľúče len cez env / `.env` (v `.gitignore`). Podrobnosti: `harness.md` — Secrets Guard.
6. **Žiadna deštrukcia dát ani tiché mutácie.** Drop databázy, reálne e-maily, platby a zápisy do produkčných API tretích strán len s výslovným textom v zadaní. Podrobnosti: `harness.md`.

## Dôležité

1. **Najmenšia správna zmena.** Ak požiadavku splní úprava existujúceho patternu, nesmie sa prepisovať architektúra.
2. **Jedna slajsa, nie celý produkt.** Požiadavka „urob aplikáciu“ sa musí zúžiť na prvú overiteľnú časť, ktorú vlastník schváli.
3. **Stack sa nevolí potichu.** Framework, jazyk, databáza a hosting sú produktovo-technické rozhodnutia. Kým ich vlastník neurobí, ostanú neznáme.
4. **Existujúce správanie sa neodstraňuje**, ak to zadanie výslovne nežiada.
5. **Po zmene systémového faktu aktualizovať dokumentáciu** v `docs/ai/` (produkt, architektúra, dáta, pravidlá, UI).

## Bežné

1. S človekom hovoriť jazykom, ktorým píše on (v tomto projekte spravidla slovenčina).
2. Technické detaily patriť do implementačného zadania, nie do prvého vysvetlenia návrhu.
3. Overenie patrí do zadania (Validation Gate). Nevymýšľať druhý testovací framework; použiť stack zo schváleného zadania.
4. Nové produktové pravidlá sem dopísať v kategórii kritické / dôležité / bežné, s odkazom na kód keď bude existovať.

## Aplikačné pravidlá (prototyp)

Zdroj: `index.html`, `CLAUDE.md`.

### Kritické (apka)

1. **Žiadny em dash v UI.** V textoch rozhrania ani v obsahu, ktorý používateľ vidí, nikdy znak „—“. Čiarka, dvojbodka alebo nová veta. (`CLAUDE.md`)
2. **Vďačnosť: max 5 zápisov za dnešný deň** (pri novom zápise, nie pri úprave). `Component.J.vdacnost.limit`.
3. **Nápady:** z `novy` ide `zruseny` alebo `vyzva`. Z výzvy `hotovo`. Predvolene naraz **jedna** výzva (`oneChallenge` default true).
4. **Výzva:** 3 až 5 denných aktivít. Kód hlási chybu pod 3. Maximum polí 5.
5. **Wipe** maže `localStorage` `zenith.v1`. Bez tohto gesta nestrácať používateľské dáta.

### Dôležité (apka)

1. Displejový font s mäkčeňmi. Caprasimo zakázané. CLAUDE.md: Fredoka. Kód dnes: Nunito 900 (konflikt, kód platí kým sa neopraví).
2. Lead na stránke na 100 % šírky obsahu.
3. Kotva: predvolený čas 12:30, predvolená otázka ako v kóde. Systémový alarm default vypnutý.
4. Princípy: nákres len `buckets` | `stick` | `board` cez `zenith-sketch.js`.

### Bežné (apka)

1. Inputy aspoň 16px (už v HTML).
2. Hranica layoutu 900px.
