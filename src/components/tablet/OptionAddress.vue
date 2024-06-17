<template>
    <div class="flex justify-center">
        <div class="bg-white sm:w-[400px] h-64 w-card shadow-md rounded-lg mt-2 overflow-auto">
            <div class=" flex flex-col items-center mt-3">
                <div class="mb-1">
                    <InputFeild :id="'storeAddress'" :label="'ที่อยู่'" :inputClass="'sm:w-[350px] md:w-500 p-2.5'" :type="'text'" v-model="storeAddress">
                    </InputFeild>
                </div>
                <div class="flex flex-row">
                    <div class="mb-1">
                        <form class="max-w-sm mx-auto">
                            <label for="provinces" class="block mb-2 text-sm font-medium text-gray-900">จังหวัด</label>
                            <select v-model="selectedProvince" id="provinces" @change="emitData"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block sm:w-[165px] md:w-220 p-2.5">
                                <option disabled value="">เลือกจังหวัด</option>
                                <option v-for="province in dataProvince" :key="province.province" :value="province.province">
                                    {{province.province }}
                                </option>
                            </select>
                        </form>
                    </div>
                    <div class="mb-1 ml-5">
                        <form class="max-w-sm mx-auto" >
                        <label for="districts" class="block mb-2 text-sm font-medium text-gray-900">อำเภอ</label>
                        <select v-model="selectedDistrict" id="districts" @change="emitData"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block sm:w-[165px] md:w-220 p-2.5">
                            <option disabled value="">เลือกอำเภอ</option>
                            <option v-for="district in dataDistrict" :key="district.amphoe" :value="district.amphoe">
                                {{district.amphoe }}
                            </option>
                        </select>
                    </form>
                    </div>
                </div>
                <div class="flex flex-row">
                    <div class="mb-1">
                        <form class="max-w-sm mx-auto" >
                        <label for="subdistrics" class="block mb-2 text-sm font-medium text-gray-900">ตำบล</label>
                        <select v-model="selectedSubdistrict" id="subdistrics" @change="emitData"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block sm:w-[165px] md:w-220 p-2.5">
                            <option disabled value="">เลือกตำบล</option>
                            <option v-for="subdistrict in dataSubDistrict" :key="subdistrict.district" :value="subdistrict.district">
                                {{subdistrict.district }}
                            </option>
                        </select>
                    </form>
                    </div>
                    <div class="mb-1 ml-5">
                        <form class="max-w-sm mx-auto" >
                            <label for="zipcode" class="block mb-2 text-sm font-medium text-gray-900">รหัสไปรษณีย์</label>
                            <select v-model="selectedZipcode" id="zipcode" @change="emitData"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block sm:w-[165px] md:w-220 p-2.5">
                                <option disabled value="">เลือกรหัสไปรษณีย์</option>
                                <option v-for="zipcode in dataZipcode" :key="zipcode.zipcode" :value="zipcode.zipcode">
                                    {{zipcode.zipcode }}
                                </option>
                            </select>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
      
<script setup>
import { ref, computed, onMounted, watchEffect } from 'vue'
import { useStoresStore } from '../../stores';
import InputFeild from '../../components/tablet/InputFeild.vue'

const storeAddress = ref('')
const selectedProvince = ref('')
const selectedDistrict = ref('')
const selectedSubdistrict = ref('')
const selectedZipcode = ref('')

const store = useStoresStore();
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
watchEffect( () => {
    if (selectedProvince.value) {
        store.getDistrict(selectedProvince.value)
    }
    if (selectedProvince.value && selectedDistrict.value) {
        store.getSubdistrict(selectedProvince.value, selectedDistrict.value)
    }
    if (selectedProvince.value && selectedDistrict.value && selectedSubdistrict.value) {
        store.getZipcode(selectedProvince.value,selectedDistrict.value,selectedSubdistrict.value)
    }
});
const emit = defineEmits(['update:data'])
const emitData = () => {
  const address = {
    storeAddress: storeAddress.value,
    selectedProvince: selectedProvince.value,
    selectedDistrict: selectedDistrict.value,
    selectedSubdistrict: selectedSubdistrict.value,
    selectedZipcode: selectedZipcode.value,
  };

  emit('update:data', address)
};

</script>