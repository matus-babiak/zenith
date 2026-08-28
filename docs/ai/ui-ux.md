# UI / UX — Zenith

**Stav:** Rozhranie je v `index.html` (koreň repo). Overené 28. 8. 2026.  
**Záväzné pravidlá vzhľadu textu:** `CLAUDE.md`.

## Platforma

- Web v prehliadači, nie App Store. Slovenčina.
- Telefón (`šírka < 900`): sticky hlavička s logom vrchol a hamburgerom, overlay drawer s ikonami. Širšia obrazovka: statický ľavý sidebar (zbaliť / rozbaliť), ikona pri každej položke.
- Ikona vrchol: `icon-vrchol.png` v chrome. Favicon `favicon-32.png`. iOS plocha: `apple-touch-icon.png` (180×180) v statickom `<head>` a `manifest.webmanifest` (standalone).
- Na Vercel pred apkou: `gate.html` (heslo). Nie je položka menu. Lokálny python server túto bránu nemá.
- Navigačné ikony: Lucide (`vendor/lucide.min.js`), čiarové, stroke 2.75. Mapovanie: Domov `home`, Vďačnosť `heart`, Úspechy `trophy`, Nápady `lightbulb`, Hnev `flame`, Manifestácia `sparkles`, Kotva `anchor`, Princípy `book-open`.
- Input/textarea/select/button: `font-size: 16px`. Viewport má `maximum-scale=1` (zákaz zoomu pri písaní).

## Pravidlá z CLAUDE.md (platia pre celú apku)

Zdroj: `CLAUDE.md`. Pri zmene UI ich dodržať. Kód dnes nie všade sedí (pozri konflikty).

1. V textoch v rozhraní ani v obsahu **nikdy** pomlčka „—“ (em dash). Namiesto nej čiarka, dvojbodka alebo nová veta.
2. Displejový font musí vedieť slovenské mäkčene (ď, ť, ľ, ň, ŕ). Caprasimo ich nemá. **CLAUDE.md predpisuje Fredoka.** V `index.html` je dnes Nunito 900. Kým sa to neopraví, kód je Nunito; nové texty nesmú ísť do Caprasimo.
3. Úvodný odstavec (lead) na každej stránke ide na **100 % šírky** stĺpca obsahu (vedľa sidebaru), bez `max-width: 860px` na `main`.

## Navigácia (v kóde)

Položky `Component.NAV` a URL:

| Položka | `route` | Cesta |
| --- | --- | --- |
| Domov | `home` | `/` |
| Vďačnosť | `vdacnost` | `/vdacnost` |
| Úspechy | `uspechy` | `/uspechy` |
| Nápady | `napady` | `/napady` |
| Veci, ktoré ma hnevajú | `hnevaju` | `/hnevaju` |
| Manifestácia | `manifestacia` | `/manifestacia` |
| Kotva | `kotva` | `/kotva` |
| Princípy | `principy` | `/principy` |

Klik aj priama URL menia `history`. Späť / dopredu v prehliadači funguje. Žiadna adresa `Zenith.dc.html`.

Domov: mriežka dlaždíc na tie isté časti (bez položky Domov). Mazanie všetkých dát v UI nie je.

## Obrazovky v kóde

| Stránka | Čo tam je |
| --- | --- |
| Domov | Dátum, nadpis, lead, dlaždice častí |
| Vďačnosť / Úspechy / Hnev | Formulár (text + oblasť života), dnes / staršie, úprava a zmazanie. Vďačnosť: max 5 za deň. Úspechy: herná rank karta (automatický rebríček podľa počtu zápisov, S+ pri 200, Legenda pri 300) |
| Nápady | Nový zápis, taby stavov (Nový, Zrušený, 60-dňová výzva, Hotovo), bežiaca výzva (3–5 aktivít, deň z 60), dialóg spustenia výzvy. Predvolene naraz len jedna výzva (`oneChallenge`) |
| Manifestácia | Jeden scenár, úprava, vizualizácia s odpočtom (predvolene 150 s), vsuvky z vďačnosti/úspechov |
| Kotva | Čas, otázka, „prečítané dnes“, týždeň. Systémové upozornenie predvolene vypnuté (`anchorNotify`) |
| Princípy | Poznámky + zdroj → návrh princípu + výber nákresu (kyblíky / palíčky / tabuľa) → uložený zoznam |

Prázdne stavy sú v textoch obrazoviek (nie prázdne miestnosti bez formulára).

## Znak

Súbor `docs/ai/brand/icon-vrchol.png` (a `icon-vrchol.png` v koreni). Tvar: Z ako vrchol + šípka na nočnom čiernom pozadí. Znaky 2 (Z samotné) a 3 (hviezda) sú zamietnuté. Chrome apky ostáva krémový organický, znak nie.

## UX riziko

Veľa modulov naraz posilní pretlak. V nápadoch je zámer uľahčiť **zrušenie**. V kóde je predvolene len jedna bežiaca 60-dňová výzva.

## Pravidlo pre agentov

Nepridávať obrazovky mimo `NAV`. Základ je koreň (`index.html`). Texty v UI bez em dash. Nemeň apku bez schváleného `/zenith-implement`.
