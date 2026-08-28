---
name: zenith-rebuild
description: Runs the portable AI-system bootstrap prompt on this repo. Detects app vs no-app, then aligns docs and agents to today's state without changing application code. Invoke with /zenith-rebuild. The prompt itself is project-agnostic; this skill is only this repo's launcher.
disable-model-invocation: true
---

# Rebuild (tento priečinok)

Vykonaj prenosný prompt **`docs/ai/bootstrap-prompt.md`** tu.

Prompt je všeobecný. `slug` zisti z tohto priečinka (tu už existujú `/zenith-plan` a `/zenith-implement` — nemeň ich názvy, ak sedia).

1. Fáza 0: aplikácia áno/nie, AI systém áno/nie.
2. Nemeň aplikačný kód, databázu, UI, business logiku. Nestavaj produkt.
3. Docs a agenti = dnešok.
4. Ľudský výstup podľa promptu, nie zoznam súborov.
