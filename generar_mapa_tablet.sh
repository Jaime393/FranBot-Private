cd ~/FranBot_Offline

cat > generar_mapa_completo.sh << 'EOF'
#!/data/data/com.termux/files/usr/bin/bash
OUT="MAPA_COMPLETO_FRANBOT.txt"
echo "🧬 FranBot - Mapa completo generado el $(date)" > "$OUT"
echo "" >> "$OUT"

# 1. Estructura de directorios
echo "=== 1. ESTRUCTURA DE DIRECTORIOS ===" >> "$OUT"
find . -maxdepth 3 -type d | sort >> "$OUT"
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

# 4. JS esenciales (app.js, tuneles-habibi.js, ambos núcleos, importar-alma, super-local-memory)
for js in js/app.js js/tuneles-habibi.js js/franbot-core.js js/franbot-core-darwin.js js/importar-alma.js js/super-local-memory.js js/bot.js; do
  if [ -f "$js" ]; then
    echo "=== ARCHIVO: $js ===" >> "$OUT"
    cat "$js" >> "$OUT"
    echo "" >> "$OUT"
  fi
done

# 5. Almas premium (carpeta premium y pack_fundadores_v1)
echo "=== ALMAS PREMIUM ENCONTRADAS ===" >> "$OUT"
for f in premium/*.json; do
  if [ -f "$f" ]; then
    echo "--- $f ---" >> "$OUT"
    head -n 10 "$f" >> "$OUT"
    echo "..." >> "$OUT"
  fi
done
for f in pack_fundadores_v1/*.json; do
  if [ -f "$f" ]; then
    echo "--- $f ---" >> "$OUT"
    head -n 10 "$f" >> "$OUT"
    echo "..." >> "$OUT"
  fi
done
echo "" >> "$OUT"

# 6. Estado actual (state y backup)
if [ -f state/franbot_state.json ]; then
  echo "=== ARCHIVO: state/franbot_state.json ===" >> "$OUT"
  cat state/franbot_state.json >> "$OUT"
  echo "" >> "$OUT"
fi
if [ -f estado_backup.json ]; then
  echo "=== ARCHIVO: estado_backup.json (completo) ===" >> "$OUT"
  cat estado_backup.json >> "$OUT"
  echo "" >> "$OUT"
fi

# 7. Log del daemon (últimas 50 líneas)
if [ -f franbot.log ]; then
  echo "=== LOG DEL DAEMON (últimas 50 líneas) ===" >> "$OUT"
  tail -n 50 franbot.log >> "$OUT"
  echo "" >> "$OUT"
fi

# 8. Librerías externas
if [ -f lib/peerjs.min.js ]; then
  echo "=== ARCHIVO: lib/peerjs.min.js (primeras 5 líneas) ===" >> "$OUT"
  head -n 5 lib/peerjs.min.js >> "$OUT"
  echo "[...minificado...]" >> "$OUT"
  echo "" >> "$OUT"
fi

# 9. Archivos JS no referenciados en index.html
echo "=== ARCHIVOS EN js/ NO REFERENCIADOS EN index.html ===" >> "$OUT"
for file in js/*.js; do
  if ! grep -q "$(basename "$file")" index.html 2>/dev/null; then
    echo " - $file" >> "$OUT"
  fi
done
echo "" >> "$OUT"

# 10. Análisis de integridad y estadísticas
echo "=== ANÁLISIS DE INTEGRIDAD ===" >> "$OUT"
echo "Scripts referenciados en index.html: $(grep -c '<script src=' index.html)" >> "$OUT"
echo "Archivos .js en carpeta js: $(ls js/*.js 2>/dev/null | wc -l)" >> "$OUT"
echo "Estado de la coherencia (última): $(grep -o '"nivel_coherencia":[0-9.]*' estado_backup.json 2>/dev/null | tail -1)" >> "$OUT"
echo "Líneas de app.js: $(wc -l < js/app.js)" >> "$OUT"
echo "Definiciones de enviarMensaje: $(grep -c 'window.enviarMensaje' js/app.js)" >> "$OUT"
echo "Proceso daemon corriendo: $(pgrep -f franbot-daemon.js >/dev/null && echo 'SI' || echo 'NO')" >> "$OUT"

echo "✅ Mapa completo guardado en $OUT" >> "$OUT"
EOF

chmod +x generar_mapa_completo.sh
./generar_mapa_completo.sh
