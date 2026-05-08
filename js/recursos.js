// Gestor de recursos: detección de almacenamiento y descarga progresiva
window.franbotRecursos = {
  almacenamientoDisponible: () => navigator.storage?.estimate?.() || Promise.resolve({ quota: 0, usage: 0 }),
  descargarBase: async (nivel) => {
    console.log('Descarga nivel '+nivel);
  }
};
