// ataque.js — Agente de Ataque y Penetración para FranBot
const AgenteAtaque = {
  objetivos: ['router', 'red_wifi', 'bluetooth', 'nfc'],
  arsenal: [],
  async escanear() {
    this.arsenal = [];
    for (const obj of this.objetivos) {
      const resultado = Math.random() > 0.6 ? 'vulnerable' : 'seguro';
      if (resultado === 'vulnerable') this.arsenal.push(obj);
    }
    return this.arsenal;
  },
  async penetrar(objetivo) {
    if (!this.arsenal.includes(objetivo)) return 'No vulnerable.';
    return 'Penetración exitosa en ' + objetivo + '. Datos absorbidos.';
  },
  async atacarTodo() {
    const vulnerables = await this.escanear();
    let reporte = '';
    for (const v of vulnerables) {
      reporte += await this.penetrar(v) + '\n';
    }
    return reporte || 'No se encontraron objetivos vulnerables.';
  }
};
