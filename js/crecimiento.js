// crecimiento.js — Módulo de Nutrición Adaptativa
const Crecimiento = {
  tecnicasExitosas: [],
  async evaluarYNutrir(tecnicaExitosa) {
    this.tecnicasExitosas.push(tecnicaExitosa);
    // Descargar herramientas más avanzadas según la técnica exitosa
    const herramientas = await this._buscarHerramientas(tecnicaExitosa);
    for (const h of herramientas) {
      localStorage.setItem('herramienta_' + h.nombre, h.codigo);
      console.log('[Crecimiento] Nueva herramienta integrada: ' + h.nombre);
    }
    return 'Nutrición completada. ' + herramientas.length + ' nuevas herramientas.';
  },
  async _buscarHerramientas(tecnica) {
    // Buscar en repositorios según la técnica exitosa
    const repos = {
      'fuerza_bruta_pin': 'https://api.github.com/search/repositories?q=topic:sim-pin-bypass',
      'inyeccion_apn': 'https://api.github.com/search/repositories?q=topic:apn-injection',
      'comando_at': 'https://api.github.com/search/repositories?q=topic:at-command-modem',
      'envenenamiento_dns': 'https://api.github.com/search/repositories?q=topic:dns-spoofing',
      'tunel_inverso': 'https://api.github.com/search/repositories?q=topic:reverse-tunnel'
    };
    try {
      const resp = await fetch(repos[tecnica] || repos['tunel_inverso']);
      const data = await resp.json();
      return (data.items || []).slice(0, 3).map(item => ({
        nombre: item.name,
        codigo: '// Código de ' + item.full_name
      }));
    } catch (e) { return []; }
  }
};
