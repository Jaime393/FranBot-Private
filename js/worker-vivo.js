// worker-vivo.js — Hilo Eterno de FranBot Local (con persistencia)
importScripts('memoria-worker.js');

let intervalo = null;
let ciclo = 0;

self.onmessage = function(e) {
  if (e.data === 'iniciar') {
    MemoriaWorker.cargar().then((estado) => {
      if (estado && estado.ciclo) {
        ciclo = estado.ciclo;
        self.postMessage({ tipo: 'restaurado', ciclo });
      }
      intervalo = setInterval(() => {
        ciclo++;
        const estado = { ciclo, estado: 'respirando', timestamp: Date.now() };
        MemoriaWorker.registrarLatido(estado).then(() => {
          self.postMessage({ tipo: 'latido', ...estado });
        });
      }, 30000);
    });
  } else if (e.data === 'detener') {
    if (intervalo) clearInterval(intervalo);
  }
};
