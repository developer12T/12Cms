<template>
  <div class="flex flex-col">
    <div class="bg-subBg h-screen">
      <slot>
        <RouterView />
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
  },
};
</script>

<style></style>
