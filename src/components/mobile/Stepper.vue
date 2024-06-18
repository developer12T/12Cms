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
          class="flex w-[25px] items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:inline-block sm:after:inline-block after:mx-6 xl:after:mx-10">
        </li>
      </li>
    </ol>
    <slot :currentStep="currentStep"></slot>
    <div class="relative rounded-t-xl overflow-auto">
      <div class="flex flex-nowrap gap-4 font-mono text-white md:text-2xl rounded-lg">
        <div class="flex justify-between mt-4">
          <button @click="prevStep" :disabled="currentStep === 0" type="button"
            class="text-white bg-blue-700 disabled:bg-gray-400 font-medium rounded-lg text-sm px-16 py-2.5 me-2 mb-2 ml-5 p-4">
            ย้อน
          </button>
          <button @click="nextStep" :disabled="nextDisabled" type="button"
            :class="nextButtonClass">
            {{ nextButtonLabel }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, toRefs, watchEffect, computed } from 'vue'
import { Icon } from '@iconify/vue'
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  initialStep: {
    type: Number,
    default: 0,
  },
  steps: {
    type: Array,
    required: true,
  },
  nextDisabled: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits(['update:currentStep', 'save'])

const { initialStep, steps, nextDisabled } = toRefs(props)
const currentStep = ref(initialStep.value)

watchEffect(() => {
  emits('update:currentStep', currentStep.value)
})

const goToStep = (index) => {
  currentStep.value = index
}

const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value -= 1
  }
}

const nextStep = () => {
  if (currentStep.value < steps.value.length - 1) {
    currentStep.value += 1
  } else {
    emits('save')
  }
}

const nextButtonLabel = computed(() => {
  return currentStep.value === steps.value.length - 1 ? 'บันทึก' : 'ถัดไป'
})

const nextButtonClass = computed(() => {
  return [
    'text-white font-medium rounded-lg text-sm px-16 py-2.5 me-2 mb-2 mr-5 p-4 w-full',
    nextDisabled.value ? 'bg-gray-400' : (currentStep.value === steps.value.length - 1 ? 'bg-green-700' : 'bg-blue-700')
  ]
})
</script>
