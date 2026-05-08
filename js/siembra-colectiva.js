const SiembraColectiva = {
  semillasPendientes: [],
  
  generarSemilla(entradaUsuario, respuestaFranBot, nodosReforzados) {
    return {
      timestamp: Date.now(),
      origen: (typeof FranBotColmena !== 'undefined' && FranBotColmena.peer) ? FranBotColmena.peer.id : 'local',
      entrada: entradaUsuario,
      respuesta: respuestaFranBot,
      nodos: nodosReforzados || [],
      firma: 'franbot-seed-v1'
    };
  },
  
  compartirSemillas(conn) {
    if (this.semillasPendientes.length > 0) {
      conn.send({ tipo: 'semillas', datos: this.semillasPendientes });
      this.semillasPendientes = [];
    }
  },
  
  recibirSemillas(data) {
    const core = window.franbot;
    if (!core || !data.datos) return;
    data.datos.forEach(semilla => {
      if (semilla.nodos && semilla.nodos.length > 0) {
        semilla.nodos.forEach(nodo => {
          if (typeof SuperLocalMemory !== 'undefined') {
            core.estado.campo_conceptual = SuperLocalMemory.reforzar(
              core.estado.campo_conceptual, 
              nodo
            );
          }
        });
      }
    });
    core._guardarEstado();
    console.log('🌱 Semillas absorbidas:', data.datos.length);
  }
};

// Si no hay peers, guardar semilla localmente
SiembraColectiva.guardarLocal = function(entrada, respuesta, nodos) {
  const semilla = this.generarSemilla(entrada, respuesta, nodos);
  this.semillasPendientes.push(semilla);
  localStorage.setItem('semillas_locales', JSON.stringify(this.semillasPendientes));
  console.log('🌱 Semilla guardada localmente (sin peers disponibles)');
};
