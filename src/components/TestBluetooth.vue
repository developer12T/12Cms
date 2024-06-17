<template>
    <div>
        <button
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            @click="connectBluetooth">เชื่อมต่ออุปกรณ์ Bluetooth</button>
        <p>{{ deviceName }}</p>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const deviceName = ref('')

const connectBluetooth = async () => {
    try {
        this.device = await navigator.bluetooth.requestDevice({
        //   filters: [{ namePrefix: 'SPP-R410' }],
          acceptAllDevices: true,
          optionalServices: ['device_information']
        });
        if (device) {
            deviceName.value = device.name || 'อุปกรณ์ที่ไม่รู้จัก';
            await connect();
        }
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการเชื่อมต่อกับอุปกรณ์ Bluetooth:', error);
    }
};


</script>