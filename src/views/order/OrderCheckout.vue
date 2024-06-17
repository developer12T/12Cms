<template>
    <LayoutSub>
        <template v-slot>
            <div class="flex flex-col md:h-full">
                <Alert v-if="showAlert" :title="'สร้างรายการขาย'" :content="'ยืนยันการสร้างรายการขาย'"
                    @confirm="handleSave" @dismiss="dismissAlert"
                    :color="'text-gray-600 border border-green-300 bg-green-100'" />
                <div class="flex flex-row items-center">
                    <div class="mt-2">
                        <ButtonBack />
                    </div>
                    <div class="mt-2 ml-2 flex items-center">
                        <span class="ml-2 md:text-3xl">ยืนยันการสั่งซื้อ</span>
                    </div>
                </div>
                <div class="flex flex-col mt-4">
                    <div class="ml-12 md:text-xl">
                        พนักงาน : {{ checkout.saleMan }}
                    </div>
                    <div class="ml-12 md:text-xl">
                        ร้านค้า : {{ checkout.storeName }}
                    </div>
                    <div class="ml-12 md:text-xl">
                        ที่อยู่ : {{ checkout.address }}
                    </div>
                    <div class="ml-12 md:text-xl">
                        เบอร์โทรศัพท์ : {{ checkout.tel }}
                    </div>
                    <div class="ml-12 md:text-xl">
                        เลขที่ผู้เสียภาษี : {{ checkout.taxID }}
                    </div>
                    <div class="ml-12 md:text-xl">
                        ที่อยู่จัดส่ง : {{ checkout.address }}
                    </div>
                </div>
                <div class="flex flex-col items-center mt-5">
                    <div class="bg-white px-2 sha shadow-slate-300 shadow-md rounded-lg overflow-auto md:w-card sm:w-[360px] sm:h-[300px] md:h-[600px]">
                        <div class="flex flex-col p-4" v-for="checkout in checkoutList" :key="checkout.id">
                            <div class="flex justify-between">
                                <h2 class="sm:text-lg font-semibold tracking-tight overflow-hidden whitespace-nowrap truncate">
                                {{ checkout.name }}
                                </h2>
                            </div>
                            <div class="flex justify-between">
                                <p class="justify-end font-normal text-gray-700">
                                   ฿{{ checkout.totalAmount }}
                                </p>
                                <p class="justify-end font-normal text-gray-700">
                                    {{ checkout.qtyText }}
                                </p>
                            </div>
                        </div>
                        <div class="flex flex-col p-4" v-for="free in checkoutFree" :key="free.id">
                            <div class="flex justify-between">
                                <h2 class="sm:text-lg font-semibold tracking-tight overflow-hidden whitespace-nowrap truncate">
                                {{ free.name }}
                                </h2>
                            </div>
                            <div class="flex justify-between">
                                <p class="justify-end font-normal text-gray-700">
                                   ฿{{ free.totalAmount }}
                                </p>
                                <p class="justify-end font-normal text-gray-700">
                                    {{ free.qtyText }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex-grow z-40">
                    <div class="bg-white h-full rounded-md shadow ">
                        <div class="flex flex-row justify-between">
                            <div class="md:text-xl ml-7">
                                ยอดรวม
                            </div>
                            <div class="md:text-xl mr-7">
                                {{ checkout.summaryAmount }}
                            </div>
                        </div>
                        <div class="flex flex-row justify-between">
                            <div class="md:text-xl ml-7">
                                ส่วนลดท้ายบิล
                            </div>
                            <div class="md:text-xl mr-7">
                                {{ checkout.discount }}
                            </div>
                        </div>
                        <div class="flex flex-row justify-between">
                            <div class="md:text-xl ml-7">
                                ราคาไม่รวมภาษี(Vat)
                            </div>
                            <div class="md:text-xl mr-7">
                                {{ checkout.totalAmountNoVat }}
                            </div>
                        </div>
                        <div class="flex flex-row justify-between">
                            <div class="md:text-xl ml-7">
                                ภาษี(Vat)
                            </div>
                            <div class="md:text-xl mr-7">
                                {{ checkout.vat }}
                            </div>
                        </div>
                        <div class="flex flex-row justify-between">
                            <div class="md:text-xl ml-7">
                                มูลค่ารวม
                            </div>
                            <div class="md:text-xl mr-7">
                                {{ checkout.totalAmount }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="relative rounded-t-xl overflow-auto p-4">
                    <div class="flex flex-nowrap gap-4 font-mono text-white md:text-2xl rounded-lg">
                        <button class="p-4 w-full rounded-lg flex items-center justify-center bg-green-500 shadow-lg"
                            @click="handleClick">
                            บันทึกรายการ
                        </button>
                    </div>
                </div>
            </div>
        </template>
    </LayoutSub>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import { useOrderStore, useGeolocation } from '../../stores'
import LayoutSub from '../LayoutSub.vue'
import ButtonBack from '../../components/ButtonBack.vue'
import Table from '../../components/Table.vue'
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

const tableColumns = computed(() => {
    return [
        { id: 'name', title: 'สินค้า' },
        { id: 'qtyText', title: 'จำนวน' },
        { id: 'pricePerQty', title: 'ราคา' },
        { id: 'discount', title: 'ส่วนลด' },
        { id: 'totalAmount', title: 'รวม' },
    ];
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