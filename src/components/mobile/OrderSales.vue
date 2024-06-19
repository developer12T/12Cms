<template>
    <Table :columns="tableColumns" :data="order" :thClass="'px-8 py-3'" :tdClass="'px-9 py-2'"
        :hTable="'sm:h-[430px] md:h-[650px]'" @row-click="handleRowClick"></Table>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Table from '../../components/Table.vue'
import { useOrderStore } from '../../stores'

const router = useRouter()
const store = useOrderStore();
const order = computed(() => {
    return store.orderMain;
});

const tableColumns = computed(() => {
    return [
        { id: 'orderNo', title: 'รายการ' },
        { id: 'storeName', title: 'ร้าน' },
        { id: 'totalPrice', title: 'จำนวน' },
    ];
});

const handleRowClick = (row) => {
    console.log(row.orderNo)
    router.push('order/detail')
    store.getOrderDetail(row.orderNo)
};

onMounted(() => {
    store.getOrderMain();
});

</script>
