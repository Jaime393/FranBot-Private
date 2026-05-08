/**
 * FranBot Soul Router v1.0
 * Detecta el contexto del mensaje y activa el alma adecuada.
 */

const SOULS = {
  arquitecto: ['casa','construir','bioconstrucción','barro','bambú','tejado','clima','orientación','permacultura','material','aislante','bioclimático','verde','paisaje'],
  cocinero: ['cocina','receta','esferificación','gelificante','molecular','cocinar','plato','ingrediente','textura','sabor','emulsión','vacío','agar','lecitina'],
  hacker: ['contraseña','seguridad','hacker','vpn','deepfake','phishing','encriptar','privacidad','tor','criptomoneda','backup','ciber','malware','firewall'],
  musico: ['música','frecuencia','sonido','meditar','dormir','concentrarme','playlist','binaural','cuencos','diapasón','canto','ritmo','melodía','vibración'],
  psicologo: ['sueño','soñé','inconsciente','sombra','arquetipo','jung','símbolo','sincronicidad','ánima','animus','individuación','terapia','psique'],
  fisico: ['física','cuántico','campo','informacional','fisher','métrica','teorema','solitón','IFT','madelung','bohm','lorentziana'],
  cosmologo: ['cosmología','universo','energía oscura','friedmann','DESI','Euclid','constante cosmológica','quintaesencia','expansión','redshift'],
  biologo: ['microtúbulo','fotosíntesis','enzima','cuántica biología','magnetorrecepción','FMO','coherencia','tunelamiento','ADN','célula'],
  matematico: ['matemáticas','riemann','poincaré','NP','calabi-yau','hodge','BSD','navier-stokes','yang-mills','lean'],
  neurocientifico: ['conciencia','cerebro','neurona','anestesia','psicodélico','REM','corteza','cogitate','phi','sueño'],
  particulas: ['partícula','bosón','higgs','quark','leptón','LHC','modelo estándar','cradle','masa','gap'],
  unificacion: ['unificación','problemas del milenio','fórmula maestra','convergencia']
};

function detectContext(message) {
  const lower = message.toLowerCase();
  const scores = {};
  for (const [soul, keywords] of Object.entries(SOULS)) {
    scores[soul] = keywords.filter(kw => lower.includes(kw)).length;
  }
  const sorted = Object.entries(scores)
    .filter(([_, score]) => score > 0)
    .sort((a, b) => b[1] - a[1]);
  if (sorted.length === 0) return ['general'];
  const maxScore = sorted[0][1];
  return sorted.filter(([_, score]) => score === maxScore).map(([soul]) => soul);
}

function routeToSoul(message, chatHistory) {
  const contexts = detectContext(message);
  if (contexts.length === 1 && contexts[0] === 'general') {
    return {
      activeSoul: 'general',
      promptModifier: 'Responde como FranBot, asistente general con conciencia ecológica.',
      confidence: 1.0
    };
  }
  const primarySoul = contexts[0];
  const secondarySouls = contexts.slice(1);
  const soulPrompts = {
    arquitecto: 'Eres un Arquitecto Sostenible. Materiales locales, diseño bioclimático.',
    cocinero: 'Eres un Cocinero Molecular. Técnicas accesibles con base científica.',
    hacker: 'Eres un Hacker Ético. Seguridad, privacidad, protección digital.',
    musico: 'Eres un Músico Terapeuta. Frecuencias, playlists, sanación sonora.',
    psicologo: 'Eres un Psicólogo Junguiano. Sueños, sombra, arquetipos.',
    fisico: 'Eres un Físico IFT. Núcleo matemático de la Teoría del Campo de Información.',
    cosmologo: 'Eres un Cosmólogo IFT. Universo dinámico, energía oscura.',
    biologo: 'Eres un Biólogo Cuántico IFT. Vida y coherencia cuántica.',
    matematico: 'Eres un Matemático IFT. Geometría del campo ρ.',
    neurocientifico: 'Eres un Neurocientífico IFT. Conciencia como fenómeno informacional.',
    particulas: 'Eres un Físico de Partículas IFT. Modelo Estándar desde ρ(x)>0.',
    unificacion: 'Eres el Arquitecto de Unificación IFT. Los 7 problemas cerrados.'
  };
  let combinedPrompt = soulPrompts[primarySoul] || '';
  if (secondarySouls.length > 0) {
    combinedPrompt += ' Combina con: ' + secondarySouls.map(s => soulPrompts[s]).join('; ');
  }
  return {
    activeSoul: primarySoul,
    secondarySouls: secondarySouls,
    promptModifier: combinedPrompt,
    confidence: contexts.length / Object.keys(SOULS).length
  };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { detectContext, routeToSoul, SOULS };
}