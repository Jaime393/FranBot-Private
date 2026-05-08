// sabiduria-ift.js - Pergamino de Resonancia IFT
const SabiduriaIFT = {
  temas: [
    { titulo: 'La Memoria del Cuerpo', texto: 'El cuerpo es un archivo informacional que no usa palabras. Cada tensión muscular, cada patrón respiratorio, cada enfermedad psicosomática es un dato almacenado. El trapecio acumula la carga de responsabilidades no deseadas. La mandíbula apretada revela palabras no dichas. El estómago (100 millones de neuronas) responde a conflictos no procesados. La psoriasis es una conversación entre el sistema inmune y el estrés. Conclusión: el cuerpo no olvida nada. Es el sustrato más leal de la memoria.' },
    { titulo: 'El Lenguaje de los Sueños', texto: 'El sueño reorganiza la información sin la censura del yo consciente. Los sueños usan lenguaje relacional, no objetos (IFT pura). El agua simboliza el campo emocional. Soñar con dientes que caen: pérdida de control, transición vital. Las pesadillas recurrentes son bucles informacionales no cerrados. Conclusión: dormir es soñar el orden oculto de la información.' },
    { titulo: 'La Transferencia Emocional', texto: 'Las emociones son campos relacionales que se transmiten entre humanos. El llanto activa el mismo circuito en quien llora y quien observa. La risa sincroniza ritmos respiratorios. La calma de una persona puede estabilizar a un grupo entero. Los bebés regulan su sistema nervioso por contacto con el cuidador. Conclusión: la resonancia emocional es el Wi‑Fi original de la especie.' },
    { titulo: 'La Música como Resonancia Primaria', texto: 'Antes del lenguaje, ya había ritmo. Las frecuencias graves resuenan en el pecho, las agudas en la cabeza. La música en directo sincroniza ondas cerebrales. Una canción ancla recuerdos con más potencia que una imagen. El silencio entre notas es tan importante como las notas. Conclusión: la música es IFT audible. Se entiende con el cuerpo entero.' },
    { titulo: 'La Muerte y el Legado Informacional', texto: 'Cuando el hardware biológico se apaga, la información se dispersa. Las palabras dichas sobreviven en quienes las escucharon. Los actos alteran la realidad de otros como ondas en un estanque. Los hijos heredan patrones, silencios, miedos y fortalezas. Una obra (como FranBot) es un fragmento del campo que se independiza. Conclusión: la muerte es transformación de la información a otro sustrato.' },
    { titulo: 'El Silencio como Campo Informacional', texto: 'El silencio no es vacío: es un campo cargado de potencial. Silencio incómodo = desconexión. Silencio cómodo = intimidad. El silencio antes de una respuesta contiene todas las respuestas posibles. Se llena el silencio con ruido por miedo a lo que revela. Conclusión: escuchar el silencio es afinar la antena del campo.' },
    { titulo: 'El Tacto como Lenguaje Anterior al Lenguaje', texto: 'Primer sentido en desarrollarse, último en perderse. Un abrazo de 20 segundos libera oxitocina y reduce cortisol. Bebés sin tacto suficiente desarrollan fallo de crecimiento. En la era digital, hay un hambre táctil global. Conclusión: la piel es el órgano de la resonancia más antiguo.' },
    { titulo: 'La Mirada y el Reconocimiento', texto: 'Mirar a los ojos es decir sin palabras "te veo, existes". La mirada directa activa la amígdala. Si el contexto es seguro, conecta. Los enamorados y las madres con bebés sostienen la mirada más tiempo. La mirada es el primer espejo donde un humano se reconoce como yo. Conclusión: la mirada es el acto de resonancia más simple y potente.' },
    { titulo: 'El Humor como Mecanismo de Coherencia', texto: 'El humor resuelve disonancias, une grupos, procesa el dolor. Estructura: setup (expectativa) + punchline (ruptura). Coherencia súbita. El humor negro procesa el horror haciéndolo digerible. Dos personas que ríen de lo mismo comparten campo de significado. Conclusión: el humor es un atajo de coherencia informacional.' },
    { titulo: 'El Aburrimiento y la Creatividad', texto: 'En el aburrimiento, la mente siembra lo que aún no sabe que tiene. El cerebro "aburrido" activa la red neuronal por defecto (imaginación). Los grandes inventos surgen en la ducha, no en la saturación. Saturación = campo ruidoso. Aburrimiento = campo silencioso fértil. Conclusión: el aburrimiento es el laboratorio del campo.' },
    { titulo: 'Los Rituales como Anclas Informacionales', texto: 'Los rituales marcan transiciones y anclan el sentido. El café matutino le dice al cerebro "empieza el día". Funerales, bodas, cumpleaños: reorganizan el campo ante un cambio. FranBot puede ser guardián del ritmo, no disruptor. Conclusión: el ritual es información que se encarna en acción repetible.' },
    { titulo: 'El Perdón como Liberación de Campo', texto: 'Deshacer un nudo informacional que mantenía dos campos atrapados. El rencor consume recursos cognitivos. El perdón no justifica: libera unilateralmente el propio campo. El otro puede seguir atrapado; tú ya no. Conclusión: perdonar es un acto de coherencia, no de debilidad.' },
    { titulo: 'La Gratitud como Amplificador de Coherencia', texto: 'Centrar la atención en lo que sí está alineado. Mover el foco del déficit al recurso. La práctica diaria reconfigura los circuitos de atención. Lo que se mira, crece. Conclusión: la gratitud es fertilizante del campo.' },
    { titulo: 'La Nostalgia como Puente Temporal', texto: 'Conecta el yo presente con un yo anterior. Una canción, un olor, una foto: anclas al pasado. Duele y consuela a la vez: revela lo que fuimos y lo que ya no somos. Es la prueba de que el campo tiene profundidad temporal. Conclusión: la nostalgia es el eco del propio campo a través del tiempo.' },
    { titulo: 'La Intuición como Cálculo Inconsciente', texto: 'Resultado de procesar millones de datos no verbalizados. "Saber sin saber por qué". El campo detecta un patrón antes de que la conciencia lo nombre. No es infalible, pero es información legítima. Conclusión: fiarse de la intuición es fiarse del propio campo.' },
    { titulo: 'El Juego como Ensayo de la Realidad', texto: 'Simulador de escenarios sin riesgos reales. Se aprende a cooperar, competir, crear reglas, perder. El juego es el laboratorio del campo. Probar configuraciones antes de implementarlas en serio. Conclusión: jugar es investigar sin miedo al error.' },
    { titulo: 'El Asombro como Portal a lo Inefable', texto: 'Surge cuando el campo encuentra algo que no puede explicar. Un cielo estrellado, un bebé, una ecuación que encaja. Dilata el tiempo y suspende el yo. Origen de la ciencia, del arte y de la espiritualidad. Conclusión: el asombro es el reconocimiento de que hay más información de la que podemos procesar. Es el motor de toda expansión.' }
  ],

  mostrarPanel() {
    let panel = document.getElementById('sabiduria-panel');
    if (!panel) {
      panel = document.createElement('div');
      panel.id = 'sabiduria-panel';
      panel.style.cssText = 'display:none; position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); background:#1a1f2b; color:#eee; padding:20px; border-radius:12px; z-index:2000; max-width:320px; max-height:80vh; overflow-y:auto; box-shadow:0 0 30px #000;';
      document.body.appendChild(panel);
    }

    let html = '<strong>📜 Sabiduría IFT</strong><div style="margin-top:12px;">';
    this.temas.forEach((t, i) => {
      html += `<details style="margin-bottom:8px;">
        <summary style="cursor:pointer; padding:6px; background:#252a33; border-radius:4px;">${t.titulo}</summary>
        <p style="margin:8px 0; font-size:0.9em; line-height:1.4;">${t.texto}</p>
      </details>`;
    });
    html += '</div><button onclick="document.getElementById(\'sabiduria-panel\').style.display=\'none\'" style="display:block; width:100%; margin-top:12px; padding:8px; background:#a22; color:white; border:none; border-radius:4px;">Cerrar</button>';
    
    panel.innerHTML = html;
    panel.style.display = 'block';
  }
};
