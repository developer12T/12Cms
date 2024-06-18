<template>
    <LayoutSub>
        <template v-slot>
            <div class="flex flex-col md:h-full space-y-4 p-4">
                <div class="flex items-center space-x-4">
                    <ButtonBack />
                    <span class="ml-2 text-xl font-bold">รายละเอียด</span>
                </div>
                <div class="bg-white p-4 shadow-md rounded-md">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="border p-3 rounded-md">
                            <div class="text-lg font-semibold">พนักงาน</div>
                            <div>{{ detail.saleMan }}</div>
                        </div>
                        <div class="border p-3 rounded-md">
                            <div class="text-lg font-semibold">ร้านค้า</div>
                            <div>{{ detail.name }}</div>
                        </div>
                        <div class="border p-3 rounded-md">
                            <div class="text-lg font-semibold">ที่อยู่</div>
                            <div>{{ detail.address }}</div>
                        </div>
                        <div class="border p-3 rounded-md">
                            <div class="text-lg font-semibold">เบอร์โทรศัพท์</div>
                            <div>{{ detail.tel }}</div>
                        </div>
                        <div class="border p-3 rounded-md">
                            <div class="text-lg font-semibold">เลขที่ผู้เสียภาษี</div>
                            <div>{{ detail.tax }}</div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col items-center">
                    <div class="bg-white px-4 py-2 shadow-md rounded-lg overflow-auto w-full max-w-2xl">
                        <div class="flex flex-col space-y-4">
                            <div v-for="list in detailList" :key="list.id" class="border-b pb-2">
                                <div class="flex justify-between">
                                    <h2 class="text-lg font-semibold tracking-tight overflow-hidden whitespace-nowrap truncate">
                                    {{ list.name }}
                                    </h2>
                                </div>
                                <div class="flex justify-between">
                                    <p class="font-normal text-gray-700">
                                       ฿{{ list.summaryPrice }}
                                    </p>
                                    <p class="font-normal text-gray-700">
                                        {{ list.qtyText }}
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
                    <div class="bg-white p-4 rounded-md shadow-md space-y-2">
                        <div class="flex justify-between text-lg">
                            <span>ยอดรวม</span>
                            <span>{{ detail.totalPrice }}</span>
                        </div>
                        <div class="flex justify-between text-lg">
                            <span>ส่วนลดท้ายบิล</span>
                            <span>{{ detail.totalDiscount }}</span>
                        </div>
                        <div class="flex justify-between text-lg">
                            <span>ราคาไม่รวมภาษี(Vat)</span>
                            <span>{{ detail.totalExVat }}</span>
                        </div>
                        <div class="flex justify-between text-lg">
                            <span>ภาษี(Vat)</span>
                            <span>{{ detail.totalPrice - detail.totalExVat }}</span>
                        </div>
                        <div class="flex justify-between text-lg font-bold">
                            <span>มูลค่ารวม</span>
                            <span>{{ detail.totalPrice }}</span>
                        </div>
                    </div>
                </div>
                    <div class="flex gap-4 text-white text-xl">
                        <button class="p-4 w-full rounded-lg flex items-center justify-center bg-blue-500 shadow-lg"
                            @click="handleClick">
                            พิมพ์ใบเสร็จ
                        </button>
                    </div>
            </div>
        </template>
    </LayoutSub>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useOrderStore } from '../../stores'
import LayoutSub from '../LayoutSub.vue'
import ButtonBack from '../../components/ButtonBack.vue'
const router = useRouter();

const store = useOrderStore();
const detail = computed(() => store.orderDetail)
const detailList = computed(() => store.orderDetailList)

onMounted(() => {
    store.getOrderDetail();
});

</script>
