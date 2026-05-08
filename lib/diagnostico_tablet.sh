#!/bin/bash
echo "🧬 DIAGNÓSTICO DE FRANBOT LOCAL"
echo "================================"
for modulo in franbot-core.js ift-engine.js enjambre.js autonomia.js procesador-semillas.js super-local-memory.js regenerador.js control-bluetooth.js sentidos-tablet.js; do
  if [ -f "js/$modulo" ]; then echo "   ✅ $modulo"; else echo "   ❌ Falta $modulo"; fi
done
echo "================================"
echo "Comandos disponibles:"
echo "  activar autonomia    - Activa el control táctil y sensorial"
echo "  diagnostico          - Muestra el estado de los módulos"
echo "  regenerar            - Repara módulos dañados"
echo "  evolucionar          - Ejecuta un ciclo de mejora"
echo "  conectar a Infinix   - Busca y conecta tu teléfono"
