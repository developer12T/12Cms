<template>
    <LayoutSub>
        <template v-slot>
            <div class="flex flex-col">
                <div class="flex flex-row items-center">
                    <div class="mt-2">
                        <ButtonBack />
                    </div>
                    <div class="mt-2 ml-2 flex items-center">
                        <Icon icon="tdesign:store" width="40" />
                        <span class="ml-2 md:text-3xl">การเข้าเยี่ยม {{ routeDay }}</span>
                    </div>
                </div>
                <div class="flex flex-col mt-4">
                    <div class="ml-12 md:text-xl">
                        รหัส : {{ routeStore.storeId }}
                    </div>
                    <div class="ml-12 md:text-xl">
                        ชื่อ : {{ routeStore.name }}
                    </div>
                    <div class="ml-12 md:text-xl">
                        ที่อยู่ : {{ routeStore.address }}
                    </div>
                </div>
                <div class="flex justify-center mt-5">
                    <Table :columns="tableColumns" :data="routeStoreList"
                        :thClass="'px-10 py-3 text-center sm:text-sm md:text-lg'"
                        :tdClass="'px-6 py-2 sm:text-sm md:text-lg text-center'" :hTable="'sm:h-[450px] md:h-[650px]'" @row-click="handleClick1">
                    </Table>
                </div>
                <div class="flex flex-row justify-center">
                    <div class="mt-5 sm:mx-2 md:mx-10">
                        <DrawerReason :storeID="routeStore.storeId" :storeName="routeStore.name" />
                    </div>
                    <div class="mt-5 sm:mx-2 md:mx-10">
                        <button type="button" @click="handleClick"
                            class="text-white bg-green-500 font-medium rounded-lg sm:text-xs md:text-lg px-6 py-3 inline-flex flex-col items-center justify-center shadow-slate-300 shadow-md">
                            <Icon class="icon sm:h-8 sm:w-8 md:h-10 md:w-10" icon="bi:bag-plus" />
                            <span class="">ขาย</span>
                        </button>
                    </div>
                    <div class="mt-5 sm:mx-2 md:mx-10">
                        <button type="button" @click="handleClickCn"
                            class="text-white bg-yellow-400 font-medium rounded-lg sm:text-xs md:text-lg px-6 py-3 inline-flex flex-col items-center justify-center shadow-slate-300 shadow-md">
                            <Icon class="icon sm:h-8 sm:w-8 md:h-10 md:w-10" icon="bi:bag-dash" />
                            <span class="">คืน</span>
                        </button>
                    </div>
                    <div class="mt-5 sm:mx-2 md:mx-10">
                        <DrawerPicture :btClass="'px-5 py-3'">
                            <template v-slot:icon>
                                <Icon class="icon sm:h-8 sm:w-8 md:h-10 md:w-10" :icon="'bi:camera'" />
                            </template>
                        </DrawerPicture>
                    </div>
                </div>
            </div>
        </template>
    </LayoutSub>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import { computed, onMounted } from 'vue'
import { useRouteStore, useOrderStore } from '../../stores'
import { useRouter } from 'vue-router'
import LayoutSub from '../LayoutSub.vue'
import ButtonBack from '../../components/ButtonBack.vue'
import Table from '../../components/Table.vue'
import DrawerReason from '../../components/DrawerReason.vue'
import DrawerPicture from '../../components/DrawerPicture.vue'


const store = useRouteStore()
const order = useOrderStore()
const routeStore = computed(() => {
    return store.routeStore;
});
const routeStoreList = computed(() => {
    return store.routeStoreList;
});

const tableColumns = computed(() => {
    return [
        { id: 'number', title: 'ลำดับ' },
        { id: 'date', title: 'วันที่' },
        { id: 'orderId', title: 'รายการ' },
    ];
});

const router = useRouter();
const handleClick = () => {
    router.push('/cms/order/add')
}

const handleClickCn = () => {
    router.push('/cms/cn/add')
}

const handleClick1 = (row) => {
    order.getOrderDetail(row.orderId)
    router.push('/cms/order/detail')
    console.log('order', row.orderId)
}

const routeDay = localStorage.getItem('routeDay')

onMounted(() => {
    store.getRouteStore();
});

</script>