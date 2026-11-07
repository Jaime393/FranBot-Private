# Pack de fundadores — nota de cuarentena (M12, 2026-11-07)

Tres archivos de `pack_fundadores_v1/` existen pero están **excluidos** del producto
y de la absorción a MIU:

- `generador_payloads.json` — generador de payloads
- `arquitecto_tuneles.json` — arquitecto de tuneles
- `analista_configs.json` — analista de configuraciones

Los tres son `tipo: "premium"` y `requiereInternet: false`, como las 18 limpias.
Están duplicados en `premium/` (que contiene solo estos 3 archivos).

**Exclusión verificada:**

- No están entre las 18 almas de la descripción del producto de Gumroad
  ("Pack de 18 Almas Semilla para FranBot", $9.99).
- No están entre los 18 archivos de `miu-ecosistema/data/franbot/almas/`
  (absorción commit 65150794, 2026-11-06).
- El pack de origen tiene 21 archivos (18 limpias + 3 excluidas).

**Por qué:** no son almas-persona del producto; son herramientas de operador
(payloads, túneles, configuraciones). El producto vende 18 personas; estas 3
no entran en ese elenco ni en la absorción. Los archivos no se borran: quedan
aquí, excluidos y documentados.
