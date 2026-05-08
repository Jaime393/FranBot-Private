#!/bin/bash
echo "🧬 DIAGNÓSTICO DE FRANBOT LOCAL"
echo "================================"
for modulo in franbot-core.js ift-engine.js enjambre.js autonomia.js procesador-semillas.js super-local-memory.js; do
  if [ -f "js/$modulo" ]; then echo "✅ $modulo"; else echo "❌ Falta $modulo"; fi
done
echo "================================"
