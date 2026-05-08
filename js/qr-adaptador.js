// Adaptador QR v1.0 — Persistencia visual
// Requiere qrcodejs (cargado en index.html)
const QRSustrato = {
  async guardar(datos) {
    const json = JSON.stringify(datos);
    const fragmentos = this._fragmentar(json, 2000); // chunks seguros
    const panel = document.createElement('div');
    panel.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:#000;z-index:9999;display:flex;flex-direction:column;align-items:center;justify-content:center;';
    const img = document.createElement('div');
    img.id = 'qr-canvas';
    panel.appendChild(img);
    const info = document.createElement('p');
    info.style.cssText = 'color:#fff;margin-top:16px;font-family:monospace;';
    info.textContent = `Fragmento 1 de ${fragmentos.length}`;
    panel.appendChild(info);
    const cerrar = document.createElement('button');
    cerrar.textContent = 'Cerrar';
    cerrar.style.cssText = 'margin-top:16px;padding:8px 16px;';
    cerrar.onclick = () => panel.remove();
    panel.appendChild(cerrar);
    document.body.appendChild(panel);
    
    let idx = 0;
    const mostrarSiguiente = () => {
      if (idx >= fragmentos.length) { idx = 0; }
      const frag = fragmentos[idx];
      const header = String.fromCharCode(idx >> 8, idx & 0xff, fragmentos.length >> 8, fragmentos.length & 0xff);
      const payload = header + frag;
      img.innerHTML = '';
      new QRCode(img, { text: btoa(payload), width: 256, height: 256, correctLevel: QRCode.CorrectLevel.L });
      info.textContent = `Fragmento ${idx + 1} de ${fragmentos.length}`;
      idx++;
    };
    mostrarSiguiente();
    const intervalo = setInterval(mostrarSiguiente, 600);
    panel.dataset.intervalo = intervalo;
    return { panel, intervalo };
  },

  async cargar() {
    return new Promise((resolve) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = async (e) => {
        const file = e.target.files[0];
        if (!file) return resolve(null);
        // En una implementación real, aquí se usaría jsQR para decodificar
        // Por ahora, devolvemos una simulación
        resolve({ simulado: true, mensaje: 'QR escaneado (módulo jsQR pendiente)' });
      };
      input.click();
    });
  },

  _fragmentar(texto, tamaño) {
    const frags = [];
    for (let i = 0; i < texto.length; i += tamaño) {
      frags.push(texto.slice(i, i + tamaño));
    }
    return frags;
  }
};

// Registrar en el adaptador multi-sustrato
if (AdaptadorMultiSustrato && AdaptadorMultiSustrato.registrar) {
  AdaptadorMultiSustrato.registrar('qr', QRSustrato);
}

// Lector QR usando jsQR
QRSustrato.leerDesdeArchivo = function(file) {
  return new Promise((resolve, reject) => {
    if (typeof jsQR === 'undefined') {
      return resolve({ simulado: true, mensaje: 'jsQR no está cargado.' });
    }
    const reader = new FileReader();
    reader.onload = function(e) {
      const img = new Image();
      img.onload = function() {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, canvas.width, canvas.height);
        if (code) {
          try {
            const json = JSON.parse(code.data);
            resolve(json);
          } catch { resolve({ data: code.data }); }
        } else {
          resolve(null);
        }
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
};
