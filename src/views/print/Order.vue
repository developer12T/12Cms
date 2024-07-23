<template>
  <div class="bg-gray-200 min-h-screen flex items-center justify-center p-4">
    <div class="bg-white rounded-lg shadow p-6 w-full max-w-4xl">
      <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200">
        <li v-for="tab in tabs" :key="tab.id" class="mr-2">
          <a :href="tab.href" :class="[
            'inline-block p-4 rounded-t-lg',
            tab.active ? 'text-blue-600 bg-gray-100' : 'hover:text-gray-600 hover:bg-gray-50'
          ]" @click.prevent="() => setActiveTab(tab)">
            {{ tab.label }}
          </a>
        </li>
      </ul>
      <div class="flex mt-4">
        <button
          :class="[
            'px-4 py-2 rounded-l-lg',
            activeTabType === 'sale' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
          ]"
          @click="setTabType('sale')"
        >
          ขาย
        </button>
        <button
          :class="[
            'px-4 py-2 rounded-r-lg',
            activeTabType === 'return' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
          ]"
          @click="setTabType('return')"
        >
          คืน
        </button>
      </div>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3">วันที่</th>
              <th scope="col" class="px-6 py-3">รายการ</th>
              <th scope="col" class="px-6 py-3">ร้าน</th>
              <th scope="col" class="px-6 py-3">รวม</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading" v-for="n in 4" :key="n" class="bg-white border-b animate-pulse">
              <td class="px-6 py-4">
                <div class="h-4 bg-gray-200 rounded"></div>
              </td>
              <td class="px-6 py-4">
                <div class="h-4 bg-gray-200 rounded"></div>
              </td>
              <td class="px-6 py-4">
                <div class="h-4 bg-gray-200 rounded"></div>
              </td>
              <td class="px-6 py-4">
                <div class="h-4 bg-gray-200 rounded"></div>
              </td>
            </tr>
            <tr v-else v-for="order in orderList" :key="order.CUOR" class="bg-white border-b hover:bg-gray-100 cursor-pointer" @click="viewDetail(order.CUOR)">
              <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{{ order.OAORDT }}</td>
              <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{{ order.CUOR }}</td>
              <td class="px-6 py-4">{{ order.customername }}</td>
              <td class="px-6 py-4">{{ order.total }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>  

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useOrderStore } from '../../stores'

const router = useRouter()
const order = useOrderStore()
const activeTabType = ref('sale')

const orderList = computed(() => {
  return activeTabType.value === 'sale' ? order.orders : order.returns
})

const loading = ref(true)

const tabs = ref([
  { id: 1, label: 'BE811', warehouse: '217', href: '#', active: true },
  { id: 2, label: 'BE812', warehouse: '218', href: '#', active: false },
  { id: 3, label: 'BE813', warehouse: '216', href: '#', active: false },
  { id: 4, label: 'BE814', warehouse: '215', href: '#', active: false },
])

const setActiveTab = (tab) => {
  tabs.value.forEach(t => t.active = t.id === tab.id)
  fetchOrders(tab.warehouse)
}

const setTabType = (type) => {
  activeTabType.value = type
  const activeTab = tabs.value.find(tab => tab.active)
  if (activeTab) {
    fetchOrders(activeTab.warehouse)
  }
}

const fetchOrders = async (warehouse) => {
  loading.value = true
  if (activeTabType.value === 'sale') {
    await order.getOrder(warehouse)
  } else {
    await order.getReturn(warehouse)
  }
  loading.value = false
}

const viewDetail = (CUOR) => {
  if (activeTabType.value === 'sale') {
    viewOrderDetail(CUOR)
  } else {
    viewReturnDetail(CUOR)
  }
}

const viewOrderDetail = async (CUOR) => {
  console.log('order :', CUOR)
  localStorage.setItem('CUOR', CUOR)
  router.push('print/detail')
}

const viewReturnDetail = async (CUOR) => {
  console.log('return :', CUOR)
  localStorage.setItem('CUOR', CUOR)
  router.push('print/return')
}

onMounted(() => {
  const activeTab = tabs.value.find(tab => tab.active)
  fetchOrders(activeTab.warehouse)
})
</script>
