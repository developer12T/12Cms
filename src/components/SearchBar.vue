<template>
  <div class="relative">
    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
      <Icon icon="basil:search-outline" width="20" />
    </div>
    <input type="text" id="table-search" v-model="searchText" @input="updateSearch"
      class="block p-2.5 w-[350px] pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
      placeholder="พิมพ์..." />
  </div>
</template>
    
<script setup>
import { Icon } from '@iconify/vue'
import { ref } from 'vue'
import { useUtilityStore } from '../stores'

const search = useUtilityStore()
const searchText = ref(''); 

const updateSearch = () => {
  search.setSearchText(searchText.value);
}
</script>
  