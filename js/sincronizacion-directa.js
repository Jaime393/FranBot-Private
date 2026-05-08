// sincronizacion-directa.js — Sincronización de Semillas vía WebRTC Local
const SincronizacionDirecta = {
  canal: null,
  async iniciar() {
    const peer = new RTCPeerConnection();
    const dataChannel = peer.createDataChannel('semillas');
    dataChannel.onmessage = (e) => {
      if (typeof ProcesadorSemillas !== 'undefined') {
        ProcesadorSemillas.agregar(JSON.parse(e.data));
      }
    };
    this.canal = dataChannel;
    return 'Canal de sincronización directa abierto.';
  }
};
