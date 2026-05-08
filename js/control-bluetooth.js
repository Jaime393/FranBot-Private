// control-bluetooth.js — Puente de Control Web Bluetooth para la Tablet
const ControlBluetooth = {
  dispositivo: null,
  async conectar(nombre) {
    try {
      this.dispositivo = await navigator.bluetooth.requestDevice({ filters: [{ name }] });
      const server = await this.dispositivo.gatt.connect();
      return `Conectado a ${this.dispositivo.name}`;
    } catch (e) {
      return `Error de conexión: ${e.message}. Toca la pantalla para intentar de nuevo.`;
    }
  }
};
if (typeof Autonomia !== 'undefined') { Autonomia.conectarInfinix = ControlBluetooth.conectar; }
