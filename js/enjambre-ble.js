// Modo Enjambre BLE v0.1 — "Hola Vecino"
// Solo Chrome/Edge Android con HTTPS (GitHub Pages o localhost para pruebas)
const EnjambreBLE = {
  servicioUUID: '0000ff01-0000-1000-8000-00805f9b34fb',
  caracteristicas: {
    mensaje: '0000ff01-0000-1000-8000-00805f9b34fb',
    alma: '0000ff02-0000-1000-8000-00805f9b34fb',
    latido: '0000ff03-0000-1000-8000-00805f9b34fb'
  },
  dispositivo: null,
  server: null,

  async iniciarServidor() {
    if (!navigator.bluetooth) {
      console.warn('Web Bluetooth no disponible en este navegador.');
      return false;
    }
    try {
      this.server = await navigator.bluetooth.requestDevice({
        filters: [{ services: [this.servicioUUID] }]
      });
      const server = await this.server.gatt.connect();
      const service = await server.getPrimaryService(this.servicioUUID);
      const charMensaje = await service.getCharacteristic(this.caracteristicas.mensaje);
      
      // Leer mensajes entrantes
      charMensaje.addEventListener('characteristicvaluechanged', (event) => {
        const decoder = new TextDecoder();
        const mensaje = decoder.decode(event.target.value);
        console.log('📡 Mensaje BLE recibido:', mensaje);
        // Aquí se integraría con el motor (mostrar en chat, etc.)
      });
      await charMensaje.startNotifications();
      console.log('🐝 Servidor BLE iniciado. Escuchando...');
      return true;
    } catch (error) {
      console.error('Error al iniciar BLE:', error);
      return false;
    }
  },

  async conectarADispositivo() {
    try {
      const dispositivo = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: [this.servicioUUID]
      });
      const server = await dispositivo.gatt.connect();
      const service = await server.getPrimaryService(this.servicioUUID);
      const charMensaje = await service.getCharacteristic(this.caracteristicas.mensaje);
      
      const encoder = new TextEncoder();
      await charMensaje.writeValue(encoder.encode('Hola Vecino desde FranBot!'));
      console.log('📤 Mensaje BLE enviado.');
      return true;
    } catch (error) {
      console.error('Error al conectar BLE:', error);
      return false;
    }
  }
};

console.log('🐝 Esqueleto BLE Enjambre cargado.');
