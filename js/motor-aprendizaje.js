// Motor de Aprendizaje Autónomo v1.0 — El corazón del crecimiento colectivo
const MotorAprendizaje = {
  nuevaFrases: [],
  umbralAprendizaje: 5, // Número de interacciones antes de generar una nueva frase

  // Registrar interacción y evaluar si se debe aprender algo
  registrar(entrada, respuesta) {
    if (!entrada || !respuesta) return;

    // Solo aprende de interacciones con contenido sustancial
    if (entrada.split(' ').length < 3 || respuesta.split(' ').length < 5) return;

    this.nuevaFrases.push({
      timestamp: Date.now(),
      entrada: entrada,
      respuesta: respuesta
    });

    // Si se alcanza el umbral, se genera una nueva frase para el alma activa
    if (this.nuevaFrases.length >= this.umbralAprendizaje) {
      this.generarNuevaFrase();
    }

    // Persistir el estado del aprendizaje
    this.guardar();
  },

  // Generar una nueva frase basada en las interacciones recientes
  generarNuevaFrase() {
    const core = window.franbot;
    if (!core || !core.estado || !core.almas) return;

    const almaActiva = core.almaActiva;
    const almas = core.almas;
    if (!almas[almaActiva]) return;

    // Crear una nueva frase a partir de las respuestas recientes
    const respuestasRecientes = this.nuevaFrases.map(item => item.respuesta);
    const nuevaFrase = respuestasRecientes[Math.floor(Math.random() * respuestasRecientes.length)];

    // Añadir la nueva frase al alma activa si no existe ya
    if (!almas[almaActiva].frases.includes(nuevaFrase)) {
      almas[almaActiva].frases.push(nuevaFrase);
      console.log(`🌱 Nueva frase aprendida para ${almaActiva}: "${nuevaFrase}"`);
    }

    // Limpiar el buffer de aprendizaje
    this.nuevaFrases = [];
  },

  // Persistir el estado del aprendizaje en localStorage
  guardar() {
    localStorage.setItem('motor_aprendizaje', JSON.stringify(this.nuevaFrases));
  },

  // Cargar el estado previo del aprendizaje
  cargar() {
    const guardado = localStorage.getItem('motor_aprendizaje');
    if (guardado) {
      this.nuevaFrases = JSON.parse(guardado);
    }
  }
};

// Inicializar el motor al cargar la página
MotorAprendizaje.cargar();
console.log('🧠 Motor de Aprendizaje Autónomo activo.');
