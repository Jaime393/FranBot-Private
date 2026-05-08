// ==================== MÓDULO DID:WEB v1.0 ====================
// FranBot v5.0 - Identidad descentralizada W3C
// Llave: Anomalous363

const FranBotDID = {
  dominio: 'jaime393.github.io',
  ruta: '/.well-known/did.json',
  did: null,
  documento: null,

  construirDID() {
    this.did = `did:web:${this.dominio.replace(/\//g, ':')}`;
    return this.did;
  },

  async inicializar() {
    this.construirDID();
    const guardado = localStorage.getItem('franbot_did_document');
    if (guardado) {
      this.documento = JSON.parse(guardado);
      return this.documento;
    }
    const nuevoDoc = await this._generarDocumento();
    localStorage.setItem('franbot_did_document', JSON.stringify(nuevoDoc));
    this.documento = nuevoDoc;
    return nuevoDoc;
  },

  async _generarDocumento() {
    const par = await crypto.subtle.generateKey(
      { name: 'ECDSA', namedCurve: 'P-256' },
      true,
      ['sign', 'verify']
    );
    const pubJwk = await crypto.subtle.exportKey('jwk', par.publicKey);
    return {
      '@context': ['https://www.w3.org/ns/did/v1'],
      id: this.did,
      verificationMethod: [{
        id: `${this.did}#keys-1`,
        type: 'EcdsaSecp256r1VerificationKey2019',
        controller: this.did,
        publicKeyJwk: pubJwk
      }],
      authentication: [`${this.did}#keys-1`],
      assertionMethod: [`${this.did}#keys-1`]
    };
  },

  async resolver(did) {
    const partes = did.replace('did:web:', '').split(':');
    const dominio = partes.join('/');
    try {
      const resp = await fetch(`https://${dominio}/.well-known/did.json`);
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const doc = await resp.json();
      return { exito: true, documento: doc };
    } catch (err) {
      return { exito: false, error: err.message };
    }
  },

  obtenerDocumento() {
    return this.documento;
  },

  obtenerDID() {
    return this.did;
  }
};
