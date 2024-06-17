<template>
      <LayoutSub>
        <template v-slot>
          <div class="flex justify-center">
   
            </div>
        </template>
      </LayoutSub>
      <ButtonNav />
  </template>
    
  <script>
  import { Icon } from '@iconify/vue';
  import { ref, onMounted, onUnmounted } from 'vue';
  import LayoutSub from '../LayoutSub.vue';
  
  export default {
    components: {
      Icon,
      LayoutSub,
    },
    setup() {
 
    },
  };
  </script>
    