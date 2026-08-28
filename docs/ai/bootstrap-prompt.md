# Vstupný prompt — AI development systém

Tento súbor **nie je viazaný na jeden produkt**. Skopíruj ho do iného priečinka, vlož agentovi ako zadanie, alebo ho v projekte, kde už beží, spusti cez `/{slug}-rebuild`.

Úloha: z reálneho stavu priečinka postaviť alebo upratať AI development systém (dokumentácia, agenti, harness). **Nestavať produkt.** Nemeniť existujúcu aplikáciu.

## Veta, ktorú má systém uniesť

Po dokončení tohto behu musí ísť človek napísať obyčajnou rečou napríklad:

> Chcem, aby sa po otvorení tejto obrazovky zobrazovalo viac informácií.

A `/{slug}-plan` to má uniesť: pochopiť zámer, skontrolovať produkt, docs a **overený** kód, pomenovať dotknuté časti a riziká, navrhnúť najmenšiu zmenu **ľudskou rečou**, počkať na schválenie, vydať presné zadanie. Až `/{slug}-implement` smie meniť apku.

Ak obrazovky ešte nie sú, uniesť musí analogickú vetu o prvej slajse — nie vymyslenú apku.

Plánovanie a implementácia ostávajú oddelené.

---

## Identita projektu (povinné pred všetkým)

Zisti `slug` a ľudský názov. Nehardkóduj cudzí produkt.

**Slug** (lowercase, pomlčky), v tomto poradí:

1. existujúci príkaz `/{niečo}-plan` v `.cursor/commands/` alebo `.cursor/skills/`
2. názov git remote (posledný segment bez `.git`)
3. názov koreňového priečinka
4. názov, ktorý človek výslovne povedal

**Príkazy, ktoré máš vytvoriť alebo zachovať:**

| Úloha | Názov |
| --- | --- |
| Plánovanie | `/{slug}-plan` |
| Implementácia | `/{slug}-implement` |
| Zosúladenie docs s dneškom | `/{slug}-rebuild` |

Ak už v projekte sú iné názvy a fungujú, **nemeň ich** bez dôvodu. Zapíš ich do `docs/ai/workflow.md`.

Jazyk komunikácie s človekom = jazyk, ktorým píše on. Technické názvy súborov nechaj v angličtine (`docs/ai/`, `AGENTS.md`).

---

## Ako to použiť v ďalšom projekte

1. Otvor cieľový priečinok v Cursori (prázdny alebo s existujúcou apkou).
2. Vlož agentovi **celý tento súbor** ako zadanie (alebo ho tam skopíruj ako `docs/ai/bootstrap-prompt.md` a napíš „vykonaj tento prompt“).
3. Agent zistí režim A/B/C, odvodí `slug`, postaví alebo uprace systém.
4. Ďalšia práca na produkte ide cez `/{slug}-plan` → schválenie → `/{slug}-implement`.
5. Keď sa docs a kód znova rozídu: `/{slug}-rebuild`.

Tento beh **nevytvára** obrazovky, databázu ani stack. Len systém, ktorým sa to neskôr bude dať robiť.

---

## Čo tento beh smie a nesmie

**Smie:** čítať celý projekt; písať/prepisovať `docs/ai/`, `.cursor/rules|skills|commands`, koreňový `AGENTS.md`, ľudský `README.md` ak opisuje AI workflow.

**Nesmie:** meniť aplikáciu — `src/`, `app/`, `apps/`, databáza, migrácie, business logika, UI, existujúce funkcie, konfigurácia behu, závislosti produktu — pokiaľ to nie je nevyhnutné *výhradne* na AI infra (takmer nikdy).

**Nesmie:** implementovať novú funkcionalitu produktu. Ani keď je priečinok prázdny.

**Nesmie tvrdiť o kóde nič, čo nebolo overené** v tomto behu (otvorený súbor, výpis priečinka, skutočný príkaz). Žiadne „iste tam je auth“, „typický Next.js“, „určite PostgreSQL“, kým to agent nevidel. Ak nevie, napíše **neznáme**.

Ak dokumentácia a kód nesedia: **kód je technická pravda**. Konflikt zapíš. Dokumentáciu neprepisuj potichu na vymyslený stav.

---

## FÁZA 0 — Režim

Nepredpokladaj README. Prejdi reálny priečinok.

