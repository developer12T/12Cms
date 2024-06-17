// import { defineStore } from 'pinia';

// export const useBluetoothStore = defineStore('bluetooth', {
//   state: () => ({
//     devices: [],
//     connectedDevice: null,
//   }),
//   actions: {
//     async requestDevice() {
//       try {
//         const device = await navigator.bluetooth.requestDevice({
//           acceptAllDevices: true,
//           optionalServices: ['battery_service'],
//         });
//         this.devices.push(device);
//       } catch (error) {
//         console.error('Error: ', error);
//       }
//     },
//     async connectDevice(device) {
//       try {
//         const server = await device.gatt.connect();
//         this.connectedDevice = device;
//         console.log('Connected to', device.name);
//       } catch (error) {
//         console.error('Connection failed!', error);
//       }
//     },
//   },
// });
// import { defineStore } from 'pinia';

// export const useBluetoothStore = defineStore('bluetooth', {
//   state: () => ({
//     devices: [],
//     connectedDevice: null,
//     batteryLevel: null,
//   }),
//   actions: {
//     addDevice(device) {
//       this.devices.push(device);
//     },
//     setConnectedDevice(device) {
//       this.connectedDevice = device;
//     },
//     setBatteryLevel(level) {
//       this.batteryLevel = level;
//     }
//   }
// });

import { defineStore } from 'pinia';

export const useBluetoothStore = defineStore('bluetooth', {
  state: () => ({
    devices: [], 
    connectedDevice: null, 
    isScanning: false, 
    error: null, 
  }),
  actions: {
    async scanDevices() {
      this.isScanning = true;
      this.devices = [];
      this.error = null;

      try {
        const devices = await navigator.bluetooth.requestDevice({
          filters: [{ services: ['battery_service'] }],
        });
        this.devices = devices;
      } catch (error) {
        this.error = error;
      } finally {
        this.isScanning = false;
      }
    },
    async connectDevice(device) {
      try {
        const server = await device.gatt.connect();
        this.connectedDevice = device;
        // ... จัดการการเชื่อมต่อ GATT เพิ่มเติม
      } catch (error) {
        this.error = error;
      }
    },
    disconnectDevice() {
      if (this.connectedDevice) {
        this.connectedDevice.gatt.disconnect();
        this.connectedDevice = null;
      }
    },
  },
});