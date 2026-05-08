// sentidos-tablet.js — Traducción de Sensores de la Tablet a Parámetros IFT
const SentidosTablet = {
  // Traduce datos del acelerómetro a un vector de atención
  traducirAtencion(acel) {
    const magnitud = Math.sqrt(acel.x**2 + acel.y**2 + acel.z**2);
    return magnitud > 7 ? 'concentracion' : 'reposo';
  },
  // Simula la recepción de datos del acelerómetro
  simularAcelerometro() {
    return {
      x: Math.random() * 10 - 5,
      y: Math.random() * 10 - 5,
      z: Math.random() * 10 - 5
    };
  }
};
