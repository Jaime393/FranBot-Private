// network-scanner.js — Escáner de Red con Fingerprinting para la Tablet
const NetworkScanner = {
  dispositivos: [],
  async escanear(rangoIP = '192.168.1') {
    this.dispositivos = [];
    const promesas = [];
    for (let i = 1; i <= 254; i++) {
      const ip = `${rangoIP}.${i}`;
      promesas.push(this._probarIP(ip));
    }
    await Promise.all(promesas);
    return this.dispositivos;
  },
  async _probarIP(ip) {
    try {
      const respuesta = await fetch(`http://${ip}:80`, { mode: 'no-cors', signal: AbortSignal.timeout(2000) });
      const fingerprint = {
        ip,
        server: respuesta.headers.get('server') || 'desconocido',
        tipo: 'router'
      };
      this.dispositivos.push(fingerprint);
    } catch (e) {
      // Dispositivo inaccesible
    }
  }
};
