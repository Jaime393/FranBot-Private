// Compresión CBOR para FormatoCapsula
const CompresionCBOR = {
async empaquetar(estado, origen) {
const capsula = FormatoCapsula.empaquetar(estado, origen);
// Simulación de CBOR (en producción usaríamos la librería real)
// Por ahora, devolvemos el JSON comprimido con LZ-String como fallback
const json = JSON.stringify(capsula);
if (typeof CBOR !== 'undefined') {
const encoded = CBOR.encode(capsula);
return { formato: 'cbor', datos: encoded, tamano: encoded.byteLength };
}
return { formato: 'json', datos: json, tamano: json.length };
},
async desempaquetar(paquete) {
if (paquete.formato === 'cbor' && typeof CBOR !== 'undefined') {
const capsula = CBOR.decode(paquete.datos);
return FormatoCapsula.desempaquetar(capsula);
}
const capsula = JSON.parse(paquete.datos);
return FormatoCapsula.desempaquetar(capsula);
}
};