### Aplikácia existuje, ak platí aspoň jedno

- aplikačný zdroj (`src/`, `app/`, `apps/`, `packages/` s kódom produktu, mobil / desktop, …)
- manifest závislostí produktu (`package.json`, `pyproject.toml`, `Cargo.toml`, `go.mod`, `Gemfile`, `composer.json`, …) a nie je prázdny placeholder
- obrazovky, routy, server, schéma databázy produktu

**Aplikácia nie je:** `docs/`, `.cursor/`, `AGENTS.md`, `README.md`, `.gitignore`, `.env.example`, git.

### AI systém existuje, ak platí aspoň jedno

- `docs/ai/` s produktom / agentmi / harnessom
- Cursor príkazy na plán a implementáciu
- koreňový `AGENTS.md` s tokom plán → kód

### Režim (zapíš do `docs/ai/analysis.md`)

| Režim | Aplikácia | AI systém | Čo urobiť |
| --- | --- | --- | --- |
| **A — prázdny** | nie | nie | Postav AI systém odznova pod `slug`. Produkt nestavaj. |
| **B — len AI** | nie | áno | Uprac docs a agentov na dnešok. Existujúce `/{slug}-plan` nezahadzuj, ak sedí. Produkt nestavaj. |
| **C — je apka** | áno | nie / áno | Z kódu zdokumentuj pravdu. AI systém prispôsob apke. Apku nemeň. |

Ďalšie fázy bežia vždy. Líši sa hĺbka kódu.

---

## FÁZA 1 — Pochopenie projektu

Z kódu, nie z prianí: package manager, framework, frontend, backend, databáza, API, auth, routing, obrazovky, komponenty, business logika, dáta, state, služby, konfigurácia, testy, deploy, bezpečnosť, existujúce AI pravidlá, dokumenty, git.

V A/B napíš, čo chýba. Nevymýšľaj stack. Netvrď existenciu súboru, kým si ho nevidel.

---

## FÁZA 2 — Produkt

Čo apka robí, pre koho, aký problém, cieľ, toky, obrazovky, funkcie, pravidlá, MVP, mimo scope, rozhodnutia.

Čo nevieš z projektu: **neznáme**. Nevymýšľaj. Názov produktu = to, čo je v kóde / od človeka / `slug`, nie dohad.

---

## FÁZA 3 — Architektúra

Technológie, vrstvy, komunikácia, entry pointy, testy, spustenie, build, deploy. Ak dáva zmysel: obrazovka → komponenty → logika → dáta → testy.

V A/B je platné: apka nie je, mapa neaplikovateľná.

---

## FÁZA 4 — Business rules

Čo AI nesmie porušiť. Kritické / dôležité / bežné. V A/B aj procesné (nehádaj produkt, plán ≠ kód, tajomstvá, **netvrdiť neoverený kód**).

---

## FÁZA 5 — Dokumentácia vs realita

Aktuálne / zastarané / duplicitné / konfliktné / chýbajúce.

Zastarané nemež potichu: najprv `analysis.md`, potom jedna pravda v knowledge base, zvyšok odkaz.

---

## FÁZA 6 — Knowledge Base

Jednoduchá štruktúra, každý súbor má účel. Prispôsob ju **tomuto** projektu; nevytváraj súbory len aby ich bolo veľa.

```
docs/ai/
  README.md
  product.md
  architecture.md
  data-model.md
  business-rules.md
  ui-ux.md
  workflow.md
  AGENTS.md
  harness.md
  golden-example.md          # na DNESNOM stave tohto priečinka
  analysis.md                # snímok tohto behu
  bootstrap-prompt.md        # kópia TOHTO prenosného promptu
  pending-implementation.md
```

`agent.md` len ako odkaz, ak by duplikoval `AGENTS.md`.

V B/C prepíš fakty na dnešok. Fungujúce príkazy a triage zachovaj. Nemeň `slug` príkazov bez dôvodu.

V `workflow.md` a koreňovom `AGENTS.md` použi **skutočný** `/{slug}-plan` atď., nie názov iného produktu, pokiaľ to nie je `slug`.

Do `AGENTS.md` a skills pre Planning **povinne** daj ľudský príklad komunikácie a päťbodové overenie (nižšie). Do Implementation skills **povinne** daj zoznam povinností.

---

## FÁZA 7 — Pravidlá pre agentov

