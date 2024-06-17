<template>
    <div>
        <h2>ข้อมูลร้านค้า</h2>
    </div>
    <div class="flex justify-center">
        <div class="bg-white h-[550px] w-[350px] shadow-md rounded-lg mt-1 overflow-auto">
            <div class=" flex flex-col items-center mt-5">
                <div class="mb-1">
                    <InputFeild :id="'storeName'" :label="'ชื่อร้านค้า'" :inputClass="'w-[300px] p-2.5'" :type="'text'"
                        v-model="vStoreName" :isRequired="true">
                    </InputFeild>
                    <div class="flex justify-end">
                        <!-- <span v-if="!vStoreName.trim()" class="text-sm font-light text-red-500">{{ utility.errorMessage }}</span> -->
                    </div>
                </div>
                <div class="mb-1">
                    <InputFeild :id="'storeTax'" :label="'เลขที่ผู้เสียภาษี'" :inputClass="'w-[300px] p-2.5'"
                        :type="'text'" v-model="vStoreTax" :maxlength="13">
                    </InputFeild>
                </div>
                <div class="mb-1">
                    <InputFeild :id="'storePhone'" :label="'โทรศัพท์'" :inputClass="'w-[300px] p-2.5'" :type="'number'"
                        v-model="vStorePhone" :maxlength="10">
                    </InputFeild>
                </div>
                <div class="flex flex-row">
                    <form class="max-w-sm mx-auto">
                        <label for="storeType"
                            class="block mb-2 text-sm font-medium text-gray-900">ประเภทร้านค้า</label>
                        <select v-model="vStoreType" id="storeType"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[190px] p-2.5">
                            <option disabled value="">เลือกประเภทร้านค้า</option>
                            <option v-for="type in dataStoreType" :key="type.id" :value="type.id">
                                {{ type.name }}
                            </option>
                        </select>
                    </form>
                    <div class="mb-1 ml-2">
                        <InputFeild :id="'storeRoute'" :label="'เส้นทาง'" :inputClass="'w-[100px] p-2.5'" :type="'text'"
                            v-model="vStoreRoute">
                        </InputFeild>
                    </div>
                </div>
                <div class="mb-1">
                    <InputFeild :id="'lineId'" :label="'Line ID'" :inputClass="'w-[300px] p-2.5'" :type="'text'"
                        v-model="vStoreLine">
                    </InputFeild>
                </div>
                <div class="mb-5">
                    <InputFeild :id="'storeNote'" :label="'หมายเหตุ'" :inputClass="'w-[300px] p-2.5'" :type="'text'"
                        v-model="vStoreNote">
                    </InputFeild>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import InputFeild from '../../components/tablet/InputFeild.vue'
import { useUtilityStore, useStoresStore } from '../../stores'

const store = useStoresStore()
const utility = useUtilityStore()

const dataStoreType = computed(() => {
    return store.storeType;
})

const vStoreName = ref(utility.storeName)
const vStoreTax = ref(utility.storeTax)
const vStorePhone = ref(utility.storePhone)
const vStoreRoute = ref(utility.storeRoute)
const vStoreType = ref(utility.storeType)
const vStoreLine = ref(utility.storeLine)
const vStoreNote = ref(utility.storeNote)

watch([vStoreName, vStoreTax, vStorePhone, vStoreRoute, vStoreType, vStoreLine, vStoreNote], () => {
    utility.updateStoreData({
        storeName: vStoreName.value,
        storeTax: vStoreTax.value,
        storePhone: vStorePhone.value,
        storeRoute: vStoreRoute.value,
        storeType: vStoreType.value,
        storeLine: vStoreLine.value,
        storeNote: vStoreNote.value,
    })
})

onMounted(() => {
    store.getStoreType()
});

</script>