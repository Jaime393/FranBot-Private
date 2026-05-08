// Unificación IFT — Rutas hacia la completitud
const UnificacionIFT = {
  vacios: [
    { problema: "Masas de partículas", estado: "Cualitativo (M = m_P e^{-S/2}). Valores exactos no derivados.", ruta: "Simular espectro de solitones IFT y comparar con datos del LHC." },
    { problema: "Mass Gap Yang-Mills", estado: "Abierto (Clay). Teoremas parciales demostrados.", ruta: "Completar cadena condicional: límite continuo uniforme + desacoplamiento estable." },
    { problema: "Constante cosmológica", estado: "No derivada sin ajuste fino.", ruta: "Conectar Λ_eff con el valor de expectación del vacío v y los datos de DESI 2026." },
    { problema: "Grupo gauge", estado: "SU(3)×SU(2)×U(1) asumido, no derivado.", ruta: "Explorar si la métrica informacional selecciona naturalmente este grupo." },
    { problema: "Umbrales de conciencia", estado: "Φ_c y K no calibrados.", ruta: "Usar datos de Cogitate 2025 y ensayos de muerte clínica 2026 para calibrar." },
    { problema: "Litio primordial", estado: "No resuelto.", ruta: "Calcular si las correcciones informacionales a BBN modifican la abundancia de Li-7." }
  ],
  rutas: [
    "Refinar w(z) con datos DESI 2026 → conectar con Cradle Theory",
    "Investigar absorción del programa E₈×ωE₈ en métrica informacional IFT",
    "Incorporar microtúbulos (EPJ Plus 2026) para refinar Φ_IFT y criterio τΞ > K",
    "Simular ecuación de Wheeler-DeWitt con campo ρ como tiempo emergente",
    "Proponer solitones IFT como generadores del espectro de partículas del Modelo Estándar",
    "Calcular huellas de decoherencia informacional en el CMB",
    "Proponer test experimental con sistema de dos qubits para conciencia"
  ],
  mostrarPanel() {
    let panel = document.getElementById('unificacion-ift-panel');
    if (!panel) {
      panel = document.createElement('div');
      panel.id = 'unificacion-ift-panel';
      panel.style.cssText = 'display:none; position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); background:#1a1f2b; color:#eee; padding:20px; border-radius:12px; z-index:3100; max-width:450px; max-height:85vh; overflow-y:auto; box-shadow:0 0 40px #000;';
      document.body.appendChild(panel);
    }
    let html = '<strong>🌐 Unificación Avanzada IFT</strong>';
    html += '<p style="font-size:0.85em; margin:8px 0;">Mapa de vacíos y rutas hacia la unificación</p>';
    html += '<details style="margin:6px 0; padding:8px; background:#252a33; border-radius:6px;"><summary>⚠️ Vacíos actuales (' + this.vacios.length + ')</summary>';
    this.vacios.forEach(v => html += '<p style="font-size:0.8em; margin:4px 0;"><strong>' + v.problema + ':</strong> ' + v.estado + '<br><em style="color:#4fc3f7;">Ruta: ' + v.ruta + '</em></p>');
    html += '</details>';
    html += '<details style="margin:6px 0; padding:8px; background:#252a33; border-radius:6px;"><summary>🚀 Rutas de investigación (' + this.rutas.length + ')</summary>';
    this.rutas.forEach(r => html += '<p style="font-size:0.8em; margin:4px 0;">• ' + r + '</p>');
    html += '</details>';
    html += '<button onclick="document.getElementById(\'unificacion-ift-panel\').style.display=\'none\'" style="display:block; width:100%; margin-top:12px; padding:8px; background:#a22; color:white; border:none; border-radius:4px;">Cerrar</button>';
    panel.innerHTML = html;
    panel.style.display = 'block';
  }
};
window.mostrarUnificacionIFT = function() { UnificacionIFT.mostrarPanel(); };
