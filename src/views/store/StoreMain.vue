<template>
  <LayoutMain>
    <template v-slot:header>
      <div class="p-4 flex items-center justify-between">
        <div class="flex justify-end ml-2">
          <Icon class="icon sm:h-8 sm:w-8 md:h-10 md:w-10" icon="ic:baseline-store" />
          <div class="md:text-4xl mt-2">ร้านค้า</div>
        </div>
      </div>
      <div class="flex justify-center">
        <SearchBar />
      </div>
      <div class="relative rounded-t-xl overflow-auto p-5">
        <div class="flex flex-nowrap gap-4 font-mono text-black md:text-2xl rounded-lg">
          <button class="p-4 w-full rounded-lg flex items-center justify-center bg-white shadow-lg"
            v-for="item in btStore" :key="item.id" @click="handleClick(item.id)">
            {{ item.title }}
          </button>
        </div>
      </div>
    </template>
    <template v-slot:body>
      <div class="flex justify-center">
        <div v-if="btSelected === 'all'">
          <CustomerAll />
          <div class="flex justify-end mt-3">
            <!-- <router-link to="/cms/store/add"> -->
            <router-link to="/cms/test">
              <ButtonAdd :icon="'ph:plus-light'" />
            </router-link>
          </div>
        </div>
        <div v-else-if="btSelected === 'new'">
          <CustomerNew />
        </div>
      </div>
    </template>
  </LayoutMain>
  <MobileButtonNav v-if="isMobile" />
  <TabletButtonNav v-else />
</template>

<script setup>
import { Icon } from '@iconify/vue'
import { ref, computed } from 'vue'
import { useDisplaySize } from '../../composable/DisplaySize'
import LayoutMain from '../LayoutMain.vue'
import SearchBar from '../../components/SearchBar.vue'
import ButtonTab from '../../components/tablet/ButtonTab.vue'
import CustomerAll from '../../components/tablet/CustomerAll.vue'
import CustomerNew from '../../components/tablet/CustomerNew.vue'
import ButtonAdd from '../../components/ButtonCircle.vue'
import TabletButtonNav from '../../components/tablet/ButtonNav.vue'
import MobileButtonNav from '../../components/mobile/ButtonNav.vue'

const { isMobile } = useDisplaySize()
// const btStoreAll = ref('ร้านค้าทั้งหมด')
// const btStoreNew = ref('ร้านค้าใหม่')
const btSelected = ref('all')

const btStore = computed(() => {
  return [
    { id: 'all', title: 'ร้านค้าทั้งหมด' },
    { id: 'new', title: 'ร้านค้าใหม่' },
  ];
});
const handleClick = (type) => {
  if (type === 'all') {
    btSelected.value = 'all'

  } else if (type === 'new') {
    btSelected.value = 'new'
  }
}

</script>
