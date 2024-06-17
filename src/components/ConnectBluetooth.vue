<!-- <template>
    <div>
        <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" @click="requestDevice">Request Device</button>
        <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" @click="connectDevice">Connect Device</button>
        <div v-if="bluetoothStore.device">
            <p>Connected to: {{ deviceName }}</p>
        </div>
    </div>
</template>

<script setup>
import { useBluetoothStore } from '../stores';

const bluetoothStore = useBluetoothStore();

const requestDevice = async () => {
  await bluetoothStore.requestDevice();
};

const connectDevice = async () => {
  await bluetoothStore.connectDevice();
};
</script> -->

<!-- <template>
    <div>
      <h1>Bluetooth Devices</h1>
      <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" @click="requestDevice">Request Device</button>
      <ul>
        <li v-for="device in devices" :key="device.id">
          {{ device.name }}
          <button @click="connectDevice(device)">Connect</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { useBluetoothStore } from '../stores';
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    setup() {
      const bluetoothStore = useBluetoothStore();
  
      const requestDevice = () => {
        bluetoothStore.requestDevice();
      };
  
      const connectDevice = (device) => {
        bluetoothStore.connectDevice(device);
      };
  
      return {
        devices: bluetoothStore.devices,
        requestDevice,
        connectDevice,
      };
    },
  });
  </script> -->

  <!-- <template>
    <div>
      <h1>Bluetooth Devices</h1>
      <div>{{ isSupported ? 'Bluetooth Web API Supported' : 'Your browser does not support the Bluetooth Web API' }}</div>

      <div v-if="isSupported">
        <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" @click="requestDevice()">
          Request Bluetooth Device
        </button>
      </div>
      <div v-if="device">
        <p>Device Name: {{ device.name }}</p>
      </div>
  
      <div v-if="isConnected" class="bg-green-500 text-white p-3 rounded-md">
        <p>Connected</p>
      </div>
  
      <div v-if="!isConnected" class="bg-orange-800 text-white p-3 rounded-md">
        <p>Not Connected</p>
      </div>
  
      <div v-if="error">
        <div>Errors:</div>
        <pre>
        <code class="block p-5 whitespace-pre">{{ error }}</code>
      </pre>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useBluetooth } from '@vueuse/core';
  
  const {
  isConnected,
  isSupported,
  device,
  requestDevice,
  error,
} = useBluetooth({
  acceptAllDevices: true,
})
  </script> -->

  <template>
    <div>
      <h2>ค้นหาอุปกรณ์ Bluetooth</h2>
      <button @click="scanDevices" v-if="!isScanning">สแกน</button>
      <div v-if="isScanning">
        กำลังสแกน...
      </div>
      <ul v-if="devices.length">
        <li v-for="device in devices" :key="device.id">
          {{ device.name }} - {{ device.id }}
          <button @click="connectDevice(device)">เชื่อมต่อ</button>
        </li>
      </ul>
      <div v-if="connectedDevice">
        <h2>เชื่อมต่อกับ: {{ connectedDevice.name }}</h2>
        <button @click="disconnectDevice">ตัดการเชื่อมต่อ</button>
      </div>
      <div v-if="error">
        เกิดข้อผิดพลาด: {{ error.message }}
      </div>
    </div>
  </template>
  
  <script>
    import { useBluetoothStore } from '../stores'
    // import VueWebble from 'vue-webble'

// VueWebble.install(Vue); // ติดตั้ง vue-webble
  
    export default {
      setup() {
        const bluetoothStore = useBluetoothStore();
        const {
          devices,
          connectedDevice,
          isScanning,
          error,
          scanDevices,
          connectDevice,
          disconnectDevice,
        } = bluetoothStore;
  
        return {
          devices,
          connectedDevice,
          isScanning,
          error,
          scanDevices,
          connectDevice,
          disconnectDevice,
        };
      },
    };
  </script>