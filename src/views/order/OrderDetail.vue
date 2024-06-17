<template>
    <LayoutSub>
        <template v-slot>
            <div class="flex flex-col md:h-full">
                <div class="flex flex-row items-center">
                    <div class="mt-2">
                        <ButtonBack />
                    </div>
                    <div class="mt-2 ml-2 flex items-center">
                        <span class="ml-2 md:text-3xl">รายละเอียดรายการ</span>
                    </div>
                </div>
                <div class="flex flex-col mt-4">
                    <div class="ml-12 md:text-xl">
                        พนักงาน : {{ detail.saleMan }}
                    </div>
                    <div class="ml-12 md:text-xl">
                        ร้านค้า : {{ detail.storeName }}
                    </div>
                    <div class="ml-12 md:text-xl">
                        ที่อยู่ : {{ detail.address }}
                    </div>
                    <div class="ml-12 md:text-xl">
                        เบอร์โทรศัพท์ : {{ detail.tel }}
                    </div>
                    <div class="ml-12 md:text-xl">
                        เลขที่ผู้เสียภาษี : {{ detail.taxID }}
                    </div>
                    <div class="ml-12 md:text-xl">
                        ที่อยู่จัดส่ง : {{ detail.address }}
                    </div>
                </div>
                <div class="flex flex-col items-center mt-5">
                    <Table :columns="tableColumns" :data="detailList" :thClass="'px-10 py-3 text-center sm:text-sm md:text-lg'" :tdClass="'px-10 py-2 sm:text-sm md:text-lg text-start'"
                        :hTable="'sm:h-[250px] md:h-[440px]'" @row-click="handleClick">
                    </Table>
                </div>
                <div class="flex-grow z-40">
                    <div class="bg-white h-full rounded-md shadow ">
                        <div class="flex flex-row justify-between">
                            <div class="md:text-xl ml-7">
                                ยอดรวม
                            </div>
                            <div class="md:text-xl mr-7">
                                {{ detail.totalPrice }}
                            </div>
                        </div>
                        <div class="flex flex-row justify-between">
                            <div class="md:text-xl ml-7">
                                ส่วนลดท้ายบิล
                            </div>
                            <div class="md:text-xl mr-7">
                                {{ detail.totalDiscount }}
                            </div>
                        </div>
                        <div class="flex flex-row justify-between">
                            <div class="md:text-xl ml-7">
                                ราคาไม่รวมภาษี(Vat)
                            </div>
                            <div class="md:text-xl mr-7">
                                {{ detail.totalExVat }}
                            </div>
                        </div>
                        <div class="flex flex-row justify-between">
                            <div class="md:text-xl ml-7">
                                ภาษี(Vat)
                            </div>
                            <div class="md:text-xl mr-7">
                                <!-- {{ detail.vat }} -->
                            </div>
                        </div>
                        <div class="flex flex-row justify-between">
                            <div class="md:text-xl ml-7">
                                มูลค่ารวม
                            </div>
                            <div class="md:text-xl mr-7">
                                {{ detail.totalPrice }}
                            </div>
                        </div>
                    </div>
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
import Table from '../../components/Table.vue'

const router = useRouter();

const store = useOrderStore();
const detail = computed(() => store.orderDetail)
const detailList = computed(() => store.orderDetailList)

onMounted(() => {
    store.getOrderDetail();
});

const tableColumns = computed(() => {
    return [
        { id: 'name', title: 'สินค้า' },
        { id: 'qtyText', title: 'จำนวน' },
        { id: 'pricePerQty', title: 'ราคา' },
        { id: 'itemDiscount', title: 'ส่วนลด' },
        { id: 'summaryPrice', title: 'รวม' },
    ]
})

</script>
