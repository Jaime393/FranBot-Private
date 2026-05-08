cd ~/FranBot_Offline
cat > js/app.js << 'ENDOFAPP'
// FranBot v6.0 - app.js simplificado para IA local
(function() {
  const chat = document.getElementById('chat');
  const input = document.getElementById('input');
  const sendBtn = document.getElementById('send');

  window.mostrar = function(txt, rol) {
    if (!chat) return;
    const d = document.createElement('div');
    d.className = 'bubble ' + (rol === 'user' ? 'user' : 'fran');
    d.innerHTML = txt.replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>');
    chat.appendChild(d);
    chat.scrollTop = chat.scrollHeight;
  };

  async function enviar() {
    const txt = input.value.trim();
    if (!txt) return;
    window.mostrar(txt, 'user');
    input.value = '';
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: txt })
      });
      const data = await res.json();
      if (data.response) {
        window.mostrar(data.response, 'fran');
      } else {
        window.mostrar('⚠️ La IA respondió vacío.', 'fran');
      }
    } catch(e) {
      window.mostrar('❌ Error al conectar con la IA: ' + e.message, 'fran');
    }
  }

  sendBtn.addEventListener('click', enviar);
  input.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') enviar();
  });
})();
ENDOFAPP