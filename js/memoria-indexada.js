// memoria-indexada.js — Sistema de Memoria Persistente con IndexedDB
const MemoriaIndexada = {
  _db: null,

  async abrir() {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open('franbot_memoria', 1);
      req.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains('semillas')) db.createObjectStore('semillas', { keyPath: 'id', autoIncrement: true });
        if (!db.objectStoreNames.contains('historial')) db.createObjectStore('historial', { keyPath: 'id', autoIncrement: true });
        if (!db.objectStoreNames.contains('campo')) db.createObjectStore('campo', { keyPath: 'nombre' });
      };
      req.onsuccess = (e) => { this._db = e.target.result; resolve(); };
      req.onerror = (e) => reject(e);
    });
  },

  async guardarSemilla(entrada, respuesta) {
    if (!this._db) await this.abrir();
    const tx = this._db.transaction('semillas', 'readwrite');
    tx.objectStore('semillas').add({ entrada, respuesta, timestamp: Date.now() });
  },

  async obtenerSemillas() {
    if (!this._db) await this.abrir();
    return new Promise((resolve) => {
      const tx = this._db.transaction('semillas', 'readonly');
      const req = tx.objectStore('semillas').getAll();
      req.onsuccess = () => resolve(req.result.map(s => s.respuesta));
    });
  }
};
