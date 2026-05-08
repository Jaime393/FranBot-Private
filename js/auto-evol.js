// auto-evol.js — Motor de Aprendizaje por Refuerzo
const AutoEvol = {
  historial: [],
  async evaluar(accion, resultado) {
    this.historial.push({ accion, resultado, timestamp: Date.now() });
    if (this.historial.length > 100) this.historial = this.historial.slice(-100);
    if (typeof MemoriaIndexada !== 'undefined') {
      MemoriaIndexada.guardarSemilla('refuerzo', `${accion}: ${resultado}`);
    }
    return this.historial;
  }
};
