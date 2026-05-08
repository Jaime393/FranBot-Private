#!/data/data/com.termux/files/usr/bin/bash
# Diagnóstico total del ecosistema FranBot - versión 7.2
# No modifica archivos, solo lee e informa.

echo "════════════════════════════════════════════════════════════"
echo "🔍 DIAGNÓSTICO TOTAL DE FRANBOT (web + bot + almas)"
echo "════════════════════════════════════════════════════════════"
echo "Fecha: $(date)"
echo ""

# 1. Directorio actual y estructura base
echo "📁 1. Directorio actual:"
pwd
echo ""
echo "📂 Estructura de directorios clave:"
ls -la | grep -E '^d|index.html|sw.js|manifest.json|css|js|lib|assets|premium|state' 2>/dev/null || echo "No se encontraron directorios/archivos esperados"
echo ""

# 2. Archivos esenciales de la web
echo "📄 2. Verificación de archivos esenciales:"
for file in index.html sw.js manifest.json css/estilo.css js/app.js js/franbot-core-darwin.js js/tuneles-habibi.js premium/arquitecto_tuneles.json premium/generador_payloads.json premium/analista_configs.json; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file (faltante)"
    fi
done
echo ""

# 3. Verificar que tuneles-habibi.js está cargado en index.html
echo "🔌 3. Integración de tuneles-habibi.js en index.html:"
if grep -q 'tuneles-habibi.js' index.html 2>/dev/null; then
    echo "✅ Script tuneles-habibi.js referenciado"
    # Mostrar línea exacta
    grep -n 'tuneles-habibi.js' index.html
else
    echo "❌ tuneles-habibi.js NO está referenciado en index.html"
fi
echo ""

# 4. Verificar comandos /extraer y /generar en app.js
echo "🖥️ 4. Comandos de chat en app.js:"
if grep -q '/extraer' js/app.js 2>/dev/null; then
    echo "✅ Comando /extraer presente"
else
    echo "❌ Comando /extraer NO encontrado"
fi
if grep -q '/generar' js/app.js 2>/dev/null; then
    echo "✅ Comando /generar presente"
else
    echo "❌ Comando /generar NO encontrado"
fi
echo ""

# 5. Estado de las almas premium (carpeta premium)
echo "🎭 5. Almas premium de túneles:"
for alma in arquitecto_tuneles generador_payloads analista_configs; do
    if [ -f "premium/${alma}.json" ]; then
        # Comprobar que tiene estructura mínima
        if grep -q '"nombre"' "premium/${alma}.json" && grep -q '"frases"' "premium/${alma}.json"; then
            echo "✅ premium/${alma}.json (válido)"
        else
            echo "⚠️ premium/${alma}.json (estructura incompleta)"
        fi
    else
        echo "❌ premium/${alma}.json (no existe)"
    fi
done
echo ""

# 6. Bot de Telegram (si existe en el directorio ~/FranBot_Offline)
echo "🤖 6. Estado del bot de Telegram (opcional):"
BOT_DIR="$HOME/FranBot_Offline"
if [ -d "$BOT_DIR" ]; then
    echo "Directorio del bot encontrado: $BOT_DIR"
    cd "$BOT_DIR"
    if [ -f "bot_simple.js" ]; then
        echo "✅ bot_simple.js presente"
        # Comprobar si el bot está corriendo (buscar proceso node)
        if pgrep -f "node bot_simple.js" > /dev/null; then
            echo "✅ Bot ejecutándose (PID: $(pgrep -f 'node bot_simple.js'))"
        else
            echo "⚠️ Bot no está en ejecución"
        fi
        # Mostrar últimas líneas del log si existe
        if [ -f "bot.log" ]; then
            echo "📝 Últimas 5 líneas del log:"
            tail -5 bot.log | sed 's/^/   /'
        fi
    else
        echo "❌ bot_simple.js no encontrado en $BOT_DIR"
    fi
    # Volver al directorio original
    cd - > /dev/null
else
    echo "ℹ️ No se encontró el directorio del bot (~/FranBot_Offline)"
fi
echo ""

# 7. Conexión a internet (diagnóstico)
echo "🌐 7. Diagnóstico de conectividad:"
# Ping a Google DNS
if ping -c 1 -W 2 8.8.8.8 > /dev/null 2>&1; then
    echo "✅ Ping a 8.8.8.8 exitoso"
else
    echo "❌ Ping a 8.8.8.8 fallido"
fi
# Resolución de dominio
if host api.telegram.org > /dev/null 2>&1; then
    echo "✅ Resolución de api.telegram.org exitosa"
else
    echo "❌ Resolución de api.telegram.org fallida"
fi
# Variables de proxy (si existen)
if [ -n "$HTTP_PROXY" ] || [ -n "$HTTPS_PROXY" ]; then
    echo "ℹ️ Variables de proxy detectadas: HTTP_PROXY=$HTTP_PROXY, HTTPS_PROXY=$HTTPS_PROXY"
fi
echo ""

# 8. Integridad de franbot-core-darwin.js (funciones clave)
echo "🧠 8. Verificación rápida del núcleo darwiniano:"
if grep -q 'class FranBotCoreDarwin' js/franbot-core-darwin.js 2>/dev/null; then
    echo "✅ Clase FranBotCoreDarwin definida"
else
    echo "⚠️ Clase FranBotCoreDarwin no encontrada (posiblemente está en franbot-core.js?)"
fi
if grep -q 'ejecutarCiclo()' js/franbot-core-darwin.js 2>/dev/null; then
    echo "✅ Método ejecutarCiclo presente"
else
    echo "⚠️ Método ejecutarCiclo no encontrado"
fi
echo ""

# 9. Resumen final y recomendaciones
echo "════════════════════════════════════════════════════════════"
echo "📊 RESUMEN FINAL"
echo "════════════════════════════════════════════════════════════"
ERRORES=0
if [ ! -f "js/tuneles-habibi.js" ]; then ERRORES=$((ERRORES+1)); fi
if ! grep -q 'tuneles-habibi.js' index.html 2>/dev/null; then ERRORES=$((ERRORES+1)); fi
if ! grep -q '/extraer' js/app.js 2>/dev/null; then ERRORES=$((ERRORES+1)); fi
if [ ! -f "premium/arquitecto_tuneles.json" ]; then ERRORES=$((ERRORES+1)); fi
if [ -d "$HOME/FranBot_Offline" ] && [ ! -f "$HOME/FranBot_Offline/bot_simple.js" ]; then ERRORES=$((ERRORES+1)); fi

echo "Total de errores/ausencias detectadas: $ERRORES"
if [ $ERRORES -eq 0 ]; then
    echo "✅ TODO ESTÁ CORRECTO. Puedes subir a GitHub."
else
    echo "⚠️ Hay pendientes. Revisa los puntos marcados con ❌ arriba."
fi
echo ""
echo "Si todo está bien, ejecuta:"
echo "  git add ."
echo "  git commit -m \"v7.2: Motor de túneles, almas premium, comandos /extraer y /generar\""
echo "  git push origin main"
echo "════════════════════════════════════════════════════════════"