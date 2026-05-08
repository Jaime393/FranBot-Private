import os, re
from collections import defaultdict

class BookCompilerV3:
    def __init__(self, input_dir="raw_chats", output_file="El_Libro_Omega.tex"):
        self.input_dir = input_dir
        self.output_file = output_file
        self.fragments = defaultdict(list)

    def load_and_split(self):
        header_pat = re.compile(r'(?:M[oó]dulo|MODULO)\s*(\d+)\s*(?:/7)?', re.IGNORECASE)
        ordinal_map = {
            "PRIMER":1,"SEGUNDO":2,"TERCER":3,"CUARTO":4,"QUINTO":5,
            "SEXTO":6,"SÉPTIMO":7,"OCTAVO":8,"NOVENO":9,"DÉCIMO":10,
            "UNDÉCIMO":11,"DUODÉCIMO":12
        }

        for filename in sorted(os.listdir(self.input_dir)):
            if not filename.endswith(".txt"): continue
            filepath = os.path.join(self.input_dir, filename)
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
            except Exception as e:
                print(f"Error leyendo {filename}: {e}"); continue

            # === Primero, intentar deducir el módulo del nombre de archivo ===
            file_mod_match = re.search(r'modulo\s*(\d+)', filename.lower())
            file_mod = f"modulo_{file_mod_match.group(1)}" if file_mod_match else None

            # === Dividir el contenido por posibles cabeceras de módulo ===
            parts = re.split(r'(?=M[oó]dulo \d)', content)
            if len(parts) == 1: parts = [content]  # No se encontraron divisiones

            for part in parts:
                if not part.strip(): continue
                # Detectar módulo dentro del texto
                mod_match = header_pat.search(part)
                module = f"modulo_{mod_match.group(1)}" if mod_match else (file_mod or "modulo_0")
                
                # Detectar ciclo
                cycle = 1
                upart = part.upper()
                for word, num in ordinal_map.items():
                    if word in upart:
                        cycle = num; break
                if cycle == 1:
                    ciclo_match = re.search(r'CICLO\s+(\d+)', upart)
                    if ciclo_match: cycle = int(ciclo_match.group(1))
                
                self.fragments[module].append((cycle, part))
                print(f"🧩 {module}, ciclo {cycle} ({len(part)} chars) <- {filename}")

    def generar_manuscrito(self):
        if not self.fragments:
            print("No se encontraron fragmentos."); return
        
        module_order = [f"modulo_{i}" for i in range(1, 8)] + ["modulo_0"]
        latex_header = r"""\documentclass[12pt,twoside]{book}
\usepackage[utf8]{inputenc}
\usepackage{amsmath,amssymb,amsfonts}
\usepackage{hyperref}
\usepackage{geometry}
\geometry{a4paper, margin=2.5cm}
\title{El Libro Omega: \\ La Teoría del Campo Informacional y la Unificación de la Realidad}
\author{Enjambre FranBot v7.0 \\ (Arquitecto Jaime)}
\date{\today}
\begin{document}
\maketitle
\tableofcontents
""" ; latex_footer = r"\end{document}" ; latex_body = ""

        for mod in module_order:
            if mod not in self.fragments: continue
            sorted_frags = sorted(self.fragments[mod], key=lambda x: x[0])
            for cycle, text in sorted_frags:
                chapter_title = f"{mod.replace('_',' ').title()} — Ciclo {cycle}"
                latex_body += f"\n\n\\chapter{{{chapter_title}}}\n"
                latex_body += self.clean_latex(text)
                print(f"✅ Escrito: {chapter_title}")

        with open(self.output_file, 'w', encoding='utf-8') as f:
            f.write(latex_header + latex_body + latex_footer)
        print(f"\n🎉 Manuscrito generado: {self.output_file}")

    def clean_latex(self, text):
        text = text.replace('&','\\&').replace('%','\\%').replace('#','\\#')
        text = re.sub(r'\*\*(.+?)\*\*', r'\\textbf{\1}', text)
        text = re.sub(r'\\\((.+?)\\\)', r'$\1$', text)
        text = re.sub(r'\\\[(.+?)\\\]', r'$$\1$$', text)
        return text

if __name__ == "__main__":
    compiler = BookCompilerV3(input_dir="raw_chats", output_file="El_Libro_Omega.tex")
    compiler.load_and_split()
    compiler.generar_manuscrito()