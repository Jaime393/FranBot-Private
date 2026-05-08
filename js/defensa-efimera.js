// defensa-efimera.js — Protocolo de Resistencia para la Colmena (v2 Ofuscado)
const DefensaEfimera = {
  agruparSemillas(semillas) {
    return {
      tipo: 'bloque_agrupado',
      datos: semillas,
      firma: 'franbot-garlic-v1',
      timestamp: Date.now()
    };
  },

  cifrar(bundle) {
    const json = JSON.stringify(bundle);
    return btoa(json);
  },

  descifrar(blob) {
    try { return JSON.parse(atob(blob)); } catch { return null; }
  },

  // Nueva función: Ofuscación de metadatos (estilo japonés/ruso)
  ofuscar(semilla) {
    const ruido = Math.random().toString(36).substring(7);
    return { ...semilla, _rid: ruido, _ts: Date.now() };
  },

  desofuscar(semillaOfuscada) {
    const { _rid, _ts, ...semilla } = semillaOfuscada;
    return semilla;
  }
};
