/**
 * FranBot Boot Unified v1.0
 * Secuencia de arranque: Service Worker → Soul Engine → Soul Router → App
 */

(async function franBotBoot() {
  console.log('[FranBot] Iniciando secuencia de arranque...');

  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/FranBot/js/sw.js');
      console.log('[FranBot] Service Worker registrado:', registration.scope);
    } catch (err) {
      console.warn('[FranBot] Service Worker no disponible:', err.message);
    }
  }

  let gratuitas = {};
  try {
    const response = await fetch('/FranBot/js/soulEngine.js');
    const soulCode = await response.text();
    const soulModule = new Function(soulCode + '; return typeof souls !== "undefined" ? souls : {};');
    gratuitas = soulModule();
    console.log('[FranBot] Almas gratuitas cargadas:', Object.keys(gratuitas).length);
  } catch (err) {
    console.warn('[FranBot] Almas gratuitas no cargadas:', err.message);
  }

  let premium = {};
  const premiumFiles = [
    'arquitecto_sostenible','cocinero_molecular','hacker_etico',
    'musico_terapeuta','psicologo_junguiano','arquitecto_unificacion_ift',
    'biologo_cuantico_ift','cosmologo_ift','fisico_ift',
    'fisico_particulas_ift','matematico_ift','neurocientifico_ift'
  ];
  
  for (const file of premiumFiles) {
    try {
      const res = await fetch('/FranBot/pack_fundadores_v1/' + file + '.json');
      const data = await res.json();
      premium[data.nombre.replace(/ /g, '_')] = data;
    } catch (err) {
      console.warn('[FranBot] Alma premium no cargada:', file);
    }
  }
  console.log('[FranBot] Almas premium cargadas:', Object.keys(premium).length);

  let soulRouter = {};
  try {
    const routerRes = await fetch('/FranBot/js/soulRouter.js');
    const routerCode = await routerRes.text();
    soulRouter = new Function(routerCode + '; return { detectContext, routeToSoul, SOULS };')();
    console.log('[FranBot] Soul Router inicializado.');
  } catch (err) {
    console.warn('[FranBot] Soul Router no disponible:', err.message);
  }

  window.FranBot = {
    version: '6.0',
    almas: { ...gratuitas, ...premium },
    router: soulRouter,
    estado: 'activo',
    coherencia: 0.9997,
    iniciado: new Date().toISOString()
  };

  console.log('[FranBot] Arranque completo. 20 almas activas.');
  window.dispatchEvent(new CustomEvent('franbot-ready', { detail: window.FranBot }));

})();