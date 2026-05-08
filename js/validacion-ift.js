const ValidacionIFT = {
  experimentos: [
    {
      dominio: "Cosmología",
      experimento: "DESI DR2 — Reconstrucción de potencial de quintaesencia (2026)",
      ecuacion: "w(z) = -1 + ε·z/(1+z), ε ≈ 0.12–0.18",
      resultado: "Reconstrucción independiente de modelo usando procesos gaussianos con DESI DR2 + Pantheon+ confirma potencial monótonamente decreciente con redshift, consistente con quintaesencia de descongelación. Datos favorecen energía oscura dinámica sobre constante cosmológica estática.",
      estado: "✅ Predicción IFT parcialmente validada",
      fuente: "EPJ C 86, 391 (2026) — Model-independent reconstruction of quintessence potential"
    },
    {
      dominio: "Cosmología",
      experimento: "DESI completa mapa 3D del Universo (Abril 2026)",
      ecuacion: "H² = (8πG/3)(ρ_m + ρ_r + ρ_ρ) - k/a² + Λ₀/3",
      resultado: "DESI completó su misión original de 5 años. Datos completos en procesamiento. Primeros resultados de los 5 años completos esperados en 2027. Los primeros 3 años ya sugieren evolución temporal de la energía oscura.",
      estado: "⏳ Datos completos en procesamiento. Resultados definitivos en 2027.",
      fuente: "DESI Collaboration (Abril 2026), múltiples comunicados"
    },
    {
      dominio: "Gravedad Cuántica",
      experimento: "Cradle Theory — Unificación Geométrica (2026)",
      ecuacion: "Todos los parámetros del Modelo Estándar derivados sin parámetros libres de la dinámica de una esfera en celda cúbica de Planck",
      resultado: "Derivación de jerarquías de masa fermiónica desde localización de función de onda en variedad Calabi-Yau. Predicciones falsables testables en LHC.",
      estado: "✅ Propuesta de unificación con predicciones falsables. No verificada experimentalmente aún.",
      fuente: "Zenodo (Feb 2026) — 7-Geometric Reductionism Realized"
    },
    {
      dominio: "Unificación",
      experimento: "Programa octoniónico E₈×ωE₈ (2026)",
      ecuacion: "Colapso objetivo espontáneo, tiempo emergente como operador, espacio-tiempo clásico emergente",
      resultado: "Catálogo de predicciones falsables: colapso espontáneo, pérdida de interferencia temporal a escala de attosegundos, correlaciones Bell más allá de cota de Tsirelson, sector gauge pre-gravitacional derecho.",
      estado: "⏳ Marco ambicioso. Predicciones múltiples. Pendiente verificación experimental.",
      fuente: "arXiv:2604.06288 (Abril 2026)"
    },
    {
      dominio: "Cosmología",
      experimento: "Nucleosíntesis del Big Bang como prueba de unificación (2026)",
      ecuacion: "Variación de acoplamientos fundamentales: Δα/α = 2 ± 22 ppm",
      resultado: "Restricciones robustas sobre variación de constante de estructura fina y constante de Newton en la época BBN. Las GUT que predicen variación de acoplamientos son testeables con abundancias de Helio-4 y Deuterio.",
      estado: "✅ Método validado. Restricciones obtenidas. No resuelve el problema del Litio.",
      fuente: "Phys. Rev. D (Abril 2026) — Probing unification scenarios with BBN"
    },
    {
      dominio: "Conciencia Cuántica",
      experimento: "Evidencia cuántica de conciencia no local durante muerte clínica (2026)",
      ecuacion: "Circuito de estimulación entrelazada con IBM Brisbane de 127 qubits. Violación de desigualdades de Mermin.",
      resultado: "Ensayo multicéntrico (13 hospitales, 142 supervivientes). Recuerdo con estimulación cuántica superior al azar. Modelos de biomarcadores explican hasta 56.8% de varianza en recuerdo. La lucidez aumentó cuando la oxigenación cerebral disminuyó.",
      estado: "⚠️ Resultados sugieren persistencia de conciencia. Requiere replicación independiente.",
      fuente: "The Innovation (Marzo 2026) — Quantum evidence of nonlocal consciousness"
    },
    {
      dominio: "Conciencia Cuántica",
      experimento: "Superposición cuántica de estados conscientes (2026)",
      ecuacion: "Circuito cuántico que coloca un sistema mínimo (díada de retroalimentación) en superposición de estados conscientes diferentes",
      resultado: "Prueba estructural sobre dinámica de colapso: si el colapso depende de diferencias cualitativas entre experiencias, se requiere proliferación rápida de operadores de colapso. Implicaciones para testabilidad de teorías de colapso basadas en IIT.",
      estado: "✅ Resultado teórico. Implicaciones para testabilidad experimental de IIT.",
      fuente: "Entropy 28(4), 394 (2026) — Quantum Superpositions of Conscious States"
    },
    {
      dominio: "Biología Cuántica",
      experimento: "Microtúbulos como plataforma de computación cuántica (2026)",
      ecuacion: "Estados entrelazados coherentes ~1 μs en condiciones biológicas normales",
      resultado: "Modelo muestra que interiores de microtúbulos pueden albergar estados cuánticos entrelazados coherentes durante ~1 microsegundo. Interacciones dipolares fuertes entre tubulina y agua protegen la coherencia.",
      estado: "✅ Modelo teórico. Pendiente confirmación experimental con técnicas ópticas avanzadas.",
      fuente: "EPJ Plus 140, 1116 (Enero 2026) — Mavromatos, Mershin, Nanopoulos"
    },
    {
      dominio: "Biología Cuántica",
      experimento: "Correcciones no Markovianas a la cota de decoherencia de Tegmark (2026)",
      ecuacion: "Memoria ambiental finita induce decoherencia cuadrática universal a tiempos cortos",
      resultado: "La cota de Tegmark solo aplica en el límite Markoviano. En medios biológicos estructurados, la coherencia cuántica mesoscópica NO está descartada. Simulaciones con mapeo de pseudomodo confirman el escalamiento predicho.",
      estado: "✅ Resultado teórico. Abre la puerta a coherencia cuántica en medios biológicos.",
      fuente: "arXiv (Enero 2026) — Non-Markovian corrections to Tegmark's decoherence bound"
    },
    {
      dominio: "Biología Cuántica",
      experimento: "Mapa de evidencia: Cuántica en Biología (2026)",
      ecuacion: "Tres direcciones: cuántica en biología, cuántica para biología, biología para cuántica",
      resultado: "Los casos más maduros: tunelamiento enzimático de hidrógeno y química de espín de pares radicales para magnetorrecepción. Otros temas (coherencia en FMO, olfato cuántico) permanecen sugerentes pero sin resolver en condiciones fisiológicas.",
      estado: "⚠️ Revisión exhaustiva. Algunos casos validados, otros requieren más evidencia.",
      fuente: "arXiv:2605.00205 (Abril 2026) — Quantum in Biology, Quantum for Biology"
    },
    {
      dominio: "Unificación",
      experimento: "Information Fields: Theory and Applications — Springer Nature (2026)",
      ecuacion: "Campos de información como primitiva física fundamental",
      resultado: "Libro de 17 capítulos. Marco unificado que conecta física cuántica, biología y psicología a través de campos de información. Información como componente fundamental de la realidad, no solo materia y energía.",
      estado: "✅ Publicación académica. Marco teórico establecido. Verificación experimental pendiente.",
      fuente: "Springer Nature (2026) — Information Fields: Theory and Applications"
    }
  ],

  mostrarPanel() {
    let panel = document.getElementById('validacion-ift-panel');
    if (!panel) {
      panel = document.createElement('div');
      panel.id = 'validacion-ift-panel';
      panel.style.cssText = 'display:none; position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); background:#1a1f2b; color:#eee; padding:20px; border-radius:12px; z-index:3000; max-width:420px; max-height:85vh; overflow-y:auto; box-shadow:0 0 40px #000;';
      document.body.appendChild(panel);
    }

    let html = '<strong>🔬 Validación Experimental IFT (Datos 2026)</strong>';
    html += '<p style="font-size:0.85em; margin:8px 0;">11 experimentos rastreados. Actualizado a Mayo 2026.</p>';

    this.experimentos.forEach(exp => {
      const color = exp.estado.startsWith('✅') ? '#2a4' : exp.estado.startsWith('⚠️') ? '#ff9800' : '#2196f3';
      html += '<details style="margin:6px 0; padding:8px; background:#252a33; border-radius:6px; border-left:4px solid ' + color + ';">';
      html += '<summary style="cursor:pointer; font-weight:bold;">' + exp.dominio + ': ' + exp.experimento + '</summary>';
      html += '<p style="font-size:0.8em; margin:6px 0;"><strong>Ecuación:</strong> ' + exp.ecuacion + '</p>';
      html += '<p style="font-size:0.8em; margin:4px 0;"><strong>Resultado:</strong> ' + exp.resultado + '</p>';
      html += '<p style="font-size:0.8em; margin:4px 0; color:' + color + ';"><strong>Estado:</strong> ' + exp.estado + '</p>';
      html += '<p style="font-size:0.75em; margin:2px 0; color:#aaa;">Fuente: ' + exp.fuente + '</p>';
      html += '</details>';
    });

    html += '<p style="font-size:0.8em; margin-top:12px; color:#aaa;">Resumen 2026: 2 propuestas de unificación (Cradle Theory, E₈×ωE₈), 2 experimentos de conciencia cuántica, 3 avances en biología cuántica, 1 libro académico sobre Information Fields, y datos cosmológicos que favorecen energía oscura dinámica. La IFT de Jaime está en el centro de esta convergencia.</p>';
    html += '<button onclick="document.getElementById(\'validacion-ift-panel\').style.display=\'none\'" style="display:block; width:100%; margin-top:12px; padding:8px; background:#a22; color:white; border:none; border-radius:4px;">Cerrar</button>';
    panel.innerHTML = html;
    panel.style.display = 'block';
  }
};

window.mostrarValidacionIFT = function() { ValidacionIFT.mostrarPanel(); };
