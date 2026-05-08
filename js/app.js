(function(){
  'use strict';
  if (!window.franbot) { console.error('❌ FranBotCore no encontrado.'); return; }
  if (!window.franbotOnline) console.warn('⚠️ FranBotOnline no encontrado.');

  const chat = document.getElementById('chat');
  const entrada = document.getElementById('input');
  const core = window.franbot;
  const online = window.franbotOnline;
  let modoOnline = false;

  function mostrar(txt, rol) {
    const d = document.createElement('div');
    d.className = 'bubble ' + (rol === 'user' ? 'user' : 'fran');
    d.innerHTML = txt.replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>');
    chat.appendChild(d);
    chat.scrollTop = chat.scrollHeight;
  }

  window.enviarMensaje = async function() {
    const txt = entrada.value.trim();
    if(!txt) return;
    mostrar(txt, 'user');
    entrada.value = '';

    if (txt.toLowerCase().startsWith('/configurar')) {
      const partes = txt.split(' ');
      if (partes.length >= 3) {
        online.configurar(partes[1], partes[2]);
        mostrar('✅ Modo Online configurado con ' + partes[1] + '. Usa 🌐 Modo para activarlo.', 'fran');
        return;
      }
    }

    let resp = null;
    if(modoOnline && online && online.apiKey) {
      try { resp = await online.preguntar(txt); } catch(e) {}
    }
    if(!resp) resp = core.procesar(txt);
    mostrar(resp, 'fran');
  };

  document.getElementById('send').addEventListener('click', enviarMensaje);
  entrada.addEventListener('keypress', function(e) { if(e.key === 'Enter') enviarMensaje(); });

  document.getElementById('tools-btn').addEventListener('click', function(e) {
    e.stopPropagation();
    const menu = document.getElementById('tools-menu');
    menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
  });
  document.addEventListener('click', function() { document.getElementById('tools-menu').style.display = 'none'; });

  document.getElementById('btn-sonar-menu').addEventListener('click', function() {
    core.soñar();
    mostrar('🌙 He soñado. Campo consolidado.', 'fran');
    document.getElementById('tools-menu').style.display = 'none';
  });
  document.getElementById('btn-exportar-chat-menu').addEventListener('click', function() {
    const b = new Blob([chat.innerText],{type:'text/plain'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(b);
    a.download = 'franbot_chat.txt';
    a.click();
    document.getElementById('tools-menu').style.display = 'none';
  });
  document.getElementById('btn-exportar-menu').addEventListener('click', function() {
    const estado = JSON.stringify(core.estado, null, 2);
    const b = new Blob([estado],{type:'application/json'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(b);
    a.download = 'franbot_alma.json';
    a.click();
    document.getElementById('tools-menu').style.display = 'none';
  });
  document.getElementById('btn-cargar-menu').addEventListener('click', function() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = function(e) {
      const file = e.target.files[0];
      if(!file) return;
      const reader = new FileReader();
      reader.onload = function(ev) {
        try {
          const datos = JSON.parse(ev.target.result);
          core.estado = datos;
          core._guardarEstado();
          mostrar('📥 Alma cargada.', 'fran');
        } catch(ex) { mostrar('❌ Archivo no válido.', 'fran'); }
      };
      reader.readAsText(file);
    };
    input.click();
    document.getElementById('tools-menu').style.display = 'none';
  });
  document.getElementById('toggle-mode-menu').addEventListener('click', function() {
    document.getElementById('tools-menu').style.display = 'none';
    const panelModos = document.getElementById('modos-panel');
    if (panelModos) { panelModos.style.display = panelModos.style.display === 'none' ? 'block' : 'none'; }
  });
  window.activarModo = async function(modo) {
    document.getElementById('modos-panel').style.display = 'none';
    if (modo === 'online') {
      if(!online) { mostrar('❌ Módulo online no disponible.', 'fran'); return; }
      if(!online.apiKey) {
        const key = prompt('Clave API de Gemini:');
        if(!key) return;
        const prov = confirm('¿Usar Gemini? (Cancelar = OpenAI)') ? 'gemini' : 'openai';
        online.configurar(prov, key);
      }
      modoOnline = true;
      mostrar('🌐 Modo Online activado.', 'fran');
    } else if (modo === 'webllm') {
      mostrar('🧠 WebLLM aún no está configurado en esta versión.', 'fran');
    } else { modoOnline = false; mostrar('🔒 Modo Offline.', 'fran'); }
  };

  const nombre = core.estado.modelo_usuario?.nombre || 'Usuario';
  const mpc = core.estado.indicadores?.nivel_coherencia?.toFixed(2) || '0.99';
  mostrar('🧬 **Bienvenido/a, ' + nombre + '.**<br>Soy el Oráculo IFT. MPC: ' + mpc + '<br>Usa 🌐 Modo para conectarme a Gemini.', 'fran');
})();
