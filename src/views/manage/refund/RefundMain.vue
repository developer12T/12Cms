<template>
    <LayoutSub>
        <template v-slot>
            <div class="flex flex-col h-full">
                <Alert v-if="showAlert" :title="'ลบข้อมูล' + selectedName" :content="'ยืนยันการลบข้อมูล'"
                    @confirm="deleteItem" @dismiss="dismissAlert" :color="'text-gray-600 border border-red-300 bg-red-100'"
                    :product="'55s'" />
                <div class="flex flex-row items-center">
                    <div class="mt-2">
                        <ButtonBack />
                    </div>
                    <div class="mt-2 ml-2 flex items-center">
                        <Icon icon="mdi:file-exchange-outline" width="40" />
                        <span class="ml-2 text-3xl">เปลี่ยนสินค้า</span>
                    </div>
                </div>
                <div class="flex flex-col mt-4">
                    <div class="ml-5 text-xl">
                        รหัส : {{ storeId }}
                    </div>
                    <div class="ml-5 text-xl">
                        ชื่อ : {{ storeName }}
                    </div>
                </div>
                <div class="flex flex-row justify-between mt-5">
                    <div class="flex justify-start ml-5 text-xl font-semibold">
                        สินค้าที่รับคืน
                    </div>
                    <div class="flex justify-start mr-5">
                        <router-link to="/cms/manage/refund/add">
                            <button type="button"
                                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-1 me-2 mb-2">เพิ่ม</button>
                        </router-link>
                    </div>
                </div>
                <div class="flex flex-col items-center">
                    <Table :columns="refundColumns" :data="listChange" :thClass="'px-10 py-3'" :tdClass="'px-10 py-2'"
                        :hTable="'h-[260px]'">
                        <template v-slot:button="{ rowData }">
                            <button type="button"
                                class="text-white bg-red-500 w-6 h-6 font-medium rounded-md text-md inline-flex flex-col items-center justify-center"
                                @click="handleClick(rowData.id, rowData.unitId)">
                                <Icon class="icon w-4 h-4" icon="ph:x-bold" />
                            </button>
                        </template>
                    </Table>
                </div>
                <div class="flex flex-row justify-between mt-5">
                    <div class="flex justify-start ml-5 text-xl font-semibold">
                        สินค้าที่เปลี่ยน
                    </div>
                    <div class="flex justify-start mr-5">
                        <router-link to="/cms/manage/change/add">
                            <button type="button"
                                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-1 mb-2">เพิ่ม</button>
                        </router-link>
                    </div>
                </div>
                <div class="flex flex-col items-center">
                    <Table :columns="changeColumns" :data="listReturn" :thClass="'px-10 py-3'" :tdClass="'px-10 py-2'"
                        :hTable="'h-[260px]'">
                        <template v-slot:button="{ rowData }">
                            <button type="button"
                                class="text-white bg-red-500 w-6 h-6 font-medium rounded-md text-md inline-flex flex-col items-center justify-center"
                                @click="handleClick(rowData.id, rowData.unitId)">
                                <Icon class="icon w-4 h-4" icon="ph:x-bold" />
                            </button>
                        </template>
                    </Table>
                </div>
                <div class="flex-grow z-40 mt-2">
                    <!-- <div class="bg-white h-full rounded-md shadow "> -->
                    <div class="flex flex-row justify-between">
                        <div class="text-2xl ml-7">
                            รวมสินค้าที่รับคืน
                        </div>
                        <div class="text-2xl mr-7">
                            {{ refundCart.totalReturn }}
                        </div>
                    </div>
                    <div class="flex flex-row justify-between">
                        <div class="text-2xl ml-7">
                            รวมสินค้าที่เปลี่ยน
                        </div>
                        <div class="text-2xl mr-7">
                            {{ refundCart.totalChange }}
                        </div>
                    </div>
                    <div class="flex flex-row justify-between">
                        <div class="text-2xl ml-7">
                            รวมส่วนต่างสินค้า
                        </div>
                        <div class="text-2xl mr-7">
                            {{ refundCart.totalChange }}
                        </div>
                    </div>
                    <!-- </div> -->
                </div>
                <div class="relative rounded-t-xl overflow-auto p-4">
                    <div class="flex flex-nowrap gap-4 font-mono text-white text-2xl rounded-lg">
                        <button class="p-4 w-full rounded-lg flex items-center justify-center bg-green-500 shadow-lg"
                            @click="handleCreate">
                            สร้างรายการ
                        </button>
                    </div>
                </div>
            </div>
        </template>
    </LayoutSub>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import { useRefundStore } from '../../../stores'
import LayoutSub from '../../LayoutSub.vue'
import ButtonBack from '../../../components/IconBack.vue'
import Table from '../../../components/Table.vue'
import Alert from '../../../components/Alert.vue'

export default {
    components: {
        Icon,
        LayoutSub,
        ButtonBack,
        Table,
        Alert,
    },
    setup() {
        const router = useRouter()
        const storeId = localStorage.getItem('routeStoreId')
        const storeName = localStorage.getItem('routeStoreName')

        const store = useRefundStore();
        const refundCart = computed(() => {
            return store.refundCart;
        });
        const listReturn = computed(() => {
            return store.refundCart.returnList;
        });
        const listChange = computed(() => {
            return store.refundCart.changeLsit;
        });
        onMounted(() => {
            store.getRefundCart();
        });

        const refundColumns = computed(() => {
            return [
                { id: 'name', title: 'สินค้า' },
                { id: 'qty', title: 'จำนวน' },
                { id: '', title: '*' },
            ];
        });

        const changeColumns = computed(() => {
            return [
                { id: 'name', title: 'ชื่อสินค้า' },
                { id: 'qty', title: 'จำนวน' },
                { id: '', title: '*' },
            ];
        });

        const showAlert = ref(false)

        const selectedId = ref(null);
        const selectedUnitId = ref(null);
        const selectedName = ref(null);

        const handleClick = (id, unitId, name) => {
            // console.log(`item: ${id}`);
            // console.log(`unit: ${unitId}`);
            // console.log(`unit: ${name}`);
            selectedId.value = id;
            selectedUnitId.value = unitId;
            selectedName.value = name;
            showAlert.value = true;
            // console.log(showAlert.value);
            // store.deleteItemCart(id, unitId);
        };

        const deleteItem = () => {
            const id = selectedId.value;
            const unitId = selectedUnitId.value;

            store.deleteItemCart(id, unitId);
            store.getOrderCart();
            dismissAlert();
        };

        const dismissAlert = () => {
            showAlert.value = false;
            console.log(showAlert.value);
        };

        const handleCreate = () => {
            router.push('/cms/order/promotion')
        };

        const productId = localStorage.getItem('orderProductId')

        return {
            storeId,
            storeName,
            productId,
            refundCart,
            listReturn,
            listChange,
            refundColumns,
            changeColumns,
            handleClick,
            showAlert,
            deleteItem,
            dismissAlert,
            selectedName,
            handleCreate,
        }
    }
}
</script>
