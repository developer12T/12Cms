<template>
    <LayoutSub>
        <template v-slot>
            <div class="flex flex-col md:h-full space-y-4 p-4">
                <div class="flex flex-row items-center">
                    <div class="mt-2">
                        <ButtonBack />
                    </div>
                    <div class="mt-2 ml-2 flex items-center">
                        <Icon icon="solar:sale-square-outline" width="40" />
                        <span class="ml-2 md:text-3xl">โปรโมชัน/ส่วนลด</span>
                    </div>
                </div>
                <div class="flex flex-col items-center mt-5">
                    <div>ของแถม</div>
                    <div
                        class="bg-white px-2 shadow-slate-300 shadow-md rounded-lg overflow-auto md:w-card sm:w-[360px] sm:h-[370px] md:h-[600px]">
                        <div v-if="loading">
                            <Skeleton v-for="i in 9" :key="i" width="100%" height="1rem" class="mb-2" />
                        </div>
                        <div v-else>
                            <div class="flex flex-col p-2" v-for="free in listFree" :key="free.proId">
                                <div class="flex justify-between">
                                    <h2
                                        class="mb-1 sm:text-lg font-semibold tracking-tight overflow-hidden whitespace-nowrap truncate w-3/4">
                                        {{ free.listProduct[0].productName }}
                                    </h2>
                                    <button type="button" @click="handleClick()"
                                        class="text-white bg-red-500 w-6 h-6 font-medium rounded-md sm:text-sm md:text-lg inline-flex items-center justify-center">
                                        <Icon class="icon w-4 h-4" icon="ph:x-bold" />
                                    </button>
                                </div>
                                <div class="flex justify-between items-center">
                                    <p class="mb-2 font-normal text-gray-700 w-3/4 break-words">
                                        {{ free.proName }}
                                    </p>
                                    <p class="mb-2 font-normal text-gray-700 text-right w-1/4">
                                        {{ free.listProduct[0].qtyText }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col items-center mt-5">
                    <div>ส่วนลด</div>
                    <div
                        class="bg-white px-2 shadow-slate-300 shadow-md rounded-lg overflow-auto md:w-card sm:w-[360px] sm:h-[100px] md:h-[600px]">
                        <div v-if="loading">
                            <Skeleton v-for="i in 9" :key="i" width="100%" height="1rem" class="mb-2" />
                        </div>
                        <div v-else>
                            <div class="flex flex-col p-2 space-y-1" v-for="discount in listDiscount"
                                :key="discount.proId">
                                <div class="flex justify-between">
                                    <p class="font-normal text-gray-700 truncate w-3/4">
                                        {{ discount.proName }}
                                    </p>
                                    <p class="font-normal text-gray-700 text-right w-1/4">
                                        รวม {{ discount.totalDiscount }} บาท
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex gap-4 text-white text-xl">
                    <button class="p-4 w-full rounded-lg flex items-center justify-center bg-green-500 shadow-lg"
                        @click="handleCheckout">
                        ถัดไป
                    </button>
                </div>
            </div>
        </template>
    </LayoutSub>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import { usePromotionStore, useUtilityStore } from '../../stores'
import LayoutSub from '../LayoutSub.vue'
import ButtonBack from '../../components/ButtonBack.vue'
import Alert from '../../components/Alert.vue'
import Skeleton from '../../components/Skeleton.vue'

const router = useRouter()
const pro = usePromotionStore()
const util = useUtilityStore()
const loading = ref(true)

const listFree = computed(() => {
    return pro.freeList
})
const listDiscount = computed(() => {
    return pro.discountList
})


onMounted(async () => {
    try {
        await pro.getPromotionReward({
            area: util.area,
            storeId: util.storeId,
        })
    } finally {
        loading.value = false
    }
})

const showAlert = ref(false)
const selectedId = ref(null)
const selectedUnitId = ref(null)

const handleClick = (id, unitId) => {
    console.log(`item: ${id}`)
    console.log(`unit: ${unitId}`)
    selectedId.value = id
    selectedUnitId.value = unitId
    showAlert.value = true
    // console.log(showAlert.value);
    // store.deleteItemCart(id, unitId);
}

const dismissAlert = () => {
    showAlert.value = false
    console.log(showAlert.value)
}

const handleCheckout = () => {
    router.push('/cms/order/checkout')
}

</script>
