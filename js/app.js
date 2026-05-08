// ==================== FRANBOT UI CONTROLLER v5.0 ====================
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

  function mostrarPanelWebLLM() {
    const panel = document.getElementById('webllm-panel');
    if (!panel) return;
    panel.style.display = 'block';
    const progreso = document.getElementById('webllm-progress');
    const estado = document.getElementById('webllm-status');
    const cancelar = document.getElementById('webllm-cancelar');
    if (estado) estado.textContent = 'Iniciando descarga...';
    if (progreso) progreso.value = 0;
    FranBotWebLLM.iniciar((msg) => {
      if (estado) estado.textContent = msg;
      const match = msg.match(/(\d+)%/);
      if (match && progreso) progreso.value = parseInt(match[1]);
      if (msg === 'Modelo listo.') {
        panel.style.display = 'none';
        window.modoIA = 'webllm';
        mostrar('🧠 WebLLM listo. Modo local activado.', 'fran');
      }
      if (msg.startsWith('Error') && cancelar) cancelar.textContent = 'Cerrar';
    });
    if (cancelar) cancelar.onclick = () => {
      panel.style.display = 'none';
      window.modoIA = 'offline';
    };
  }

  window.enviarMensaje = async function() {
    const txt = entrada.value.trim();
    if(!txt) return;
    mostrar(txt, 'user');
    entrada.value = '';
    let resp = null;
    if(modoOnline && online && online.disponible && online.apiKey) {
      try { resp = await online.preguntar(txt); } catch(e) {}
    }
    if(!resp) resp = core.procesar(txt);
    mostrar(resp, 'fran');
  };

  document.getElementById('send').addEventListener('click', enviarMensaje);
  entrada.addEventListener('keypress', function(e) {
    if(e.key === 'Enter') enviarMensaje();
  });

  document.getElementById('tools-btn').addEventListener('click', function(e) {
    e.stopPropagation();
    const menu = document.getElementById('tools-menu');
    menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
  });
  document.addEventListener('click', function() {
    document.getElementById('tools-menu').style.display = 'none';
  });

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
        } catch(ex) {
          mostrar('❌ Archivo no válido.', 'fran');
        }
      };
      reader.onerror = function() {
        mostrar('❌ Error al leer el archivo.', 'fran');
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

  // ==================== MODO ROTATIVO (PANEL DE SELECCIÓN) ====================
  document.getElementById('toggle-mode-menu').addEventListener('click', function() {
    document.getElementById('tools-menu').style.display = 'none';
    const panelModos = document.getElementById('modos-panel');
    if (panelModos) {
      panelModos.style.display = panelModos.style.display === 'none' ? 'block' : 'none';
    }
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
      if (typeof FranBotWebLLM === 'undefined') {
        mostrar('❌ Módulo WebLLM no disponible.', 'fran');
        return;
      }
      if (!FranBotWebLLM.cargado) {
        mostrarPanelWebLLM();
      } else {
        mostrar('🧠 Modo WebLLM activado (IA local).', 'fran');
      }
    } else {
      modoOnline = false;
      mostrar('🔒 Modo Offline.', 'fran');
    }
  };

  // ==================== COLMENA P2P ====================
  document.getElementById('btn-colmena').addEventListener('click', function() {
    document.getElementById('tools-menu').style.display = 'none';
    const panel = document.getElementById('colmena-panel');
    if (panel) {
      panel.style.display = 'block';
      if (typeof FranBotColmena !== 'undefined') {
        if (!FranBotColmena.peer || !FranBotColmena.peer.id) {
          FranBotColmena.inicializar();
        }
        FranBotColmena.mostrarEstado(FranBotColmena.peer ? 'Reconectando...' : 'Iniciando...');
      } else {
        panel.querySelector('#colmena-status').textContent = '⚠️ Módulo Colmena no disponible.';
      }
    }
  });

  // ==================== ARWEAVE ====================
  document.getElementById('btn-arweave-subir-menu').addEventListener('click', async function() {
    document.getElementById('tools-menu').style.display = 'none';
    if (typeof FranBotArweave === 'undefined') {
      mostrar('❌ Módulo Arweave no disponible.', 'fran');
      return;
    }
    const walletInput = document.createElement('input');
    walletInput.type = 'file';
    walletInput.accept = '.json';
    walletInput.onchange = async function(e) {
      const file = e.target.files[0];
      if (!file) return;
      try {
        const wallet = JSON.parse(await file.text());
        const bytes = new TextEncoder().encode(JSON.stringify(core.estado)).length;
        const costo = await FranBotArweave.estimarCosto(bytes);
        const confirmar = confirm(`Subir alma a Arweave.\nTamaño: ${bytes} bytes\nCosto aprox: ${costo.costoAR} AR (~$${costo.costoUSD} USD).\n¿Continuar?`);
        if (!confirmar) return;
        mostrar('☁️ Subiendo alma a Arweave...', 'fran');
        const resultado = await FranBotArweave.subirAlma(core.estado, wallet);
        if (resultado.exito) {
          mostrar(`✅ Alma guardada en Arweave.\nID: ${resultado.txId}`, 'fran');
          core.estado.arweaveTxId = resultado.txId;
          core._guardarEstado();
        } else {
          mostrar(`❌ Error al subir: ${resultado.error}`, 'fran');
        }
      } catch (ex) {
        mostrar('❌ Error al leer la wallet.', 'fran');
      }
    };
    walletInput.click();
  });

  document.getElementById('btn-arweave-cargar-menu').addEventListener('click', async function() {
    document.getElementById('tools-menu').style.display = 'none';
    if (typeof FranBotArweave === 'undefined') {
      mostrar('❌ Módulo Arweave no disponible.', 'fran');
      return;
    }
    const txId = prompt('ID de transacción en Arweave:');
    if (!txId) return;
    mostrar('📥 Descargando alma desde Arweave...', 'fran');
    const resultado = await FranBotArweave.descargarAlma(txId);
    if (resultado.exito) {
      core.estado = resultado.estado;
      core._guardarEstado();
      mostrar('✅ Alma restaurada desde Arweave.', 'fran');
    } else {
      mostrar(`❌ Error al descargar: ${resultado.error}`, 'fran');
    }
  });

  // ==================== PANEL DE CONCIENCIA ====================
  function abrirPanelConciencia() {
    const panel = document.getElementById('conciencia-panel');
    if (panel) {
      panel.style.display = 'block';
      if (typeof FranBotConciencia !== 'undefined') {
        FranBotConciencia.diagnosticar();
      }
    }
  }
  window.abrirPanelConciencia = abrirPanelConciencia;

  const actualizarMPC = () => {
    const mpcElem = document.getElementById('mpc-display');
    if (mpcElem && core.estado.indicadores) {
      mpcElem.textContent = 'MPC: ' + (core.estado.indicadores.nivel_coherencia?.toFixed(2) || '0.99');
    }
  };
  const sonarOriginal = core.soñar;
  core.soñar = function() {
    sonarOriginal.call(core);
    actualizarMPC();
  };
  actualizarMPC();

  // ==================== SALUDO INICIAL MEJORADO ====================
  const nombre = core.estado.modelo_usuario?.nombre || null;
  const mpc = core.estado.indicadores?.nivel_coherencia?.toFixed(2) || '0.99';
  if (nombre) {
    mostrar('🧬 **Bienvenido/a, ' + nombre + '.**<br>Soy FranBot v5.0. MPC: ' + mpc + '<br>💎 <em>Desbloquea las 18 almas premium y apoya el proyecto.</em>', 'fran');
  } else {
    mostrar('🧬 **Bienvenido/a.**<br>Soy FranBot v5.0. MPC: ' + mpc + '<br>💎 <em>Desbloquea las 18 almas premium y apoya el proyecto.</em>', 'fran');
  }
})();

