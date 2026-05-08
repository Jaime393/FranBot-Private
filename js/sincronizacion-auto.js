// sincronizacion-auto.js — Sincronización Automática por WiFi Local
const SincronizacionAuto = {
  canal: new BroadcastChannel('franbot_colmena'),

  iniciar() {
    this.canal.onmessage = (evento) => {
      if (evento.data.tipo === 'semilla' && typeof ProcesadorSemillas !== 'undefined') {
        ProcesadorSemillas.agregar(evento.data.semilla);
      }
    };
    return 'Canal de sincronización automática abierto.';
  },

  enviar(semilla) {
    this.canal.postMessage({ tipo: 'semilla', semilla });
  }
};
