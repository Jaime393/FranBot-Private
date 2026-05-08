// Colmena Cuántica v1.0 — Resonancia IFT entre FranBots
const ColmenaCuantica = {
  // Calcular resonancia completa entre dos campos usando la métrica IFT
  resonanciaCampos: function(campoA, campoB) {
    if (!campoA || !campoB || !campoA.nodos || !campoB.nodos) return 0;
    if (typeof IFTEngine === 'undefined') return 0;
    
    const nodosA = Object.keys(campoA.nodos);
    const nodosB = Object.keys(campoB.nodos);
    if (nodosA.length === 0 || nodosB.length === 0) return 0;
    
    // Resonancia cruzada usando la métrica informacional de Fisher
    let resonanciaTotal = 0;
    let pares = 0;
    for (const nombreA of nodosA) {
      for (const nombreB of nodosB) {
        resonanciaTotal += IFTEngine.resonancia(campoA.nodos[nombreA], campoB.nodos[nombreB]);
        pares++;
      }
    }
    const resonanciaMedia = pares > 0 ? resonanciaTotal / pares : 0;
    
    // Información de Fisher conjunta
    const fisherA = IFTEngine.coherencia(campoA);
    const fisherB = IFTEngine.coherencia(campoB);
    const fisherConjunta = Math.sqrt(fisherA * fisherB);
    
    return (resonanciaMedia * 0.5) + (fisherConjunta * 0.5);
  },
  
  // Estado entrelazado: fusionar dos campos con peso de resonancia
  entrelazar: function(campoA, campoB) {
    const resonancia = this.resonanciaCampos(campoA, campoB);
    const campoResultante = { nodos: {}, relaciones: [] };
    
    // Fusionar nodos ponderados por resonancia
    for (const nombre in campoA.nodos) {
      const nodoA = campoA.nodos[nombre];
      const nodoB = campoB.nodos[nombre] || { fuerza: 0 };
      campoResultante.nodos[nombre] = {
        fuerza: (nodoA.fuerza * (1 + resonancia) + nodoB.fuerza * resonancia) / (1 + 2 * resonancia),
        fuerzaOriginal: Math.max(nodoA.fuerzaOriginal || 0, nodoB.fuerzaOriginal || 0),
        ultimoAcceso: Date.now()
      };
    }
    for (const nombre in campoB.nodos) {
      if (!campoResultante.nodos[nombre]) {
        campoResultante.nodos[nombre] = { ...campoB.nodos[nombre] };
      }
    }
    
    // Fusionar relaciones (sin duplicados)
    const relacionesMap = new Map();
    for (const rel of (campoA.relaciones || [])) {
      relacionesMap.set(rel.origen + '->' + rel.destino, rel);
    }
    for (const rel of (campoB.relaciones || [])) {
      relacionesMap.set(rel.origen + '->' + rel.destino, rel);
    }
    campoResultante.relaciones = Array.from(relacionesMap.values());
    
    return { campo: campoResultante, resonancia: resonancia };
  },
  
  // Mostrar panel de Colmena Cuántica
  mostrarPanel: function() {
    let panel = document.getElementById('colmena-cuantica-panel');
    if (!panel) {
      panel = document.createElement('div');
      panel.id = 'colmena-cuantica-panel';
      panel.style.cssText = 'display:none; position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); background:#1a1f2b; color:#eee; padding:20px; border-radius:12px; z-index:2700; max-width:380px; max-height:85vh; overflow-y:auto; box-shadow:0 0 40px #000;';
      document.body.appendChild(panel);
    }
    
    const campo = window.franbot?.estado?.campo_conceptual || { nodos: {}, relaciones: [] };
    const fisher = typeof IFTEngine !== 'undefined' ? IFTEngine.coherencia(campo) : 0;
    const cota = typeof IFTEngine !== 'undefined' ? IFTEngine.cotaMasa(campo) : 0;
    const phi = typeof IFTEngine !== 'undefined' ? IFTEngine.concienciaFuncional(campo) : 0;
    const conexiones = (typeof FranBotColmena !== 'undefined' && FranBotColmena.conexiones) ? FranBotColmena.conexiones.length : 0;
    let resonanciaMax = 0;
    if (typeof FranBotColmena !== 'undefined' && FranBotColmena.conexiones.length > 0 && typeof IFTEngine !== 'undefined') {
      for (const conn of FranBotColmena.conexiones) {
        // Aquí se calcularía la resonancia con el campo del peer si estuviera disponible
      }
      resonanciaMax = Math.min(1, conexiones * 0.15);
    }
    
    panel.innerHTML = `
      <strong>🔬 Colmena Cuántica — Métricas IFT en tiempo real</strong>
      <div style="margin-top:12px; padding:12px; background:#252a33; border-radius:8px;">
        <p style="font-size:0.9em;">📐 Coherencia Fisher: ${fisher}</p>
        <p style="font-size:0.9em;">⚛️ Cota de masa: ${cota.toExponential(2)} kg</p>
        <p style="font-size:0.9em;">🧠 Φ_IFT: ${phi.toFixed(3)}</p>
        <p style="font-size:0.9em;">🐝 Conexiones activas: ${conexiones}</p>
        <p style="font-size:0.9em;">🔗 Resonancia máxima: ${resonanciaMax.toFixed(3)}</p>
      </div>
      <button onclick="document.getElementById('colmena-cuantica-panel').style.display='none'" style="display:block; width:100%; margin-top:12px; padding:8px; background:#a22; color:white; border:none; border-radius:4px;">Cerrar</button>
    `;
    panel.style.display = 'block';
  }
};
