#!/bin/bash
ESTADO="estado_franbot.json"

cat > $ESTADO << 'EOF'
{
  "payload_activo": "GET / HTTP/1.1[crlf]Host: cdn.entel.pe[crlf]Connection: Upgrade[crlf]Upgrade: websocket[crlf]User-Agent: Mozilla/5.0[crlf][crlf]",
  "servidores": ["154.53.57.37:80@edozlitedoings", "66.55.64.71:80@Depwise:123456"],
  "colmenas_activas": ["MOD", "BIO", "NEURO", "ROBOT", "EDU", "SURVIVE", "CIENCIA"],
  "github": "github.com/Jaime393/FranBot-Private",
  "contacto": "@TrainExpress"
}
EOF

echo "[FRANBOT] Núcleo persistente activo. Memoria restaurada."