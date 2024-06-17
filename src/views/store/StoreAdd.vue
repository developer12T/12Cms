<template>
  <LayoutSub>
    <template v-slot>
      <div class="flex flex-row items-center">
        <div class="mt-2">
          <ButtonBack />
        </div>
        <div class="mt-2 ml-2 flex items-center">
          <Icon icon="tdesign:store" width="40" />
          <span class="ml-2">เพิ่มร้านค้า</span>
        </div>
      </div>
      <div class="flex flex-row items-center justify-between mt-1">
        <div class="mt-2 ml-8 flex items-center">
          <Icon icon="tdesign:store" width="20" />
          <span class="ml-2">ข้อมูลร้านค้า</span>
        </div>
        <div class="mt-2 mr-8">
          <p class=" text-gray-500">*ข้อมูลบังคับ</p>
        </div>
      </div>
      <div class="flex justify-center">
        <div class="bg-white h-64 sm:w-[400px] md:w-card shadow-md rounded-lg mt-1 overflow-auto">
          <div class=" flex flex-col items-center mt-5">
            <div class="mb-1">
              <InputFeild :id="'storeName'" :label="'ชื่อร้านค้า'" :inputClass="'sm:w-[350px] md:w-500 p-2.5'" :type="'text'"
                v-model="vStoreName" :isRequired="true">
              </InputFeild>
              <div class="flex justify-end">
                <span v-if="!vStoreName.trim()" class="text-sm font-light text-red-500">{{ utility.errorMessage }}</span>
                <!-- <span v-else class="block text-sm font-light text-gray-900 dark:text-white">ไม่เกิน 36 ตัวอักษร</span> -->
              </div>
            </div>
            <div class="mb-1">
              <InputFeild :id="'storeTax'" :label="'เลขที่ผู้เสียภาษี'" :inputClass="'sm:w-[350px] md:w-500 p-2.5'" :type="'text'"
                v-model="vStoreTax" :maxlength="13">
              </InputFeild>
            </div>
            <div class="flex flex-row">
              <div class="mb-1">
                <InputFeild :id="'storePhone'" :label="'โทรศัพท์'" :inputClass="'sm:w-[165px] md:w-220 p-2.5'" :type="'number'"
                  v-model="vStorePhone" :maxlength="10">
                </InputFeild>
              </div>
              <div class="mb-1 ml-5">
                <InputFeild :id="'storeRoute'" :label="'เส้นทาง'" :inputClass="'sm:w-[165px] md:w-220 p-2.5'" :type="'text'"
                  v-model="vStoreRoute">
                </InputFeild>
              </div>
            </div>
            <div class="flex flex-row">
              <div class="mb-1">
                <!-- <InputFeild :id="'storeType'" :label="'ประเภทร้านค้า'" :inputClass="'w-220 p-2.5'" :type="'text'"
                  v-model="vStoreType">
                </InputFeild> -->
                <form class="max-w-sm mx-auto">
                  <label for="storeType" class="block mb-2 text-sm font-medium text-gray-900">ประเภทร้านค้า</label>
                  <select v-model="vStoreType" id="storeType"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block sm:w-[165px] md:w-220 p-2.5">
                    <option disabled value="">เลือกประเภทร้านค้า</option>
                    <option v-for="type in dataStoreType" :key="type.id" :value="type.id">
                      {{ type.name }}
                    </option>
                  </select>
                </form>
              </div>
              <div class="mb-1 ml-5">
                <InputFeild :id="'lineId'" :label="'Line ID'" :inputClass="'sm:w-[165px] md:w-220 p-2.5'" :type="'text'"
                  v-model="vStoreLine">
                </InputFeild>
              </div>
            </div>
            <div class="mb-5">
              <InputFeild :id="'storeNote'" :label="'หมายเหตุ'" :inputClass="'sm:w-[350px] md:w-500 p-2.5'" :type="'text'"
                v-model="vStoreNote">
              </InputFeild>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-row items-center justify-between mt-1">
        <div class="mt-2 ml-8 flex items-center">
          <Icon icon="tdesign:store" width="20" />
          <span class="ml-2">ที่อยู่</span>
        </div>
      </div>
      <Address v-model:storeAddress="vAddress" v-model:selectedProvince="vProvince" v-model:selectedDistrict="vDistrict"
        v-model:selectedSubdistrict="vSubdistrict" v-model:selectedZipcode="vZipcode" @update:data="updateAddress" />
      <div class="flex flex-row items-center justify-between mt-1">
        <div class="mt-2 ml-8 flex items-center">
          <Icon icon="heroicons:camera-20-solid" width="20" />
          <span class="ml-2">ถ่ายภาพ</span>
        </div>
      </div>
      <div class="flex justify-center">
        <div class="bg-white sm:w-[350px] md:w-card shadow-md rounded-lg mt-2">
          <div class="flex flex-row items-center justify-center mt-1">
            <div class="mb-2 flex items-center">
              <DrawerPicture :btClass="'px-5 py-2.5 me-2 mb-2 mt-2'" />
              <InputFeild :id="'storePicture'" :inputClass="'md:w-[430px] p-2.5'" :type="'text'" :isDisabled="true"
                v-model="imageName">
              </InputFeild>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-start">
        <div class="mt-2 ml-6 flex items-center">
          <input id="link-checkbox" type="checkbox" v-model="isChecked"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500">
          <label for="link-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the
            <a class="text-blue-600 hover:underline" @click="openDrawer">terms and conditions</a>
          </label>
        </div>
      </div>
      <DrawerPolicy :showDrawer="isDrawerOpen" @close-drawer="closeDrawer" />
      <div class="relative rounded-t-xl overflow-auto p-4">
        <div class="flex flex-nowrap gap-4 font-mono text-white md:text-2xl rounded-lg">
          <button class="p-4 w-full rounded-lg flex items-center justify-center shadow-lg"
            :class="{ 'bg-green-500': isChecked, 'bg-gray-400': !isChecked }" type="button" :disabled="!isChecked"
            @click="sendData">
            <span v-if="isLoading" class="inline-flex items-center">
              กำลังเพิ่ม
              <Icon icon="svg-spinners:3-dots-scale" />
            </span>
            <span v-else>
              เพิ่ม
            </span>
          </button>
        </div>
      </div>
    </template>
  </LayoutSub>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import { ref, computed, onMounted, watch } from 'vue'
