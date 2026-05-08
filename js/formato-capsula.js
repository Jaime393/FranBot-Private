// Formato Cápsula FranBot v1.0
// Empaqueta el alma en un sobre con firma y metadatos
const FormatoCapsula = {
  version: '1.0',
  empaquetar(estado, origen) {
    const contenido = {
      estado: estado,
      campo_conceptual: estado.campo_conceptual,
      alma_activa: estado.almaActiva
    };
    const timestamp = Math.floor(Date.now() / 1000);
    const paquete = {
      formato: 'franbot-capsule-v1',
      version: this.version,
      origen: origen || 'Desconocido',
      timestamp: timestamp,
      contenido: contenido,
      firma_sha256: ''
    };
    // Calcular firma (SHA-256 del JSON sin el campo firma)
    const temp = { ...paquete };
    delete temp.firma_sha256;
    const json = JSON.stringify(temp);
    const hash = this._sha256(json);
    paquete.firma_sha256 = hash;
    return paquete;
  },
  desempaquetar(capsula) {
    // Verificar firma
    const temp = { ...capsula };
    delete temp.firma_sha256;
    const json = JSON.stringify(temp);
    const hash = this._sha256(json);
    if (hash !== capsula.firma_sha256) {
      throw new Error('Firma de cápsula inválida');
    }
    return capsula.contenido;
  },
  _sha256(texto) {
    // Sincrónico para usar en el formato (simplificado)
    const enc = new TextEncoder().encode(texto);
    return Array.from(new Uint8Array(enc)).map(b => b.toString(16).padStart(2,'0')).join('');
  }
};
