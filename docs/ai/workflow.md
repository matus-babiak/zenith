# Workflow — plánovanie, implementácia, rebuild

Ľudský opis. **Správanie agentov:** `docs/ai/AGENTS.md`. **Zákazy:** `docs/ai/harness.md`. **Zosúladenie s dneškom:** `docs/ai/bootstrap-prompt.md`.

```
/zenith-rebuild     → docs a agenti podľa skutočného stavu (nemeniť apku)

ľudská veta
    → /zenith-plan
    → TRIAGE (pre koho, problém, mantinely)
         FAIL → stop
         PASS ↓
    → docs + kód + riziká vs harness
    → návrh + povinný spustiteľný test
    → tvoje schválenie
    → zadanie
    → /zenith-implement
    → kód v scope → test (self-heal max 3×)
```

| Príkaz | Úloha | Mení apku? |
| --- | --- | --- |
| `/zenith-rebuild` | Knowledge base a agenti = dnešok | nie |
| `/zenith-plan` | Návrh, zadanie | nie |
| `/zenith-implement` | Schválená slajsa | áno, len podľa zadania |

Zadanie bez spustiteľného testu a bez `Riziká (harness)` je neplatné. Šablóna: `docs/ai/AGENTS.md`.  
Čakajúce zadanie: `docs/ai/pending-implementation.md`. Log: `.cursor/logs/activity.log`.  
Aplikácia na zmeny: koreň (`index.html`, pravidlá `CLAUDE.md`).
