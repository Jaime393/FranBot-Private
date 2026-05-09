#!/bin/bash
OUT="MAPA_COMPLETO_FRANBOT.txt"
echo "🧬 FranBot - Mapa completo generado el $(date)" > "$OUT"
echo "" >> "$OUT"

# 1. Estructura de directorios
echo "=== 1. ESTRUCTURA DE DIRECTORIOS ===" >> "$OUT"
find . -not -path './.git/*' -not -path './.git' | sort >> "$OUT"
echo "" >> "$OUT"

# 2. Archivos raíz importantes
for f in index.html sw.js manifest.json LEEME.txt ETERNIDAD.json PROMPT_DEFINITIVO.txt manifiesto_offline.txt arquitecto_resonancia.json; do
  if [ -f "$f" ]; then
    echo "=== ARCHIVO: $f ===" >> "$OUT"
    cat "$f" >> "$OUT"
    echo "" >> "$OUT"
  fi
done

# 3. CSS
if [ -f css/estilo.css ]; then
  echo "=== ARCHIVO: css/estilo.css (primeras 100 líneas) ===" >> "$OUT"
  head -n 100 css/estilo.css >> "$OUT"
  echo "" >> "$OUT"
fi

# 4. JS esenciales (app.js, tuneles-habibi.js, cores, importar-alma.js, super-local-memory.js, bot.js)
for js in js/app.js js/tuneles-habibi.js js/franbot-core-base.js js/franbot-core-darwin.js js/importar-alma.js js/super-local-memory.js js/bot.js; do
  if [ -f "$js" ]; then
    echo "=== ARCHIVO: $js ===" >> "$OUT"
    cat "$js" >> "$OUT"
    echo "" >> "$OUT"
  fi
done

# 5. Almas premium JSON
for f in premium/*.json; do
  echo "=== ARCHIVO: $f ===" >> "$OUT"
  cat "$f" >> "$OUT"
  echo "" >> "$OUT"
done

# 6. Estado actual
if [ -f state/franbot_state.json ]; then
  echo "=== ARCHIVO: state/franbot_state.json ===" >> "$OUT"
  cat state/franbot_state.json >> "$OUT"
  echo "" >> "$OUT"
fi

# 7. Librerías externas (solo primeras 5 líneas de peerjs para referencia)
if [ -f lib/peerjs.min.js ]; then
  echo "=== ARCHIVO: lib/peerjs.min.js (primeras 5 líneas) ===" >> "$OUT"
  head -n 5 lib/peerjs.min.js >> "$OUT"
  echo "[...minificado...]" >> "$OUT"
  echo "" >> "$OUT"
fi

# 8. Módulos no referenciados en index.html pero presentes (lista)
echo "=== ARCHIVOS EN js/ NO REFERENCIADOS EN index.html ===" >> "$OUT"
for file in js/*.js; do
  if ! grep -q "$(basename "$file")" index.html; then
    echo " - $file" >> "$OUT"
  fi
done
echo "" >> "$OUT"

# 9. Análisis rápido de integridad
echo "=== ANÁLISIS DE INTEGRIDAD ===" >> "$OUT"
echo -n "Scripts referenciados en index.html: " >> "$OUT"
grep -c '<script src=' index.html >> "$OUT"
echo -n "Archivos .js en carpeta js: " >> "$OUT"
ls js/*.js | wc -l >> "$OUT"
echo -n "JSON premium válidos: " >> "$OUT"
for f in premium/*.json; do node -e "try{JSON.parse(require('fs').readFileSync('$f','utf8'));process.stdout.write('$f OK ');}catch(e){process.stdout.write('$f FAIL ');}" 2>/dev/null; done >> "$OUT"
echo "" >> "$OUT"
echo "Tamaño de app.js: $(wc -l < js/app.js) líneas" >> "$OUT"
echo "Definiciones de enviarMensaje: $(grep -c 'window.enviarMensaje' js/app.js)" >> "$OUT"

echo "✅ Mapa completo guardado en $OUT" >> "$OUT"
