<template>
  <div class="flex flex-col relative">
    <div class="bg-mainBg pt-2 relative">
      <slot name="header" />
          <div class="bg-subBg rounded-t-layout top-0 left-0 right-0" style="height: 70vh;">
        <slot name="body">
          <RouterView />
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>