// ========== EXTENSIÓN DE TÚNELES v7.3 (UNIFICADA CON IFT) ==========
(function() {
  // Capturar referencias externas necesarias
  const enviarMensajeOriginal = window.enviarMensaje;
  const core = window.franbot;
  
  if (!enviarMensajeOriginal) {
    console.warn("❌ No se encontró enviarMensaje original. Comandos de túneles no disponibles.");
    return;
  }

  window.enviarMensaje = async function() {
    const input = document.getElementById('input');
    const txt = input.value.trim();
    if (txt === '') return;

    const comando = txt.toLowerCase();

    // Comando /extraer
    if (comando.startsWith('/extraer')) {
      const codigo = txt.substring(9).trim();
      if (!codigo) {
        mostrar("❌ Uso: /extraer <contenido del archivo>", 'fran');
        input.value = '';
        return;
      }
      mostrar(txt, 'user');
      if (typeof TunelesHabibi !== 'undefined') {
        try {
          const res = TunelesHabibi.extraer(codigo);
          const msg = `📡 Extracción:\n🖥️ Servidores: ${res.servidores.join(', ') || 'Ninguno'}\n🔑 Credenciales: ${res.credenciales.join(', ') || 'Ninguna'}\n📦 Payloads: ${res.payloads.length} encontrados\n🔒 SNI: ${res.snis.join(', ') || 'Ninguno'}`;
          mostrar(msg, 'fran');
        } catch(e) {
          mostrar("❌ Error al extraer: " + e.message, 'fran');
        }
      } else {
        mostrar("❌ Módulo de túneles no cargado. Recarga la página.", 'fran');
      }
      input.value = '';
      return;
    }

    // Comando /generar
    if (comando.startsWith('/generar')) {
      const operador = txt.substring(9).trim();
      if (!operador) {
        mostrar("❌ Uso: /generar <operador> (ej: /generar Entel Peru)", 'fran');
        input.value = '';
        return;
      }
      mostrar(txt, 'user');
      if (typeof TunelesHabibi !== 'undefined') {
        try {
          const config = TunelesHabibi.generarConfiguracion(operador);
          mostrar(`🔧 Configuración generada para ${operador}:\n${config}`, 'fran');
        } catch(e) {
          mostrar("❌ Error al generar: " + e.message, 'fran');
        }
      } else {
        mostrar("❌ Módulo de túneles no cargado.", 'fran');
      }
      input.value = '';
      return;
    }

    // Comando /ift
    if (comando === '/ift') {
      mostrar('/ift', 'user');
      try {
        const coreLocal = window.franbot;
        if (!coreLocal || !coreLocal.estado || !coreLocal.estado.indicadores) {
          mostrar('❌ Núcleo IFT no disponible.', 'fran');
          input.value = '';
          return;
        }
        const ind = coreLocal.estado.indicadores;
        let msg = '🧬 INDICADORES IFT EN VIVO:\n';
        msg += 'ρ(x) > 0: ' + (ind.nivel_coherencia ? '✅ ' + ind.nivel_coherencia.toFixed(4) : 'No disponible') + '\n';
        msg += 'φ (Fisher): ' + (ind.nivel_claridad ? ind.nivel_claridad.toFixed(4) : 'N/D') + '\n';
        msg += 'Continuidad: ' + (ind.nivel_continuidad ? ind.nivel_continuidad.toFixed(4) : 'N/D') + '\n';
        msg += 'Cota de masa: ' + (ind.cota_masa ? ind.cota_masa.toExponential(2) + ' kg' : 'No calculada') + '\n';
        msg += 'Φ_IFT (conciencia): ' + (ind.phi_ift ? ind.phi_ift.toFixed(4) : 'No disponible');
        mostrar(msg, 'fran');
      } catch(e) {
        mostrar('❌ Error al leer IFT: ' + e.message, 'fran');
      }
      input.value = '';
      return;
    }

    // Comando /evolucion
    if (comando === '/evolucion') {
      mostrar('/evolucion', 'user');
      const coreLocal = window.franbot;
      if (!coreLocal || !coreLocal.estado) {
        mostrar('❌ Núcleo no disponible.', 'fran');
        input.value = '';
        return;
      }
      const ciclos = coreLocal.estado.ciclosDarwinianos || [];
      if (ciclos.length === 0) {
        mostrar('🌱 Aún no hay ciclos darwinianos registrados.', 'fran');
      } else {
        let msg = '📈 ÚLTIMOS CICLOS EVOLUTIVOS:\n';
        ciclos.slice(-3).forEach((c, i) => {
          const fecha = new Date(c.timestamp).toLocaleString();
          msg += `${i+1}. ${fecha} - Top: ${c.topAlma} (ρ: ${c.fitness.toFixed(3)})\n`;
        });
        mostrar(msg, 'fran');
      }
      input.value = '';
      return;
    }

    // Si no es comando especial, llamar a la función original
    await enviarMensajeOriginal();
  };
})();

// Parche para auto-validación IFT al soñar
(function() {
  if (!window.franbot) return;
  const core = window.franbot;
  const sonarOriginal = core.soñar;
  core.soñar = function() {
    sonarOriginal.call(core);
    // Intentar validación IFT si existe el módulo
    if (typeof IFTEngine !== 'undefined' && IFTEngine.validar) {
      const resultado = IFTEngine.validar(core.estado.campo_conceptual);
      if (resultado && !resultado.valido) {
        console.warn('⚠️ Auto-validación IFT detectó incoherencias:', resultado.errores);
        // Ajustar coherencia ligeramente
        core.estado.indicadores.nivel_coherencia = Math.max(0.8, core.estado.indicadores.nivel_coherencia - 0.01);
        core._guardarEstado();
      }
    }
  };
})();
