<template>
  <div class="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 flex justify-between">
    <button v-for="(button, index) in buttons" :key="index" :class="buttonClass(index)" @click="handleClick(index)">
      <Icon :icon="button.icon" :class="iconClass(index)" />
      <span :class="textClass(index)">{{ button.label }}</span>
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import { useAuthStore } from '../../stores'

const auth = useAuthStore()
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
    label: "รายงาน",
    icon: "mdi:report-finance",
    route: "#"
  },
  // {
  //   label: "ตั้งค่า",
  //   icon: "pepicons-pop:dots-x",
  // },
  {
    label: "ออกจากระบบ",
    icon: "material-symbols:logout",
    route: "logout"
  },
]);

const buttonClass = (index) => [
  "inline-flex",
  "flex-col",
  "items-center",
  "justify-center",
  "px-2",
  "group",
]

const iconClass = (index) => [
  "w-8",
  "h-8",
  "mb-0",
  "text-gray-500",
  "group-hover:text-blue-600",
]

const textClass = (index) => [
  "text-xs",
  "text-gray-500",
  "group-hover:text-blue-600",
]

// const handleClick = (index) => {
//   const route = buttons.value[index].route
//   console.log("clicked:", buttons.value[index].label)
//   if (route) {
//     router.push({ path: route })
//   }
// }
const handleClick = (index) => {
  const button = buttons.value[index]
  if (button.route === "logout") {
    handleLogout()
  } else if (button.route) {
    router.push({ path: button.route })
  }
}

const handleLogout = () => {
  auth.logout();
  router.push({ path: '/' })
  console.log("User logged out")
}

</script>