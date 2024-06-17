<template>
    <div>
        <h2>ที่อยู่</h2>
    </div>
    <div class="flex justify-center">
        <div class="bg-white h-[550px] w-[350px] shadow-md rounded-lg mt-2 overflow-auto">
            <div class=" flex flex-col items-center mt-3">
                <div class="mb-1">
                    <InputFeild :id="'storeAddress'" :label="'ที่อยู่'" :inputClass="'w-[300px] p-2.5'" :type="'text'"
                        v-model="vStoreAddress">
                    </InputFeild>
                </div>
                <div class="mb-1 mt-1">
                    <form class="max-w-sm mx-auto">
                        <label for="provinces" class="block mb-2 text-sm font-medium text-gray-900">จังหวัด</label>
                        <select v-model="vStoreProvince" id="provinces" 
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] p-2.5">
                            <option disabled value="">เลือกจังหวัด</option>
                            <option v-for="province in dataProvince" :key="province.province"
                                :value="province.province">
                                {{ province.province }}
                            </option>
                        </select>
                    </form>
                </div>
                <div class="mb-1 mt-1">
                    <form class="max-w-sm mx-auto">
                        <label for="districts" class="block mb-2 text-sm font-medium text-gray-900">อำเภอ</label>
                        <select v-model="vStoreDistrict" id="districts" 
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] p-2.5">
                            <option disabled value="">เลือกอำเภอ</option>
                            <option v-for="district in dataDistrict" :key="district.amphoe" :value="district.amphoe">
                                {{ district.amphoe }}
                            </option>
                        </select>
                    </form>
                </div>
                <div class="mb-1 mt-1">
                    <form class="max-w-sm mx-auto">
                        <label for="subdistrics" class="block mb-2 text-sm font-medium text-gray-900">ตำบล</label>
                        <select v-model="vStoreSubdistrict" id="subdistrics" 
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] p-2.5">
                            <option disabled value="">เลือกตำบล</option>
                            <option v-for="subdistrict in dataSubDistrict" :key="subdistrict.district"
                                :value="subdistrict.district">
                                {{ subdistrict.district }}
                            </option>
                        </select>
                    </form>
                </div>
                <div class="mb-1 mt-1">
                    <form class="max-w-sm mx-auto">
                        <label for="zipcode" class="block mb-2 text-sm font-medium text-gray-900">รหัสไปรษณีย์</label>
                        <select v-model="vStoreZipcode" id="zipcode" 
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] p-2.5">
                            <option disabled value="">เลือกรหัสไปรษณีย์</option>
                            <option v-for="zipcode in dataZipcode" :key="zipcode.zipcode" :value="zipcode.zipcode">
                                {{ zipcode.zipcode }}
                            </option>
                        </select>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, watchEffect, watch } from 'vue'
import { useStoresStore, useUtilityStore } from '../../stores'
import InputFeild from '../../components/mobile/InputFeild.vue'

const utility = useUtilityStore()

const vStoreAddress = ref(utility.storeAddress)
const vStoreProvince = ref(utility.storeProvince)
const vStoreDistrict = ref(utility.storeDistrict)
const vStoreSubdistrict = ref(utility.storeSubdistrict)
const vStoreZipcode = ref(utility.storeZipcode)

const store = useStoresStore()
const dataProvince = computed(() => {
    return store.provice;
})
const dataDistrict = computed(() => {
    return store.district;
})
const dataSubDistrict = computed(() => {
    return store.subdistrict;
})
const dataZipcode = computed(() => {
    return store.zipcode;
})

onMounted(() => {
    store.getProvince()
});

watchEffect(() => {
    if (vStoreProvince.value) {
        store.getDistrict(vStoreProvince.value)
    }
    if (vStoreProvince.value && vStoreDistrict.value) {
        store.getSubdistrict(vStoreProvince.value, vStoreDistrict.value)
    }
    if (vStoreProvince.value && vStoreDistrict.value && vStoreSubdistrict.value) {
        store.getZipcode(vStoreProvince.value, vStoreDistrict.value, vStoreSubdistrict.value)
    }
})

watch([vStoreAddress, vStoreProvince, vStoreDistrict, vStoreSubdistrict, vStoreZipcode], () => {
    utility.updateAddress({
        storeAddress: vStoreAddress.value,
        storeProvince: vStoreProvince.value,
        storeDistrict: vStoreDistrict.value,
        storeSubdistrict: vStoreSubdistrict.value,
        storeZipcode: vStoreZipcode.value
    })
})

</script>