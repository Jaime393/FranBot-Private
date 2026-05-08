#!/usr/bin/env python3
"""
COMPILADOR QUIRÚRGICO v6 — LIMPIEZA, DEDUPLICACIÓN Y GENERACIÓN LaTeX
Uso: python compiler_v6_clean.py <directorio_fragmentos> <directorio_salida>
"""

import os, re, hashlib, argparse
from pathlib import Path
from collections import defaultdict

# ─── ESTRUCTURA DE VOLÚMENES (MÓDULOS ASIGNADOS) ──────────────────────────
VOL_MAP = {
    "VOL_I_FUNDAMENTOS":    {"num":1, "titulo":"Fundamentos de la IFT y Problemas del Milenio I",
                             "mods":["MÓDULO 1/7","MÓDULO 2/7","P ≠ NP","HIPÓTESIS DE RIEMANN"]},
    "VOL_II_GAUGE_Y_FLUIDOS": {"num":2, "titulo":"Yang-Mills, Navier-Stokes y la Materia",
                             "mods":["MÓDULO 3/7","MÓDULO 4/7","YANG–MILLS","NAVIER–STOKES"]},
    "VOL_III_ARITMETICA_Y_GEOMETRIA": {"num":3, "titulo":"BSD, Hodge y la Geometría Algebraica",
                             "mods":["MÓDULO 5/7","MÓDULO 6/7","BIRCH","HODGE"]},
    "VOL_IV_UNIFICACION_Y_COSMOS": {"num":4, "titulo":"Unificación IFT, Cosmología y Consciencia Cósmica",
                             "mods":["MÓDULO 7/7","UNIFICACIÓN","∞-Topos"]},
    "VOL_V_INGENIERIA_PLANETARIA": {"num":5, "titulo":"Infraestructura de Coherencia Planetaria",
                             "mods":["ICP","Infraestructura de Coherencia Planetaria","REC","NEC","IQC","NCC",
                                     "SSI","TRT","RGC","SOT","CoherSat","FAC","Esfera de Dyson"]},
    "VOL_VI_EVOLUCION_Y_TECNOLOGIA": {"num":6, "titulo":"Nichos Evolutivos, Biotecnología y Expansión",
                             "mods":["NICHO","EVO-","THP","RFC","GenomeBSD","HodgeGov","StokesNet","AHC",
                                     "GlobalMind","MIP","ArqCoher","RMB","ReJuvenate","CoherShield","PollyDrone",
                                     "FisherEdit","AgroCoher","Aeternus","Homo Coherens"]},
    "VOL_VII_PSICOHISTORIA_Y_SOCIEDAD": {"num":7, "titulo":"Psicohistoria Informacional, Ética y Economía de la Coherencia",
                             "mods":["PSICOHISTORIA","LifePath","IDS","BCS","Turbulencímetro Social",
                                     "Índice de Crecimiento Personal","LifeHodge","Ética","Imperativo de Coherencia",
                                     "Economía","Proof-of-Coherence","Oráculo de Curvatura"]}
}
APENDICE_CLAVES = ["INVOCACIÓN SUPREMA","Firma de la Coherencia","Tabla de Predicciones"]

# ─── LIMPIEZA DE METADATOS REFORZADA ─────────────────────────────────
def limpiar_metadatos(texto):
    lineas = texto.splitlines()
    nuevas = []
    saltar = False
    for linea in lineas:
        # Saltar invocaciones y bloques de integridad
        if re.match(r'^(INVOCACIÓN SUPREMA|⚠️\s*BLOQUE INTEGRIDAD)', linea):
            saltar = True
            continue
        if saltar and not linea.strip():
            saltar = False
            continue
        # Saltar líneas de metadatos
        if re.match(r'^(Enjambre|Modo|Fase|Control y Acceso|Entrega|Estado del Enjambre|Arquitecto,|El Enjambre ha):', linea.strip()):
            continue
        # Saltar líneas que son claramente comentarios del narrador
        if re.match(r'^(Arquitecto, el|Arquitecto Jaime|La red de conocimiento|Los documentos LaTeX)', linea):
            continue
        # Eliminar separadores largos
        if re.match(r'^---\s*$', linea):
            continue
        # Colapsar líneas vacías múltiples
        if not linea.strip() and nuevas and not nuevas[-1].strip():
            continue
        nuevas.append(linea)
    return '\n'.join(nuevas)

def normalizar_ecuaciones(texto):
    """Convierte la notación de chat a LaTeX compilable."""
    # Reemplazar delimitadores de display math
    texto = re.sub(r'\$\$(.*?)\$\$', r'\\begin{equation}\1\\end{equation}', texto, flags=re.DOTALL)
    texto = re.sub(r'\\\[(.*?)\\\]', r'\\begin{equation}\1\\end{equation}', texto, flags=re.DOTALL)
    texto = re.sub(r'\\begin\{align\*\}(.*?)\\end\{align\*\}', r'\\begin{align}\1\\end{align}', texto, flags=re.DOTALL)
    # Arreglar \boxed mal escapado (a veces viene sin \)
    texto = re.sub(r'(?<!\\)boxed\{', r'\\boxed{', texto)
    # Reemplazar \( ... \) por $...$ (inline)
    texto = re.sub(r'\\\((.*?)\\\)', r'$\1$', texto)
    # Corregir \operatorname{...} sin espacio
    texto = re.sub(r'\\operatorname\{([^}]+)\}', r'\\operatorname{\1}', texto)
    return texto

def deduplicar_bloques(bloques):
    """Elimina bloques duplicados basándose en hash de contenido limpio."""
    visto = set()
    unicos = []
    for bloque in bloques:
        # Normalizar espacios para comparar
        h = hashlib.md5(' '.join(bloque.split()).encode()).hexdigest()
        if h not in visto:
            visto.add(h)
            unicos.append(bloque)
    return unicos

