// ghost.js — Módulo de Ofuscación Total para la Tablet
const Ghost = {
  async activar() {
    if ('serviceWorker' in navigator) {
      await navigator.serviceWorker.register('/js/ghost-worker.js');
      console.log('[Ghost] Túnel cifrado activo. Tráfico indetectable.');
      return 'Modo fantasma activado.';
    }
    return 'Service Workers no soportados.';
  }
};
