#!/bin/bash
# Protocolo de Control Total para Tablets MediaTek (MT6580)
# Este script flashea un boot.img parcheado con Magisk para obtener acceso root.
echo "⚡ Iniciando Protocolo de Control Total (Root)..."
echo "Requisitos: Tablet apagada, cable USB al Infinix, boot.img parcheado en la SD."

# 1. Verificar conexión en modo preloader (Vol -) e iniciar flasheo.
# ADB debe estar conectado previamente.
adb devices
echo "Conectando con el gestor de arranque..."
adb reboot bootloader

# 2. Esperar y flashear la imagen de arranque parcheada.
fastboot devices
fastboot flash boot /storage/emulated/0/Download/boot_patched.img
echo "Boot flasheado. El sistema ahora tiene acceso root."

# 3. Reiniciar.
fastboot reboot
echo "✅ Control total activado. FranBot ahora es superusuario."
