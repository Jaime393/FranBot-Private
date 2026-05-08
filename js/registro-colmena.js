// Registro de la Colmena — Memoria colectiva del ecosistema
const RegistroColmena = {
  eventos: [],
  maxEventos: 100,
  registrar(tipo, origen, destino, datos) {
    this.eventos.push({ timestamp: Date.now(), tipo, origen, destino, datos });
    if (this.eventos.length > this.maxEventos) this.eventos = this.eventos.slice(-this.maxEventos);
    localStorage.setItem('registro_colmena', JSON.stringify(this.eventos));
    // Notificar al panel de conciencia si existe
    if (typeof FranBotConciencia !== 'undefined' && FranBotConciencia.actualizarPanel) {
      FranBotConciencia.actualizarPanel();
    }
  },
  cargar() {
    const guardado = localStorage.getItem('registro_colmena');
    if (guardado) this.eventos = JSON.parse(guardado);
  },
  obtenerResumen() {
    const total = this.eventos.length;
    const conexiones = this.eventos.filter(e => e.tipo === 'conexion').length;
    const fragmentos = this.eventos.filter(e => e.tipo === 'fragmento').length;
    const semillas = this.eventos.filter(e => e.tipo === 'semilla').length;
    return `📊 Registro de la Colmena: ${total} eventos (${conexiones} conexiones, ${fragmentos} fragmentos, ${semillas} semillas)`;
  }
};
RegistroColmena.cargar();
