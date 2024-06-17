<template>
  <div type="button" @click="back">
    <Icon icon="ep:back" width="40" />
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import { useRouter } from 'vue-router'

const router = useRouter();
const back = () => {
    router.back();
}

</script>