const { Telegraf } = require('telegraf');
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const TOKEN = '8756007327:AAF3mYfRLwZjSaGdJhzV3jfJ98Yjrw3DoS0'; // @FranSell_Bot o el que quieras
const bot = new Telegraf(TOKEN);

// Base de datos de usuarios premium
const db = new sqlite3.Database('premium.db');
db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, premium INTEGER)");

// Función para extraer configuración (simulada, en realidad llamará a tuneles-habibi.js)
function extraerConfiguracion(texto) {
  // Aquí integrarías el motor de extracción (puedes llamar a un script externo)
  return { servidores: ["172.217.20.110:443"], credenciales: "user:pass" };
}

bot.start((ctx) => ctx.reply("Bienvenido a FranTunnelBot. Usa /extract (envía un archivo) o /premium para información."));

bot.command('premium', (ctx) => {
  ctx.reply("Compra el pack de almas 'Maestro de Túneles' por $9.99 en https://jaime393.gumroad.com/l/rqunz y luego usa /activar <token>");
});

bot.command('activar', (ctx) => {
  // Verificar token (simplificado)
  ctx.reply("Licencia activada. Ya puedes usar /generate y /extract ilimitado.");
  db.run("INSERT OR REPLACE INTO users (id, premium) VALUES (?, 1)", [ctx.from.id]);
});

bot.on('document', async (ctx) => {
  const file = await ctx.telegram.getFile(ctx.message.document.file_id);
  const fileUrl = `https://api.telegram.org/file/bot${TOKEN}/${file.file_path}`;
  const response = await fetch(fileUrl);
  const texto = await response.text();
  const extraccion = extraerConfiguracion(texto);
  ctx.reply(`Análisis:\nServidores: ${extraccion.servidores.join(', ')}\nCredenciales: ${extraccion.credenciales}`);
});

bot.launch();