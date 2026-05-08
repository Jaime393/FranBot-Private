const SincronizacionWiFi = {
  peer: null,
  sincronizarSemillas: async function() {
    if (typeof MemoriaIndexada === 'undefined') return;
    const semillas = await MemoriaIndexada.obtenerSemillas();
    if (semillas.length > 0 && this.peer) {
      this.peer.send({ tipo: 'semillas', datos: semillas });
      return semillas.length + ' semillas sincronizadas.';
    }
    return 'Sin conexión o semillas.';
  },
  emparejar: function(id) {
    // En producción usaría la API de WiFi Direct de Android
    this.peer = { id, enviar: (data) => console.log('Enviado a', id, data) };
    return 'Emparejado con ' + id;
  }
};
