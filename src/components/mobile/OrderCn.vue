<template>
    <div class="bg-white px-6 rounded-md shadow-md md:w-card w-[355px] h-[400px] py-3 overflow-auto max-h-[80vh]">
        <div v-for="cn in CnList" :key="cn.number" class="bg-white p-4 rounded-md shadow-md mb-4">
            <div class="flex justify-between items-center">
                <div class="flex items-center">
                    <div>
                        <div class="text-sm text-gray-500">{{ cn.orderDate }}</div>
                        <div class="text-sm text-gray-500">{{ cn.name }}</div>
                        <div :class="statusClass(cn.status)" class="text-sm font-semibold">{{ cn.statusText }}</div>
                    </div>
                </div>
                <div class="text-right">
                    <div class="text-md font-bold text-gray-900">฿{{ cn.totalPrice }}</div>
                    <button @click="viewOrderDetail(cn.number)"
                        class="text-green-500 bg-green-100 px-1 py-1 rounded-md">รายละเอียด</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCnStore, useUtilityStore } from '../../stores'

const router = useRouter()
const cn = useCnStore()
const util = useUtilityStore()
const CnList = computed(() => cn.orderCnMain)

const viewOrderDetail = (orderCn) => {
    console.log(orderCn)
    router.push('cn/detail')
    localStorage.setItem('orderCn', orderCn)
}

const statusClass = (status) => {
    switch(status) {
        case '99': return 'text-red-500';
        case '10': return 'text-green-500';
        default: return 'text-gray-500';
    }
}

onMounted(() => {
    cn.getCnOrderMain(util.area)
});

</script>
