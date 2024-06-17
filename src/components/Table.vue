<template>
  <div>
    <div class="bg-white px-2 sha shadow-slate-300 shadow-md rounded-lg overflow-auto md:w-card sm:w-[360px]" :style="sTable" :class="hTable">
      <table class="w-full text-md text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0">
          <tr>
            <th scope="col" :class="thClass" v-for="col in columns" :key="col.id">
              {{ col.title }}
            </th>
          </tr>
        </thead>
        <tbody v-if="data.status === 204">
          <tr>
            <td :colspan="columns.length" class="text-center py-4 text-gray-500">
              <span> ไม่มีข้อมูล </span>
            </td>
          </tr>
        </tbody>
        <tbody v-else-if="data.length === 0">
          <tr>
            <td :colspan="columns.length" class="text-center py-4 text-gray-500">
              <span> ไม่มีข้อมูล </span>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr v-for="(item, index) in data" :key="index" :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50'"
            class="border-b" @click="handleClick(item)">
            <td v-for="col in columns" :key="col.id" :class="tdClass">
              <template v-if="isLoading">
                <div role="status" class="max-w-sm animate-pulse">
                  <div class="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                  <span class="sr-only">Loading...</span>
                </div>
              </template>
              <template v-else>
                <template v-if="col.id === ''">
                  <slot name="button" :rowData="item" />
                </template>
                  <template v-else>
                  <slot :name="col.id" :rowData="item" :item="item">
                    {{ item[col.id] }}
                  </slot>
                </template>
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
    
<script setup>
import { ref, onBeforeMount } from 'vue'

const props = defineProps({
  columns: Array,
  data: {
    type: [Array, Object],
    validator: (value) => {
      return Array.isArray(value) || (typeof value === 'object' && value !== null)
    },
    required: true,
  },
  thClass: String,
  tdClass: String,
  hTable: String,
  sTable: String,
  isLoading: Boolean,
})

const emit = defineEmits(['row-click']);
const handleClick = (item) => {
  emit('row-click', item);
}

const isLoading = ref(false)
onBeforeMount(() => {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
  }, 300);
})
</script>
  