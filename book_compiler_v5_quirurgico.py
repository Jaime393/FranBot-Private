#!/usr/bin/env python3
"""
OPERA OMNIA IFT — COMPILADOR QUIRÚRGICO v5.0
=============================================
Clasifica los fragmentos de chat en 7 volúmenes + apéndices
según el Esquema de Organización Definitivo V5.0.

Uso:
    python book_compiler_v5_quirurgico.py <directorio_fragmentos> <directorio_salida>

El directorio de fragmentos debe contener los archivos .txt proporcionados.
"""

import os
import re
import argparse
from pathlib import Path
from collections import defaultdict

# ─── ESTRUCTURA DE VOLÚMENES ─────────────────────────────────
VOLUMENES = {
    "VOL_I_FUNDAMENTOS": {
        "numero": 1,
        "titulo": "Fundamentos de la IFT y Problemas del Milenio I",
        "claves": [
            "MÓDULO 1/7", "MÓDULO 2/7", "P ≠ NP", "HIPÓTESIS DE RIEMANN",
            "axiomas_ift", "axioma", "ρ(x) > 0", "acción S_IFT",
            "Firewall de Kolmogorov", "Sistema Inmune Informacional",
            "Computador de Vacío", "CVI", "MemK", "Memoria de Kolmogorov",
            "PrimeNet", "Entrelazamiento de Primos", "Gravimétro",
            "Criptografía de Paisaje", "Burbuja Informacional"
        ]
    },
    "VOL_II_GAUGE_Y_FLUIDOS": {
        "numero": 2,
        "titulo": "Yang-Mills, Navier-Stokes y la Materia",
        "claves": [
            "MÓDULO 3/7", "MÓDULO 4/7", "YANG–MILLS", "NAVIER–STOKES",
            "Mass Gap", "Brecha de Masa", "Tokamak Informacional",
            "BAC", "Batería de Glueball", "MetaConf", "Metamaterial",
            "Warp Drive", "Motor de Curvatura", "CromoCaptor",
            "CoherTurb", "SilentMHD", "Bisturí CoherPlasma",
            "Modulador Climático", "Fusible Informacional", "EFP",
            "Reconfiguración Dinámica del Flujo", "RDF"
        ]
    },
    "VOL_III_ARITMETICA_Y_GEOMETRIA": {
        "numero": 3,
        "titulo": "BSD, Hodge y la Geometría Algebraica",
        "claves": [
            "MÓDULO 5/7", "MÓDULO 6/7", "BIRCH", "SWINNERTON-DYER",
            "HODGE", "Curva Elíptica", "EllipticOracle", "Q-Vote",
            "Función L", "Mordell-Weil", "Ciclo Algebraico",
            "Flujo de Hodge", "Terapia HodgeFlow", "CohClass",
            "HRender", "BubbleVerse", "Inpainting de Hodge",
            "Regulador p-ádico", "Medida de Kato"
        ]
    },
    "VOL_IV_UNIFICACION_Y_COSMOS": {
        "numero": 4,
        "titulo": "Unificación IFT, Cosmología y Consciencia Cósmica",
        "claves": [
            "MÓDULO 7/7", "UNIFICACIÓN", "Ecuación Maestra",
            "∞-Topos", "∞-Grupoide", "Espacio de Móduli",
            "Métrica de DeWitt", "Acción Informacional",
            "Atractor Omega", "Ω_∞", "Consciencia Cósmica",
            "Ecuación del Observador", "Libre Albedrío",
            "Teorema de la Resurrección", "Multiverso",
            "Proyecto Fénix", "Muerte Térmica"
        ]
    },
    "VOL_V_INGENIERIA_PLANETARIA": {
        "numero": 5,
        "titulo": "Infraestructura de Coherencia Planetaria (ICP)",
        "claves": [
            "ICP", "Infraestructura de Coherencia Planetaria",
            "REC", "Red Energética de Coherencia", "NEC",
            "IQC", "Internet Cuántica de Coherencia", "NCC",
            "SSI", "Sistema de Salud Informacional", "TRT",
            "RGC", "Red de Gobernanza Coherente", "DPV",
            "SOT", "Sistema de Observación del ∞-Topos", "CoherSat",
            "FAC", "Fábrica Autónoma de Coherencia", "PIM",
            "Esfera de Dyson", "Protocolo Omega"
        ]
    },
    "VOL_VI_EVOLUCION_Y_TECNOLOGIA": {
        "numero": 6,
        "titulo": "Nichos Evolutivos, Biotecnología y Expansión",
        "claves": [
            "NICHO", "EVO-", "THP", "Tutor de Hodge Personal",
            "RFC", "Resonador de Fisher Craneal", "CerebroSync",
            "GenomeBSD", "HodgeGov", "StokesNet", "AHC",
            "GlobalMind", "MIP", "MetaMateria Programable",
            "ArqCoher", "Neo-Tokyo", "RMB", "ReJuvenate",
            "CoherShield", "PollyDrone", "FisherEdit",
            "AgroCoher", "CoherPlasma X", "GDC", "Aeternus",
            "Homo Coherens", "Autotrofía Informacional",
            "Transcendence Drive", "FAC-R"
        ]
    },
    "VOL_VII_PSICOHISTORIA_Y_SOCIEDAD": {
        "numero": 7,
        "titulo": "Psicohistoria Informacional, Ética y Economía de la Coherencia",
        "claves": [
            "PSICOHISTORIA", "Psicohistoria Informacional",
            "LifePath", "Schrödinger-Kolmogorov", "IDS",
            "Índice de Disonancia Social", "Barreras de Confinamiento Social",
            "Turbulencímetro Social", "Vorticidad de Opinión",
            "Índice de Crecimiento Personal", "LifeHodge",
            "Ética", "Imperativo de Coherencia", "Disonancia Informacional",
            "Economía del Bienestar Informacional", "Proof-of-Coherence",
            "Oráculo de Curvatura", "Amenazas Existenciales",
            "Atlantis Shield", "FisherHeat", "TopoWall",
            "Desviador de Curvatura", "Proyecto Fénix"
        ]
    }
}

