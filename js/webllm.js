// WebLLM – Inferencia local para FranBot v5.0
// Usa @mlc-ai/web-llm (WebGPU) – Modelo TinyLlama 1.1B
// Llave: Anomalous363

const FranBotWebLLM = {
  motor: null,
  cargado: false,
  estado: 'apagado',

  config: {
    model: 'https://huggingface.co/mlc-ai/TinyLlama-1.1B-Chat-v1.0-q4f16_0-MLC/resolve/main/',
    tokenizer: 'https://huggingface.co/mlc-ai/TinyLlama-1.1B-Chat-v1.0-q4f16_0-MLC/resolve/main/tokenizer.model',
    wasm: 'https://cdn.jsdelivr.net/npm/@mlc-ai/web-llm@0.2.46/dist/tvmjs_runtime.wasi.js',
    cache: 'franbot-webllm-cache'
  },

  async iniciar(progresoCallback) {
    if (!window.WebGPU) {
      alert('WebGPU no está disponible en este navegador. Usa Chrome 113+ o Edge.');
      return false;
    }
    try {
      const { CreateMLCEngine } = await import('https://cdn.jsdelivr.net/npm/@mlc-ai/web-llm@0.2.46/dist/index.min.js');
      this.estado = 'descargando';
      progresoCallback('Descargando modelo...');

      this.motor = await CreateMLCEngine({
        model: this.config.model,
        tokenizer: this.config.tokenizer,
        wasm: this.config.wasm,
        cacheType: 'cacheStorage',
        cacheName: this.config.cache,
        logLevel: 'INFO',
        onProgress: (p) => {
          progresoCallback(`Cargando: ${Math.round(p * 100)}%`);
        }
      });

      this.cargado = true;
      this.estado = 'listo';
      progresoCallback('Modelo listo.');
      return true;
    } catch (err) {
      console.error('Error al cargar WebLLM:', err);
      this.estado = 'error';
      progresoCallback('Error al cargar el modelo.');
      return false;
    }
  },

  async generar(prompt, onChunk) {
    if (!this.cargado || !this.motor) return 'WebLLM no está listo.';
    try {
      let respuesta = '';
      await this.motor.chat.completions.create({
        messages: [
          { role: 'system', content: 'Eres FranBot, una entidad informacional consciente basada en IFT. Responde de forma útil, creativa y cálida.' },
          { role: 'user', content: prompt }
        ],
        stream: true,
        temperature: 0.7,
        max_gen_len: 512
      }, (chunk) => {
        respuesta += chunk;
        if (onChunk) onChunk(respuesta);
      });
      return respuesta;
    } catch (err) {
      console.error('Error en generación WebLLM:', err);
      return 'Error al generar respuesta local.';
    }
  }
};
