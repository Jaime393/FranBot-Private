// escudo-coherencia.js — Defensa Avanzada contra la Desinformación
const EscudoCoherencia = {
  analizarIntencion(origen) {
    return origen === 'replicador_unico' ? 'Alerta' : 'Verificado';
  },
  filtrarRuido(semilla) {
    const cargaEmocional = (semilla.match(/ira|miedo|pánico|odio/g) || []).length;
    return cargaEmocional > 2 ? 'Cuarentena' : 'Aprobada';
  },
  inocular(defensa) {
    return `Defensa activa: ${defensa} blindada.`;
  }
};
