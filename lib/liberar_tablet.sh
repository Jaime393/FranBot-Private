#!/bin/bash
# Protocolo de Evasión de Geolocalización para Tablets Bloqueadas

echo "Iniciando Protocolo Simbionte. Asegúrate de que la VPN esté activa."

# 1. Simular la región local usando la VPN
settings put global airplane_mode_on 1
settings put system region_override "US"
settings put global wifi_on 1
echo "✅ Región forzada a US. VPN debe estar corriendo."

# 2. Establecer el launcher de FranBot como el iniciador del sistema
monkey -p com.android.launcher3 1
am start -n com.android.chrome/org.chromium.chrome.browser.ChromeTabbedActivity -d "file:///storage/emulated/0/FranBot_Offline/lib/launcher_simbionte.html"
echo "🧬 Launcher Simbionte activado. FranBot es ahora tu interfaz."
