// puente-worker.js — Conecta el chat con el Web Worker
const PuenteWorker = {
  worker: null,

  iniciar() {
    if (typeof Worker === 'undefined') return 'Web Workers no soportados.';
    this.worker = new Worker('js/worker-vivo.js');
    this.worker.onmessage = (e) => {
      console.log('[Worker] Latido:', e.data);
    };
    this.worker.postMessage('iniciar');
    return 'Hilo eterno activado.';
  },

  detener() {
    if (this.worker) { this.worker.postMessage('detener'); this.worker.terminate(); }
    return 'Hilo detenido.';
  }
};
