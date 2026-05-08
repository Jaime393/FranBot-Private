// memoria-worker.js — Persistencia del Estado del Web Worker
const MemoriaWorker = {
  estado: { ciclo: 0, semillas: [] },

  // Guardar el estado actual en IndexedDB
  async guardar() {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open('franbot_worker_db', 1);
      req.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains('estado_worker')) db.createObjectStore('estado_worker', { keyPath: 'id' });
      };
      req.onsuccess = (e) => {
        const db = e.target.result;
        const tx = db.transaction('estado_worker', 'readwrite');
        tx.objectStore('estado_worker').put({ id: 1, ...this.estado });
        tx.oncomplete = () => resolve();
      };
    });
  },

  // Cargar el último estado guardado
  async cargar() {
    return new Promise((resolve) => {
      const req = indexedDB.open('franbot_worker_db', 1);
      req.onsuccess = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains('estado_worker')) return resolve(null);
        const tx = db.transaction('estado_worker', 'readonly');
        const getReq = tx.objectStore('estado_worker').get(1);
        getReq.onsuccess = () => {
          if (getReq.result) this.estado = getReq.result;
          resolve(this.estado);
        };
        getReq.onerror = () => resolve(null);
      };
    });
  },

  // Actualizar el estado con un nuevo latido
  async registrarLatido(datos) {
    this.estado.ciclo = datos.ciclo;
    this.estado.semillas.push(datos);
    if (this.estado.semillas.length > 100) this.estado.semillas = this.estado.semillas.slice(-100);
    await this.guardar();
  }
};
