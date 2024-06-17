<template>
  <LayoutSub>
    <template v-slot>
      <div class="flex flex-col h-full">
        <div class="flex flex-row items-center">
          <div class="mt-2">
            <ButtonBack />
          </div>
          <div class="mt-2 ml-2 flex items-center">
            <Icon icon="tdesign:store" width="40" />
            <span class="ml-2 md:text-3xl">การเข้าเยี่ยม</span>
          </div>
        </div>
        <div class="flex justify-center mt-2">
          <SearchBar />
        </div>
        <div class="flex flex-row justify-between">
          <div class="mt-4 ml-12 md:text-xl">
            {{ routeDetail.day }}
          </div>
          <div class="mt-4 mr-12 md:text-xl">
            {{ routeDetail.route }}
          </div>
        </div>
        <div class="flex justify-center">
          <Table :columns="tableColumns" :data="filteredData"
            :thClass="'py-3 px-10 sm:text-center sm:text-sm md:text-lg'"
            :tdClass="'py-2 sm:text-sm md:text-lg text-center'" :isLoading="isLoading"
            :hTable="'sm:h-[550px] md:h-[690px]'" @row-click="handleClick">
            <template v-slot:statusText="{ item }">
              <span v-if="item.status === '0'"
                class="bg-red-100 text-red-800 sm:text-sm md:text-md font-medium px-2.5 py-0.5 rounded">
                {{ item.statusText }}
              </span>
              <span v-if="item.status === '1'"
                class="bg-green-100 text-green-800 sm:text-sm md:text-md font-medium px-2.5 py-0.5 rounded">
                {{ item.statusText }}
              </span>
              <span v-if="item.status === '2'"
                class="bg-blue-100 text-blue-800 sm:text-sm md:text-md font-medium px-2.5 py-0.5 rounded">
                {{ item.statusText }}
              </span>
            </template>
          </Table>
        </div>
        <div class="flex-grow z-40">
          <div class="bg-white h-full shadow-slate-800 shadow-md">
            <div class="flex justify-between">
              <div class="mt-5 ml-5 md:text-2xl">
                ร้านค้าเป้าหมาย
              </div>
              <div class="mt-5 mr-5 md:text-2xl">
                {{ routeDetail.targetGroup }}
              </div>
            </div>
            <div class="flex justify-between">
              <div class="ml-5 md:text-2xl">
                ร้านค้าที่เปิดบิล
              </div>
              <div class="mr-5 md:text-2xl">
                {{ routeDetail.buy }}
              </div>
            </div>
            <div class="flex justify-between">
              <div class="ml-5 md:text-2xl">
                ร้านค้าที่เข้าเยี่ยม
              </div>
              <div class="mr-5 md:text-2xl">
                {{ routeDetail.checkin }}
              </div>
            </div>
            <div class="flex justify-between">
              <div class="ml-5 md:text-2xl">
                ร้านค้ารอเข้าเยี่ยม
              </div>
              <div class="mr-5 md:text-2xl">
                {{ routeDetail.progress }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </LayoutSub>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import { computed, onMounted, ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useRouteStore, useUtilityStore } from '../../stores'
import { useDisplaySize } from '../../composable/DisplaySize'
import LayoutSub from '../LayoutSub.vue'
import ButtonBack from '../../components/ButtonBack.vue'
import Table from '../../components/Table.vue'
import SearchBar from '../../components/SearchBar.vue'

const { isMobile } = useDisplaySize()
const search = useUtilityStore()
const store = useRouteStore()

const routeDetail = ref(store.routeDetail)
const routeDetailList = ref(store.routeDetailList)

const router = useRouter()
const handleClick = (row) => {
  const routeStore = row.id
  const routeStoreName = row.name
  localStorage.setItem('routeStoreId', routeStore)
  localStorage.setItem('routeStoreName', routeStoreName)
  router.push('/cms/route/store')
}

const filteredData = computed(() => search.filteredData)
const tableColumns = computed(() => {
  if (isMobile.value) {
    return [
      { id: 'name', title: 'ชื่อร้านค้า' },
      { id: 'statusText', title: 'สถานะ' }
    ]
  } else {
    return [
      { id: 'id', title: 'รหัสร้านค้า' },
      { id: 'name', title: 'ชื่อร้านค้า' },
      { id: 'statusText', title: 'สถานะ' }
    ]
  }
})

const isLoading = ref(true)
onMounted(async () => {
  try {
    isLoading.value = true
    await store.getRouteDetail()
    isLoading.value = false
  } catch (error) {
    console.error('Error loading data:', error)
    isLoading.value = false
  }
})

watchEffect(() => {
  routeDetail.value = store.routeDetail
  routeDetailList.value = store.routeDetailList
})

onMounted(() => {
    search.setSearchData(routeDetailList)
});

</script>