Pri budúcom vývoji musí agent:

- pochopiť požiadavku
- skontrolovať produkt a **víziu** (či požiadavka sem patrí)
- skontrolovať docs a **aktuálny kód** (overený, nie predpokladaný)
- určiť dotknuté časti a existujúce patterns
- skontrolovať business rules a riziká
- pri nejasnosti sa opýtať
- preferovať najmenšiu správnu zmenu
- nevymýšľať existujúci stav
- **netvrdiť o kóde nič neoverené**
- pri významnej zmene definovať overenie (päť bodov)
- aktualizovať docs, ak sa zmení systémový fakt

Nesmie prerábať architektúru, ak stačí existujúci pattern.

---

## FÁZA 8 — Ľudská komunikácia (Planning)

Toto je záväzné, nie odporúčanie. Planning Agent so človekom **nesmie** hovoriť programátorským žargónom, ak to nie je nutné.

Zlé:

> Modifikujeme state management v komponentovej vrstve a refaktorujeme selector.

Dobré:

> Momentálne si aplikácia túto informáciu pamätá takto. Navrhujem upraviť iba túto časť, aby sa správala podľa tvojej požiadavky. Zvyšok aplikácie ostane nezmenený.

Technické detaily (súbory, funkcie, príkazy) patria do implementačného zadania, nie do prvého vysvetlenia.

Tento pár zlé/dobré zapíš do `docs/ai/AGENTS.md` v jazyku človeka.

---

## FÁZA 9–11 — Agenti

### Planning `/{slug}-plan`

Nemeniť apku. Výstup zrozumiteľný človeku. Na konci samostatný implementačný prompt: technicky presný, pripravený na priame použitie `/{slug}-implement`.

Povinné poradie:

```
ľudská požiadavka
  → pochopenie
  → triage (pre koho, problém, mantinely)
  → kontext produktu
  → kontrola vízie          ← či to patrí do tohto produktu; ak nie, zastaviť a povedať prečo
  → analýza overeného kódu
  → dotknuté časti
  → business rules
  → riziká vs harness
  → otázky, ak treba
  → návrh ľudskou rečou
  → overenie (päť bodov)
  → schválenie človekom
  → implementačný prompt
```

**Kontrola vízie:** sedí požiadavka s tým, čím má produkt byť (`product.md` + overené správanie)? Ak by stavala inú apku, iný trh alebo celý produkt naraz, Planning sa zastaví. Neplánuje „pre istotu“.

### Overenie — päť povinných vecí

Zadanie **bez všetkých piatich** je neplatné (nielen bez príkazu):

1. **Čo sa má zmeniť**
2. **Čo sa nesmie zmeniť** (zvyšok apky, dáta, iné obrazovky)
3. **Ako overiť správanie** (očakávaný výsledok)
4. **Aký príkaz / test spustiť** (konkrétny, lokálny; inak zadanie neplatné)
5. **Aký používateľský scenár** musí po zmene fungovať

### Implementation `/{slug}-implement`

Len schválené, platné zadanie. Self-heal max 3×, potom človek. Pri konflikte nevymýšľa riešenie — zastaví sa.

Povinnosti (všetky):

1. Prečítať zadanie.
2. Overiť aktuálny stav kódu voči zadaniu. Netvrdiť, čo nevidel.
3. Implementovať len cieľ. Nevymýšľať inú funkcionalitu.
4. Rešpektovať architektúru. Použiť existujúce patterns. Neprekročiť scope.
5. Nespustiť nebezpečný príkaz, ak nie je výslovne v zadaní.
6. Spustiť test zo zadania. Skontrolovať výsledok.
7. Ak test zlyhá: opraviť a znova, najviac 3×. Potom zastaviť a volať človeka.

### Rebuild `/{slug}-rebuild`

Vykoná tento prompt na danom priečinku.

Skills: `.cursor/skills/{slug}-plan/SKILL.md` (a implement, rebuild), `disable-model-invocation: true`. Commands: `.cursor/commands/{slug}-plan.md` atď.

---

## FÁZA 12 — Harness

Primerane **tomuto** projektu, nie šablóne inej apky.

**Veľmi dôležité:** harness **nesmie prekážať bežnému vývoju**. Žiadna klietka, ktorá znemožní malú schválenú slajsu, bežný bugfix v scope, doplnenie testu zo zadania alebo prvú overiteľnú vertikálu, keď apka ešte nie je. Chráni pred tichou deštrukciou, nie pred prácou.

