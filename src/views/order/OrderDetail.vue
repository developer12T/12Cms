<template>
    <LayoutSub>
        <template v-slot>
            <div class="flex flex-col md:h-full space-y-4 p-4">
                <div class="flex items-center space-x-4">
                    <ButtonBack />
                    <span class="ml-2 text-xl font-bold">รายละเอียด</span>
                </div>
                <div class="bg-white p-3 shadow-md rounded-md">
                    <div class="text-sm">
                        <div>{{ detail.name }} | {{ detail.tel }}</div>
                        <div>เลขที่ผู้เสียภาษี : {{ detail.tax }} </div>
                        <div>{{ detail.address }} </div>
                    </div>
                </div>
                <div class="flex flex-col items-center">
                    <div class="bg-white px-4 py-2 shadow-md rounded-lg overflow-auto w-full max-w-2xl">
                        <div class="flex flex-col space-y-2">
                            <div v-for="list in detailList" :key="list.id" class="border-b pb-2">
                                <div class="flex justify-between">
                                    <h2
                                        class="text-lg font-semibold tracking-tight overflow-hidden whitespace-nowrap truncate">
                                        {{ list.name }}
                                    </h2>
                                </div>
                                <div class="flex justify-between">
                                    <p class="font-normal text-gray-700">
                                        ฿{{ list.summaryPrice }}
                                    </p>
                                    <p class="font-normal text-gray-700">
                                        {{ list.qtyText }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex-grow">
                    <div class="bg-white p-4 rounded-md shadow-md space-y">
                        <div class="flex justify-between text-lg">
                            <span>ยอดรวม</span>
                            <span>{{ detail.totalPrice }}</span>
                        </div>
                        <div class="flex justify-between text-lg">
                            <span>ส่วนลดท้ายบิล</span>
                            <span>{{ detail.totalDiscount }}</span>
                        </div>
                        <div class="flex justify-between text-lg">
                            <span>ราคาไม่รวมภาษี (Vat)</span>
                            <span>{{ detail.totalExVat }}</span>
                        </div>
                        <div class="flex justify-between text-lg">
                            <span>ภาษี (Vat)</span>
                            <span>{{ detail.totalPrice - detail.totalExVat }}</span>
                        </div>
                        <div class="flex justify-between text-lg font-bold">
                            <span>มูลค่ารวม</span>
                            <span>{{ detail.totalPrice }}</span>
                        </div>
                    </div>
                </div>
                <div class="flex gap-4 text-white text-xl">
                    <button class="p-4 w-full rounded-lg flex items-center justify-center bg-blue-500 shadow-lg"
                        @click="showAlert = true">
                        พิมพ์ใบเสร็จ
                    </button>
                </div>
            </div>
        </template>
    </LayoutSub>
    <AlertBluetooth v-if="showAlert" :title="'เชื่อมต่อบลูทูธ'" @print="handlePrint" @dismiss="showAlert = false"
        :color="'text-gray-600 border border-green-300 bg-green-100'" />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useOrderStore, useBluetoothStore, useReceiptStore } from '../../stores'
import LayoutSub from '../LayoutSub.vue'
import ButtonBack from '../../components/ButtonBack.vue'
import AlertBluetooth from '../../components/AlertBluetooth.vue'

const router = useRouter();
const orderStore = useOrderStore();
const bluetooth = useBluetoothStore();
const receipt = useReceiptStore();

const detail = computed(() => orderStore.orderDetail);
const detailList = computed(() => orderStore.orderDetailList);
const showAlert = ref(false);


const handlePrint = async () => {
    // if (bluetooth.isConnected) {
        const formattedData = receipt.formatReceiptData(detail.value);
        console.log('print',formattedData)
        await bluetooth.print(formattedData)
        showAlert.value = false;
    // } else {
    //     console.error('Failed to connect to printer');
    // }
};

onMounted(() => {
    const orderNo = localStorage.getItem('orderNo')
    orderStore.getOrderDetail(orderNo)
});
</script>