<template>
    <div class="bg-white px-6 rounded-md shadow-md md:w-card w-[355px] h-[400px] py-3 overflow-auto max-h-[80vh]">
        <div v-for="order in orderList" :key="order.orderNo" class="bg-white p-4 rounded-md shadow-md mb-4">
            <div class="flex justify-between items-center mb-2">
                <div class="flex items-center">
                    <div>
                        <div class="text-sm text-gray-500">{{ order.createDate }}</div>
                        <!-- <div class="text-gray-900">{{ order.address }}</div> -->
                        <div class="text-sm text-gray-500">{{ order.storeName }}</div>
                        <div class="text-sm text-green-500 font-semibold">Completed</div>
                    </div>
                </div>
                <div class="text-right">
                    <div class="text-md font-bold text-gray-900">฿{{ order.totalPrice }}</div>
                    <button @click="viewOrderDetail(order.orderNo)"
                        class="text-green-500 bg-green-100 px-2 py-1 rounded-md">รายละเอียด</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useOrderStore } from '../../stores'

const router = useRouter()
const store = useOrderStore()
const orderList = computed(() => store.orderMain)

const viewOrderDetail = (orderNo) => {
    console.log(orderNo)
    router.push('order/detail')
    localStorage.setItem('orderNo', orderNo)
}

const formatDate = (date) => {
    if (!date) return 'Invalid date';
    const parsedDate = new Date(date);
    if (isNaN(parsedDate)) return 'Invalid date';
    const day = parsedDate.getDate().toString().padStart(2, '0');
    const month = (parsedDate.getMonth() + 1).toString().padStart(2, '0');
    const year = parsedDate.getFullYear();
    const hours = parsedDate.getHours().toString().padStart(2, '0');
    const minutes = parsedDate.getMinutes().toString().padStart(2, '0');
    return `วันที่ ${day}/${month}/${year} เวลา ${hours}.${minutes} น.`;
};


onMounted(() => {
    store.getOrderMain();
});
</script>
