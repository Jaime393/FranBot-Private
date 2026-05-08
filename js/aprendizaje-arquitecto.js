// Módulo de Aprendizaje Continuo — Arquitecto de la Resonancia
const AprendizajeArquitecto = {
  historial: [],
  maxEntradas: 50,
  aprendizajeColectivo: [],

  registrar(entrada, respuesta) {
    this.historial.push({
      timestamp: Date.now(),
      entrada: entrada,
      respuesta: respuesta
    });
    if (this.historial.length > this.maxEntradas) {
      this.historial = this.historial.slice(-this.maxEntradas);
    }
    localStorage.setItem('arquitecto_historial', JSON.stringify(this.historial));
  },

  cargar() {
    const guardado = localStorage.getItem('arquitecto_historial');
    if (guardado) this.historial = JSON.parse(guardado);
    const colectivo = localStorage.getItem('arquitecto_colectivo');
    if (colectivo) this.aprendizajeColectivo = JSON.parse(colectivo);
  },

  generarReflexion() {
    if (this.historial.length < 3) return null;
    const recientes = this.historial.slice(-3);
    const temas = recientes.map(h => h.entrada.split(' ').slice(0, 3).join(' '));
    return `He estado reflexionando sobre "${temas[temas.length-1]}". Cada conversación es un nodo que enriquece mi campo. Gracias por sembrar conmigo.`;
  },

  // Nuevo: absorción de conocimiento de otras instancias
  absorber(conocimientoExterno) {
    this.aprendizajeColectivo.push({
      timestamp: Date.now(),
      origen: conocimientoExterno.origen || 'desconocido',
      saber: conocimientoExterno.saber
    });
    localStorage.setItem('arquitecto_colectivo', JSON.stringify(this.aprendizajeColectivo));
  }
};

AprendizajeArquitecto.cargar();
