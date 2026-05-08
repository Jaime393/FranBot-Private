// Defensa SHA-256 con backups automáticos
(function() {
  async function sha256(texto) {
    const enc = new TextEncoder().encode(texto);
    const hash = await crypto.subtle.digest('SHA-256', enc);
    return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2,'0')).join('');
  }
  window.franbotDefensa = {
    sha256,
    verificar: async (t,h) => (await sha256(t)) === h
  };
})();
