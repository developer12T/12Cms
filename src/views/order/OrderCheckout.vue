<template>
    <LayoutSub>
        <template v-slot>
            <div class="flex flex-col md:h-full space-y-4 p-4 relative">
                <!-- Content -->
                <Alert v-if="showAlert" :title="'สร้างรายการขาย'" :content="'ยืนยันการสร้างรายการขาย'"
                    @confirm="handleSave" @dismiss="dismissAlert"
                    :color="'text-gray-600 border border-green-300 bg-green-100'" />
                <div class="flex items-center space-x-4">
                    <ButtonBack />
                    <span class="ml-2 text-xl font-bold">ยืนยันการสั่งซื้อ</span>
                </div>
                <div class="bg-white p-3 shadow-md rounded-md">
                    <div class="mb-5">
                        <InputFeild :id="'storeNote'" :label="'หมายเหตุ'" :inputClass="'w-full p-2.5'" :type="'text'"
                            v-model="vOrderNote">
                        </InputFeild>
                    </div>
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
                                                class="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded">
                                                โปรโมชัน
                                            </span>
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
                        @click="handleClick" :disabled="isSaving">
                        <span>บันทึกรายการ</span>
                    </button>
                </div>
                <div v-if="isSaving" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div
                        class="relative p-6 bg-white border border-gray-100 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-800">
                        <svg aria-hidden="true"
                            class="w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                            viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor" />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill" />
                        </svg>
                        <span class="sr-only">Loading...</span>
                    </div>
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
import InputFeild from '../../components/tablet/InputFeild.vue'

const router = useRouter();
const store = useOrderStore();
const util = useUtilityStore();
const checkout = computed(() => store.orderCheckout);
const checkoutList = computed(() => store.orderCheckoutList);
const checkoutFree = computed(() => store.orderCheckoutFree);
const { latitude, longitude, error } = useGeolocation();

const lat = ref(util.latitude);
const long = ref(util.longitude);
const vOrderNote = ref('');
const loading = ref(true);
const isSaving = ref(false);

const updateLocation = () => {
    if (latitude.value && longitude.value) {
        localStorage.setItem('latitude', latitude.value);
        localStorage.setItem('longitude', longitude.value);
    } else {
        console.error('Geolocation is not available.');
    }
};

onMounted(async () => {
    try {
        await store.getOrderCheckout();
    } finally {
        updateLocation();
        loading.value = false;
    }
});

watch([latitude, longitude], updateLocation);

const showAlert = ref(false);

const handleClick = () => {
    showAlert.value = true;
};

const dismissAlert = () => {
    showAlert.value = false;
    console.log(showAlert.value);
};

const handleSave = async () => {
    isSaving.value = true;
    try {
        await store.addNewOrder({
            area: util.area,
            storeId: util.storeId,
            saleCode: util.saleCode,
            idRoute: util.routeId,
            warehouse: util.warehouse,
            note: vOrderNote.value,
            latitude: lat.value,
            longtitude: long.value,
        });
        // console.log('note', vOrderNote.value);
        // console.log('latitude', lat.value);
        // console.log('longitude', long.value);
        showAlert.value = false;
        await router.push('/cms/order');
    } catch (error) {
        console.error(error);
    } finally {
        isSaving.value = false;
    }
};
</script>