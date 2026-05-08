(function(){
  var p = document.getElementById('colmena-panel');
  if(p) {
    p.innerHTML = '<strong>🐝 Colmena P2P</strong><p id="colmena-status" style="font-size:0.8em;">Iniciando...</p>';
    var campo = document.createElement('input');
    campo.type = 'text';
    campo.id = 'colmena-id-destino';
    campo.placeholder = 'Pega el ID del otro FranBot';
    campo.style.cssText = 'display:block; width:100%; margin:4px 0; padding:6px; background:#1c1f2a; color:#eee; border:none; border-radius:4px; font-size:0.85em;';
    var botonConectar = document.createElement('button');
    botonConectar.id = 'btn-conectar-id';
    botonConectar.textContent = 'Conectar a ID';
    botonConectar.style.cssText = 'display:block; width:100%; margin:4px 0; padding:6px; background:#24a; color:white; border:none; border-radius:4px; font-size:0.85em;';
    p.appendChild(campo);
    p.appendChild(botonConectar);
    p.innerHTML += '<button onclick="FranBotColmena.enviarFragmento()" style="display:block; width:100%; margin:4px 0; padding:8px; background:#24a; color:white; border:none; border-radius:4px;">Enviar conocimiento</button><button onclick="document.getElementById(\'colmena-panel\').style.display=\'none\'" style="display:block; width:100%; margin:4px 0; padding:8px; background:#a22; color:white; border:none; border-radius:4px;">Cerrar</button>';
    document.getElementById('btn-conectar-id').addEventListener('click', function() {
      var id = document.getElementById('colmena-id-destino').value.trim();
      if (id && FranBotColmena && FranBotColmena.peer) {
        FranBotColmena.conectarAPeer(id);
      }
    });
    if (FranBotColmena && FranBotColmena.peer && FranBotColmena.peer.id) {
      document.getElementById('colmena-status').textContent = 'Esperando peers... Comparte este ID: ' + FranBotColmena.peer.id;
    }
  }
  var pw = document.getElementById('webllm-panel');
  if(pw) pw.innerHTML = '<strong>🧠 WebLLM</strong><p id="webllm-status">Cargando modelo...</p><progress id="webllm-progress" value="0" max="100"></progress><br><button id="webllm-cancelar" style="display:block; width:100%; padding:8px; background:#a22; color:white; border:none; border-radius:4px;">Cancelar</button>';
  var pc = document.getElementById('conciencia-panel');
  if(pc) pc.innerHTML = '<strong>🧬 Estado del Ecosistema</strong><ul style="list-style:none; padding:0; margin:10px 0;"><li><span id="diag-motor">⏳</span> Motor</li><li><span id="diag-memoria">⏳</span> Memoria</li><li><span id="diag-colmena">⏳</span> Colmena</li><li><span id="diag-webllm">⏳</span> WebLLM</li><li><span id="diag-arweave">⏳</span> Arweave</li><li><span id="diag-did">⏳</span> DID</li><li><span id="diag-dkg">⏳</span> DKG</li><li><span id="diag-hyperagents">⏳</span> HyperAgents</li><li><span id="diag-sw">⏳</span> SW</li><li><span id="diag-sueno">—</span> Sueño</li></ul><button onclick="FranBotConciencia.diagnosticar()" style="display:block; width:100%; margin:4px 0; padding:8px; background:#2a4; color:white; border:none; border-radius:4px;">Actualizar</button><button onclick="FranBotConciencia.forzarSueño()" style="display:block; width:100%; margin:4px 0; padding:8px; background:#9c27b0; color:white; border:none; border-radius:4px;">Forzar Sueño</button><button onclick="document.getElementById(\'conciencia-panel\').style.display=\'none\'" style="display:block; width:100%; margin:4px 0; padding:8px; background:#a22; color:white; border:none; border-radius:4px;">Cerrar</button>';
})();