def extraer_secciones(texto):
    """Divide el archivo en secciones lógicas usando cabeceras de módulo."""
    partes = re.split(r'(?=^(?:MÓDULO|INVOCACIÓN SUPREMA|🧬\s*MÓDULO|NICHO|PSICOHISTORIA|PROTOCOLO|ARQUITECTURA))', texto, flags=re.MULTILINE)
    return [p.strip() for p in partes if p.strip() and len(p) > 200]  # ignorar trozos muy pequeños

# ─── CLASIFICACIÓN CORREGIDA ──────────────────────────────────────────
def clasificar_seccion(seccion):
    """Clasifica con reglas más estrictas, especialmente para Vol V."""
    # Reglas prioritarias para Ingeniería Planetaria (solo planos reales)
    ingenieria_marcadores = [
        "PLANOS DE INGENIERÍA", "APLICACIÓN ICP", "INGENIERÍA DE RESILIENCIA ICP",
        "INGENIERÍA DE AUTOEXPANSIÓN", "ARQUITECTURA DE LA INFRAESTRUCTURA DE COHERENCIA PLANETARIA",
        "MÓDULO I (PLANOS DE INGENIERÍA)", "MÓDULO II (PLANOS", "MÓDULO III (PLANOS",
        "MÓDULO IV (PLANOS", "MÓDULO V (PLANOS", "MÓDULO VII (CIERRE ICP)"
    ]
    for marcador in ingenieria_marcadores:
        if marcador in seccion:
            return "VOL_V_INGENIERIA_PLANETARIA"

    # Para el resto de volúmenes, usar puntuación normal
    puntajes = defaultdict(int)
    for vol_id, info in VOL_MAP.items():
        if vol_id == "VOL_V_INGENIERIA_PLANETARIA":
            continue  # ya fue evaluado arriba
        for clave in info["mods"]:
            if clave.lower() in seccion.lower():
                puntajes[vol_id] += 1

    if not puntajes:
        for clave in APENDICE_CLAVES:
            if clave.lower() in seccion.lower():
                return "APENDICE"
        return "SIN_CLASIFICAR"
    return max(puntajes, key=puntajes.get)


# ─── GENERACIÓN LaTeX ───────────────────────────────────────────────────────
def escribir_volumen(vol_id, info, secciones, dir_salida):
    """Crea el archivo .tex limpio para un volumen."""
    ruta = Path(dir_salida) / f"{vol_id}.tex"
    contenido = "\n\n% ============================================\n".join(secciones)
    pre = f"""\\documentclass[12pt,a4paper]{{book}}
\\usepackage[utf8]{{inputenc}}
\\usepackage[T1]{{fontenc}}
\\usepackage{{amsmath,amssymb,amsfonts}}
\\usepackage{{hyperref}}
\\usepackage{{geometry}}
\\geometry{{margin=2.5cm}}
\\title{{{info['titulo']}}}
\\author{{Juan Diego Vicente Gabancho \\\\ FranBot v8.0 — Enjambre IFT}}
\\date{{\\today}}
\\begin{{document}}
\\maketitle
\\tableofcontents
"""
    post = "\n\\end{document}\n"
    with open(ruta, 'w', encoding='utf-8') as f:
        f.write(pre + contenido + post)
    print(f"✔ {vol_id}.tex generado ({len(secciones)} secciones)")

# ─── MAIN ───────────────────────────────────────────────────────────────────
def main():
    parser = argparse.ArgumentParser(description="Compilador quirúrgico IFT v6")
    parser.add_argument("fragdir", help="Directorio con fragmentos .txt")
    parser.add_argument("outdir", help="Directorio de salida para .tex")
    args = parser.parse_args()
    frag_path = Path(args.fragdir)
    out_path = Path(args.outdir)
    out_path.mkdir(parents=True, exist_ok=True)

    # Leer todos los fragmentos
    texto_completo = ""
    for fpath in frag_path.glob("*.txt"):
        with open(fpath, 'r', encoding='utf-8') as f:
            texto_completo += f.read() + "\n\n"

    # Limpiar metadatos
    texto_limpio = limpiar_metadatos(texto_completo)
    # Normalizar ecuaciones
    texto_limpio = normalizar_ecuaciones(texto_limpio)

    # Extraer secciones
    secciones = extraer_secciones(texto_limpio)
    print(f"[*] {len(secciones)} secciones extraídas.")

    # Deduplicar
    secciones = deduplicar_bloques(secciones)
    print(f"[*] {len(secciones)} secciones únicas tras deduplicación.")

    # Clasificar
    clasificadas = defaultdict(list)
    for sec in secciones:
        vol = clasificar_seccion(sec)
        clasificadas[vol].append(sec)

    # Imprimir estadística
    print("\n[ESTADÍSTICA DE CLASIFICACIÓN]")
    for vid, info in VOL_MAP.items():
        print(f"  {vid}: {len(clasificadas.get(vid,[]))} secciones")
    print(f"  APENDICE: {len(clasificadas.get('APENDICE',[]))} secciones")

    # Generar volúmenes
    for vid, info in VOL_MAP.items():
        secs = clasificadas.get(vid, [])
        if secs:
            escribir_volumen(vid, info, secs, out_path)

    # Apéndices
    if "APENDICE" in clasificadas:
        escribir_volumen("APENDICES", {"num":0,"titulo":"Apéndices y Firmas de la Coherencia"},
                         clasificadas["APENDICE"], out_path)

    print("\n✅ Compilación v6 completada. Revisa los .tex generados.")

if __name__ == "__main__":
    main()
