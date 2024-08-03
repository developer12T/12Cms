<template>
    <LayoutSub>
        <template v-slot>
            <div class="flex flex-col md:h-full space-y-4 p-4">
                <Alert v-if="showAlert" :title="'สร้างรายการขาย'" :content="'ยืนยันการสร้างรายการขาย'"
                    @confirm="handleSave" @dismiss="dismissAlert"
                    :color="'text-gray-600 border border-green-300 bg-green-100'" />
                <div class="flex items-center space-x-4">
                    <ButtonBack />
                    <span class="ml-2 text-xl font-bold">ยืนยันการสั่งซื้อ</span>
                </div>
                <div class="bg-white p-3 shadow-md rounded-md overflow-auto h-[125px]">
                    <div class="text-sm">
                        <div v-if="loading">
                            <Skeleton v-for="i in 4" :key="i" width="100%" height="1rem" class="mb-2" />
                        </div>
                        <div v-else>
                            <div>{{ checkout.storeName }} | {{ checkout.tel }}</div>
                            <div>เลขที่ผู้เสียภาษี : {{ checkout.tax }} </div>
                            <div>{{ checkout.address }} </div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col items-center">
                    <div class="bg-white px-4 py-2 shadow-md rounded-lg overflow-auto w-full max-w-2xl h-56">
                        <div class="flex flex-col space-y-4">
                            <template v-if="loading">
                                <Skeleton v-for="i in 6" :key="i" width="100%" height="1rem" class="mb-2" />
                            </template>
                            <template v-else>
                                <div v-for="checkout in checkoutList" :key="checkout.id" class="border-b pb-2">
                                    <div class="flex justify-between">
                                        <h2
                                            class="text-lg font-semibold tracking-tight overflow-hidden whitespace-nowrap truncate">
                                            {{ checkout.name }}
                                        </h2>
                                    </div>
                                    <div class="flex justify-between">
                                        <p class="font-normal text-gray-700">
                                            <span v-if="checkout.totalDiscount !== 0" class="line-through">
                                                ฿{{ checkout.amount }}
                                            </span>
                                            ฿{{ checkout.totalAmount }}
                                        </p>
                                        <p class="font-normal text-gray-700">
                                            {{ checkout.qtyText }}
                                        </p>
                                    </div>
                                </div>
                                <div v-for="free in checkoutFree" :key="free.id" class="border-b pb-2">
                                    <div class="flex justify-between">
                                        <h2
                                            class="text-lg font-semibold tracking-tight overflow-hidden whitespace-nowrap truncate">
                                            {{ free.name }}
                                        </h2>
                                    </div>
                                    <div class="flex justify-between">
                                        <p class="font-normal text-gray-700">
                                            <span
                                                class="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded">โปรโมชัน</span>
                                        </p>
                                        <p class="font-normal text-gray-700">
                                            {{ free.qtyText }}
                                        </p>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
                <div class="flex-grow">
                    <div class="bg-white p-4 rounded-md shadow-md">
                        <div v-if="loading">
                            <Skeleton v-for="i in 5" :key="i" width="100%" height="1rem" class="mb-2" />
                        </div>
                        <div v-else>
                            <div class="flex justify-between text-lg">
                                <span>ยอดรวม</span>
                                <span>{{ checkout.summaryAmount }}</span>
                            </div>
                            <div class="flex justify-between text-lg">
                                <span>ส่วนลดร้านค้า</span>
                                <span>{{ checkout.discount }}</span>
                            </div>
                            <div class="flex justify-between text-lg">
                                <span>ราคาไม่รวมภาษี(Vat)</span>
                                <span>{{ checkout.totalAmountNoVat }}</span>
                            </div>
                            <div class="flex justify-between text-lg">
                                <span>ภาษี(Vat)</span>
                                <span>{{ checkout.vat }}</span>
                            </div>
                            <div class="flex justify-between text-lg font-bold">
                                <span>มูลค่ารวม</span>
                                <span>{{ checkout.totalAmount }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex gap-4 text-white text-xl">
                    <button class="p-4 w-full rounded-lg flex items-center justify-center bg-green-500 shadow-lg"
                        @click="handleClick">
                        บันทึกรายการ
                    </button>
                </div>
            </div>
        </template>
    </LayoutSub>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useOrderStore, useGeolocation, useUtilityStore } from '../../stores'
import LayoutSub from '../LayoutSub.vue'
import ButtonBack from '../../components/ButtonBack.vue'
import Alert from '../../components/Alert.vue'
import Skeleton from '../../components/Skeleton.vue'

const router = useRouter()
const store = useOrderStore()
const util = useUtilityStore()
const checkout = computed(() => store.orderCheckout)
const checkoutList = computed(() => store.orderCheckoutList)
const checkoutFree = computed(() => store.orderCheckoutFree)
const { latitude, longitude, error } = useGeolocation()

const lat = ref(null)
const long = ref(null)
const loading = ref(true)

const updateLocation = () => {
    if (latitude.value && longitude.value) {
        localStorage.setItem('latitude', latitude.value)
        localStorage.setItem('longitude', longitude.value)
    } else {
        console.error('Geolocation is not available.')
    }
}

onMounted(async () => {
    try {
        await store.getOrderCheckout()
    } finally {
        updateLocation()
        loading.value = false
    }
})

watch([latitude, longitude], updateLocation)

const showAlert = ref(false)

const handleClick = () => {
    showAlert.value = true
}

const dismissAlert = () => {
    showAlert.value = false
    console.log(showAlert.value)
}

const handleSave = async () => {
    try {
        await store.addNewOrder({
            area: util.area,
            storeId: util.storeId,
            saleCode: util.saleCode,
            idRoute: util.routeId,
            warehouse: util.warehouse,
            latitude: lat.value,
            longitude: long.value,
        })
        showAlert.value = false
        await router.push('/cms/order')
    } catch (error) {
        console.error(error)
    }
}
</script>
