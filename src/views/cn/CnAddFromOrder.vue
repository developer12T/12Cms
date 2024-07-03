<template>
    <LayoutSub>
        <template v-slot>
            <div class="flex flex-col md:h-full space-y-4 p-4">
                <Alert v-if="showAlert" :title="'สร้างรายการคืน'" :content="'ยืนยันการสร้างรายการคืนสินค้า'"
                    @confirm="handleSave" @dismiss="dismissAlert"
                    :color="'text-gray-600 border border-green-300 bg-red-100'" />
                <div class="flex items-center space-x-4">
                    <ButtonBack />
                    <span class="ml-2 text-xl font-bold">ยืนยันการคืนสินค้า</span>
                </div>
                <div class="bg-white p-3 shadow-md rounded-md">
                    <form class="max-w-sm mx-auto">
                        <select v-model="selectedReason"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                            <option value="" disabled selected>กรุณาเลือกสาเหตุ</option>
                            <option v-for="reason in dataReason" :key="reason.id" :value="reason.name">
                                {{ reason.name }}
                            </option>
                        </select>
                    </form>
                </div>
                <div class="bg-white p-3 shadow-md rounded-md">
                    <div class="text-sm">
                        <div class="flex flex-row justify-between">
                            <div class="flex justify-start">
                                {{ detail.orderDate }}
                            </div>
                            <div class="flex justify-end">
                                รายการ: {{ detail.orderNo }}
                            </div>
                        </div>
                        <div>{{ detail.name }} | {{ detail.tel }}</div>
                    </div>
                </div>
                <div class="flex flex-col items-center">
                    <div class="bg-white px-4 py-2 shadow-md rounded-lg overflow-auto h-[220px] w-full max-w-2xl">
                        <div class="flex flex-col space-y-4">
                            <div v-for="details in detailList" :key="details.id" class="border-b pb-2">
                                <div class="flex justify-between">
                                    <h2
                                        class="text-lg font-semibold tracking-tight overflow-hidden whitespace-nowrap truncate">
                                        {{ details.name }}
                                    </h2>
                                </div>
                                <div class="flex justify-between">
                                    <p class="font-normal text-gray-700">
                                        ฿{{ details.summaryPrice }}
                                    </p>
                                    <p class="font-normal text-gray-700">
                                        {{ details.qtyText }}
                                    </p>
                                </div>
                            </div>
                            <!-- <div v-for="free in checkoutFree" :key="free.id" class="border-b pb-2">
                                <div class="flex justify-between">
                                    <h2 class="text-lg font-semibold tracking-tight overflow-hidden whitespace-nowrap truncate">
                                    {{ free.name }}
                                    </h2>
                                </div>
                                <div class="flex justify-between">
                                    <p class="font-normal text-gray-700">
                                       <span class="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded">โปรโมชัน</span>
                                    </p>
                                    <p class="font-normal text-gray-700">
                                        {{ free.qtyText }}
                                    </p>
                                </div>
                            </div> -->
                        </div>
                    </div>
                </div>
                <div class="flex-grow">
                    <div class="bg-white p-3 rounded-md shadow-md">
                        <div class="flex justify-between text-lg">
                            <span>ยอดรวม</span>
                            <span>{{ detail.totalPrice }}</span>
                        </div>
                        <div class="flex justify-between text-lg">
                            <span>ส่วนลดท้ายบิล</span>
                            <span>{{ detail.totalDiscount }}</span>
                        </div>
                        <div class="flex justify-between text-lg">
                            <span>ราคาไม่รวมภาษี (Vat)</span>
                            <span>{{ detail.totalExVat }}</span>
                        </div>
                        <div class="flex justify-between text-lg">
                            <span>ภาษี (Vat)</span>
                            <span>{{ detail.totalVat }}</span>
                        </div>
                        <div class="flex justify-between text-lg font-bold">
                            <span>มูลค่ารวม</span>
                            <span>{{ detail.totalPrice }}</span>
                        </div>
                    </div>
                </div>
                <div class="flex gap-4 text-white text-xl">
                    <button class="p-4 w-full rounded-lg flex items-center justify-center bg-green-500 shadow-lg"
                        @click="handleClick">
                        บันทึกรายการ
                    </button>
                </div>
            </div>
        </template>
    </LayoutSub>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCnStore, useOrderStore, useGeolocation, useOptionStore, useUtilityStore } from '../../stores'
import LayoutSub from '../LayoutSub.vue'
import ButtonBack from '../../components/ButtonBack.vue'
import Alert from '../../components/Alert.vue'

const router = useRouter()
const util = useUtilityStore()
const cn = useCnStore()
const store = useOrderStore()
const option = useOptionStore()
const detail = computed(() => store.orderDetail)
const detailList = computed(() => store.orderDetailList)
const dataReason = computed(() => option.reason)
// const checkoutFree = computed(() => store.orderCheckoutFree)
const { latitude, longitude, error } = useGeolocation()

const showAlert = ref(false)
const selectedReason = ref('')
const reasonType = ('CN')

const handleClick = () => {
    if (!selectedReason.value) {
            alert('กรุณาเลือกสาเหตุการคืนสินค้า');
            return;
        } else {
            showAlert.value = true;
        }
    console.log(selectedReason.value)
};

const dismissAlert = () => {
    showAlert.value = false;
    console.log(showAlert.value);
};

const handleSave = async () => {
    try {
        console.log(util.orderNo)
        console.log(util.saleCode)
        console.log(util.zone)
        console.log(selectedReason.value)
        await cn.addFromOrder({
            orderNo: util.orderNo,
            saleCode: util.saleCode,
            zone: util.zone,
            noteCnOrder: selectedReason.value
        })
        showAlert.value = false
        await router.push('/cms/order')
    } catch (error) {
        console.error(error)
    }
}

onMounted(() => {
    store.getOrderDetail(util.orderNo)
    option.getReason(reasonType)
});

</script>
