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
                                    <DrawerChange
                                        :productData="{ proId: free.proId, proName: free.proName, productId: free.listProduct[0].productId, productName: free.listProduct[0].productName, qty: free.listProduct[0].qty }"
                                        @updateComplete="refreshPromotion" />
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
            <DrawerChange v-if="showDrawer" :productId="selectedProductId" @close="showDrawer = false" />
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
import Skeleton from '../../components/Skeleton.vue'
import DrawerChange from '../../components/mobile/DrawerChangePro.vue'

const router = useRouter()
const pro = usePromotionStore()
const util = useUtilityStore()
const loading = ref(true)
const showDrawer = ref(false)
const selectedProductId = ref(null)

const listFree = computed(() => pro.freeList)
const listDiscount = computed(() => {
    return pro.discountList
})

const refreshPromotion = async () => {
    loading.value = true;
    try {
        await pro.getPromotionReward({
            area: util.area,
            storeId: util.storeId,
        });
    } finally {
        loading.value = false;
    }
};

onMounted(async () => {
    loading.value = true
    try {
        await pro.getPromotionReward({
            area: util.area,
            storeId: util.storeId,
        })
    } finally {
        loading.value = false
    }
})

const handleCheckout = () => {
    router.push('/cms/order/checkout')
}

</script>
