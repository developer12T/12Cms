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
                <div class="relative rounded-t-xl p-3 mt-2">
                    <div class="flex flex-nowrap gap-4 font-mono text-white md:text-2xl rounded-lg">
                        <button class="p-4 w-full rounded-lg flex items-center justify-center bg-green-500 shadow-lg"
                            v-for="item in productUnit" :key="item.id"
                            @click="() => { updatePrice(item.pricePerUnitRefund); handleClick(item.id); }">
                            {{ item.nameThai }}
                        </button>
                    </div>
                </div>
                <div class="flex justify-center items-center z-40 bg-gray-100 mt-2">
                    <div class="bg-white w-full sm:w-[360px] md:w-card rounded-lg shadow-lg p-4">
                        <h2 class="text-lg font-semibold text-gray-800 mb-2">
                            รายละเอียดสินค้า
                        </h2>
                        <div class="mb-4">
                            <label for="datepicker-title" class="block text-gray-600 mb-2 font-medium">
                                วันที่หมดอายุ:
                            </label>
                            <div class="relative max-w-sm">
                                <div class="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                                    <Icon icon="mingcute:calendar-fill" style="color: #c0bfbf" width="30" />
                                </div>
                                <input id="datepickerExp" type="text"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                                    placeholder="เลือกวันที่" @blur="(event) => fetchProductLot(event.target.value)">
                            </div>
                            <label for="datepicker-title" class="block text-gray-600 mt-2 mb-2 font-medium">
                                ล็อตสินค้า:
                            </label>
                            <div class="relative max-w-sm">
                                <select v-model="selectedLot"
                                    class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5">
                                    <option value="" disabled selected>เลือกล็อต</option>
                                    <option v-for="item in productLot" :key="item.Lot" :value="item.Lot">
                                        {{ item.Lot }}
                                    </option>
                                </select>
                            </div>
                            <div>
                                <div v-if="!selectedLot && validateLot === true"
                                    class="flex flex-col items-end text-red-600 text-sm">*กรุณาเลือกล็อต</div>
                                <div v-else></div>
                            </div>

                            <label for="datepicker-title" class="block text-gray-600 mt-2 font-medium">
                                หมายเหตุ:
                            </label>
                            <div class="relative max-w-sm">
                                <InputFeild :id="'CnNote'" :inputClass="'w-full p-2.5'" :type="'text'"
                                    v-model="vCnNote">
                                </InputFeild>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex justify-center items-center z-40 bg-gray-100 mt-5">
                    <div class="bg-white w-full sm:w-[360px] md:w-card rounded-lg shadow-lg p-4">
                        <div class="flex flex-row justify-between">
                            <div class="flex justify-start md:text-2xl ml-1 mt-3">
                                รวม : {{ productDetail.sumCn }} บาท
                            </div>
                            <div class="flex justify-end mr-2 mt-2">
                                <InputCounter @increment="handleQty" @decrement="handleQty"></InputCounter>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="relative rounded-t-xl p-3 mt-2">
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
import { useCnStore, useProductStore } from '../../stores'
import LayoutSub from '../LayoutSub.vue'
import ButtonBack from '../../components/ButtonBack.vue'
import InputCounter from '../../components/tablet/InputCounter.vue'
import InputFeild from '../../components/tablet/InputFeild.vue'

const router = useRouter()
const order = useCnStore()
const product = useProductStore()
const productDetail = computed(() => product.productDetail)
const productUnit = computed(() => product.productUnit)
const productLot = computed(() => order.productLot)

onMounted(() => {
    product.getProductDetail()
    const localProductId = localStorage.getItem('productId')
    if (localProductId) {
        product.productId = localProductId;
    }
})

const openDatePicker = () => {
    const datepickerEl = document.getElementById('datepickerExp')
    const datepicker = new Datepicker(datepickerEl, {
        autohide: true,
    })
    datepicker.show()
}

onMounted(() => {
    const datepickerEl = document.getElementById('datepickerExp')
    if (datepickerEl) {
        new window.Datepicker(datepickerEl, {
            minDate: new Date(new Date().getFullYear() - 3, 0, 1),
            maxDate: new Date(new Date().getFullYear() + 3, 0, 1),
            autohide: true
        })
    }
})

const selectedPrice = ref('')
const selectedUnitId = ref(null)
const selectedQty = ref(1)
const selectedLot = ref('')
const selectExp = ref('')
const vCnNote = ref('')
const lotData = ref([])
const validateLot = ref(false)

const updatePrice = (price) => {
    selectedPrice.value = price
}

const handleClick = (id) => {
    selectedUnitId.value = id
    product.updateProductData({
        id: product.productId,
        unitId: selectedUnitId.value,
        qty: 1
    })
}

const handleQty = (counterValue) => {
    selectedQty.value = counterValue
    product.updateProductData({
        id: product.productId,
        unitId: selectedUnitId.value,
        qty: selectedQty.value
    })
}

const fetchProductLot = async (expDate) => {
    const productId = product.productId
    selectExp.value = expDate
    console.log(expDate)
    if (productId && expDate) {
        try {
            const response = await order.getProductLot({
                itemNo: productId,
                itemExp: expDate
            });

            lotData.value = response

            if (lotData.value) {
                selectedLot.value = lotData.value[0].Lot
            } else {
                selectedLot.value = ''
            }
        } catch (error) {
            console.error('Error fetching product lot:', error)
        }
    }
}

const handleSubmit = async () => {
    if (selectedQty.value !== null && selectedQty.value !== 0 && selectedUnitId.value !== null && selectedLot.value) {
        try {
            await order.addProductToCart({
                area: localStorage.getItem("area"),
                storeId: localStorage.getItem('routeStoreId'),
                list: {
                    id: product.productId,
                    name: productDetail.value.name,
                    pricePerUnitRefund: selectedPrice.value,
                    qty: selectedQty.value,
                    unitId: selectedUnitId.value,
                    lot: selectedLot.value,
                    exp: selectExp.value,
                    note: vCnNote.value
                }
            });
            await router.push('/cms/cn/add')

        } catch (error) {
            console.error(error);
        }
    } else {
        validateLot.value = true
    }
}

router.beforeEach((to, from, next) => {
    product.resetProduct()
    next()
})
</script>
