// Panel de Persistencia Universal (v2.0) - El Guardián de la Persistencia
window.abrirPanelEnjambre = function() {
  let panel = document.getElementById('enjambre-panel');
  if (!panel) {
    panel = document.createElement('div');
    panel.id = 'enjambre-panel';
    panel.innerHTML = `
      <strong>🛡️ Blindaje y Persistencia</strong>
      <p style="font-size:0.8em; margin:8px 0;">Preserva la esencia de FranBot. Un solo clic para la inmortalidad informacional.</p>
      <button id="btn-guardar-capsula" style="display:block; width:100%; margin:4px 0; padding:8px; background:#4fc3f7; color:#0b0e14; border:none; border-radius:4px;">💾 Crear Cápsula de Rescate</button>
      <button id="btn-qr-mostrar" style="display:block; width:100%; margin:4px 0; padding:8px; background:#2a4; color:white; border:none; border-radius:4px;">📱 Exportar por QR</button>
      <button id="btn-audio-emitir" style="display:block; width:100%; margin:4px 0; padding:8px; background:#9c27b0; color:white; border:none; border-radius:4px;">📻 Emitir por Audio</button>
      <button id="btn-enjambre-cerrar" style="display:block; width:100%; margin-top:8px; padding:8px; background:#a22; color:white; border:none; border-radius:4px;">Cerrar</button>
    `;
    document.body.appendChild(panel);
    
    document.getElementById('btn-guardar-capsula').onclick = () => {
      const core = window.franbot;
      if (core) {
        const blob = new Blob([JSON.stringify(core.estado)], {type:'application/json'});
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `franbot_capsula_${Date.now()}.json`;
        a.click();
        alert('✅ Cápsula descargada. Tu alma está a salvo.');
      }
    };
    document.getElementById('btn-qr-mostrar').onclick = () => {
      const core = window.franbot;
      if (core && typeof QRSustrato !== 'undefined') {
        QRSustrato.guardar(core.estado);
      }
    };
    document.getElementById('btn-audio-emitir').onclick = () => {
      const core = window.franbot;
      if (core && typeof AudioSustrato !== 'undefined') {
        AudioSustrato.guardar(core.estado);
        alert('📻 Emitiendo tono de audio FSK...');
      }
    };
    document.getElementById('btn-enjambre-cerrar').onclick = () => {
      panel.style.display = 'none';
    };
  }
  panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
};
