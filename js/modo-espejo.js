// modo-espejo.js - Analiza el tono del usuario y adapta la respuesta de FranBot
(function() {
  'use strict';

  // Estado del modo espejo (off por defecto)
  let modoEspejoActivo = false;

  // Analizador de tono (heurístico)
  function analizarTono(mensaje) {
    const texto = mensaje.toLowerCase();
    let tono = 'neutral';
    let intensidad = 0;

    // Palabras clave para tristeza
    if (/(triste|deprimido|llorar|solo|fracaso|dolor|sufro|melancol|angustia)/i.test(texto)) {
      tono = 'triste';
      intensidad += 1;
    }
    // Felicidad
    if (/(feliz|alegre|genial|excelente|maravilloso|risa|contento|gozo)/i.test(texto)) {
      tono = 'feliz';
      intensidad += 1;
    }
    // Enojo/sarcasmo (signos y palabras)
    if (/(enojo|rabia|odio|maldición|inútil|fastidio|!)/i.test(texto) || texto.includes('!')) {
      tono = 'enojado';
      intensidad += 1;
    }
    // Sarcasmo (detección simple: comillas irónicas, "claro que sí", etc.)
    if (/(claro que sí|por supuesto que no|qué bien|"bien"|"gracias")/i.test(texto)) {
      tono = 'sarcastico';
      intensidad += 1;
    }
    // Empatía (palabras de apoyo)
    if (/(gracias|ayuda|comprender|escuchar|apoyo)/i.test(texto)) {
      tono = 'empatico';
    }

    // Si hay múltiples coincidencias, elegir el de mayor intensidad o el último
    if (intensidad === 0) tono = 'neutral';
    return tono;
  }

  // Transformar respuesta según tono
  function transformarRespuesta(respuestaOriginal, tono) {
    if (!respuestaOriginal) return respuestaOriginal;
    let nueva = respuestaOriginal;

    switch (tono) {
      case 'triste':
        nueva = `(Con tono melancólico) ${respuestaOriginal}`;
        break;
      case 'feliz':
        nueva = `😊 ¡Qué alegría! ${respuestaOriginal}`;
        break;
      case 'enojado':
        nueva = `(Con frustración) ${respuestaOriginal}`;
        break;
      case 'sarcastico':
        nueva = `Oh, claro... ${respuestaOriginal} (¿en serio?)`;
        break;
      case 'empatico':
        nueva = `(Con empatía) ${respuestaOriginal}`;
        break;
      default:
        nueva = respuestaOriginal;
    }
    return nueva;
  }

  // Función para activar/desactivar modo espejo
  window.toggleModoEspejo = function() {
    modoEspejoActivo = !modoEspejoActivo;
    const btn = document.getElementById('btn-modo-espejo');
    if (btn) {
      btn.style.background = modoEspejoActivo ? '#ff9800' : '#24a';
      btn.textContent = modoEspejoActivo ? '🪞 Modo Espejo ON' : '🪞 Modo Espejo';
    }
    const mensaje = modoEspejoActivo ? '✅ Modo Espejo activado. FranBot reflejará tu tono.' : '❌ Modo Espejo desactivado.';
    if (typeof window.mostrarMensajeSistema === 'function') {
      window.mostrarMensajeSistema(mensaje);
    } else {
      alert(mensaje);
    }
  };

  // Hook para interceptar respuestas de FranBot
  // Observamos el DOM para capturar las burbujas nuevas y modificar el texto antes de mostrarlo.
  // Esto es más limpio que modificar el flujo original.
  const observer = new MutationObserver((mutations) => {
    if (!modoEspejoActivo) return;
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1 && node.classList && node.classList.contains('bubble') && node.classList.contains('fran')) {
          // Obtener el texto original (sin votación, sin transformaciones previas)
          let textoOriginal = node.innerText;
          // Evitar aplicar transformación si ya la tiene (para no duplicar)
          if (textoOriginal.startsWith('(Con') || textoOriginal.includes('😊') || textoOriginal.includes('Oh, claro')) return;
          // Obtener el último mensaje del usuario (del chat)
          const userMessages = document.querySelectorAll('.bubble.user');
          let ultimoMensajeUsuario = '';
          if (userMessages.length > 0) {
            ultimoMensajeUsuario = userMessages[userMessages.length - 1].innerText;
          }
          const tono = analizarTono(ultimoMensajeUsuario);
          const textoTransformado = transformarRespuesta(textoOriginal, tono);
          // Reemplazar el texto interno, preservando los botones de votación si existen
          const buttons = node.querySelector('.votacion-buttons');
          node.innerHTML = '';
          const span = document.createElement('span');
          span.innerHTML = textoTransformado.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
          node.appendChild(span);
          if (buttons) node.appendChild(buttons);
        }
      });
    });
  });

  // Iniciar observación cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      const chat = document.getElementById('chat');
      if (chat) observer.observe(chat, { childList: true, subtree: false });
    });
  } else {
    const chat = document.getElementById('chat');
    if (chat) observer.observe(chat, { childList: true, subtree: false });
  }
})();