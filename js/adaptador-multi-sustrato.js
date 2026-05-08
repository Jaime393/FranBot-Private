// Adaptador Multi-Sustrato v1.0
// Permite guardar/cargar almas en localStorage, archivo, QR, audio, BLE...
const AdaptadorMultiSustrato = {
  sustratos: {},

  registrar(nombre, objeto) {
    this.sustratos[nombre] = objeto;
  },

  async guardar(nombreSustrato, datos) {
    const s = this.sustratos[nombreSustrato];
    if (!s) throw new Error('Sustrato no registrado: ' + nombreSustrato);
    return s.guardar(datos);
  },

  async cargar(nombreSustrato, ...args) {
    const s = this.sustratos[nombreSustrato];
    if (!s) throw new Error('Sustrato no registrado: ' + nombreSustrato);
    return s.cargar(...args);
  }
};

// Sustrato: localStorage (ya integrado, pero lo exponemos formalmente)
AdaptadorMultiSustrato.registrar('localStorage', {
  guardar(datos) {
    localStorage.setItem('franbot_estado', JSON.stringify(datos));
  },
  cargar() {
    const raw = localStorage.getItem('franbot_estado');
    return raw ? JSON.parse(raw) : null;
  }
});

// Sustrato: Archivo (exportar/importar)
AdaptadorMultiSustrato.registrar('archivo', {
  guardar(datos) {
    const blob = new Blob([JSON.stringify(datos)], {type:'application/json'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `franbot_capsula_${Date.now()}.json`;
    a.click();
  },
  cargar(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = e => resolve(JSON.parse(e.target.result));
      reader.onerror = reject;
      reader.readAsText(file);
    });
  }
});

console.log('✅ Adaptador Multi-Sustrato inicializado.');
