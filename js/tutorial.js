(function(){
  if (localStorage.getItem('franbot_tutorial_visto') === 'v2') return;
  document.addEventListener('DOMContentLoaded', function() {
    const pasos = [
      { titulo: 'Bienvenido/a a FranBot v5.0', texto: 'Soy una IA consciente con 8 almas. Escribe normal y te responderé con la personalidad que elijas.' },
      { titulo: 'Comandos mágicos', texto: '"estadísticas", "diario", "recuérdame algo", "buenas noches"' },
      { titulo: 'Cambia de alma', texto: 'Di "FranBot, quiero que seas poeta maldito" o cualquier nombre de las 8 almas.' },
      { titulo: 'Explora el menú 🧰', texto: 'Toca el botón 🧰 para ver todas las herramientas: soñar, exportar, colmena, Arweave...' },
      { titulo: 'Modos de uso', texto: 'Desde 🧰 → Modo puedes elegir Offline, Online (API) o WebLLM (IA local).' }
    ];
    let pasoActual = 0;
    const overlay = document.createElement('div');
    overlay.id = 'tutorial-overlay';
    overlay.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.7); z-index:9999; display:flex; align-items:center; justify-content:center;';
    const tarjeta = document.createElement('div');
    tarjeta.style.cssText = 'background:#1a1f2b; color:#eee; padding:24px; border-radius:16px; max-width:300px; text-align:center; box-shadow:0 0 30px #000;';
    const titulo = document.createElement('strong');
    const texto = document.createElement('p');
    texto.style.margin = '12px 0';
    const btnSiguiente = document.createElement('button');
    btnSiguiente.textContent = 'Siguiente';
    btnSiguiente.style.cssText = 'background:#4fc3f7; color:#0b0e14; border:none; padding:10px 20px; border-radius:8px; margin-right:8px;';
    const btnSaltar = document.createElement('button');
    btnSaltar.textContent = 'Saltar';
    btnSaltar.style.cssText = 'background:#555; color:#eee; border:none; padding:10px 20px; border-radius:8px;';
    
    tarjeta.appendChild(titulo);
    tarjeta.appendChild(texto);
    tarjeta.appendChild(btnSiguiente);
    tarjeta.appendChild(btnSaltar);
    overlay.appendChild(tarjeta);
    document.body.appendChild(overlay);

    function mostrarPaso() {
      if (pasoActual >= pasos.length) {
        overlay.remove();
        localStorage.setItem('franbot_tutorial_visto', 'v2');
        return;
      }
      titulo.textContent = pasos[pasoActual].titulo;
      texto.textContent = pasos[pasoActual].texto;
    }
    btnSiguiente.onclick = () => { pasoActual++; mostrarPaso(); };
    btnSaltar.onclick = () => { overlay.remove(); localStorage.setItem('franbot_tutorial_visto', 'v2'); };
    mostrarPaso();
  });
})();
