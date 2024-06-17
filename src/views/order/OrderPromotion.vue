<template>
    <LayoutSub>
        <template v-slot>
            <div class="flex flex-col h-full">
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
                    <div>
                        ของแถม
                    </div>
                    <div
                    class="bg-white px-2 sha shadow-slate-300 shadow-md rounded-lg overflow-auto md:w-card sm:w-[360px] sm:h-[275px] md:h-[600px]">
                    <div class="flex flex-col p-4" v-for="free in listFree" :key="free.proId">
                        <div class="flex justify-between">
                            <h2 class="mb-2 sm:text-lg font-semibold tracking-tight overflow-hidden whitespace-nowrap truncate">
                            {{ free.proId }}
                            </h2>
                            <button type="button" @click="handleClick()"
                                class="text-white bg-red-500 w-6 h-6 font-medium rounded-md sm:text-sm md:text-lg inline-flex flex-col items-center justify-center">
                                <Icon class="icon w-4 h-4" icon="ph:x-bold" />
                            </button>
                        </div>
                        <div class="flex justify-between">
                            <p class="mb-3 justify-end font-normal text-gray-700">
                               {{ free.summaryQty }}
                            </p>
                            <p class="mb-3 justify-end font-normal text-gray-700">
                                {{ free.listProduct[0].productName }}
                            </p>
                        </div>
                    </div>
                </div>
                </div>
                <div class="flex flex-col items-center mt-5">
                    <div>
                        ส่วนลด
                    </div>
                    <Table :columns="tableFree" :data="listDiscount"
                        :thClass="'px-10 py-3 text-center sm:text-sm md:text-lg'"
                        :tdClass="'px-10 py-2 sm:text-sm md:text-lg text-start'" :hTable="'sm:h-[275px] md:h-[350px]'">
                        <!-- <template v-slot:button="{ rowData }">
                            <button type="button"
                                class="text-white bg-red-500 w-6 h-6 font-medium rounded-md text-md inline-flex flex-col items-center justify-center"
                                @click="handleClick(rowData.id, rowData.unitId)">
                                <Icon class="icon w-4 h-4" icon="ph:x-bold" />
                            </button>
                        </template> -->
                    </Table>
                </div>
                <div class="relative rounded-t-xl overflow-auto p-4">
                    <div class="flex flex-nowrap gap-4 font-mono text-white md:text-2xl rounded-lg">
                        <button class="p-4 w-full rounded-lg flex items-center justify-center bg-green-500 shadow-lg"
                            @click="handleCheckout">
                            ถัดไป
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
import { useOrderStore, usePromotionStore } from '../../stores'
import LayoutSub from '../LayoutSub.vue'
import ButtonBack from '../../components/ButtonBack.vue'
import Table from '../../components/Table.vue'
import Alert from '../../components/Alert.vue'

const router = useRouter()
const storeId = localStorage.getItem('routeStoreId')
const storeName = localStorage.getItem('routeStoreName')

const store = useOrderStore();
const reward = usePromotionStore();
const orderCart = computed(() => {
    return store.orderCart;
});
const orderCartList = computed(() => {
    return store.orderCartList;
});
const listFree = computed(() => {
    return reward.freeList;
});
const listDiscount = computed(() => {
    return reward.discountList;
});
onMounted(() => {
    store.getOrderCart();
});
onMounted(() => {
    reward.getPromotionReward();
});

const dataReward = computed(() => {
    return {
        listFree: reward.freeList.map(item => ({
            proId: item.proId,
            summaryQty: item.summaryQty,
            listProduct: item.listProduct.map(product => ({
                productId: product.productId,
                productName: product.productName,
                qty: `${product.qty} ${product.unitQty}`,
            })),
        })),
    }
});

const dataDiscount = computed(() => {
    return store.orderCartList.map(item => ({
        ...item,
        qty: `${item.qty} ${item.unitTypeThai}`
    }));
});

const tableReward = computed(() => {
    return [
        { id: 'proId', title: 'โปร' },
        { id: 'productName', title: 'สินค้า' },
        { id: 'qty', title: 'จำนวน' },
        { id: '', title: '*' },
    ];
});

const tableFree = computed(() => {
    return [
        { id: 'proId', title: 'สินค้า' },
        { id: 'qty', title: 'จำนวน' },
        { id: 'summaryPrice', title: 'รวม' },
        // { id: '', title: '*' },
    ];
});

const showAlert = ref(false)
const alertTitle = 'Confirmation';
const alertContent = 'Are you sure you want to delete this item?'

const selectedId = ref(null);
const selectedUnitId = ref(null);

const handleClick = (id, unitId) => {
    console.log(`item: ${id}`);
    console.log(`unit: ${unitId}`);
    selectedId.value = id;
    selectedUnitId.value = unitId;
    showAlert.value = true;
    // console.log(showAlert.value);
    // store.deleteItemCart(id, unitId);
};

const dismissAlert = () => {
    showAlert.value = false;
    console.log(showAlert.value);
};

const handleCheckout = () => {
    router.push('/cms/order/checkout')
};

const productId = localStorage.getItem('orderProductId')

</script>
