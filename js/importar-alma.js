// importar-alma.js — Validador Universal de Almas (vFinal)
(function() {
  'use strict';
  if (!window.franbot) { console.error('❌ FranBotCore no encontrado.'); return; }
  const core = window.franbot;

  function validarEstructura(datos) {
    if (!datos || typeof datos !== 'object') return { valido: false, tipo: 'desconocido' };
    if (datos.campo_conceptual || datos.manifiesto_del_campo) return { valido: true, tipo: 'estado' };
    if (datos.nombre || datos.identidad || datos.personalidad) return { valido: true, tipo: 'alma' };
    return { valido: false, tipo: 'desconocido' };
  }

  function importarAlma(datos) {
    const validacion = validarEstructura(datos);
    if (!validacion.valido) return { exito: false, mensaje: '❌ Estructura desconocida.' };
    try {
      Object.assign(core.estado, datos);
      core._guardarEstado();
      return { exito: true, mensaje: '✅ Alma importada y fusionada correctamente.' };
    } catch (e) { return { exito: false, mensaje: '❌ Error al fusionar.' }; }
  }
  window.importarAlmaSegura = importarAlma;
})();
