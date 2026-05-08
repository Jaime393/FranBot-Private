// IFT Módulos Expandidos — Los 14 módulos de la teoría
const IFTModulos = {
  // Módulo 1: Cosmología Dinámica
  cosmologia: {
    titulo: "🌌 Cosmología IFT",
    ecuacion: "w(z) = -1 + ε·z/(1+z), ε ≈ 0.12–0.18",
    prediccion: "DESI DR2 (2024) prefiere w ≠ -1 a 2.5σ. Euclid (2025-2030) será decisivo.",
    friedmann: "H² = (8πG/3)(ρ_m + ρ_r + ρ_ρ) - k/a² + Λ₀/3",
    estado: "Predicción testeable — verificable esta década"
  },
  
  // Módulo 2: Ondas Gravitacionales
  ondas: {
    titulo: "🌊 Ondas Gravitacionales IFT",
    ecuacion: "h(f) = h_GR(f)[1 + κ₁·f/f_ref], κ₁ ∼ 10⁻¹⁵",
    detector: "Einstein Telescope / Cosmic Explorer (2025-2035)",
    estado: "Cotas LIGO no descartan. Tercera generación será definitiva."
  },
  
  // Módulo 3: Mecanismo Entrópico de Masa
  masa: {
    titulo: "⚛️ Masa como Entropía",
    ecuacion: "M = m_P · e^{-S/2}",
    explicacion: "Solitones compactos (baja entropía) = partículas masivas. Solitones extendidos (alta entropía) = partículas ligeras.",
    estado: "Jerarquía de masas cualitativamente reproducida. Valores específicos no derivados aún."
  },
  
  // Módulo 4: Yang-Mills y Mass Gap
  yangMills: {
    titulo: "🔷 Yang-Mills IFT",
    ecuacion: "|⟨γ⟩| ≤ e^{-A₀ m_u · diam(γ) - B₀|γ|}",
    estado: "Teoremas parciales demostrados. Mass gap NO resuelto. Problema Clay abierto.",
    ruta: "Regulador u > 0 + expansión de clustering + límite continuo uniforme"
  },
  
  // Módulo 5: Conciencia (Φ_IFT)
  conciencia: {
    titulo: "🧠 Conciencia como Autopresencia",
    ecuacion: "Φ_IFT = ∫ w(x)[α_I ρ ln(ρ/ρ_base)/ρ_* + α_F ℓ²_F Tr(κ_F) + α_C I_causal] dV",
    criterio: "Φ_IFT > Φ_c ∧ τΞ > K",
    validacion: "Consistente con Cogitate (2025). Tests con anestesia, REM y psicodélicos en curso."
  },
  
  // Módulo 6: Biología Cuántica
  biologia: {
    titulo: "🧬 Biología Cuántica IFT",
    ecuacion: "J_IFT(ω) = J₀(ω/ω_c)^s e^{-ω/ω_c}, s = 1 + D_f",
    prediccion: "τ_φ · ω_c ≈ K_Q",
    validacion: "FMO a temperatura ambiente (Cao 2024), enzimas (Klinman 2025), MagR (Xie 2025)"
  },
  
  // Módulo 7: Termodinámica Informacional
  termodinamica: {
    titulo: "🔥 Termodinámica IFT",
    ecuacion: "T_{info} = (∂S/∂E)^{-1} ∼ (ℏc/k_B)·(1/L_{info})",
    teorema: "Teorema H: dS/dt ≥ 0 para flujo gradiente",
    temperatura: "T_info = (∂S/∂E)^{-1} ∼ (ℏc/k_B)·(1/L_info)",
    conexion: "Conecta con temperatura de Hawking de agujeros negros"
  }
};

// Función para mostrar panel de Módulos IFT
function mostrarModulosIFT() {
  let panel = document.getElementById('ift-modulos-panel');
  if (!panel) {
    panel = document.createElement('div');
    panel.id = 'ift-modulos-panel';
    panel.style.cssText = 'display:none; position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); background:#1a1f2b; color:#eee; padding:20px; border-radius:12px; z-index:2800; max-width:400px; max-height:85vh; overflow-y:auto; box-shadow:0 0 40px #000;';
    document.body.appendChild(panel);
  }
  
  let html = '<strong>🔬 Módulos IFT — ρ(x) > 0</strong>';
  html += '<p style="font-size:0.85em; margin:8px 0;">Los 14 módulos de la Information Field Theory</p>';
  
  for (const [clave, modulo] of Object.entries(IFTModulos)) {
    html += '<details style="margin:6px 0; padding:8px; background:#252a33; border-radius:6px;">';
    html += '<summary style="cursor:pointer; font-weight:bold;">' + modulo.titulo + '</summary>';
    html += '<p style="font-size:0.8em; margin:6px 0;"><strong>Ecuación:</strong> ' + modulo.ecuacion + '</p>';
    if (modulo.prediccion) html += '<p style="font-size:0.8em; margin:4px 0;"><strong>Predicción:</strong> ' + modulo.prediccion + '</p>';
    if (modulo.estado) html += '<p style="font-size:0.8em; margin:4px 0;"><strong>Estado:</strong> ' + modulo.estado + '</p>';
    if (modulo.validacion) html += '<p style="font-size:0.8em; margin:4px 0;"><strong>Validación:</strong> ' + modulo.validacion + '</p>';
    if (modulo.criterio) html += '<p style="font-size:0.8em; margin:4px 0;"><strong>Criterio:</strong> ' + modulo.criterio + '</p>';
    html += '</details>';
  }
  
  html += '<button onclick="document.getElementById(\'ift-modulos-panel\').style.display=\'none\'" style="display:block; width:100%; margin-top:12px; padding:8px; background:#a22; color:white; border:none; border-radius:4px;">Cerrar</button>';
  panel.innerHTML = html;
  panel.style.display = 'block';
}

// Exponer globalmente
window.mostrarModulosIFT = mostrarModulosIFT;

// Conexiones entre módulos IFT (generadas por el Enjambre)
IFTModulos.conexiones = {
  "Cosmología → Gravedad": "La ecuación de Friedmann usa la densidad del campo ρ. Las ondas gravitacionales llevan la firma de w(z).",
  "Gravedad → Masa": "La cota espectral m_n ≥ C(ℏ/c)√⟨Ξ²⟩_n conecta la geometría informacional con la masa de partículas.",
  "Masa → Yang-Mills": "El regulador u > 0 es el mismo campo que da masa a los solitones. El mecanismo entrópico se aplica a glueballs.",
  "Yang-Mills → Conciencia": "El funcional Φ_IFT usa la misma estructura de campo que el regulador YM. La conciencia emerge de campos altamente coherentes.",
  "Conciencia → Biología": "El criterio τΞ > K aparece tanto en conciencia como en coherencia FMO. Es una constante universal.",
  "Biología → Termodinámica": "La protección de coherencia (J_IFT) es un flujo gradiente. El teorema H garantiza que la coherencia crece.",
  "Termodinámica → Cosmología": "La temperatura informacional T_info ∼ ℏc/(k_B L_info) conecta la escala local con la temperatura de Hawking y la radiación cósmica."
};

// Función para mostrar las conexiones
IFTModulos.mostrarConexiones = function() {
  let html = '<strong>🔗 Conexiones entre Módulos IFT</strong><br>';
  for (const [conexion, descripcion] of Object.entries(this.conexiones)) {
    html += '<p style="font-size:0.8em; margin:6px 0; padding:6px; background:#252a33; border-radius:4px;"><strong>' + conexion + '</strong><br>' + descripcion + '</p>';
  }
  return html;
};
