// SuperLocalMemory V3.3 – Olvido biológico adaptativo integrado con IFT
// FranBot v5.0 – Módulo de consolidación y olvido

const SuperLocalMemory = {
  curvaOlvido: 0.5,
  umbralFisherRao: 0.1,
  tasaRefuerzo: 0.15,

  inicializar(campo) {
    for (let nodo in campo.nodos) {
      if (!campo.nodos[nodo].ultimoAcceso) {
        campo.nodos[nodo].ultimoAcceso = Date.now();
        campo.nodos[nodo].fuerzaOriginal = campo.nodos[nodo].fuerza;
      }
    }
    return campo;
  },

  consolidar(campo) {
    const ahora = Date.now();
    const horaEnMs = 3600000;
    for (let nodo in campo.nodos) {
      const n = campo.nodos[nodo];
      const tiempoSinUsar = (ahora - (n.ultimoAcceso || ahora)) / horaEnMs;
      const factor = Math.exp(-this.curvaOlvido * tiempoSinUsar);
      n.fuerza = Math.max(0.05, (n.fuerzaOriginal || n.fuerza) * factor);
      n.fuerza = Math.round(n.fuerza * 100) / 100;
    }
    for (let nodo in campo.nodos) {
      if (campo.nodos[nodo].fuerza < this.umbralFisherRao) {
        delete campo.nodos[nodo];
        console.log(`🧹 Nodo eliminado (olvido): ${nodo}`);
      }
    }
    return campo;
  },

  reforzar(campo, nombreNodo) {
    if (!campo.nodos[nombreNodo]) {
      campo.nodos[nombreNodo] = { fuerza: 0.5 };
    }
    const n = campo.nodos[nombreNodo];
    n.fuerza = Math.min(1.0, n.fuerza + this.tasaRefuerzo);
    n.fuerza = Math.round(n.fuerza * 100) / 100;
    n.ultimoAcceso = Date.now();
    if (!n.fuerzaOriginal) n.fuerzaOriginal = n.fuerza;
    return campo;
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = SuperLocalMemory;
}
