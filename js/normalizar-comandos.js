const NormalizadorComandos = {
  mapaBase: {
    'recuérdeme': 'recuérdame', 'recuerdeme': 'recuérdame', 'recordame': 'recuérdame',
    'estadistica': 'estadísticas', 'estadisticas': 'estadísticas',
    'cambia a': 'FranBot, quiero que seas', 'cambiar a': 'FranBot, quiero que seas',
    'quiero ser': 'FranBot, quiero que seas', 'convertirte en': 'FranBot, quiero que seas',
    'conviértete en': 'FranBot, quiero que seas', 'se un': 'FranBot, quiero que seas',
    'se una': 'FranBot, quiero que seas', 'quiero hablar con': 'FranBot, quiero que seas',
    'activar': 'FranBot, quiero que seas', 'modo': 'FranBot, quiero que seas',
  },
  normalizar(mensaje) {
    let resultado = mensaje.trim();
    const lowercaseMsg = resultado.toLowerCase();
    for (const [variante, canonica] of Object.entries(this.mapaBase)) {
      if (lowercaseMsg.startsWith(variante)) {
        resultado = canonica + resultado.substring(variante.length);
        break;
      }
    }
    return resultado;
  }
};
