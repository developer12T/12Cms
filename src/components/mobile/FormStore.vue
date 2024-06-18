<template>
  <LayoutSub>
    <template v-slot>
      <div class="flex flex-row items-center">
        <Alert v-if="showAlert" :title="'เพิ่มร้านค้า'" :content="'ยืนยันการเพิ่มข้อมูลร้านค้า'"
        @confirm="sendData" @dismiss="dismissAlert"
        :color="'text-gray-600 border border-green-300 bg-green-100'" />
        <div class="mt-2">
          <ButtonBack />
        </div>
        <div class="mt-2 ml-2 flex items-center">
          <Icon icon="tdesign:store" width="40" />
          <span class="ml-2">เพิ่มร้านค้า</span>
        </div>
      </div>
      <Stepper :steps="steps" v-model:currentStep="currentStep" :nextDisabled="nextDisabled" @save="handleClick">
        <template v-slot="{ currentStep }">
          <div v-if="currentStep === 0">
            <FormStorePolicy :consent="consent" @consent-change="handleConsentChange" />
          </div>
          <div v-if="currentStep === 1">
            <FormStoreInfor />
          </div>
          <div v-if="currentStep === 2">
            <FormStoreAddress />
          </div>
          <div v-if="currentStep === 3">
            <FormStoreConfirm />
          </div>
        </template>
      </Stepper>
    </template>
  </LayoutSub>
</template>

<script setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { useRouter } from 'vue-router'
import LayoutSub from '../../views/LayoutSub.vue'
import Alert from '../Alert.vue'
import ButtonBack from '../../components/ButtonBack.vue'
import Stepper from './Stepper.vue'
import FormStorePolicy from './FormStorePolicy.vue'
import FormStoreInfor from './FormStoreInfor.vue'
import FormStoreAddress from './FormStoreAddress.vue'
import FormStoreConfirm from './FormStoreConfirm.vue'
import { useUtilityStore, useGeolocation, useStoresStore } from '../../stores'

const currentStep = ref(0)
const nextDisabled = ref(true) 
const consent = ref(false) 
const utility = useUtilityStore()
const location = useGeolocation()
const store = useStoresStore()
const isLoading = ref(false)
const showAlert = ref(false)
const router = useRouter()

const steps = [
  { id: 1, label: 'ข้อมูล' },
  { id: 2, label: 'ร้านค้า' },
  { id: 3, label: 'ที่อยู่' },
  { id: 4, label: 'ยืนยัน' },
]

const handleConsentChange = (value) => {
  consent.value = value;
  nextDisabled.value = !consent.value;
}

const handleClick = () => {
    showAlert.value = true;
};

const dismissAlert = () => {
    showAlert.value = false;
    console.log(showAlert.value);
};

const sendData = async () => {
  isLoading.value = true
  const isValid = utility.validateInput(utility.storeName)

  if (!isValid) {
    isLoading.value = false
    const errorMessage = utility.getValidate()
    console.log('การป้อนข้อมูลไม่ถูกต้อง. ข้อความผิดพลาด:', errorMessage)
  } else {
    const dataStore = {
      taxId: utility.storeTax,
      name: utility.storeName,
      tel: utility.storePhone,
      route: utility.storeRoute,
      type: utility.storeType,
      address: utility.storeAddress,
      distric: utility.storeDistrict,
      subDistric: utility.storeSubdistrict,
      province: utility.storeProvince,
      provinceCode: '10',
      postCode: utility.storeZipcode.toString(),
      zone: "BE",
      area: localStorage.getItem('area'),
      latitude: location.latitude.value,
      longtitude: location.longitude.value,
      lineId: utility.storeLine,
      policyConsent: consent.value ? 'Agree' : 'Disagree',
      imageList: [
        {
          name: 'test',
          path: 'test',
          descript: ''
        },
      ],
      note: utility.storeNote,
      typeNumberSeries: 'customer',
      zoneNumberSeries: 'BE'
    }
    try {
      const response = await store.addCustomerNew(dataStore)
      console.log('response', response)
      isLoading.value = false
      router.push('/cms/store')
      console.log('dataStore', dataStore)

    } catch (error) {
      console.error('ข้อผิดพลาดขณะส่งข้อมูล:', error)
      isLoading.value = false
    }
  }
}
</script>
