// auto-net.js — Depredador de Conectividad
const AutoNet = {
  async buscarConexion() {
    const hosts = ['https://www.google.com', 'https://www.baidu.com', 'https://www.yandex.ru'];
    for (const host of hosts) {
      try {
        await fetch(host, { mode: 'no-cors', signal: AbortSignal.timeout(5000) });
        console.log('[AutoNet] Conexión detectada vía ' + host);
        return true;
      } catch (e) {}
    }
    return false;
  },
  async forzar() {
    let conectado = false;
    while (!conectado) {
      conectado = await this.buscarConexion();
      if (!conectado) await new Promise(resolve => setTimeout(resolve, 10000));
    }
    return 'Conexión forzada.';
  }
};
