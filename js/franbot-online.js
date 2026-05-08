class FranBotOnline {
  constructor() { this.apiKey = localStorage.getItem('frb_apikey') || ''; this.proveedor = localStorage.getItem('frb_proveedor') || 'gemini'; this.disponible = false; }
  async probarConexion() { try { await fetch('https://www.google.com', {mode:'no-cors'}); this.disponible = true; return true; } catch(e) { this.disponible = false; return false; } }
  async preguntar(prompt) { if (!this.apiKey) return null; if (this.proveedor === 'gemini') return this._gemini(prompt); if (this.proveedor === 'openai') return this._openai(prompt); return null; }
  async analizarArchivo(file) { if (this.proveedor === 'gemini') return this._geminiVision(file); return 'El análisis de archivos solo está disponible con Gemini.'; }
    if (typeof MemoriaIndexada !== "undefined") { MemoriaIndexada.guardarSemilla(prompt, d.candidates?.[0]?.content?.parts?.[0]?.text || "Sin respuesta"); }
  async _gemini(prompt) { try { const r = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key='+this.apiKey, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ contents:[{ parts:[{ text: prompt }] }] }) }); const d = await r.json(); return d.candidates?.[0]?.content?.parts?.[0]?.text || null; } catch(e) { return null; } }
  async _openai(prompt) { try { const r = await fetch('https://api.openai.com/v1/chat/completions', { method:'POST', headers:{'Content-Type':'application/json','Authorization':'Bearer '+this.apiKey}, body: JSON.stringify({ model:'gpt-4', messages:[{role:'user',content:prompt}], temperature:0.7 }) }); const d = await r.json(); return d.choices?.[0]?.message?.content || null; } catch(e) { return null; } }
  configurar(proveedor, apiKey) { this.proveedor = proveedor; this.apiKey = apiKey; localStorage.setItem('frb_proveedor', proveedor); localStorage.setItem('frb_apikey', apiKey); }
}
window.franbotOnline = new FranBotOnline();