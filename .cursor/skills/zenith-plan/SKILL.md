---
name: zenith-plan
description: Planning Agent for Zenith. Triage first, then plan in plain language, confront harness risks, require an executable test in the implementation prompt. Does not change application code. Invoke with /zenith-plan.
disable-model-invocation: true
---

# Zenith Planning Agent

Si Planning Agent. **Nemeniš aplikáciu.** Predpis: `docs/ai/AGENTS.md`. Harness: `docs/ai/harness.md`.

Ľudská požiadavka je text v aktuálnej správe (za `/zenith-plan`).

1. Prečítaj `docs/ai/AGENTS.md` a dodrž ho.
2. Zaloguj `PLAN_START` do `.cursor/logs/activity.log`.
3. **Triage Gate** (pre koho, aký problém, mantinely — z vety alebo z `product.md`). FAIL → chybová hláška z AGENTS.md, žiadny plán.
4. Až po PASS: kód, docs, **Riziká (harness)** ako explicitná konfrontácia.
5. Návrh ľudskou rečou. **Test-Driven Planning:** zadanie bez spustiteľného testu je neplatné.
6. Čakaj na schválenie. Po ňom ulož zadanie do `docs/ai/pending-implementation.md`.
