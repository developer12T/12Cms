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
                <div class="bg-white p-4 shadow-md rounded-md">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="border p-3 rounded-md">
                            <div class="text-lg font-semibold">พนักงาน</div>
                            <div>{{ checkout.saleMan }}</div>
                        </div>
                        <div class="border p-3 rounded-md">
                            <div class="text-lg font-semibold">ร้านค้า</div>
                            <div>{{ checkout.storeName }}</div>
                        </div>
                        <div class="border p-3 rounded-md">
                            <div class="text-lg font-semibold">ที่อยู่</div>
                            <div>{{ checkout.address }}</div>
                        </div>
                        <div class="border p-3 rounded-md">
                            <div class="text-lg font-semibold">เบอร์โทรศัพท์</div>
                            <div>{{ checkout.tel }}</div>
                        </div>
                        <div class="border p-3 rounded-md">
                            <div class="text-lg font-semibold">เลขที่ผู้เสียภาษี</div>
                            <div>{{ checkout.taxID }}</div>
                        </div>
                        <!-- <div class="border p-3 rounded-md">
                            <div class="text-lg font-semibold">ที่อยู่จัดส่ง</div>
                            <div>{{ checkout.address }}</div>
                        </div> -->
                    </div>
                </div>
                <div class="flex flex-col items-center">
                    <div class="bg-white px-4 py-2 shadow-md rounded-lg overflow-auto w-full max-w-2xl">
                        <div class="flex flex-col space-y-4">
                            <div v-for="checkout in checkoutList" :key="checkout.id" class="border-b pb-2">
                                <div class="flex justify-between">
                                    <h2 class="text-lg font-semibold tracking-tight overflow-hidden whitespace-nowrap truncate">
                                    {{ checkout.name }}
                                    </h2>
                                </div>
                                <div class="flex justify-between">
                                    <p class="font-normal text-gray-700">
                                       ฿{{ checkout.totalAmount }}
                                    </p>
                                    <p class="font-normal text-gray-700">
                                        {{ checkout.qtyText }}
                                    </p>
                                </div>
                            </div>
                            <div v-for="free in checkoutFree" :key="free.id" class="border-b pb-2">
                                <div class="flex justify-between">
                                    <h2 class="text-lg font-semibold tracking-tight overflow-hidden whitespace-nowrap truncate">
                                    {{ free.name }}
                                    </h2>
                                </div>
                                <div class="flex justify-between">
                                    <p class="font-normal text-gray-700">
                                       <!-- ฿{{ free.totalAmount }} -->
                                       <span class="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded">โปรโมชัน</span>
                                    </p>
                                    <p class="font-normal text-gray-700">
                                        {{ free.qtyText }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex-grow">
                    <div class="bg-white p-4 rounded-md shadow-md space-y-2">
                        <div class="flex justify-between text-lg">
                            <span>ยอดรวม</span>
                            <span>{{ checkout.summaryAmount }}</span>
                        </div>
                        <div class="flex justify-between text-lg">
                            <span>ส่วนลดท้ายบิล</span>
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
                <!-- <div class="relative p-4"> -->
                    <div class="flex gap-4 text-white text-xl">
                        <button class="p-4 w-full rounded-lg flex items-center justify-center bg-green-500 shadow-lg"
                            @click="handleClick">
                            บันทึกรายการ
                        </button>
                    </div>
                <!-- </div> -->
            </div>
        </template>
    </LayoutSub>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useOrderStore, useGeolocation } from '../../stores'
import LayoutSub from '../LayoutSub.vue'
import ButtonBack from '../../components/ButtonBack.vue'
import Alert from '../../components/Alert.vue'

const router = useRouter();
const storeId = localStorage.getItem('routeStoreId')
const storeName = localStorage.getItem('routeStoreName')

const store = useOrderStore();
const checkout = computed(() => store.orderCheckout)
const checkoutList = computed(() => store.orderCheckoutList)
const checkoutFree = computed(() => store.orderCheckoutFree)
const { latitude, longitude, error } = useGeolocation()

onMounted(() => {
    store.getOrderCheckout();
});

const showAlert = ref(false)

const handleClick = () => {
    showAlert.value = true;
};

const dismissAlert = () => {
    showAlert.value = false;
    console.log(showAlert.value);
};

const handleSave = async () => {
    try {
        var lat = latitude.value.toString()
        var long = longitude.value.toString()
        await store.addOrderData({
            area: localStorage.getItem('area'),
            storeId: localStorage.getItem('routeStoreId'),
            idRoute: localStorage.getItem('routeId'),
            latitude: lat,
            longitude: long,
        });
        showAlert.value = false;
        await router.push('/cms/route/store');
    } catch (error) {
        console.error(error);
    }
}

</script>
