import os, re, hashlib, random
from collections import defaultdict

class EnjambreOmega:
    def __init__(self, input_dir="raw_chats", output_dir="Opera_Omnia_Omega", generaciones=5):
        self.input_dir = input_dir
        self.output_dir = output_dir
        self.generaciones = generaciones
        self.poblacion = []  # Cada individuo: (modulo, ciclo, texto, fitness, volumen)

    def cargar_poblacion(self):
        """Carga los fragmentos usando la lógica del V4."""
        header_pat = re.compile(r'(?:M[oó]dulo|MODULO)\s*(\d+)\s*(?:/7)?', re.IGNORECASE)
        ordinal_map = {"PRIMER":1,"SEGUNDO":2,"TERCER":3,"CUARTO":4,"QUINTO":5,
                       "SEXTO":6,"SÉPTIMO":7,"OCTAVO":8,"NOVENO":9,"DÉCIMO":10,
                       "UNDÉCIMO":11,"DUODÉCIMO":12}
        for fn in sorted(os.listdir(self.input_dir)):
            if not fn.endswith(".txt"): continue
            with open(os.path.join(self.input_dir, fn), 'r', encoding='utf-8') as f:
                content = f.read()
            file_mod = re.search(r'modulo\s*(\d+)', fn.lower())
            file_mod = f"modulo_{file_mod.group(1)}" if file_mod else None
            for part in re.split(r'(?=M[oó]dulo \d)', content):
                if not part.strip(): continue
                mod = re.search(header_pat, part)
                mod = f"modulo_{mod.group(1)}" if mod else (file_mod or "modulo_0")
                cycle = 1
                for w, n in ordinal_map.items():
                    if w in part.upper(): cycle = n; break
                vol = self.asignar_volumen(part)
                self.poblacion.append((mod, cycle, part, 0, vol))
        print(f"🧬 Población inicial: {len(self.poblacion)} fragmentos.")

    def asignar_volumen(self, text):
        up = text.upper()
        if any(w in up for w in ["PLANOS DE INGENIERÍA","TECNOLOGÍA:","DISPOSITIVO","NEUROPRÓTESIS","Q‑VOTE"]): return "VII"
        if any(w in up for w in ["AXIOMA","POSTULADO","FUNDAMENTO ONTOLÓGICO"]): return "I"
        if any(w in up for w in ["P ≠ NP","HIPÓTESIS DE RIEMANN","FUNCIÓN ZETA"]): return "II"
        if any(w in up for w in ["YANG-MILLS","MASS GAP","NAVIER-STOKES","BLOW-UP"]): return "III"
        if any(w in up for w in ["BIRCH","SWINNERTON-DYER","BSD","CICLO ALGEBRAICO","HODGE"]): return "IV"
        if any(w in up for w in ["UNIFICACIÓN","S_{IFT}","ECUACIÓN MAESTRA"]): return "V"
        if any(w in up for w in ["COSMOLOGÍA","ONDAS GRAVITACIONALES","BIOLOGÍA CUÁNTICA"]): return "VI"
        return "V"

    def calcular_fitness(self, texto):
        """Evalúa la coherencia de un fragmento."""
        puntuacion = 0
        # Premiar ecuaciones (bloques $$ o $)
        puntuacion += len(re.findall(r'\$\$.*?\$\$|\$.*?\$', texto)) * 3
        # Premiar definiciones formales
        puntuacion += len(re.findall(r'(Definición|Teorema|Lema|Corolario|Demostración)', texto)) * 5
        # Penalizar redundancia (usando los primeros 100 caracteres como huella)
        fingerprint = hashlib.md5(texto[:200].encode()).hexdigest()
        if hasattr(self, '_huellas') and fingerprint in self._huellas:
            puntuacion -= 20
        else:
            if not hasattr(self, '_huellas'): self._huellas = set()
            self._huellas.add(fingerprint)
        # Premiar longitud moderada (ni muy corto ni extremadamente largo)
        l = len(texto)
        if 500 < l < 15000: puntuacion += 10
        elif l < 100: puntuacion -= 50
        return puntuacion

    def evolucionar(self):
        """Ejecuta el ciclo darwiniano."""
        for gen in range(self.generaciones):
            print(f"🧪 Generación {gen+1}/{self.generaciones}...")
            # Evaluar fitness
            for i, (mod, ciclo, texto, _, vol) in enumerate(self.poblacion):
                self.poblacion[i] = (mod, ciclo, texto, self.calcular_fitness(texto), vol)
            # Ordenar por fitness descendente
            self.poblacion.sort(key=lambda x: x[3], reverse=True)
            # Selección: conservar el 50% superior
            mitad = len(self.poblacion) // 2
            self.poblacion = self.poblacion[:mitad]
            # Cruzamiento: fusionar pares similares
            nueva_poblacion = list(self.poblacion)
            for i in range(0, len(self.poblacion)-1, 2):
                if self.poblacion[i][0] == self.poblacion[i+1][0]:  # mismo módulo
                    txt1, txt2 = self.poblacion[i][2], self.poblacion[i+1][2]
                    # Fusión simple: concatenar partes no solapadas
                    fusion = txt1 + "\n" + txt2[:len(txt2)//2]  # solo la mitad para reducir redundancia
                    mod, ciclo, _, _, vol = self.poblacion[i]
                    nueva_poblacion.append((mod, ciclo+0.5, fusion, 0, vol))
            self.poblacion = nueva_poblacion
        # Orden final
        self.poblacion.sort(key=lambda x: (x[4], int(x[0].split('_')[1]) if x[0].startswith('modulo_') else 0, x[1]))
        print(f"🏆 Enjambre completado. {len(self.poblacion)} individuos óptimos.")

    def generar_opus(self):
        """Genera los archivos LaTeX a partir de la población evolucionada."""
        os.makedirs(self.output_dir, exist_ok=True)
        master = os.path.join(self.output_dir, "Opera_Omnia_Omega.tex")
        with open(master, 'w', encoding='utf-8') as mf:
            mf.write(r"\documentclass[12pt,a4paper,oneside]{book}\n")
            mf.write(r"\title{Opera Omnia IFT — Edición Omega}\n")
            mf.write(r"\author{Juan Diego Vicente Gabancho}\n")
            mf.write(r"\begin{document}\n\maketitle\n")
            vol_actual = ""
            for mod, ciclo, texto, fitness, vol in self.poblacion:
                if vol != vol_actual:
                    mf.write(rf"\chapter*{{Volumen {vol}}}\n")
                    vol_actual = vol
                mf.write(rf"\section*{{{mod.replace('_',' ').title()} — Ciclo {ciclo}}}\n")
                mf.write(self._limpiar(texto) + "\n\n")
            mf.write(r"\end{document}\n")
        print(f"🎉 Opera Omnia Omega generada en '{self.output_dir}'.")

    def _limpiar(self, texto):
        texto = texto.replace('&','\\&').replace('%','\\%')
        return texto

if __name__ == "__main__":
    enjambre = EnjambreOmega(input_dir="raw_chats", output_dir="Opera_Omnia_Omega", generaciones=5)
    enjambre.cargar_poblacion()
    enjambre.evolucionar()
    enjambre.generar_opus()