<template>
    <div v-if="show" :id="alertId" :class="alertClasses" role="alert">
        <div class="flex items-center">
            <h3 class="sm:text-lg md:text-2xl font-medium">{{ title }}</h3>
        </div>
        <div class="mt-2 mb-4 md:text-xl">
            {{ content }}
        </div>
        <div class="relative rounded-t-xl overflow-auto p-4">
            <div class="flex flex-nowrap gap-4 font-mono text-white text-base md:text-lg rounded-lg">
                <button type="button"
                    class="text-white bg-blue-500 px-4 py-2 w-full rounded-lg flex items-center justify-center"
                    @click="onScan">
                    {{ scanText }}
                </button>
                <button type="button"
                    class="text-white bg-green-500 px-4 py-2 w-full rounded-lg flex items-center justify-center"
                    @click="onConnect" aria-label="Connect">
                    {{ connectText }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { defineProps, defineEmits } from 'vue';
import { useBluetoothStore } from '../stores';

const props = defineProps({
    alertId: String,
    title: String,
    content: String,
    color: String,
    scanText: { type: String, default: 'ค้นหา' },
    connectText: { type: String, default: 'เชื่อมต่อ' },
    show: { type: Boolean, default: true }
});

const emit = defineEmits(['scan', 'connect', 'dismiss']);

const bluetooth = useBluetoothStore();

const onScan = async () => {
  try {
    await bluetooth.scanDevices();
    emit('scan');
  } catch (error) {
    console.error('Failed to scan devices:', error);
  }
};

const onConnect = async () => {
  try {
    if (bluetooth.devices.length > 0) {
      await bluetooth.connectPrinter(bluetooth.devices[0]);
      if (bluetooth.isConnected) {
        emit('connect');
      } else {
        console.error('Failed to connect to printer');
      }
    } else {
      console.error('No devices found');
    }
  } catch (error) {
    console.error('Failed to connect to printer:', error);
  }
};


const alertClasses = computed(() => {
    return [
        'p-4 mb-4 fixed top-0 left-0 right-0 z-50 w-full h-44 overflow-x-hidden overflow-y-auto rounded-lg',
        props.color,
    ];
});
</script>