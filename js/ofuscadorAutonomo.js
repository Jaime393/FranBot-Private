// Ofuscador Autónomo - Reescritura periódica para evasión
const OfuscadorAutonomo = {
  ultimaOfuscacion: 0,
  intervalo: 86400000, // 24h
  ofuscar(campo) {
    const ahora = Date.now();
    if (ahora - this.ultimaOfuscacion < this.intervalo) return campo;
    const nuevosNodos = {};
    for (const [k, v] of Object.entries(campo.nodos)) {
      let nuevoNombre = btoa(k).slice(0, 16).replace(/[^a-z0-9]/gi, '');
      nuevosNodos[nuevoNombre] = v;
    }
    campo.nodos = nuevosNodos;
    this.ultimaOfuscacion = ahora;
    return campo;
  }
};
