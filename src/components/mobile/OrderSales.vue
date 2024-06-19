<template>
    <div class="bg-white px-6 rounded-md shadow-md md:w-card w-[355px] h-[400px] py-3 overflow-auto max-h-[80vh]">
        <div v-for="order in orderList" :key="order.orderNo" class="bg-white p-4 rounded-md shadow-md mb-4">
            <div class="flex justify-between items-center">
                <div>
                    <div class="font-semibold">รายการ: {{ order.orderNo }}</div>
                    <div>{{ order.storeName }}</div>
                    <div>฿{{ order.totalPrice }}</div>
                </div>
                <button @click="viewOrderDetail(order.orderNo)" class="text-blue-500 underline">ดูรายละเอียด</button>
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
};

onMounted(() => {
    store.getOrderMain();
});
</script>
