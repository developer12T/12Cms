<template>
    <LayoutSub>
        <template v-slot>
            <div class="flex flex-col h-full">
                <Alert v-if="showAlert" :title="'ยืนยันการลบข้อมูล'" :content="'ต้องการลบ' + selectedName + ' หรือไม่'"
                    @confirm="deleteItem" @dismiss="dismissAlert"
                    :color="'text-gray-600 border border-red-300 bg-red-100'" :product="orderCartList.name" />
                <div class="flex flex-row items-center">
                    <div class="mt-2">
                        <ButtonBack />
                    </div>
                    <div class="mt-2 ml-2 flex items-center">
                        <Icon icon="uil:cart" width="40" />
                        <span class="ml-2 md:text-3xl">ตะกร้าสินค้า</span>
                    </div>
                </div>
                <div class="flex flex-col mt-4">
                    <div class="ml-12 text-xl">
                        รหัส : {{ storeId }}
                    </div>
                    <div class="ml-12 text-xl">
                        ชื่อ : {{ storeName }}
                    </div>
                </div>
                <div class="flex flex-col items-center mt-5">
                    <div
                        class="bg-white px-2 sha shadow-slate-300 shadow-md rounded-lg overflow-auto md:w-card sm:w-[360px] sm:h-[450px] md:h-[600px]">
                        <div v-if="orderCartList.length === 0">
                            <div class="flex items-center justify-center">
                                ยังไม่มีรายการสินค้าที่เลือก
                            </div>
                        </div>
                        <div class="flex flex-col px-3 py-2" v-for="cart in orderCartList" :key="cart.id">
                            <div class="flex justify-between">
                                <h2
                                    class="mb-2 sm:text-lg font-semibold tracking-tight overflow-hidden whitespace-nowrap truncate">
                                    {{ cart.name }}
                                </h2>
                                <button type="button" @click="handleClick(cart.id, cart.unitId, cart.name)"
                                    class="text-white bg-red-500 w-6 h-6 font-medium rounded-md sm:text-sm md:text-lg inline-flex flex-col items-center justify-center">
                                    <Icon class="icon w-4 h-4" icon="ph:x-bold" />
                                </button>
                            </div>
                            <div class="flex justify-between">
                                <p class="mb-2 justify-end font-normal text-gray-700">
                                    ฿{{ cart.summaryPrice }}
                                </p>
                                <p class="mb- justify-end font-normal text-gray-700">
                                    {{ cart.qtyText }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="relative rounded-t-xl p-3">
                    <div class="flex flex-nowrap gap-4 font-mono text-white md:text-2xl rounded-lg">
                        <button class="p-4 w-full rounded-lg flex items-center justify-center bg-blue-800 shadow-lg"
                            @click="handleAdd">
                            เลือกสินค้าเพิ่ม
                        </button>
                        <button :class="{
                    'p-4 w-full rounded-lg flex items-center justify-center shadow-lg': true,
                    'bg-green-500': orderCartList.length > 0,
                    'bg-gray-400': orderCartList.length === 0
                }" @click="handleCheckout" :disabled="orderCartList.length === 0 ">
                            สร้างรายการ
                        </button>
                    </div>
                </div>
                <div class="flex-grow z-40">
                    <div class="bg-white h-full rounded-md shadow ">
                        <div class="flex flex-row justify-between">
                            <div class="md:text-2xl ml-7">
                                จำนวน
                            </div>
                            <div class="md:text-2xl mr-7">
                                {{ orderCart.totalQuantity }}
                            </div>
                        </div>
                        <div class="flex flex-row justify-between">
                            <div class="md:text-2xl ml-7">
                                มูลค่ารวม
                            </div>
                            <div class="md:text-2xl mr-7">
                                {{ orderCart.totalAmount }}
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="isSaving" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20">
                    <div class="relative p-6">
                        <Icon class="icon w-12 h-12" icon="line-md:loading-twotone-loop" />
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
import { useCnStore, usePromotionStore, useUtilityStore } from '../../stores'
import LayoutSub from '../LayoutSub.vue'
import ButtonBack from '../../components/ButtonBack.vue'
import Alert from '../../components/Alert.vue'

const router = useRouter()
const storeId = localStorage.getItem('routeStoreId')
const storeName = localStorage.getItem('routeStoreName')

const store = useCnStore()
const pro = usePromotionStore()
const util = useUtilityStore()
const orderCart = computed(() => {
    return store.cnCart;
});
const orderCartList = computed(() => {
    return store.cnCartList;
});

const showAlert = ref(false)
const selectedId = ref(null)
const selectedUnitId = ref(null)
const selectedName = ref(null)
const isSaving = ref(false)

const handleClick = (id, unitId, name) => {
    selectedId.value = id;
    selectedUnitId.value = unitId;
    selectedName.value = name;
    showAlert.value = true;
};

const deleteItem = async () => {
    const id = selectedId.value;
    const unitId = selectedUnitId.value;
    await store.deleteItemCart(id, unitId);
    dismissAlert();
    await store.getCnCart();
}

const dismissAlert = () => {
    showAlert.value = false;
    console.log(showAlert.value);
};

const handleAdd = () => {
    router.push('/cms/cn/add')
}

const handleCheckout = () => {
    router.push('/cms/cn/checkout')
}

onMounted(() => {
    store.getCnCart();
});

</script>
