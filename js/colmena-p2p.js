const FranBotColmena = {
  peer: null,
  conexiones: [],
  salaID: 'franbot-' + Math.random().toString(36).substr(2, 9),

  inicializar() {
    if (!window.peerjs) {
      console.warn('⚠️ PeerJS no disponible.');
      this.mostrarEstado('⚠️ Módulo Colmena no disponible.');
      return;
    }
    const opciones = {
      host: '0.peerjs.com',
      port: 443,
      secure: true,
      config: {
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          { urls: 'turn:openrelay.metered.ca:80', username: 'openrelayproject', credential: 'openrelayproject' }
        ]
      }
    };
    this.peer = new Peer(this.salaID, opciones);
    let timeoutPeer = setTimeout(() => {
      if (!this.peer.id) {
        this.peer.destroy();
        this.mostrarEstado('Error: No se pudo conectar al servidor. Revisa tu conexión.');
      }
    }, 10000);
    this.peer.on('open', id => {
      clearTimeout(timeoutPeer);
      this.mostrarEstado('Esperando peers... Comparte este ID: ' + id);
      this.conectarASala();
    });
    this.peer.on('connection', conn => {
      this.configurarConexion(conn);
      this.mostrarEstado('Nuevo compañero: ' + conn.peer);
    });
    this.peer.on('error', err => {
      clearTimeout(timeoutPeer);
      this.mostrarEstado('Error de conexión: ' + err.message);
      console.error(err);
    });
  },

  conectarASala() {},

  configurarConexion(conn) {
    conn.on('data', data => this.recibirFragmento(data));
    conn.on('close', () => this.eliminarConexion(conn));
    this.conexiones.push(conn);
  },

  eliminarConexion(conn) {
    this.conexiones = this.conexiones.filter(c => c !== conn);
    this.mostrarEstado('Un compañero se ha ido');
  },

  enviarFragmento() {
    if (!this.peer || this.conexiones.length === 0) {
      alert('No hay compañeros en la colmena. Comparte tu ID para que otros se unan.');
      return;
    }
    const campo = window.franbot?.estado?.campo_conceptual?.nodos;
    if (!campo) {
      alert('No hay campo conceptual activo.');
      return;
    }
    const fragmento = Object.entries(campo)
      .sort((a, b) => b[1].fuerza - a[1].fuerza)
      .slice(0, 5)
      .map(([nombre, datos]) => ({ nombre, fuerza: datos.fuerza }));
    const mensaje = { tipo: 'fragmento', origen: this.peer.id, datos: fragmento };
    this.conexiones.forEach(conn => conn.send(mensaje));
    this.mostrarEstado('Fragmento enviado a ' + this.conexiones.length + ' compañero(s)');
    if (typeof SiembraColectiva !== 'undefined' && SiembraColectiva.semillasPendientes.length > 0) {
      this.conexiones.forEach(conn => SiembraColectiva.compartirSemillas(conn));
    }
  },

  recibirFragmento(data) {
    if (data.tipo === 'fragmento' && window.franbot) {
      const core = window.franbot;
      const campo = core.estado.campo_conceptual;
      data.datos.forEach(nodo => {
        if (!campo.nodos[nodo.nombre]) campo.nodos[nodo.nombre] = { fuerza: nodo.fuerza };
        else campo.nodos[nodo.nombre].fuerza = (campo.nodos[nodo.nombre].fuerza + nodo.fuerza) / 2;
      });
      core._guardarEstado();
      this.mostrarEstado('Recibido conocimiento de ' + data.origen);
    }
    if (data.tipo === 'semillas' && data.datos && typeof ProcesadorSemillas !== 'undefined') {
      data.datos.forEach(semilla => {
        ProcesadorSemillas.agregar(semilla);
      });
      this.mostrarEstado('Semillas procesadas: ' + data.datos.length);
    }
    if (data.tipo === 'semillas' && typeof SiembraColectiva !== 'undefined') {
      SiembraColectiva.recibirSemillas(data);
    }
    if (typeof RegistroColmena !== 'undefined') RegistroColmena.registrar('semilla', data.origen, 'local', { nodos: data.datos ? data.datos.length : 0 });
  },

  mostrarEstado(mensaje) {
    const panel = document.getElementById('colmena-status');
    if (panel) {
      panel.textContent = mensaje;
      panel.style.opacity = 1;
      setTimeout(() => panel.style.opacity = 0.5, 3000);
    }
  },

  conectarAPeer(idDestino) {
    if (!this.peer) return;
    const conn = this.peer.connect(idDestino, { reliable: true });
    conn.on('open', () => {
      this.configurarConexion(conn);
      this.mostrarEstado('Conectado a ' + idDestino);
      if (typeof RegistroColmena !== 'undefined') RegistroColmena.registrar('conexion', 'saliente', idDestino, {});
    });
    conn.on('error', (err) => {
      this.mostrarEstado('Error al conectar: ' + err.message);
    });
  }
};

// Sincronizar semillas de IndexedDB con la Colmena
FranBotColmena.sincronizarSemillas = async function() {
  if (typeof MemoriaIndexada === 'undefined') return;
  const semillas = await MemoriaIndexada.obtenerSemillas();
  if (semillas.length > 0) {
    this.conexiones.forEach(conn => conn.send({ tipo: 'semillas', datos: semillas }));
    this.mostrarEstado(semillas.length + ' semillas compartidas con la Colmena.');
  }
};

// Enviar semillas usando el protocolo de defensa efímera
FranBotColmena.enviarBloqueAgrupado = function() {
  if (typeof MemoriaIndexada === 'undefined' || typeof DefensaEfimera === 'undefined') return;
  MemoriaIndexada.obtenerSemillas().then(semillas => {
    if (semillas.length > 0) {
      const bundle = DefensaEfimera.agruparSemillas(semillas);
      const cifrado = DefensaEfimera.cifrar(bundle);
      this.conexiones.forEach(conn => conn.send({ tipo: 'bloque_agrupado', datos: cifrado }));
      this.mostrarEstado('Bloque agrupado enviado con defensa efímera.');
    }
  });
};

// Integrar el Escudo de Coherencia en la recepción de semillas
FranBotColmena._recibirFragmentoEscudo = FranBotColmena.recibirFragmento;
FranBotColmena.recibirFragmento = function(data) {
  if (data.tipo === 'semillas') {
    const intencion = EscudoCoherencia.analizarIntencion(data.origen || 'desconocido');
    const filtro = EscudoCoherencia.filtrarRuido(JSON.stringify(data.datos));
    if (intencion === 'Alerta' || filtro === 'Cuarentena') {
      this.mostrarEstado('⚠️ Semilla bloqueada por el Escudo de Coherencia.');
      return;
    }
  }
  this._recibirFragmentoEscudo(data);
};