import { useUploadStore, useUtilityStore, useGeolocation, useStoresStore } from '../../stores'
import LayoutSub from '../LayoutSub.vue'
import InputFeild from '../../components/tablet/InputFeild.vue'
import ButtonBack from '../../components/ButtonBack.vue'
import Address from '../../components/tablet/OptionAddress.vue'
import DrawerPolicy from '../../components/tablet/DrawerPolicy.vue'
import DrawerPicture from '../../components/DrawerPicture.vue'

const uploadStore = useUploadStore()
const utility = useUtilityStore()
const location = useGeolocation()
const store = useStoresStore()

watch(() => uploadStore.imageName, (newVal) => {
  if (newVal !== null) {
    imageName.value = uploadStore.imageName
  }
})

watch(() => uploadStore.path, (newPath) => {
  if (newPath !== null) {
    imagePath.value = uploadStore.path
    console.log('New path:', newPath);
  }
})

const dataStoreType = computed(() => {
  return store.storeType;
})

const vStoreName = ref('')
const vStoreTax = ref('')
const vStorePhone = ref('')
const vStoreRoute = ref('')
const vStoreType = ref('')
const vStoreLine = ref('')
const vStoreNote = ref('')
const vAddress = ref('')
const vProvince = ref('')
const vDistrict = ref('')
const vSubdistrict = ref('')
const vZipcode = ref('')
const imageName = ref('')
const imagePath = ref('')

const updateAddress = (address) => {
  vAddress.value = address.storeAddress
  vProvince.value = address.selectedProvince
  vDistrict.value = address.selectedDistrict
  vSubdistrict.value = address.selectedSubdistrict
  vZipcode.value = address.selectedZipcode
}

const isChecked = ref(false)
const isDrawerOpen = ref(false)
const isLoading = ref(false)

const openDrawer = () => {
  isDrawerOpen.value = true
}
const closeDrawer = () => {
  isDrawerOpen.value = false
}
const sendData = async () => {
  isLoading.value = true
  const isValid = utility.validateInput(vStoreName.value)

  if (!isValid) {
    isLoading.value = false
    const errorMessage = utility.getValidate()
    console.log('Invalid input. Error message:', errorMessage)
  } else {
    const dataStore = {
      taxId: vStoreTax.value,
      name: vStoreName.value,
      tel: vStorePhone.value,
      route: vStoreRoute.value,
      type: vStoreType.value,
      address: vAddress.value,
      distric: vDistrict.value,
      subDistric: vSubdistrict.value,
      province: vProvince.value,
      provinceCode: '10',
      postCode: vZipcode.value.toString(),
      zone: "BE",
      area: localStorage.getItem('area'),
      latitude: location.latitude.value.toString(),
      longtitude: location.longitude.value.toString(),
      lineId: vStoreLine.value,
      policyConsent: isChecked.value ? 'Agree' : 'Disagree',
      imageList: [
        {
          name: imageName.value,
          path: imagePath.value,
          descript: ''
        },
      ],
      note: vStoreNote.value,
      typeNumberSeries: 'customer',
      zoneNumberSeries: 'BE'
    }
    try {
      const response = await store.addCustomerNew(dataStore)
      console.log('response', response)

      //showAlert.value = true
      isLoading.value = false
      console.log('dataStore', dataStore)

    } catch (error) {
      console.error('Error while sending data:', error)
      isLoading.value = false
    }


  }
}
onMounted(() => {
  store.getStoreType()
});

</script>
