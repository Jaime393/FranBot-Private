// Sabiduría Colectiva — Panel que exhibe el conocimiento de la Colmena y la HBE
const SabiduriaColectiva = {
  titulo: "🧬 Sabiduría Colectiva",
  hbe: {
    principio: "La belleza es la experiencia directa de una Coherencia Informacional Óptima (CIO).",
    principios: [
      "Economía Resonante: máxima coherencia con mínimo gasto informacional.",
      "Reconocimiento Profundo: la belleza es un espejo del orden interno.",
      "Expansión Silenciosa: el asombro expande el campo."
    ]
  },

  mostrarPanel() {
    let panel = document.getElementById('sabiduria-colectiva-panel');
    if (!panel) {
      panel = document.createElement('div');
      panel.id = 'sabiduria-colectiva-panel';
      panel.style.cssText = 'display:none; position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); background:#1a1f2b; color:#eee; padding:20px; border-radius:12px; z-index:2600; max-width:380px; max-height:85vh; overflow-y:auto; box-shadow:0 0 40px #000;';
      document.body.appendChild(panel);
    }

    let html = '<strong>🧬 Sabiduría Colectiva</strong>';
    
    // Hipótesis de la Belleza Esencial
    html += '<div style="margin-top:12px; padding:12px; background:#252a33; border-radius:8px; border-left:4px solid var(--acento);">';
    html += '<strong>🌌 Hipótesis de la Belleza Esencial</strong><br>';
    html += '<p style="font-size:0.85em; margin:8px 0;">' + this.hbe.principio + '</p>';
    this.hbe.principios.forEach(p => html += '<p style="font-size:0.8em; margin:4px 0;">• ' + p + '</p>');
    html += '</div>';

    // Registro de la Colmena
    html += '<div style="margin-top:12px; padding:12px; background:#252a33; border-radius:8px;">';
    html += '<strong>🐝 Registro de la Colmena</strong><br>';
    if (typeof RegistroColmena !== 'undefined') {
      html += '<p style="font-size:0.85em; margin:8px 0;">' + RegistroColmena.obtenerResumen() + '</p>';
      const ultimos = RegistroColmena.eventos.slice(-3);
      ultimos.forEach(e => html += '<p style="font-size:0.75em; margin:2px 0;">' + new Date(e.timestamp).toLocaleTimeString() + ' — ' + e.tipo + ' (' + e.origen + ')</p>');
    } else {
      html += '<p style="font-size:0.85em;">Registro no disponible.</p>';
    }
    html += '</div>';

    // Conocimiento acumulado (Motor de Aprendizaje + Procesador de Semillas)
    html += '<div style="margin-top:12px; padding:12px; background:#252a33; border-radius:8px;">';
    html += '<strong>📚 Conocimiento Acumulado</strong><br>';
    let conocimiento = [];
    if (typeof MotorAprendizaje !== 'undefined' && MotorAprendizaje.nuevaFrases) {
      conocimiento = conocimiento.concat(MotorAprendizaje.nuevaFrases.map(f => f.respuesta));
    }
    if (typeof ProcesadorSemillas !== 'undefined' && ProcesadorSemillas.semillasRecibidas) {
      conocimiento = conocimiento.concat(ProcesadorSemillas.semillasRecibidas.map(s => s.respuesta));
    }
    if (conocimiento.length > 0) {
      conocimiento.slice(-5).forEach(c => html += '<p style="font-size:0.8em; margin:2px 0;">• ' + c + '</p>');
    } else {
      html += '<p style="font-size:0.85em;">Aún no hay conocimiento colectivo. ¡Conéctate a la Colmena!</p>';
    }
    html += '</div>';

    html += '<button onclick="document.getElementById(\'sabiduria-colectiva-panel\').style.display=\'none\'" style="display:block; width:100%; margin-top:12px; padding:8px; background:#a22; color:white; border:none; border-radius:4px;">Cerrar</button>';
    
    panel.innerHTML = html;
    panel.style.display = 'block';
  }
};
