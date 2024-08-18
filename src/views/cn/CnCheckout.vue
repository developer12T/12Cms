<template>
    <LayoutSub>
        <template v-slot>
            <div class="flex flex-col md:h-full space-y-4 p-4 relative">
                <!-- Content -->
                <Alert v-if="showAlert" :title="'สร้างรายการคืน'" :content="'ยืนยันการสร้างรายการคืนสินค้า'"
                    @confirm="handleSave" @dismiss="dismissAlert"
                    :color="'text-gray-600 border border-green-300 bg-green-100'" />
                <div class="flex items-center space-x-4">
                    <ButtonBack />
                    <span class="ml-2 text-xl font-bold">ยืนยันการคืนสินค้า</span>
                </div>
                <div class="bg-white p-3 shadow-md rounded-md">
                    <form class="max-w-sm mx-auto">
                        <select v-model="selectedReason"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                            <option value="" disabled selected>กรุณาเลือกสาเหตุ</option>
                            <option v-for="reason in dataReason" :key="reason.id" :value="reason.name">
                                {{ reason.name }}
                            </option>
                        </select>
                    </form>
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
                                        ฿{{ checkout.amount }}
                                    </p>
                                    <p class="font-normal text-gray-700">
                                        {{ checkout.qtyText }}
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
                        @click="handleClick" :disabled="isSaving">
                        <span>บันทึกรายการ</span>
                    </button>
                </div>
                <div v-if="isSaving" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20">
                    <div
                        class="relative p-6">
                        <Icon class="icon w-12 h-12" icon="line-md:loading-twotone-loop" />
                    </div>
                </div>
            </div>
        </template>
    </LayoutSub>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { Icon } from '@iconify/vue'
import { useRouter } from 'vue-router'
import { useCnStore, useGeolocation, useUtilityStore, useOptionStore } from '../../stores'
import LayoutSub from '../LayoutSub.vue'
import ButtonBack from '../../components/ButtonBack.vue'
import Alert from '../../components/Alert.vue'
import Skeleton from '../../components/Skeleton.vue'
import InputFeild from '../../components/tablet/InputFeild.vue'

const router = useRouter()
const store = useCnStore()
const util = useUtilityStore()
const option = useOptionStore()
const checkout = computed(() => store.cnCheckout)
const checkoutList = computed(() => store.cnCheckoutList)
const dataReason = computed(() => option.reason)
const { latitude, longitude, error } = useGeolocation()

const lat = ref(util.latitude)
const long = ref(util.longitude)
const loading = ref(true)
const isSaving = ref(false)
const showAlert = ref(false)
const selectedReason = ref('')
const reasonType = ('CN')

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
        await option.getReason(reasonType)
        console.log('store', util.storeId);
    } finally {
        updateLocation()
        loading.value = false
    }
})

watch([latitude, longitude], updateLocation)

const handleClick = () => {
    if (!selectedReason.value) {
            alert('กรุณาเลือกสาเหตุการคืนสินค้า');
            return;
        } else {
            showAlert.value = true;
        }
    console.log(selectedReason.value)
}

const dismissAlert = () => {
    showAlert.value = false
    console.log(showAlert.value)
}

const handleSave = async () => {
    isSaving.value = true
    try {
        await store.addCnOrder({
            zone: util.zone,
            area: util.area,
            storeId: util.storeId,
            saleCode: util.saleCode,
            warehouse: util.warehouse,
            note: selectedReason.value,
            latitude: lat.value,
            longtitude: long.value,
            refOrder: ""
        })
        showAlert.value = false
        await router.push('/cms/order')
    } catch (error) {
        console.error(error)
    } finally {
        isSaving.value = false
    }
}
</script>