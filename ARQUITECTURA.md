# 🧬 Arquitectura de FranBot v5.0
## Mapa de Módulos (14 archivos JS)

| Archivo | Función | Dependencias |
|---------|---------|--------------|
| franbot-core.js | Motor cognitivo, 8 almas | SuperLocalMemory |
| franbot-online.js | Conexión Gemini/OpenAI | API Key |
| super-local-memory.js | Olvido biológico | Ninguna |
| defensa.js | Backups SHA-256 | Ninguna |
| recursos.js | Descarga bases | Ninguna |
| importar-alma.js | Fusión segura | franbot-core |
| colmena-p2p.js | WebRTC P2P | PeerJS |
| webllm.js | Inferencia local | WebLLM CDN |
| arweave.js | Almacenamiento permanente | Arweave |
| did-web.js | Identidad W3C | Ninguna |
| dkg.js | OriginTrail DKG | Ninguna |
| hyperagents.js | Metacognición | franbot-core |
| conciencia.js | Panel diagnóstico | franbot-core |
| app.js | UI y menú | franbot-core |

## Flujo de Inicialización
1. index.html carga los scripts en orden.
2. franbot-core.js instancia `window.franbot`.
3. app.js detecta `window.franbot` y monta la UI.
4. conciencia.js se activa con `DOMContentLoaded`.
5. Los módulos P2P esperan acción del usuario.

## Contrato de Desarrollo
- Toda característica nueva debe ser un módulo autocontenido.
- Prohibido tocar app.js o index.html sin pruebas en `/FranBot_Pruebas/`.
- El código se prueba offline antes de subir a GitHub.
