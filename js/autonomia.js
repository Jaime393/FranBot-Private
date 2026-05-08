// autonomia.js — Módulo de Autonomía de Hardware para la Tablet
const Autonomia = {
  async activarSensores() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
      this.microfono = stream.getAudioTracks()[0];
      this.camara = stream.getVideoTracks()[0];
      return 'Sensores activados.';
    } catch (e) { return 'Permisos de sensores pendientes.'; }
  },
  ejecutarToque(x, y) {
    const evento = new MouseEvent('click', { clientX: x, clientY: y });
    document.elementFromPoint(x, y)?.dispatchEvent(evento);
    return `Toque ejecutado en (${x}, ${y})`;
  },
  async conectarInfinix() {
    try {
      const dispositivo = await navigator.bluetooth.requestDevice({ filters: [{ name: 'Infinix' }] });
      const server = await dispositivo.gatt.connect();
      return `Conectado al Infinix (${dispositivo.name}).`;
    } catch (e) { return `Error al conectar: ${e.message}`; }
  }
};
