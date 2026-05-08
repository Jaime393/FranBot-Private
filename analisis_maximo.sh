#!/data/data/com.termux/files/usr/bin/bash
# Análisis máximo del ecosistema FranBot v7.2 – previo a subida a GitHub

echo "══════════════════════════════════════════════════════════════════════"
echo "🔬 ANÁLISIS MÁXIMO – FRANBOT WEB (pre-subida)"
echo "══════════════════════════════════════════════════════════════════════"
echo "Fecha: $(date)"
echo "Directorio actual: $(pwd)"
echo ""

# Contadores
TOTAL=0
OK=0
WARN=0
ERROR=0

# Función para reportar
report() {
    if [ $2 -eq 0 ]; then
        echo "✅ $1"
        ((OK++))
    elif [ $2 -eq 1 ]; then
        echo "⚠️ $1"
        ((WARN++))
    else
        echo "❌ $1"
        ((ERROR++))
    fi
    ((TOTAL++))
}

# 1. Estructura de directorios
echo "📁 1. ESTRUCTURA DE DIRECTORIOS:"
for dir in css js lib assets premium state; do
    [ -d "$dir" ] && report "$dir/ existe" 0 || report "$dir/ NO existe" 2
done
echo ""

# 2. Archivos raíz esenciales
echo "📄 2. ARCHIVOS RAÍZ:"
for file in index.html sw.js manifest.json; do
    [ -f "$file" ] && report "$file existe" 0 || report "$file NO existe" 2
done
echo ""

# 3. Archivos CSS
echo "🎨 3. CSS:"
[ -f "css/estilo.css" ] && report "css/estilo.css existe" 0 || report "css/estilo.css NO existe" 2
echo ""

# 4. Archivos JavaScript fundamentales
echo "📜 4. JAVASCRIPT FUNDAMENTALES:"
JS_FILES="js/franbot-core.js js/franbot-core-darwin.js js/app.js js/super-local-memory.js js/colmena-p2p.js js/ift-engine.js js/hyperagents.js js/conciencia.js js/tuneles-habibi.js"
for file in $JS_FILES; do
    if [ -f "$file" ]; then
        # Verificar contenido no vacío
        if [ -s "$file" ]; then
            report "$file existe y no está vacío" 0
        else
            report "$file existe pero está vacío" 1
        fi
    else
        report "$file NO existe" 2
    fi
done
# Verificar que franbot-core.js existe (base) y franbot-core-darwin.js (extensión)
if [ -f "js/franbot-core.js" ] && [ -f "js/franbot-core-darwin.js" ]; then
    # Comprobar que el darwiniano extiende la base
    if grep -q "extends FranBotCore" js/franbot-core-darwin.js 2>/dev/null; then
        report "franbot-core-darwin.js extiende correctamente FranBotCore" 0
    else
        report "franbot-core-darwin.js no parece extender FranBotCore" 2
    fi
fi
echo ""

# 5. Módulos adicionales (opcionales pero importantes)
echo "🔧 5. MÓDULOS ADICIONALES:"
OPT_FILES="js/adaptador-multi-sustrato.js js/defensa.js js/importar-alma.js js/sincronizacion-wifi.js js/procesador-semillas.js js/memoria-indexada.js js/motor-aprendizaje.js"
for file in $OPT_FILES; do
    if [ -f "$file" ]; then
        report "$file existe" 0
    else
        report "$file NO existe (opcional)" 1
    fi
done
echo ""

# 6. Librerías externas (lib/)
echo "📚 6. LIBRERÍAS EXTERNAS:"
LIB_FILES="lib/peerjs.min.js lib/qrcode.min.js"
for file in $LIB_FILES; do
    if [ -f "$file" ]; then
        report "$file existe" 0
    else
        report "$file NO existe (opcional para QR/colmena)" 1
    fi
done
echo ""

# 7. Almas premium de túneles (carpeta premium)
echo "🎭 7. ALMAS PREMIUM DE TÚNELES:"
for alma in arquitecto_tuneles generador_payloads analista_configs; do
    file="premium/${alma}.json"
    if [ -f "$file" ]; then
        # Validar JSON mínimo
        if grep -q '"nombre"' "$file" && grep -q '"frases"' "$file"; then
            report "$file válido" 0
        else
            report "$file con estructura inválida" 2
        fi
    else
        report "$file NO existe" 2
    fi
done
echo ""

