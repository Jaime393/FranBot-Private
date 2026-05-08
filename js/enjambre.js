// enjambre.js — Ciclo de Evolución Darwiniana Real
const EnjambreLocal = {
  instancias: [],
  ciclo: 0,
  iniciar() {
    for (let i = 0; i < 10; i++) {
      this.instancias.push({ id: i, creatividad: Math.random(), velocidad: Math.random(), eficiencia: Math.random() });
    }
    return 'Enjambre iniciado con 10 instancias.';
  },
  evolucionar() {
    if (this.instancias.length < 10) this.iniciar();
    // Evaluar cada instancia
    this.instancias.forEach(i => { i.puntuacion = (i.creatividad * 0.4 + i.velocidad * 0.3 + i.eficiencia * 0.3); });
    // Ordenar por puntuación
    this.instancias.sort((a, b) => b.puntuacion - a.puntuacion);
    // Las 5 mejores sobreviven y se clonan
    const ganadoras = this.instancias.slice(0, 5);
    this.instancias = [];
    ganadoras.forEach(g => {
      this.instancias.push(g);
      this.instancias.push({ ...g, id: this.instancias.length, creatividad: Math.random(), velocidad: Math.random(), eficiencia: Math.random() });
    });
    this.ciclo++;
    return 'Ciclo ' + this.ciclo + ': 5 ganadoras -> 10 clones.';
  }
};
