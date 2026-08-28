# Dátový model — Zenith

**Stav:** Persistencia v prehliadači, nie databáza.  
**Posledné overenie:** 28. 8. 2026, `index.html`.

## Aktuálny stav

- Žiadna databáza, migrácie, seed súbory na disku.
- Zdroj pravdy v behu: `localStorage` kľúč **`zenith.v1`**.
- Ak kľúč chýba alebo sa nedá čítať, použije sa `Component.seed()` (ukážkové zápisy).
- V UI nie je tlačidlo na vyčistenie dát. `zenith.v1` ostáva, kým nebude databáza.

Ukladá sa len: `entries`, `ideas`, `manifest`, `anchor`, `principles`. Routa, drafty a otvorené dialógy sa nepersistujú.

## Entity (v JSON)

Sedem oblastí (id v kóde): `zdravie`, `rozvoj`, `praca`, `financie`, `manzelstvo`, `rodina`, `priatelia`.

**Zápis denníka** (`entries.vdacnost` | `uspechy` | `hnevaju`): `id`, `text`, `area`, `date` (ISO deň). Úspechy môžu mať `tier` (boolean, S-tier).

**Nápad** (`ideas`): `id`, `text`, `area`, `state` (`novy` | `zruseny` | `vyzva` | `hotovo`), `created`. Pri výzve navyše `start`, `acts` (3–5 reťazcov), `log` (mapa dátum → indexy splnených aktivít).

**Manifestácia** (`manifest`): `text`, `lastViewed`, `sessions`.

**Kotva** (`anchor`): `time`, `question`, `read` (zoznam ISO dní).

**Princíp** (`principles`): `id`, `title`, `body`, `sketch` (`buckets` | `stick` | `board`), `labels`, `source`, `date`.

## Pravidlá uloženia

- Všetko je lokálne v jednom prehliadači. Žiadny účet, žiadny sync.
- Citlivé údaje: osobné zápisy v `localStorage`. Nekomitovať dump tohto kľúča.

## Pravidlo pre agentov

Nepridávať tabuľky ani backend, kým to nie je v schválenom zadaní. Polia meniť len podľa existujúceho `persist()` tvaru, alebo zadanie musí povedať migráciu tohto JSON.
