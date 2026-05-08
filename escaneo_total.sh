cat > escaneo_total.sh << 'EOF'
#!/data/data/com.termux/files/usr/bin/bash
echo "════════════════════════════════════════════════════════════"
echo "📂 ESCANEO TOTAL DEL PROYECTO FRANBOT (LOCAL)"
echo "════════════════════════════════════════════════════════════"
echo "Directorio: $(pwd)"
echo "Fecha: $(date)"
echo ""

echo "📁 Archivos por extensión:"
echo "----------------------------"
echo "HTML: $(find . -maxdepth 1 -name "*.html" | wc -l) archivos"
echo "JS:   $(find . -name "*.js" | grep -v node_modules | wc -l) archivos"
echo "CSS:  $(find . -name "*.css" | wc -l) archivos"
echo "JSON: $(find . -name "*.json" | wc -l) archivos"
echo ""

echo "📄 Listado detallado de archivos (con tamaño y líneas):"
echo "════════════════════════════════════════════════════════════"
find . -type f \( -name "*.html" -o -name "*.js" -o -name "*.css" -o -name "*.json" -o -name "*.sh" \) ! -path "*/node_modules/*" | sort | while read f; do
    size=$(du -h "$f" | cut -f1)
    lines=$(wc -l < "$f" 2>/dev/null || echo "0")
    echo "📌 $f | $size | $lines líneas"
done
echo ""

echo "📦 Dependencias de Node.js (si existe package.json):"
if [ -f "package.json" ]; then
    cat package.json | grep -E 'dependencies|devDependencies' -A 20
else
    echo "No hay package.json"
fi
echo ""

echo "════════════════════════════════════════════════════════════"
echo "✅ Escaneo completado."
EOF

chmod +x escaneo_total.sh