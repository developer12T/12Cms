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
    <Stepper>
      <template v-slot="{ currentStep }">
        <div v-if="currentStep === 0">
          <FormStoreInfor />
        </div>
        <div v-if="currentStep === 1">
          <FormStoreAddress />
        </div>
        <div v-if="currentStep === 2">
          <FormStoreConfirm />
        </div>
      </template>
    </Stepper>
  </template>
  </LayoutSub>
  </template>
  
  <script setup>
  import { Icon } from '@iconify/vue'
  import LayoutSub from '../../views/LayoutSub.vue'
  import ButtonBack from '../../components/ButtonBack.vue'
  import Stepper from './Stepper.vue'
  import FormStoreInfor from './FormStoreInfor.vue'
  import FormStoreAddress from './FormStoreAddress.vue'
  import FormStoreConfirm from './FormStoreConfirm.vue'
  </script>
  