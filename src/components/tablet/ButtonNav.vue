<template>
  <div
    class="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600 flex justify-between">
    <button v-for="(button, index) in buttons" :key="index" :class="buttonClass(index)" @click="handleClick(index)">
      <Icon :icon="button.icon" :class="iconClass(index)" />
      <span :class="textClass(index)">{{ button.label }}</span>
    </button>
  </div>
</template>
  
<script>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { Icon } from "@iconify/vue"

export default {
  components: {
    Icon,
  },
  setup() {
    const router = useRouter()
    const buttons = ref([
      {
        label: "หน้าแรก",
        icon: "ic:round-home",
        route: "home"
      },
      {
        label: "เข้าเยี่ยม",
        icon: "eos-icons:route",
        route: "route"
      },
      {
        label: "ร้านค้า",
        icon: "tdesign:store",
        route: "store"
      },
      {
        label: "รายการ",
        icon: "mdi:marketplace-outline",
        route: "order"
      },
      {
        label: "จัดการ",
        icon: "fluent:drawer-add-24-regular",
        route: "manage"
      },
      {
        label: "ตั้งค่า",
        icon: "pepicons-pop:dots-x",
      },
    ]);

    const buttonClass = (index) => [
      "inline-flex",
      "flex-col",
      "items-center",
      "justify-center",
      "px-5",
      "group",
    ];

    const iconClass = (index) => [
      "w-8",
      "h-8",
      "mb-0",
      "text-gray-500",
      "group-hover:text-blue-600",
    ];

    const textClass = (index) => [
      "text-lg",
      "text-gray-500",
      "group-hover:text-blue-600",
    ];

    const handleClick = (index) => {
      const route = buttons.value[index].route
      console.log("clicked:", buttons.value[index].label)
      if (route) {
        router.push({ path: route })
      }
    }

    return {
      buttons,
      buttonClass,
      textClass,
      iconClass,
      handleClick,
    }
  },
};
</script>