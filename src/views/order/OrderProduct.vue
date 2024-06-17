<template>
    <LayoutSub>
        <template v-slot>
            <div class="flex flex-col h-full">
                <div class="flex flex-row items-center">
                    <div class="mt-2">
                        <ButtonBack />
                    </div>
                    <div class="mt-2 ml-2 flex items-center">
                        <Icon icon="uil:cart" width="40" />
                        <span class="ml-2 md:text-3xl">รายละเอียดสินค้า</span>
                    </div>
                </div>
                <div class="flex flex-col items-center mt-5">
                    <div
                        class="flex flex-col items-center p-2 bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl md:h-52 sm:flex-row sm:max-w-xl sm:h-32">
                        <img class="object-cover rounded-t-lg h-auto md:w-48 md:rounded-none md:rounded-s-lg sm:w-28"
                            src="https://flowbite.com/docs/images/carousel/carousel-2.svg" alt="">
                        <div class="flex flex-col justify-between p-4 leading-normal">
                            <p class="mb-2 md:text-2xl">
                                รหัส : {{ productDetail.id }}
                            </p>
                            <p class="mb-2 md:text-2xl">
                                ชื่อ : {{ productDetail.name }}
                            </p>
                            <p class="mb-2 md:text-2xl">
                                {{ selectedPrice ? 'ราคา : ' + selectedPrice : 'ราคา : เลือกหน่วยสินค้า' }}
                            </p>
                        </div>
                    </div>
                </div>
                <div class="relative rounded-t-xl overflow-auto p-8">
                    <div class="flex flex-nowrap gap-4 font-mono text-white md:text-2xl rounded-lg">
                        <button class="p-4 w-full rounded-lg flex items-center justify-center bg-green-500 shadow-lg"
                            v-for="item in productUnit" :key="item.id"
                            @click="() => { updatePrice(item.pricePerUnitSale); handleClick(item.id); }">
                            {{ item.nameThai }}
                        </button>
                    </div>
                </div>
                <div class="flex flex-grow justify-center z-40">
                    <div class="bg-white h-full sm:w-[360px] md:w-card rounded-md shadow">
                        <div class="ml-2 mt-2 md:text-xl">
                            รายละเอียดสินค้า/โปรโมชัน
                        </div>
                    </div>
                </div>
                <div class="flex flex-row justify-between">
                    <div class="flex justify-start md:text-2xl ml-7 mt-3">
                        รวมราคา : {{ productDetail.sumPrice }} บาท
                    </div>
                    <div class="flex justify-end mr-7 mt-2">
                        <InputCounter @increment="handleQty" @decrement="handleQty"></InputCounter>
                    </div>
                </div>
                <div class="relative rounded-t-xl overflow-auto p-8">
                    <div class="flex flex-nowrap gap-4 font-mono text-white md:text-2xl leading-6 rounded-lg">
                        <button class="p-4 w-full rounded-lg flex items-center justify-center bg-green-500 shadow-lg"
                            @click="handleSubmit">
                            เพิ่มสินค้า
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
import { useOrderStore } from '../../stores'
import LayoutSub from '../LayoutSub.vue'
import ButtonBack from '../../components/ButtonBack.vue'
import InputCounter from '../../components/tablet/InputCounter.vue'


const router = useRouter();
const store = useOrderStore();
const productDetail = computed(() => store.productDetail)
const productUnit = computed(() => store.productUnit)

onMounted(() => {
    store.getSaleProductDetailUnit();
    const localProductId = localStorage.getItem('productId');
    if (localProductId) {
        store.productId = localProductId;
        console.log('product', store.productId);
    }
});

const selectedPrice = ref('')
const selectedUnitId = ref(null)
const selectedQty = ref(1)

const updatePrice = (price) => {
    selectedPrice.value = price
}

const handleClick = (id) => {
    selectedUnitId.value = id
    store.updateProductData({
        id: store.productId,
        unitId: selectedUnitId.value,
        qty: 1
    })
    // console.log('unitId', id);
    // console.log(localStorage.getItem("area"));
}

const handleQty = (counterValue) => {
    selectedQty.value = counterValue
    store.updateProductData({
        id: store.productId,
        unitId: selectedUnitId.value,
        qty: selectedQty.value
    })
    // console.log('qty', counterValue);
}

const handleSubmit = async () => {
    if (selectedQty.value !== null && selectedQty.value !== 0 && selectedUnitId.value !== null) {
        try {
            await store.addProductData({
                area: localStorage.getItem("area"),
                storeId: localStorage.getItem('routeStoreId'),
                list: {
                    id: store.productId,
                    name: productDetail.value.name,
                    pricePerUnitSale: selectedPrice.value,
                    qty: selectedQty.value,
                    unitId: selectedUnitId.value
                }
            });
            await router.push('/cms/order/add');
        } catch (error) {
            console.error(error);
        }
    } else {
        console.log('กรุณาเลือกจำนวนสินค้า');
    }
}

router.beforeEach((to, from, next) => {
    store.resetProduct();
    next();
});
</script>