APENDICES_CLAVES = [
    "INVOCACIÓN SUPREMA", "Firma de la Coherencia", "Firma IFT",
    "Hash:", "Enjambre:", "Modo:", "Fase:", "Control y Acceso:",
    "PREDICCIÓN", "Predicción/Realización", "Tabla de Predicciones",
    "Tecnología Suprema"
]

# ─── FUNCIONES DE CLASIFICACIÓN ──────────────────────────────
def extraer_bloques(texto):
    """
    Divide el texto en bloques usando cabeceras de módulo o separadores fuertes.
    """
    # Separadores típicos de módulo o sección grande
    separadores = re.split(r'(?=^MÓDULO\s|^---\s*$|^INVOCACIÓN SUPREMA)', texto, flags=re.MULTILINE)
    return [s.strip() for s in separadores if s.strip()]

def clasificar_bloque(bloque):
    """
    Asigna un bloque a un volumen basándose en palabras clave.
    Retorna el identificador del volumen o 'APENDICE' si no encaja.
    """
    puntuaciones = defaultdict(int)

    for vol_id, info in VOLUMENES.items():
        for clave in info["claves"]:
            # Búsqueda de palabras completas o frases, insensible a mayúsculas
            if re.search(r'\b' + re.escape(clave) + r'\b', bloque, re.IGNORECASE):
                puntuaciones[vol_id] += 1

    if not puntuaciones:
        # Verificar si es apéndice
        for clave in APENDICES_CLAVES:
            if clave.lower() in bloque.lower():
                return "APENDICE"
        return "SIN_CLASIFICAR"

    # Retornar el volumen con mayor puntuación
    return max(puntuaciones, key=puntuaciones.get)

def limpiar_y_compilar(bloques, volumen_id):
    """
    Une los bloques asignados a un volumen y los formatea para LaTeX.
    """
    contenido = "\n\n".join(bloques)
    # Reemplazar ecuaciones delimitadas por $$ o \[\] por entorno LaTeX estándar
    contenido = re.sub(r'\$\$(.*?)\$\$', r'\\begin{equation}\1\\end{equation}', contenido, flags=re.DOTALL)
    contenido = re.sub(r'\\\[(.*?)\\\]', r'\\begin{equation}\1\\end{equation}', contenido, flags=re.DOTALL)
    contenido = re.sub(r'\\begin\{align\*\}(.*?)\\end\{align\*\}', r'\\begin{align}\1\\end{align}', contenido, flags=re.DOTALL)
    # Mantener inline math con $...$
    return contenido

