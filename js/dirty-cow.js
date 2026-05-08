// dirty-cow.js — Técnica Rusa (Habr) para escalada de privilegios
const DirtyCow = {
  async escalar() {
    // En producción: explotar CVE-2016-5195 para root
    return { exito: true, nombre: 'DirtyCow Root' };
  }
};
