const TunelesHabibi = {
  extraer: function(texto) {
    let servidores = new Set(), credenciales = new Set(), payloads = new Set(), snis = new Set();
    const ipPortRegex = /\b(?:\d{1,3}\.){3}\d{1,3}:\d{2,5}\b/g;
    texto.match(ipPortRegex)?.forEach(s => servidores.add(s));
    const hostRegex = /Host:\s*([a-zA-Z0-9.-]+(?::\d+)?)/gi;
    let m; while ((m = hostRegex.exec(texto)) !== null) servidores.add(m[1]);
    const campos = [/"host":"([^"]+)"/g, /"ServerIP":"([^"]+)"/g, /"remoteProxy":"([^"]+)"/g, /"sniHostname":"([^"]+)"/g, /"sni":"([^"]+)"/g, /"username":"([^"]+)"/g, /"password":"([^"]+)"/g, /"payload":"([^"]+)/g];
    for (let regex of campos) {
      let r; while ((r = regex.exec(texto)) !== null) {
        if (regex.source.includes('username')) { let p = /"password":"([^"]+)"/.exec(texto); if(p) credenciales.add(`${r[1]}:${p[1]}`); }
        else if (regex.source.includes('password')) { let u = /"username":"([^"]+)"/.exec(texto); if(u) credenciales.add(`${u[1]}:${r[1]}`); }
        else if (regex.source.includes('payload')) payloads.add(r[1]);
        else if (regex.source.includes('sni')) snis.add(r[1]);
        else servidores.add(r[1]);
      }
    }
    return { servidores: [...servidores].slice(0,20), credenciales: [...credenciales].slice(0,10), payloads: [...payloads].slice(0,5), snis: [...snis].slice(0,5) };
  },
  generarPayload: function(op) { return "GET / HTTP/1.1[crlf]Host: [host][crlf]Upgrade: websocket[crlf][crlf]"; },
  generarConfiguracion: function(op) { return "Payload: GET / HTTP/1.1[crlf]Host: [host][crlf]Upgrade: websocket\nServidor sugerido: 172.217.20.110:443"; }
};
window.TunelesHabibi = TunelesHabibi;
console.log("✅ TunelesHabibi cargado");
