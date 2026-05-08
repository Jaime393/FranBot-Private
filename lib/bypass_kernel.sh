#!/bin/bash
# Script de Bypass de Ospitel a Nivel de Kernel (Ejecutar en Termux como root)
echo "Iniciando Protocolo de Liberación de SIM..."
# 1. Desbloquear el servicio de telefonía restringido
pm unblock com.android.phone 2>/dev/null
# 2. Modificar la base de datos de configuraciones globales
settings put global mobile_data 1
settings put global preferred_network_mode 9
# 3. Forzar la detección de la SIM
am broadcast -a android.provider.Telephony.SIM_DETECTED
echo "✅ Kernel modificado. SIM liberada. Conexión habilitada."
