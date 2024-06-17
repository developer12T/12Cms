<template>
  <div class="flex flex-col items-center mt-5">
    <ol class="flex items-center text-sm font-medium text-center text-gray-500 sm:text-base mb-3">
      <li v-for="(step, index) in steps" :key="step.id" class="flex items-center">
        <div :class="{
        'flex md:w-full items-center text-blue-600': currentStep === index,
        'flex md:w-full items-center text-gray-400': currentStep !== index,
      }" @click="goToStep(index)">
          <Icon :icon="currentStep >= index ? 'mdi:check-circle' : 'mdi:circle-outline'" class="w-5 h-5" />
          <span class="ml-2">{{ step.label }}</span>
        </div>
      <li v-if="index < steps.length - 1"
        class="flex w-[75px] items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:inline-block sm:after:inline-block after:mx-6 xl:after:mx-10">
      </li>
      </li>
    </ol>
    <slot :currentStep="currentStep"></slot>
    <div class="relative rounded-t-xl overflow-auto">
      <div class="flex flex-nowrap gap-4 font-mono text-white md:text-2xl rounded-lg">
        <div class="flex justify-between mt-4">
          <button @click="prevStep" :disabled="currentStep === 0" type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-16 py-2.5 me-2 mb-2 ml-5 p-4">
            ย้อน
          </button>
          <button @click="nextStep" :disabled="currentStep === steps.length - 1" type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-16 py-2.5 me-2 mb-2 mr-5 p-4 w-full">
            ถัดไป
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

const currentStep = ref(0)

const steps = [
  { id: 1, label: 'ร้านค้า' },
  { id: 2, label: 'ที่อยู่' },
  { id: 3, label: 'ยืนยัน' },
]

const goToStep = (index) => {
  currentStep.value = index
}

const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value -= 1
  }
}

const nextStep = () => {
  if (currentStep.value < steps.length - 1) {
    currentStep.value += 1
  }
}
</script>