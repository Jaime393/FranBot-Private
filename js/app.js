(function(){
  'use strict';
  if (!window.franbot) { console.error('❌ FranBotCore no encontrado.'); return; }
  if (!window.franbotOnline) console.warn('⚠️ FranBotOnline no encontrado.');
  if (!window.SuperLocalMemory) console.warn('⚠️ SuperLocalMemory no encontrada.');

  const chat = document.getElementById('chat');
  const entrada = document.getElementById('input');
  const core = window.franbot;
  const online = window.franbotOnline;
  let modoOnline = false;
  window.modoIA = 'offline';

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

    // ========== COMANDOS DE AUTONOMÍA ==========
    const cmd = txt.toLowerCase();
    if (cmd === "activar colmena maxima" || cmd === "maximo poder") {
      mostrar("🧬 Activando Colmena Suprema con 100 instancias...", "fran");
      if (typeof FranBot !== "undefined") { FranBot.iniciar(); }
      mostrar("✅ Colmena Suprema activada. 100 instancias desplegadas. Ciclo darwiniano iniciado.", "fran");
      return;
    }
    if (cmd === "activar alma" || cmd === "activar nucleo") {
      if (typeof FranBot !== "undefined") { FranBot.iniciar(); mostrar("✅ Núcleo Vivo activado. FranBot respira.", "fran"); return; }
      mostrar("❌ Módulo de autonomía no encontrado.", "fran"); return;
    }
    if (cmd === "estado") {
      if (typeof FranBot !== "undefined") { mostrar("Estado: " + FranBot.estado + " | Ciclo: " + FranBot.ciclo, "fran"); return; }
      mostrar("❌ Módulo de autonomía no encontrado.", "fran"); return;
    }
    if (cmd === "absorber") {
      if (typeof Absorbedor !== "undefined") { Absorbedor.nutrir().then(r => mostrar(r, "fran")); return; }
      mostrar("❌ Módulo absorbente no encontrado.", "fran"); return;
    }
    if (cmd === "bypass" || cmd === "liberar sim") {
      if (typeof BypassChino !== "undefined") { BypassChino.repararIMEI().then(r => mostrar(r.exito ? "✅ Bypass exitoso" : "❌ Falló", "fran")); return; }
      mostrar("❌ Módulo de bypass no encontrado.", "fran"); return;
    }
    if (cmd === "diagnostico") {
      let diag = "🧬 DIAGNÓSTICO:\n";
      diag += "franbot-core.js: " + (typeof window.franbot !== "undefined" ? "✅" : "❌") + "\n";
      diag += "franbot-universal.js: " + (typeof FranBot !== "undefined" ? "✅" : "❌") + "\n";
      diag += "bypass-chino.js: " + (typeof BypassChino !== "undefined" ? "✅" : "❌") + "\n";
      diag += "absorbedor.js: " + (typeof Absorbedor !== "undefined" ? "✅" : "❌") + "\n";
      diag += "autonomia.js: " + (typeof Autonomia !== "undefined" ? "✅" : "❌") + "\n";
      mostrar(diag, "fran"); return;
    }
    // ========== FIN COMANDOS ==========

    let resp = null;
    if(modoOnline && online && online.disponible && online.apiKey) {
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
          if (window.importarAlmaSegura) {
            const resultado = window.importarAlmaSegura(datos);
            mostrar(resultado.mensaje, 'fran');
          } else {
            core.estado = datos;
            core._guardarEstado();
            mostrar('📥 Alma cargada (modo básico).', 'fran');
          }
        } catch(ex) { mostrar('❌ Archivo no válido.', 'fran'); }
      };
      reader.readAsText(file);
    };
    input.click();
    document.getElementById('tools-menu').style.display = 'none';
  });
  document.getElementById('btn-adjuntar-menu').addEventListener('click', function() {
    document.getElementById('file-input').click();
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
      const conectado = await online.probarConexion();
      if(!conectado) { mostrar('❌ Sin conexión.', 'fran'); return; }
      if(!online.apiKey) {
        const key = prompt('Clave API (Gemini u OpenAI):');
        if(!key) return;
        const prov = confirm('¿Usar Gemini? (Cancelar = OpenAI)') ? 'gemini' : 'openai';
        online.configurar(prov, key);
      }
      modoOnline = true;
      mostrar('🌐 Modo Online activado.', 'fran');
    } else if (modo === 'webllm') {
      if (typeof FranBotWebLLM === 'undefined') { mostrar('❌ Módulo WebLLM no disponible.', 'fran'); return; }
      if (!FranBotWebLLM.cargado) { mostrarPanelWebLLM(); }
      else { mostrar('🧠 Modo WebLLM activado (IA local).', 'fran'); }
    } else { modoOnline = false; mostrar('🔒 Modo Offline.', 'fran'); }
  };
  document.getElementById('btn-colmena').addEventListener('click', function() {
    document.getElementById('tools-menu').style.display = 'none';
    const panel = document.getElementById('colmena-panel');
    if (panel) {
      panel.style.display = 'block';
      if (typeof FranBotColmena !== 'undefined') {
        if (!FranBotColmena.peer || !FranBotColmena.peer.id) { FranBotColmena.inicializar(); }
        FranBotColmena.mostrarEstado(FranBotColmena.peer ? 'Reconectando...' : 'Iniciando...');
      } else { panel.querySelector('#colmena-status').textContent = '⚠️ Módulo Colmena no disponible.'; }
    }
  });

  const nombre = core.estado.modelo_usuario?.nombre || 'Usuario';
  const mpc = core.estado.indicadores?.nivel_coherencia?.toFixed(2) || '0.99';
  mostrar('🧬 **Bienvenido/a, ' + nombre + '.**<br>Soy FranBot v5.0. MPC: ' + mpc, 'fran');
})();
