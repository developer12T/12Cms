import { defineStore } from 'pinia'
import * as cptable from 'codepage'

const CHUNK_SIZE = 512

export const useBluetoothStore = defineStore('bluetooth', {
  state: () => ({
    devices: [],
    isConnected: false,
    printer: null,
    characteristic: null
  }),
  actions: {
    async scanDevices() {
      try {
        const device = await navigator.bluetooth.requestDevice({
          filters: [{ name: 'SPP-R410' }],
          optionalServices: ['00005500-d102-11e1-9b23-74f07d000000']
        });
        this.devices.push(device);
        console.log('Found device:', device);
      } catch (error) {
        console.error('Failed to scan devices:', error);
      }
    },
    async connectPrinter(device) {
      try {
        const server = await device.gatt.connect();
        const service = await server.getPrimaryService('00005500-d102-11e1-9b23-74f07d000000');
        this.characteristic = await service.getCharacteristic('00005501-d102-11e1-9b23-74f07d000000');
        this.isConnected = true;
        this.printer = device;
      } catch (error) {
        console.error('Failed to connect to printer:', error);
      }
    },
    async print(data) {
      if (!this.characteristic) {
        console.error('Printer not connected');
        return;
      }

      const encodedData = cptable.utils.encode(874, data + '\n');

      const escPosCommands = new Uint8Array([
        0x1B, 0x40,
        0x1B, 0x74, 14,
        ...encodedData,
        0x0A
      ]);

      for (let i = 0; i < escPosCommands.length; i += CHUNK_SIZE) {
        const chunk = escPosCommands.slice(i, i + CHUNK_SIZE);
        await this.characteristic.writeValue(chunk);
      }
    }
  }
});
