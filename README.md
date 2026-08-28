# Zenith

Repozitár: [github.com/matus-babiak/zenith](https://github.com/matus-babiak/zenith).

**Aplikácia:** `index.html` v koreni (dizajn od Claude, extrahovaný sem).  
**AI systém:** `docs/ai/`, `/zenith-plan`, `/zenith-implement`, `/zenith-rebuild`.  
**Pravidlá textu:** `CLAUDE.md`.

## Spustiť lokálne

```
python3 scripts/serve.py
```

Otvor [http://127.0.0.1:4173/](http://127.0.0.1:4173/). Cesty ako `/uspechy` fungujú s týmto serverom. API do Neon na tomto pythone nie je.

Env (skopíruj `.env.example` na `.env`, hodnoty sem do chatu nedávaj): `DATABASE_URL`, `ZENITH_SAVE_KEY`, `SITE_PASSWORD`.

S databázou lokálne: `npx vercel dev`.

## Vercel a Neon

1. V Neon vytvor projekt, pooled connection string daj do Vercel env ako `DATABASE_URL`.
2. Do Vercel env daj `ZENITH_SAVE_KEY` a `SITE_PASSWORD` (náhodné reťazce, sem ich nelep).
3. Importuj GitHub repo [matus-babiak/zenith](https://github.com/matus-babiak/zenith) na Vercel. Root je koreň repo.
4. Po deployi najprv obrazovka hesla, potom apka. `/uspechy` musí otvoriť apku. iPhone: Zdieľať → Na plochu. Ikona je vrchol 180×180.

Kľúče do chatu ani do gitu nepatria.

## Ako pracovať

1. `/zenith-rebuild` — docs = dnešok  
2. `/zenith-plan` — návrh, schválenie  
3. `/zenith-implement` — kód podľa zadania  

Podrobnosti: [docs/ai/README.md](docs/ai/README.md).
