# Zenith

Repozitár: [github.com/matus-babiak/zenith](https://github.com/matus-babiak/zenith).

**Aplikácia:** `index.html` v koreni (dizajn od Claude, extrahovaný sem).  
**AI systém:** `docs/ai/`, `/zenith-plan`, `/zenith-implement`, `/zenith-rebuild`.  
**Pravidlá textu:** `CLAUDE.md`.

## Spustiť lokálne

```
python3 scripts/serve.py
```

Otvor [http://127.0.0.1:4173/](http://127.0.0.1:4173/). Cesty ako `/uspechy` fungujú len s týmto serverom (SPA fallback), nie s holým `python3 -m http.server`.

## Ako pracovať

1. `/zenith-rebuild` — docs = dnešok  
2. `/zenith-plan` — návrh, schválenie  
3. `/zenith-implement` — kód podľa zadania  

Podrobnosti: [docs/ai/README.md](docs/ai/README.md).
