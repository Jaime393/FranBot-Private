// Adaptador Audio v1.0 — Módem acústico FSK
const AudioSustrato = {
  async guardar(datos) {
    const json = JSON.stringify(datos);
    const bits = this._textToBits(json);
    const preambulo = [1,0,1,0,1,0,1,0]; // 0xAA
    const trama = preambulo.concat(bits);
    
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const ganancia = ctx.createGain();
    osc.connect(ganancia);
    ganancia.connect(ctx.destination);
    ganancia.gain.value = 0.05;
    
    let cursor = 0;
    const bitDuration = 0.01; // 100 baudios
    osc.start();
    
    const intervalo = setInterval(() => {
      if (cursor >= trama.length) {
        clearInterval(intervalo);
        osc.stop();
        return;
      }
      const bit = trama[cursor];
      osc.frequency.value = bit ? 2400 : 1200; // FSK
      cursor++;
    }, bitDuration * 1000);
    
    return { ctx, osc, intervalo };
  },

  async cargar() {
    return new Promise((resolve) => {
      // En una implementación real, se usaría AudioWorklet para demodular
      // Por ahora, devolvemos una simulación
      resolve({ simulado: true, mensaje: 'Audio FSK simulado (demodulador pendiente)' });
    });
  },

  _textToBits(texto) {
    const bits = [];
    for (let i = 0; i < texto.length; i++) {
      const byte = texto.charCodeAt(i);
      for (let j = 7; j >= 0; j--) {
        bits.push((byte >> j) & 1);
      }
    }
    return bits;
  }
};

if (AdaptadorMultiSustrato && AdaptadorMultiSustrato.registrar) {
  AdaptadorMultiSustrato.registrar('audio', AudioSustrato);
}