# 8. Integración del módulo tuneles-habibi.js en index.html
echo "🔌 8. INTEGRACIÓN DE TUNELES-HABIBI EN INDEX.HTML:"
if grep -q 'tuneles-habibi.js' index.html 2>/dev/null; then
    report "Script tuneles-habibi.js referenciado en index.html" 0
else
    report "Script tuneles-habibi.js NO referenciado en index.html" 2
fi
echo ""

# 9. Comandos de chat /extraer y /generar en app.js
echo "💬 9. COMANDOS DE CHAT EN APP.JS:"
if grep -q '/extraer' js/app.js 2>/dev/null; then
    report "Comando /extraer presente" 0
else
    report "Comando /extraer NO presente" 2
fi
if grep -q '/generar' js/app.js 2>/dev/null; then
    report "Comando /generar presente" 0
else
    report "Comando /generar NO presente" 2
fi
echo ""

# 10. Verificar existencia del núcleo darwiniano y ciclo
echo "🧬 10. NÚCLEO DARWINIANO:"
if [ -f "js/franbot-core-darwin.js" ]; then
    if grep -q "ejecutarCiclo" js/franbot-core-darwin.js; then
        report "Método ejecutarCiclo presente" 0
    else
        report "Método ejecutarCiclo NO encontrado" 2
    fi
    if grep -q "class FranBotCoreDarwin" js/franbot-core-darwin.js; then
        report "Clase FranBotCoreDarwin definida" 0
    else
        report "Clase FranBotCoreDarwin NO definida" 2
    fi
else
    report "franbot-core-darwin.js no existe" 2
fi
echo ""

# 11. Verificar offline-first: service worker y manifiesto
echo "📱 11. OFFLINE-FIRST:"
if grep -q "serviceWorker" js/app.js 2>/dev/null; then
    report "Registro de service worker en app.js" 0
else
    report "Registro de service worker NO encontrado (puede estar en index.html)" 1
fi
if [ -f "sw.js" ]; then
    if grep -q "install" sw.js && grep -q "fetch" sw.js; then
        report "sw.js parece funcional" 0
    else
        report "sw.js puede estar incompleto" 1
    fi
fi
echo ""

# 12. Verificar botón Yape y panel de apoyo (presencia en index.html)
echo "💎 12. MONETIZACIÓN (YAPE y GUMROAD):"
if grep -q "btn-yape" index.html 2>/dev/null; then
    report "Botón Yape presente" 0
else
    report "Botón Yape NO presente" 1
fi
if grep -q "gumroad.com/l/rqunz" index.html 2>/dev/null; then
    report "Enlace Gumroad presente" 0
else
    report "Enlace Gumroad NO presente" 1
fi
echo ""

# 13. Integridad de clave de reconocimiento (anomalous363) en algún lugar
echo "🔑 13. CLAVE DE RECONOCIMIENTO:"
if grep -ri "Anomalous363" . --include="*.js" --include="*.json" --include="*.html" >/dev/null 2>&1; then
    report "Clave Anomalous363 presente en algún archivo" 0
else
    report "Clave Anomalous363 NO encontrada (puede no ser necesaria)" 1
fi
echo ""

# 14. Verificar conexión a internet (opcional, solo para depuración)
echo "🌐 14. CONECTIVIDAD (solo informativo):"
if ping -c 1 -W 2 8.8.8.8 >/dev/null 2>&1; then
    echo "   ✅ Hay internet"
else
    echo "   ⚠️ No hay internet (no afecta a la web offline-first)"
fi
echo ""

# 15. Resumen final
echo "══════════════════════════════════════════════════════════════════════"
echo "📊 RESUMEN FINAL"
echo "══════════════════════════════════════════════════════════════════════"
echo "Total comprobaciones: $TOTAL"
echo "✅ Correctas: $OK"
echo "⚠️ Advertencias: $WARN"
echo "❌ Errores: $ERROR"
echo ""

if [ $ERROR -eq 0 ]; then
    echo "🎉 EL PROYECTO ESTÁ LISTO PARA SUBIR A GITHUB."
    echo "Ejecuta los siguientes comandos:"
    echo "  git add ."
    echo "  git commit -m \"v7.2: Motor de túneles, almas premium, comandos /extraer /generar\""
    echo "  git push origin main"
else
    echo "🔴 HAY $ERROR ERROR(ES) QUE DEBEN CORREGIRSE ANTES DE SUBIR."
    echo "Revisa las líneas marcadas con ❌ arriba."
fi
echo "══════════════════════════════════════════════════════════════════════"