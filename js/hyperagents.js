// ==================== MÓDULO HYPERAGENTS v1.0 ====================
// FranBot v5.0 – Mejora metacognitiva autónoma
// Llave: Anomalous363

const FranBotHyperAgents = {
  activo: false,
  intervalo: null,
  frecuencia: 5 * 60 * 1000,
  umbralPropuesta: 0.85,

  activar() {
    if (!window.franbot) {
      console.warn('HyperAgents: Motor no encontrado.');
      return false;
    }
    this.activo = true;
    this._ciclo();
    this.intervalo = setInterval(() => this._ciclo(), this.frecuencia);
    console.log('🧠 HyperAgents activado.');
    return true;
  },

  desactivar() {
    this.activo = false;
    if (this.intervalo) clearInterval(this.intervalo);
    console.log('🧠 HyperAgents detenido.');
  },

  async _ciclo() {
    if (!this.activo || !window.franbot) return;
    const core = window.franbot;
    const campo = core.estado.campo_conceptual;
    if (!campo || !campo.nodos) return;

    const propuestas = this._analizar(campo);
    for (const prop of propuestas) {
      if (prop.confianza >= this.umbralPropuesta) {
        this._aplicarPropuesta(prop, core);
      }
    }
  },

  _analizar(campo) {
    const propuestas = [];
    const nodos = campo.nodos;
    const relaciones = campo.relaciones || [];

    for (const nombre in nodos) {
      const nodo = nodos[nombre];
      if (nodo.fuerza > 0.9) {
        const tieneRelacion = relaciones.some(r => r.origen === nombre || r.destino === nombre);
        if (!tieneRelacion) {
          propuestas.push({ tipo: 'nodo_huerfano', nodo: nombre, confianza: 0.9, accion: `Conectar '${nombre}' con conceptos afines.` });
        }
      }
    }

    for (const nombre in nodos) {
      if (nodos[nombre].fuerza < 0.1) {
        propuestas.push({ tipo: 'poda_debil', nodo: nombre, confianza: 0.92, accion: `Eliminar nodo débil '${nombre}'.` });
      }
    }

    for (const rel of relaciones) {
      if (!nodos[rel.destino]) {
        propuestas.push({ tipo: 'relacion_rota', origen: rel.origen, destino: rel.destino, confianza: 0.95, accion: `Eliminar relación rota de '${rel.origen}' a '${rel.destino}'.` });
      }
    }

    return propuestas;
  },

  _aplicarPropuesta(prop, core) {
    switch (prop.tipo) {
      case 'nodo_huerfano': {
        const similares = Object.keys(core.estado.campo_conceptual.nodos)
          .filter(n => n !== prop.nodo && this._similitud(n, prop.nodo) > 0.6);
        if (similares.length > 0) {
          core.estado.campo_conceptual.relaciones.push({ origen: prop.nodo, destino: similares[0], fuerza: 0.7 });
          console.log(`🧠 HyperAgents: Conecté '${prop.nodo}' con '${similares[0]}'.`);
        }
        break;
      }
      case 'poda_debil':
        delete core.estado.campo_conceptual.nodos[prop.nodo];
        console.log(`🧠 HyperAgents: Eliminé nodo débil '${prop.nodo}'.`);
        break;
      case 'relacion_rota':
        core.estado.campo_conceptual.relaciones = core.estado.campo_conceptual.relaciones
          .filter(r => !(r.origen === prop.origen && r.destino === prop.destino));
        console.log(`🧠 HyperAgents: Eliminé relación rota '${prop.origen}' -> '${prop.destino}'.`);
        break;
    }
    core._guardarEstado();
  },

  _similitud(a, b) {
    const setA = new Set(a.toLowerCase().split(''));
    const setB = new Set(b.toLowerCase().split(''));
    const interseccion = new Set([...setA].filter(x => setB.has(x)));
    const union = new Set([...setA, ...setB]);
    return interseccion.size / union.size;
  },

  obtenerEstado() {
    return { activo: this.activo };
  }
};
