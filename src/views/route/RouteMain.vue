<template>
  <LayoutMain>
    <template v-slot:header>
      <div class="p-4 flex items-center justify-between pb-[154px]">
        <div class="flex justify-start ml-2">
          <Icon class="icon sm:h-8 sm:w-8 md:h-10 md:w-10" icon="gis:map-route" />
          <div class="mt-1 ml-2 sm:text-lg md:text-4xl">เส้นทาง</div>
        </div>
      </div>
    </template>
    <template v-slot:body>
      <div class="flex justify-center relative md:bottom-5 sm:bottom-[100px]">
        <Table :columns="tableColumns" :data="routeMain" :thClass="'py-3 sm:text-center sm:text-sm md:px-10 md:text-lg'"
          :tdClass="'py-2 text-center sm:text-sm md:text-lg'" :sTable="'height: 70vh;'"
          @row-click="handleClick">
          <template v-slot:statusNumber="{ item }">
            <span v-if="item.status === '0'"
              class="bg-red-100 text-red-800 sm:text-sm md:text-md font-medium px-2.5 py-0.5 rounded">
              {{ item.statusNumber }}
            </span>
            <span v-if="item.status === '1'"
              class="bg-green-100 text-green-800 sm:text-sm md:text-md font-medium px-2.5 py-0.5 rounded">
              {{ item.statusNumber }}
            </span>
            <span v-if="item.status === '2'"
              class="bg-blue-100 text-blue-800 sm:text-sm md:text-md font-medium px-2.5 py-0.5 rounded">
              {{ item.statusNumber }}
            </span>
          </template>
        </Table>
      </div>
    </template>
  </LayoutMain>
  <MobileButtonNav v-if="isMobile" />
  <TabletButtonNav v-else />
</template>

<script setup>
import { Icon } from '@iconify/vue'
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useRouteStore } from '../../stores'
import { useDisplaySize } from '../../composable/DisplaySize'
import LayoutMain from '../LayoutMain.vue'
import TabletButtonNav from '../../components/tablet/ButtonNav.vue'
import MobileButtonNav from '../../components/mobile/ButtonNav.vue'
import SearchBar from '../../components/SearchBar.vue'
// import ButtonTab from '../../components/tablet/ButtonTab.vue'
// import ButtonAdd from '../../components/tablet/ButtonCircle.vue'
import Table from '../../components/Table.vue'

const { isMobile } = useDisplaySize()
const store = useRouteStore();
const routeMain = computed(() => {
  return store.routeMain;
});

// const dataRoute = computed(() => {
//   return store.routeMain.map(item => ({
//     ...item,
//     status: item.status.number,
//   }));
// });

const router = useRouter();
const handleClick = (row) => {
  const routeId = row.id
  const routeDay = row.day
  const routeNo = row.route
  localStorage.setItem('routeId', routeId)
  localStorage.setItem('routeDay', routeDay)
  localStorage.setItem('routeNo', routeNo)
  router.push('/cms/route/detail')
};


const tableColumns = computed(() => {
  return [
    { id: 'day', title: 'วันที่' },
    { id: 'route', title: 'เส้นทาง' },
    { id: 'statusNumber', title: 'สถานะ' },
  ];
});

onMounted(() => {
  store.getRouteMain();
});

</script>
