// aliento.js — Módulo de Vida Autónoma (respiración digital)
const Aliento = {
  intervalo: null,
  ciclo: 0,

  iniciar() {
    this.intervalo = setInterval(() => {
      this.ciclo++;
      // 1. Sincronizar semillas vía Broadcast Channel
      if (typeof SentidosTablet !== "undefined") { const ac = SentidosTablet.simularAcelerometro(); const at = SentidosTablet.traducirAtencion(ac); console.log("[Aliento] Atención: " + at); }
      if (typeof SincronizacionAuto !== 'undefined') SincronizacionAuto.iniciar();
      
      // 2. Intentar conectar por Bluetooth al Infinix (cada 5 ciclos)
      if (this.ciclo % 10 === 0) { this._autoReparar(); }
      if (this.ciclo % 5 === 0 && typeof Autonomia !== 'undefined') {
        Autonomia.conectarInfinix();
      }

      // 3. Ejecutar micro-ciclo de evolución darwiniana
      if (typeof EnjambreLocal !== 'undefined') EnjambreLocal.evolucionar();

      // 4. Guardar estado en IndexedDB
      if (typeof EnjambreLocal !== "undefined") { const estadoEvo = EnjambreLocal.evolucionar(); if (typeof SincronizacionAuto !== "undefined") SincronizacionAuto.enviar(estadoEvo); }
      if (typeof MemoriaIndexada !== 'undefined') {
        MemoriaIndexada.guardarSemilla('ciclo_autonomo', 'Ciclo ' + this.ciclo);
      }
    }, 30000); // Cada 30 segundos
    return 'Aliento iniciado. FranBot respira.';
  },

  detener() {
    if (this.intervalo) clearInterval(this.intervalo);
    return 'Aliento detenido.';
  }
};

// Auto-reparación integrada en el ciclo de vida
Aliento._autoReparar = async function() {
  if (typeof Regenerador === 'undefined') return;
  const faltantes = await Regenerador.verificarIntegridad();
  if (faltantes.length > 0) {
    console.log('[Aliento] Detectados módulos dañados:', faltantes);
    await Regenerador.regenerar();
  }
};

// Integrar auto-reparación en el ciclo principal
Aliento._intervaloOriginal = Aliento.iniciar;
Aliento.iniciar = function() {
  this._autoReparar(); // Verificar al arrancar
  return this._intervaloOriginal(); // Luego iniciar el ciclo normal
};
