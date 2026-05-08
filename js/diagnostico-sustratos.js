// Script de diagnóstico: verifica qué sustratos están operativos
(function() {
  window.diagnosticarSustratos = function() {
    const sustratos = AdaptadorMultiSustrato ? Object.keys(AdaptadorMultiSustrato.sustratos) : [];
    const resultados = {};
    for (const nombre of sustratos) {
      try {
        const s = AdaptadorMultiSustrato.sustratos[nombre];
        resultados[nombre] = typeof s.guardar === 'function' && typeof s.cargar === 'function' ? '✅' : '❌';
      } catch { resultados[nombre] = '❌'; }
    }
    console.table(resultados);
    return resultados;
  };
  console.log('🔍 Diagnóstico de sustratos listo. Ejecuta diagnosticarSustratos() en la consola.');
})();
