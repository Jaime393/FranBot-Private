// Simulador IFT v1.0 — Prueba numérica de ecuaciones clave
const SimuladorIFT = {
  // Simular la ecuación de Friedmann con campo ρ
  friedmann(z, Omega_m = 0.3, Omega_r = 0.0, Omega_Lambda = 0.7) {
    const H0 = 70; // km/s/Mpc
    const termino_materia = Omega_m * Math.pow(1 + z, 3);
    const termino_radiacion = Omega_r * Math.pow(1 + z, 4);
    const termino_Lambda = Omega_Lambda * Math.pow(1 + z, 3 * (1 + this.w(z)));
    const H = H0 * Math.sqrt(termino_materia + termino_radiacion + termino_Lambda);
    return H;
  },
  
  // Ecuación de estado dinámica
  w(z, epsilon = 0.15) {
    return -1 + epsilon * z / (1 + z);
  },
  
  // Onda gravitacional con corrección IFT
  h_IFT(f, h_GR = 1.0, f_ref = 100, kappa_1 = 1e-15) {
    return h_GR * (1 + kappa_1 * f / f_ref);
  },
  
  // Simular evolución temporal del campo u
  evolucionCampo(u0, dt, pasos = 100, Z_rho = 1.0, lambda = 1.0, v = 1.0) {
    const resultados = [];
    let u = u0;
    for (let i = 0; i < pasos; i++) {
      const V_prima = lambda * u * (u * u - v * v);
      const aceleracion = -V_prima / Z_rho;
      u += aceleracion * dt * dt;
      resultados.push({ paso: i, u: u, potencial: V_prima });
    }
    return resultados;
  },
  
  // Mostrar panel del simulador
  mostrarPanel() {
    let panel = document.getElementById('simulador-ift-panel');
    if (!panel) {
      panel = document.createElement('div');
      panel.id = 'simulador-ift-panel';
      panel.style.cssText = 'display:none; position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); background:#1a1f2b; color:#eee; padding:20px; border-radius:12px; z-index:2900; max-width:420px; max-height:85vh; overflow-y:auto; box-shadow:0 0 40px #000;';
      document.body.appendChild(panel);
    }
    
    // Simular algunos valores
    const w_hoy = this.w(0);
    const w_z1 = this.w(1);
    const h_100 = this.h_IFT(100);
    const campo = this.evolucionCampo(1.5, 0.1, 10);
    
    let html = '<strong>🔮 Simulador IFT</strong>';
    html += '<p style="font-size:0.85em; margin:8px 0;">Prueba numérica de ecuaciones clave</p>';
    
    html += '<div style="padding:8px; background:#252a33; border-radius:6px; margin:6px 0;">';
    html += '<strong>Ecuación de estado:</strong><br>';
    html += 'w(z=0) = ' + w_hoy.toFixed(4) + '<br>';
    html += 'w(z=1) = ' + w_z1.toFixed(4);
    html += '</div>';
    
    html += '<div style="padding:8px; background:#252a33; border-radius:6px; margin:6px 0;">';
    html += '<strong>Onda gravitacional (f=100Hz):</strong><br>';
    html += 'h/h_GR = ' + h_100.toFixed(15);
    html += '</div>';
    
    html += '<div style="padding:8px; background:#252a33; border-radius:6px; margin:6px 0;">';
    html += '<strong>Evolución del campo u:</strong><br>';
    campo.forEach(p => {
      html += 'Paso ' + p.paso + ': u=' + p.u.toFixed(4) + ' V\'(u)=' + p.potencial.toFixed(4) + '<br>';
    });
    html += '</div>';
    
    html += '<button onclick="document.getElementById(\'simulador-ift-panel\').style.display=\'none\'" style="display:block; width:100%; margin-top:12px; padding:8px; background:#a22; color:white; border:none; border-radius:4px;">Cerrar</button>';
    panel.innerHTML = html;
    panel.style.display = 'block';
  }
};

window.mostrarSimuladorIFT = function() { SimuladorIFT.mostrarPanel(); };
