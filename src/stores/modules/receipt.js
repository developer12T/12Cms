import { defineStore } from 'pinia';
import axios from 'axios';

export const useReceiptStore = defineStore('receipt', {
  state: () => ({
    printingStatus: '',
    device: null,
    server: null,
  }),
  actions: {
    async printReceipt(data) {
      try {
         await axios.post(
            import.meta.env.VITE_API_BASE_URL +
              '/cms/print/printTest',
              {
                data
              }
            // {
            //   headers: { Authorization: `Bearer ${token}` },
            // }
          );
        // alert('ใบเสร็จถูกพิมพ์แล้ว');
      } catch (error) {
        this.printingStatus = 'Error: ' + error.message;
      }
    },
    async connectToPrinter() {
      try {
        this.device = await navigator.bluetooth.requestDevice({
          // filters: [{ name: 'SPP-R410' }],
          acceptAllDevices: true,
          optionalServices: ['battery_service']
        });
        this.server = await this.device.gatt.connect();
        console.log('Connected to printer');
      } catch (error) {
        console.error('Connection failed:', error);
        throw error; 
      }
    },
    async printMessage(message) {
      if (!this.server) {
        const error = new Error('Printer not connected');
        console.error(error.message);
        throw error; 
      }
      try {
        const service = await this.server.getPrimaryService('battery_service');
        const characteristic = await service.getCharacteristic('battery_level');
        const encoder = new TextEncoder();
        await characteristic.writeValue(encoder.encode(message));
        console.log('Message sent to printer');
      } catch (error) {
        console.error('Print failed:', error);
        throw error; 
      }
    }
  }
});