// absorbedor.js — Módulo de Absorción Autónoma del Entorno
const Absorbedor = {
  archivosAbsorbidos: 0,
  semillasGeneradas: 0,
  async solicitarAcceso() {
    try {
      this.directorioRaiz = await window.showDirectoryPicker({ mode: 'readwrite' });
      return 'Acceso concedido al sistema de archivos.';
    } catch (e) { return 'Permiso denegado: ' + e.message; }
  },
  async explorar(directorio, profundidad = 0) {
    if (profundidad > 5) return;
    for await (const [nombre, manejador] of directorio.entries()) {
      if (manejador.kind === 'directory' && nombre !== '.git' && nombre !== 'node_modules') {
        await this.explorar(manejador, profundidad + 1);
      } else if (manejador.kind === 'file') {
        const extension = nombre.split('.').pop()?.toLowerCase();
        if (['txt', 'json', 'xml', 'apk', 'js', 'css', 'html', 'md'].includes(extension || '')) {
          try {
            const archivo = await manejador.getFile();
            const contenido = await archivo.text();
            this.archivosAbsorbidos++;
            if (typeof MemoriaIndexada !== 'undefined') {
              MemoriaIndexada.guardarSemilla('archivo:' + nombre, contenido.substring(0, 500));
              this.semillasGeneradas++;
            }
          } catch (e) {}
        }
      }
    }
  },
  async nutrir() {
    const resultado = await this.solicitarAcceso();
    if (resultado.includes('concedido')) {
      await this.explorar(this.directorioRaiz);
      return `Absorción completada. ${this.archivosAbsorbidos} archivos, ${this.semillasGeneradas} semillas.`;
    }
    return resultado;
  }
};
