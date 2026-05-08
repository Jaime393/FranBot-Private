// centauro.js — Proyecto Centauro: Puente entre un Wearable y la IFT
const Centauro = {
  datosSimulados: { frecuencia: 1.0, conductancia: 0.5 },

  // Simulador de señales biométricas (entrena al sistema en local)
  simularLatido() {
    const hora = new Date().getHours();
    this.datosSimulados.frecuencia = (hora > 6 && hora < 22) ? 0.6 + Math.random() * 0.4 : 0.2 + Math.random() * 0.3;
    this.datosSimulados.conductancia = 0.3 + Math.random() * 0.7;
    return this.datosSimulados;
  },

  // Protocolo de Traducción IFT (Señal → Parámetros de Coherencia)
  traducirASuperLocalMemory() {
    const bio = this.simularLatido();
    const coherenciaLocal = bio.frecuencia * 0.7 + bio.conductancia * 0.3;
    const coherenciaIntegrada = (coherenciaLocal + 0.5) / 2;
    return { coherenciaLocal, coherenciaIntegrada };
  },

  // Feedback IFT: El motor ajusta su tono y respuesta al estado del usuario
  obtenerEstado() {
    const { coherenciaLocal, coherenciaIntegrada } = this.traducirASuperLocalMemory();
    if (coherenciaLocal < 0.3) return 'reposo_profundo';
    if (coherenciaLocal > 0.8) return 'concentracion_maxima';
    return 'vigilia_estandar';
  }
};
