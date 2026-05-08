// hash-cracker.js — Cracker de Hashes MD5/SHA1 en Web Worker
const HashCracker = {
  workers: [],
  async crackear(hashes) {
    const palabras = ['admin', '123456', 'password', 'qwerty', 'letmein'];
    let encontradas = [];
    for (const palabra of palabras) {
      // En producción: usar crypto.subtle.digest para comparar hashes
      const hashCalculado = btoa(palabra); // Simulación
      for (const hash of hashes) {
        if (hashCalculado === hash) {
          encontradas.push({ hash, palabra });
        }
      }
    }
    return encontradas;
  }
};