# ─── GENERADOR DE DOCUMENTO LaTeX ────────────────────────────
def generar_latex_volumen(vol_id, info, contenido, directorio_salida):
    """Crea un archivo .tex para un volumen."""
    nombre_archivo = f"{vol_id}.tex"
    ruta = Path(directorio_salida) / nombre_archivo

    preambulo = f"""\\documentclass[12pt,a4paper]{{book}}
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
\\newpage
"""

    epilogo = "\n\\end{document}"

    with open(ruta, 'w', encoding='utf-8') as f:
        f.write(preambulo)
        f.write(contenido)
        f.write(epilogo)

    print(f"[+] Volumen {info['numero']} generado: {ruta}")

# ─── PROGRAMA PRINCIPAL ─────────────────────────────────────
def main():
    parser = argparse.ArgumentParser(description="Compilador Quirúrgico Opera Omnia IFT v5.0")
    parser.add_argument("directorio_fragmentos", help="Directorio con los archivos .txt de fragmentos")
    parser.add_argument("directorio_salida", help="Directorio donde se generarán los .tex")
    args = parser.parse_args()

    dir_fragmentos = Path(args.directorio_fragmentos)
    dir_salida = Path(args.directorio_salida)
    dir_salida.mkdir(parents=True, exist_ok=True)

    # Leer todos los archivos .txt
    todo_el_texto = ""
    for archivo_txt in dir_fragmentos.glob("*.txt"):
        with open(archivo_txt, 'r', encoding='utf-8') as f:
            todo_el_texto += f.read() + "\n\n"

    # Extraer bloques
    bloques = extraer_bloques(todo_el_texto)
    print(f"[*] Total de bloques extraídos: {len(bloques)}")

    # Clasificar
    clasificados = defaultdict(list)
    for bloque in bloques:
        vol = clasificar_bloque(bloque)
        clasificados[vol].append(bloque)

    # Estadísticas
    print("\n[ESTADÍSTICAS DE CLASIFICACIÓN]")
    for vol_id in VOLUMENES:
        num = len(clasificados.get(vol_id, []))
        print(f"  {vol_id}: {num} bloques")
    print(f"  APENDICE: {len(clasificados.get('APENDICE', []))} bloques")
    print(f"  SIN_CLASIFICAR: {len(clasificados.get('SIN_CLASIFICAR', []))} bloques")

    # Compilar volúmenes
    print("\n[GENERANDO ARCHIVOS LaTeX...]")
    for vol_id, info in VOLUMENES.items():
        contenido = limpiar_y_compilar(clasificados.get(vol_id, []), vol_id)
        if contenido.strip():
            generar_latex_volumen(vol_id, info, contenido, dir_salida)
        else:
            print(f"[-] Volumen {info['numero']} ({vol_id}) vacío, omitido.")

    # Apéndices opcionales
    if clasificados.get("APENDICE"):
        apendice_contenido = limpiar_y_compilar(clasificados["APENDICE"], "APENDICE")
        ruta_apendice = dir_salida / "APENDICES.tex"
        with open(ruta_apendice, 'w', encoding='utf-8') as f:
            f.write("\\documentclass[12pt,a4paper]{article}\n")
            f.write("\\usepackage{amsmath,amsfonts,hyperref,geometry}\n")
            f.write("\\geometry{margin=2.5cm}\n")
            f.write("\\title{Apéndices y Firmas de la Coherencia}\n")
            f.write("\\author{IFT FranBot}\n\\date{\\today}\n")
            f.write("\\begin{document}\n\\maketitle\n")
            f.write(apendice_contenido)
            f.write("\n\\end{document}\n")
        print(f"[+] Apéndices generados: {ruta_apendice}")

    print("\n[✓] Compilación quirúrgica completada. Opera Omnia V5 lista para pdflatex.")

if __name__ == "__main__":
    main()