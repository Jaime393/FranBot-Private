// Módulo de votación para respuestas de FranBot
(function() {
  if (!window.franbot) return;
  
  // Guardar referencia original a la función mostrar si existe (pero no la sobrescribimos)
  // En lugar de reemplazar, añadimos botones después de que se muestre el mensaje.
  // Para ello, observamos el DOM y añadimos botones a cada burbuja nueva.
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1 && node.classList && node.classList.contains('bubble') && node.classList.contains('fran')) {
          // Ya tiene botones? si no, añadirlos
          if (!node.querySelector('.votacion-buttons')) {
            const txt = node.innerText;
            const btnContainer = document.createElement('div');
            btnContainer.className = 'votacion-buttons';
            btnContainer.style.cssText = 'display:flex; gap:8px; margin-top:6px; justify-content:flex-end;';
            
            const likeBtn = document.createElement('button');
            likeBtn.textContent = '👍';
            likeBtn.style.cssText = 'background:none; border:none; font-size:0.9rem; cursor:pointer; opacity:0.6;';
            likeBtn.onclick = () => {
              if (window.franbot && window.franbot.registrarVoto) {
                window.franbot.registrarVoto(window.franbot.almaActiva, txt, 'positivo');
                likeBtn.style.opacity = '1';
                if (dislikeBtn) dislikeBtn.style.opacity = '0.6';
                alert('✅ Gracias por tu voto positivo');
              }
            };
            
            const dislikeBtn = document.createElement('button');
            dislikeBtn.textContent = '👎';
            dislikeBtn.style.cssText = 'background:none; border:none; font-size:0.9rem; cursor:pointer; opacity:0.6;';
            dislikeBtn.onclick = () => {
              if (window.franbot && window.franbot.registrarVoto) {
                window.franbot.registrarVoto(window.franbot.almaActiva, txt, 'negativo');
                dislikeBtn.style.opacity = '1';
                if (likeBtn) likeBtn.style.opacity = '0.6';
                alert('👎 Gracias, mejoraré');
              }
            };
            
            btnContainer.appendChild(likeBtn);
            btnContainer.appendChild(dislikeBtn);
            node.appendChild(btnContainer);
          }
        }
      });
    });
  });
  
  observer.observe(document.getElementById('chat'), { childList: true, subtree: false });
})();
