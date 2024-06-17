<template>
  <button type="button"
    class="relative text-white bg-blue-700 font-medium rounded-full text-sm p-4 text-center inline-flex items-center me-1 hover:bg-blue-800">
    <Icon :icon="icon" class="icon sm:h-6 sm:w-6 md:h-10 md:w-10" />
    <div v-if="cart > 0" class="absolute inline-flex items-center justify-center w-6 h-6 text-lg text-white bg-red-500 border-2 border-white rounded-full -top-1 -end-1">
      {{ cart }}
    </div>
  </button>
</template>

<script setup>
import { Icon } from '@iconify/vue';
defineProps({
  icon: String,
  cart: Number, default: 0
});

</script>