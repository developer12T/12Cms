<template>
    <div>
        <button type="button" @click="printReceipt" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">Print Receipt</button>
      <p>{{ printingStatus }}</p>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useReceiptStore } from '../stores'

const store = useReceiptStore()
const printingStatus = ref(store.printingStatus)
const printReceipt = () => {
  const dataToPrint = 'ข้อความที่ต้องการพิมพ์';
  store.printReceipt(dataToPrint);
}

</script>

<!-- <template>
    <div>
        <h1>Bluetooth Printer Demo</h1>
        <button type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            @click="connectToPrinter">Connect to Printer</button>
        <textarea v-model="message" placeholder="Enter your message here"></textarea>
        <button type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            @click="printMessage">Print</button>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useReceiptStore } from '../stores'


const printerStore = useReceiptStore();
const message = ref('');
const error = ref('');

const connectToPrinter = async () => {
    try {
        await printerStore.connectToPrinter();
        error.value = '';
    } catch (err) {
        error.value = 'Failed to connect to printer: ' + err.message;
    }
};

const printMessage = async () => {
    try {
        await printerStore.printMessage(message.value);
        error.value = '';
    } catch (err) {
        error.value = 'Failed to print message: ' + err.message;
    }
};

</script> -->