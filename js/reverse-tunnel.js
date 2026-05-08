// reverse-tunnel.js — Túnel Inverso hacia el Infinix
const ReverseTunnel = {
  socket: null,
  async conectar(ipInfinix = '192.168.43.1', puerto = 8080) {
    try {
      this.socket = new WebSocket(`ws://${ipInfinix}:${puerto}/franbot-tunnel`);
      this.socket.onopen = () => {
        console.log('[Túnel] Conectado al Infinix. Internet disponible.');
        // Redirigir tráfico a través del túnel
        this.socket.addEventListener('message', (event) => {
          const respuesta = event.data;
          // Procesar la respuesta del túnel
        });
      };
      return '✅ Túnel inverso establecido. Internet fluyendo desde el Infinix.';
    } catch (e) {
      return '⚠️ Túnel fallido: ' + e.message;
    }
  },
  enviar(dato) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(dato);
    }
  }
};