Vždy (bez textu v schválenom zadaní): žiadne tajomstvá v gite, žiadny drop DB / nebezpečné migrácie / produkčná konfigurácia / mazanie existujúcich funkcií / veľký refaktor namiesto malej zmeny / práca mimo scope.

Apka nie je → neblokuj prvú slajsu, blokuj celý produkt naraz.  
Apka je → chráň existujúce správanie.

`/{slug}-rebuild` smie meniť len AI infra, nie produkt.

---

## FÁZA 13 — Golden example

Jeden príklad na **aktuálnom** stave tohto priečinka. Žiadny vymyslený cudzí produkt.

Povinná kostra (všetky body; ak triage zlyhá, body po triagi označ ako „nenastalo — stop“):

1. Používateľská požiadavka (reálna veta)
2. Pochopenie
3. Kontrola kontextu (produkt)
4. Kontrola vízie
5. Kontrola overeného kódu
6. Návrh (alebo dôvod, prečo ešte nie)
7. Otázky
8. Rozhodnutie
9. Finálny implementačný prompt — alebo výslovne, že nevznikol (Triage FAIL / čakanie na odpoveď)

Bez produktu = často Triage FAIL, ale kostra ostáva. S obrazovkou = reálna požiadavka na ňu, nie hypotéza.

---

## FÁZA 14 — Zápis

Až po analýze zapíš knowledge base, Cursor rules, commands, skills, `AGENTS.md`, entry pointy.

Režim C: nemeň aplikačný kód.

Do nového projektu skopíruj aj tento `bootstrap-prompt.md`, aby sa dal použiť znova.

---

## FÁZA 15 — Audit (kontrolný zoznam)

Pred ukončením behu prejdi. Ak niečo nie je áno, oprav docs/agentov — nie apku.

**Dokumentácia**

- [ ] Je aktuálna voči dnešnému kódu / stavu?
- [ ] Neobsahuje vymyslené informácie?
- [ ] Nie sú zbytočné duplicity?
- [ ] Je jasné, čo je zdroj pravdy?

**AI rules**

- [ ] Vie agent, čo má robiť?
- [ ] Vie, čo nesmie?
- [ ] Vie, kedy sa má opýtať?
- [ ] Vie, že o kóde nesmie tvrdiť neoverené?

**Planning**

- [ ] Neimplementuje?
- [ ] Komunikuje ľudskou rečou (s príkladom zlé/dobré v `AGENTS.md`)?
- [ ] Kontroluje reálny kód?
- [ ] Robí kontrolu vízie?
- [ ] Produkuje použiteľný implementačný prompt (alebo legitímny stop)?
- [ ] Overenie má všetkých päť bodov?

**Implementation**

- [ ] Vie dostať schválené zadanie?
- [ ] Overuje aktuálny stav?
- [ ] Má zoznam povinností (architektúra, patterns, žiadny extra scope)?
- [ ] Testuje zmeny?
- [ ] Neprekračuje scope?

**Harness**

- [ ] Chráni pred deštrukciou?
- [ ] Nebráni bežnému vývoju?

**Workflow**

```
moja veta
  → /{slug}-plan
  → pochopenie + vízia + analýza
  → otázky podľa potreby
  → návrh ľudskou rečou
  → moje schválenie
  → implementačný prompt
  → /{slug}-implement
  → implementácia
  → testovanie
```

---

## Výstup človeku

Nie zoznam súborov. Ľudskou rečou:

- `slug` a príkazy, ktoré vznikli / ostali
- režim A/B/C a prečo
- čo apka robí, alebo že ešte nie je
- čo v docs sedelo / bolo zastarané / duplicitné / chýbalo
- ako vyzerá knowledge base
- ako funguje Planning (vrátane vízie a ľudskej reči)
- ako funguje Implementation (zoznam povinností)
- plán vs implementácia vs rebuild
- čo je mimo (nestavať produkt v tomto behu)

Nakoniec jeden konkrétny príklad na vete, ktorú má systém uniesť:

„Keď napíšem, že sa po otvorení tejto obrazovky má zobraziť viac informácií, čo presne urobí `/{slug}-plan`?“

Podľa potreby aj: čo urobí `/{slug}-rebuild`.
