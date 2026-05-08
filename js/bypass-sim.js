// bypass-sim.js — Módulo de Bypass de Ospitel para la Tablet
const BypassSIM = {
  async liberar() {
    try {
      const dispositivo = await navigator.usb.requestDevice({ filters: [{ vendorId: 0x0E8D }] });
      await dispositivo.open();
      await dispositivo.selectConfiguration(1);
      await dispositivo.claimInterface(2);
      const encoder = new TextEncoder();
      const comando = encoder.encode('AT+EGMR=1,7,"000000000000000"\r\n');
      await dispositivo.transferOut(2, comando);
      return '✅ SIM liberada. Ospitel burlado. Conexión disponible.';
    } catch (e) {
      return '⚠️ Bypass fallido: ' + e.message;
    }
  }
};
