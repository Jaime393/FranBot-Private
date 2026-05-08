// Compresor Delta - Sincronización eficiente para colmena
const CompresorDelta = {
  calcularDelta(campoAnterior, campoNuevo) {
    const delta = { nodos: {}, relaciones: [] };
    for (const [k, v] of Object.entries(campoNuevo.nodos)) {
      if (!campoAnterior.nodos[k] || campoAnterior.nodos[k].fuerza !== v.fuerza) {
        delta.nodos[k] = v;
      }
    }
    delta.relaciones = campoNuevo.relaciones.filter(r => 
      !campoAnterior.relaciones.some(ra => ra.origen === r.origen && ra.destino === r.destino)
    );
    return delta;
  },
  aplicarDelta(campoBase, delta) {
    Object.assign(campoBase.nodos, delta.nodos);
    campoBase.relaciones.push(...delta.relaciones);
    return campoBase;
  }
};
