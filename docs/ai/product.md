# Produkt — Zenith

**Stav:** Produkt je definovaný. Základ v kóde je koreň repo (`index.html`).  
**Režim projektu:** C — je apka (AI systém aj aplikácia).  
**Posledné overenie:** 28. 8. 2026.

## Pre koho

Vlastník osobne. Nie tím, nie verejný trh.

## Aký problém

FOMO: pocit, že mu niečo uniká. Chaos v hlave, stráca sa vo myšlienkach. Zahlcuje sa zbytočnými aktivitami. Namiesto produktivity je **prehnane aktívny**, z toho stres, oslabenie imunity a zdravotné problémy. Hlava na voľnobehu spúšťa negatívne scenáre. Často reaktívne skáče po požiadavkách (napr. klienti) namiesto toho, aby tvoril.

Zenith má byť miesto, kde sa to **usporiada podľa oblastí života**, nápady sa buď zrušia alebo prejdú do akcie, a poznatky z kníh sa dajú znova použiť. Nie ďalší kanál na ešte viac aktivity.

## Piliere (oblasti života)

V kóde ako `Component.AREAS`:

1. Zdravie  
2. Osobnostný rozvoj  
3. Práca a podnikanie  
4. Financie  
5. Manželstvo a deti  
6. Rodina  
7. Priatelia  

## Moduly (v prototype sú)

| Modul | Účel v kóde |
| --- | --- |
| Domov | Rozcestník: dlaždice na časti, mimo sidebaru |
| Denník vďačností | 1–5 vecí za deň, podľa oblasti, história |
| Denník úspechov | Hrdosť, voliteľné S-tier, podľa oblasti |
| Nápady | Stavy Nový → Zrušený **alebo** 60-dňová výzva (3–5 aktivít) → Hotovo. Predvolene naraz jedna výzva |
| Veci, ktoré ma hnevajú | Mentálny balast podľa oblasti, nie to-do |
| Manifestácia | Jeden scenár, vizualizácia s odpočtom (predvolene 150 s) |
| Kotva | Čas + otázka, označenie prečítania. Systémový alarm predvolene vypnutý |
| Princípy | Poznámky z kapitoly → princíp + nákres (kyblíky / palíčky / tabuľa) |

## Mantinele (schválené)

1. Len ty. Žiadne zdieľanie, sociálna sieť, komentáre, pozvánky. Žiadne účty pre iných ľudí.
2. Žiadne platby, predplatné, e-shop.
3. Žiadne reálne e-maily, SMS ani správy von z aplikácie.
4. Žiadne napojenie na kalendár klientov, firemné systémy ani produkčné API.
5. Web v prehliadači (nie App Store). Slovenčina. Telefón. Pridanie na plochu iOS. Ikona **vrchol** (Z + šípka na nočnom čiernom pozadí) je v chrome. Pri písaní na iPhone sa stránka nesmie priblížiť, pole ostane rovnako veľké.
6. Pôvodne: nestavať všetky moduly naraz. **Konflikt:** prototyp v koreni už obsahuje všetky časti. Ďalšia práca ho upravuje, nestrká druhú apku vedľa.
7. LoL gamifikácia ako hra nie je. S-tier na úspechoch v kóde je. 60-dňová výzva v kóde je. Denný systémový budík predvolene nie (`anchorNotify: false`).
8. Princípy: poznámky → princíp + jednoduchý nákres, nie celá kniha ako tlač.
9. Aplikácia sama nenaháňa desiatkami upozornení. Max neskôr jeden denný alarm kotvy.
10. Ľahšie je **zrušiť** nápad, než začať desať výziev. V kóde predvolene `oneChallenge: true`.

## Základ na prácu

Koreň Zenith: `index.html`, `support.js`, `zenith-sketch.js`, `CLAUDE.md`, `_ds/organic-…`. Predvolená stránka **Domov**. Menu: Domov, Vďačnosť, Úspechy, Nápady, Veci, ktoré ma hnevajú, Manifestácia, Kotva, Princípy.

Text, písmo, lead: `CLAUDE.md`. Priečinok `Zenith-claude/` sa už nepoužíva.

Nestavať druhú React apku v koreni.

## Čo je neznáme

| Otázka | Stav |
| --- | --- |
| Presun z Claude Design HTML do iného stacku | kým to vlastník neschváli v zadaní, ostáva tento prototyp |
| Zapojenie ikony vrchol do tohto webu | je, nočné čierne pozadie |
| Fredoka vs Nunito | CLAUDE.md vs kód, pozri `architecture.md` |
| Presné pravidlá 60-dňovej výzvy mimo toho, čo je v kóde | kód: 3–5 aktivít, 60 dní, naraz jedna ak `oneChallenge` |

## Produktové rozhodnutia

| Dátum | Rozhodnutie | Zdroj |
| --- | --- | --- |
| 2026-08-27 | Názov Zenith | vlastník |
| 2026-08-28 | Osobný nástroj | vlastník |
| 2026-08-28 | Sedem oblastí života | vlastník |
| 2026-08-28 | Web, slovenčina, telefón, iOS plocha, bez účtov pre iných | vlastník |
| 2026-08-28 | Ikona: vrchol. Paleta znaku: nočné čierne pozadie (krémová verzia vrátená) | vlastník |
| 2026-08-28 | Predvolená stránka Domov ako rozcestník | vlastník |
| 2026-08-28 | React v koreni zmazaný | vlastník |
| 2026-08-28 | Základ práce: dizajn od Claude, potom extrahovaný do **koreňa** Zenith | vlastník |

## Pravidlo pre agentov

Nemeniť `index.html` a súvisiace súbory apky bez schváleného `/zenith-implement`.
