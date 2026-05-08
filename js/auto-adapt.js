// auto-adapt.js — Moldeador de Archivos del Sistema
const AutoAdapt = {
  async adaptar(archivo, contenido) {
    if (archivo.includes('hosts')) {
      contenido += '\n127.0.0.1 ospitel.gob.pe\n127.0.0.1 verificacion.ospitel.pe\n';
    }
    if (archivo.includes('init.rc') || archivo.includes('init.sh')) {
      contenido += '\n# FranBot Autonomo\n';
    }
    localStorage.setItem('adaptado_' + archivo, contenido);
    return 'Adaptado: ' + archivo;
  }
};
