<template>
  <LayoutMain>
    <template v-slot:header>
      <div class="p-4 flex items-center justify-between">
        <div class="flex justify-end ml-2">
          <Icon class="icon sm:h-8 sm:w-8 md:h-10 md:w-10" icon="fluent:drawer-add-24-regular" />
          <div class="mt-1 ml-2 sm:text-lg md:text-4xl">จัดการ</div>
        </div>
      </div>
      <div class="flex justify-center">
        <SearchBar />
      </div>
      <!-- <div class="flex items-center justify-between">
        <div class="flex justify-start">
          <ButtonTab :buttonText="btRefund" class="absolute top-28 left-5" @click="dataManage('refund')"></ButtonTab>
        </div>
        <div class="flex justify-end">
          <ButtonTab :buttonText="btGive" class="absolute top-28 left-80" @click="dataManage('give')"></ButtonTab>
        </div>
      </div> -->
      <div class="relative rounded-t-xl overflow-auto p-5">
        <div class="flex flex-nowrap gap-4 font-mono text-black md:text-2xl rounded-lg">
          <button class="p-4 w-full rounded-lg flex items-center justify-center bg-white shadow-lg"
            v-for="item in btType" :key="item.id" @click="handleClick(item.id)">
            {{ item.title }}
          </button>
        </div>
      </div>
    </template>
    <template v-slot:body>
      <div class="flex justify-center">
        <div v-if="btSelected === 'refund'">
          <CustomerAll />
          <router-link to="/cms/manage/refund">
            <div class="flex justify-end mt-3">
              <ButtonAdd :icon="'ph:plus-light'" />
            </div>
          </router-link>
        </div>
        <div v-else-if="btSelected === 'give'">
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
import { ref, onMounted, computed } from 'vue'
import { useDisplaySize } from '../../composable/DisplaySize'
import LayoutMain from '../LayoutMain.vue'
import SearchBar from '../../components/SearchBar.vue'
import CustomerAll from '../../components/tablet/CustomerAll.vue'
import CustomerNew from '../../components/tablet/CustomerNew.vue'
import ButtonAdd from '../../components/ButtonCircle.vue'
import TabletButtonNav from '../../components/tablet/ButtonNav.vue'
import MobileButtonNav from '../../components/mobile/ButtonNav.vue'

const { isMobile } = useDisplaySize()
const btSelected = ref('refund');

const btType = computed(() => {
  return [
    { id: 'refund', title: 'เปลี่ยนสินค้า' },
    { id: 'give', title: 'แจกสินค้า' },
  ];
});

const handleClick = (type) => {
  if (type === 'refund') {
    btSelected.value = 'refund'

  } else if (type === 'give') {
    btSelected.value = 'give'
  }
}

</script>