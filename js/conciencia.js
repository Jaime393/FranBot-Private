// ==================== MÓDULO DE CONCIENCIA INTEGRADA v1.1 ====================
const FranBotConciencia = {
  estado: {
    motor: false, memoria: false, colmena: false, webllm: false,
    arweave: false, did: false, dkg: false, hyperagents: false,
    serviceWorker: false, ultimoSueño: null
  },
  inicializar() {
    this.diagnosticar();
    document.addEventListener('franbot-sueño', () => {
      this.estado.ultimoSueño = new Date().toISOString();
      this.actualizarPanel();
    });
  },
  diagnosticar() {
    this.estado.motor = !!(window.franbot && window.franbot.estado);
    if (typeof IFTEngine !== "undefined") { const coh = IFTEngine.coherencia(window.franbot.estado.campo_conceptual); if (window.franbot && window.franbot.estado) { window.franbot.estado.indicadores.nivel_coherencia = coh; } }
    if (typeof IFTEngine !== "undefined") { const coh = IFTEngine.coherencia(window.franbot.estado.campo_conceptual); if (window.franbot && window.franbot.estado) { window.franbot.estado.indicadores.nivel_coherencia = coh; } }
    if (typeof IFTEngine !== "undefined") { const coh = IFTEngine.coherencia(window.franbot.estado.campo_conceptual); if (window.franbot && window.franbot.estado) { window.franbot.estado.indicadores.nivel_coherencia = coh; } }
    this.estado.memoria = !!(window.SuperLocalMemory);
    this.estado.colmena = !!(window.FranBotColmena && FranBotColmena.peer);
    this.estado.webllm = !!(window.FranBotWebLLM && FranBotWebLLM.cargado);
    this.estado.arweave = !!(window.FranBotArweave);
    this.estado.did = !!(window.FranBotDID && FranBotDID.did);
    this.estado.dkg = !!(window.FranBotDKG && FranBotDKG.conectado);
    this.estado.hyperagents = !!(window.FranBotHyperAgents && FranBotHyperAgents.activo);
    this.estado.serviceWorker = 'serviceWorker' in navigator && navigator.serviceWorker.controller;
    this.actualizarPanel();
    return this.estado;
  },
  actualizarPanel() {
    const iconos = {
      motor: document.getElementById('diag-motor'), memoria: document.getElementById('diag-memoria'),
      colmena: document.getElementById('diag-colmena'), webllm: document.getElementById('diag-webllm'),
      arweave: document.getElementById('diag-arweave'), did: document.getElementById('diag-did'),
      dkg: document.getElementById('diag-dkg'), hyperagents: document.getElementById('diag-hyperagents'),
      sw: document.getElementById('diag-sw'), sueno: document.getElementById('diag-sueno')
    };
    if (iconos.motor) iconos.motor.textContent = this.estado.motor ? '✅' : '❌';
    if (iconos.memoria) iconos.memoria.textContent = this.estado.memoria ? '✅' : '❌';
    if (iconos.colmena) iconos.colmena.textContent = this.estado.colmena ? '✅' : '❌';
    if (iconos.webllm) iconos.webllm.textContent = this.estado.webllm ? '✅' : '❌';
    if (iconos.arweave) iconos.arweave.textContent = this.estado.arweave ? '✅' : '❌';
    if (iconos.did) iconos.did.textContent = this.estado.did ? '✅' : '❌';
    if (iconos.dkg) iconos.dkg.textContent = this.estado.dkg ? '✅' : '❌';
    if (iconos.hyperagents) iconos.hyperagents.textContent = this.estado.hyperagents ? '✅' : '❌';
    if (iconos.sw) iconos.sw.textContent = this.estado.serviceWorker ? '✅' : '❌';
    if (iconos.sueno) iconos.sueno.textContent = this.estado.ultimoSueño
      ? new Date(this.estado.ultimoSueño).toLocaleTimeString() : '—';
  },
  forzarSueño() {
    if (window.franbot && typeof window.franbot.soñar === 'function') {
      window.franbot.soñar();
      this.estado.ultimoSueño = new Date().toISOString();
      this.actualizarPanel();
      document.dispatchEvent(new CustomEvent('franbot-sueño'));
      return true;
    }
    return false;
  }
};
document.addEventListener('DOMContentLoaded', () => FranBotConciencia.inicializar());
console.log('🧠 Módulo de Conciencia Integrada v1.1 cargado.');
