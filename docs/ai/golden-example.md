# Golden example — Planning Agent

Tento súbor je **historický príklad** Triage FAIL, keď produkt ešte nemal „pre koho“ ani problém. **Nie je** dnešný stav.

Dnes: `product.md` je vyplnený, aplikácia je `index.html` v koreni. Triage na bežnú zmenu vo vnútri Zenithu má **PASS**, kým veta alebo product dávajú pre koho, problém a mantinely.

---

## Vtedy (prázdny produkt)

Používateľská požiadavka:

> Chcem začať tvoriť novú aplikáciu, ktorá sa bude volať Zenith.

`product.md` vtedy: len názov. Pre koho, problém, mantinely: neznáme.

```
TRIAGE ZLYHAL — plánovanie sa nespustilo.

Chýba mi na to, aby som mohol bezpečne pokračovať:
- Pre koho to má byť: chýba
- Aký problém to rieši: chýba
- Mantinely (čo sa nesmie stať / čo do tejto slajsy nepatrí): chýba

Doplň to ľudskou vetou. Potom znova /zenith-plan.
Kód som nemenil.
```

Tvar chybovej hlášky z `docs/ai/AGENTS.md` ostáva platný, keď triage naozaj zlyhá.

Šablóna implementačného zadania je v `docs/ai/AGENTS.md`. Po schválení ide do `docs/ai/pending-implementation.md`. Ďalšia implementácia nadväzuje na `index.html` v koreni, nie na zmazanú React kostru.
