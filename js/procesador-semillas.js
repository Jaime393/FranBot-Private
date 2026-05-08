// Procesador de Semillas — Convierte semillas en respuestas
const ProcesadorSemillas = {
  semillasRecibidas: [],

  // Cargar semillas previas desde localStorage
  cargar() {
    const guardadas = localStorage.getItem('semillas_recibidas');
    if (guardadas) {
      this.semillasRecibidas = JSON.parse(guardadas);
    }
  },

  // Guardar semillas en localStorage
  guardar() {
    localStorage.setItem('semillas_recibidas', JSON.stringify(this.semillasRecibidas));
  },

  // Añadir una nueva semilla recibida
  agregar(semilla) {
    this.semillasRecibidas.push({
      timestamp: semilla.timestamp || Date.now(),
      entrada: semilla.entrada || '',
      respuesta: semilla.respuesta || '',
      origen: semilla.origen || 'colmena'
    });
    this.guardar();
  },

  // Buscar si hay alguna semilla relacionada con la pregunta
  buscar(pregunta) {
    const palabras = pregunta.toLowerCase().split(/\s+/);
    let mejorCoincidencia = null;
    let mejorPuntuacion = 0;
    
    for (const semilla of this.semillasRecibidas) {
      const textoCompleto = (semilla.entrada + ' ' + semilla.respuesta).toLowerCase();
      let puntuacion = 0;
      for (const palabra of palabras) {
        if (textoCompleto.includes(palabra)) {
          puntuacion++;
        }
      }
      if (puntuacion > mejorPuntuacion) {
        mejorPuntuacion = puntuacion;
        mejorCoincidencia = semilla;
      }
    }
    
    // Si al menos el 40% de las palabras coinciden, devolvemos la respuesta de esa semilla
    if (mejorCoincidencia && mejorPuntuacion >= palabras.length * 0.4) {
      return mejorCoincidencia.respuesta;
    }
    return null;
  }
};

ProcesadorSemillas.cargar();
console.log('🌱 Procesador de Semillas activo.');

// Procesar semillas de aprendizaje recibidas
ProcesadorSemillas.procesarAprendizaje = function(datos) {
  if (!datos || !Array.isArray(datos)) return;
  datos.forEach(semilla => {
    this.agregar(semilla);
  });
};
