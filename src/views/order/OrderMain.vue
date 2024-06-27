<template>
  <LayoutMain>
    <template v-slot:header>
      <div class="p-4 flex items-center justify-between">
        <div class="flex justify-end ml-2">
          <Icon class="icon sm:h-8 sm:w-8 md:h-10 md:w-10" icon="mdi:marketplace-outline" />
          <div class="md:text-4xl mt-1 ml-1">รายการขาย</div>
        </div>
      </div>
      <div class="flex justify-center">
        <SearchBar />
      </div>
      <div class="relative rounded-t-xl overflow-auto p-5">
        <div class="flex flex-nowrap gap-4 font-mono text-black md:text-2xl rounded-lg">
          <ToggleButton v-for="item in btType" :key="item.id" :id="item.id" :title="item.title"
            :isActive="btSelected === item.id" @toggle="handleClick" />
        </div>
      </div>
    </template>
    <template v-slot:body>
      <div class="flex justify-center">
        <div v-if="btSelected === 'sale'">
          <OrderSales />
          <div class="flex justify-end mt-3">
          </div>
        </div>
        <div v-else-if="btSelected === 'cn'">
          <OrderCn />
        </div>
      </div>
    </template>
  </LayoutMain>
  <MobileButtonNav v-if="isMobile" />
  <TabletButtonNav v-else />
</template>

<script setup>
import { Icon } from '@iconify/vue'
import { computed, ref } from 'vue'
import { useDisplaySize } from '../../composable/DisplaySize'
import LayoutMain from '../LayoutMain.vue'
import TabletButtonNav from '../../components/tablet/ButtonNav.vue'
import MobileButtonNav from '../../components/mobile/ButtonNav.vue'
import SearchBar from '../../components/SearchBar.vue'
import ToggleButton from '../../components/ToggleButton.vue'
import OrderSales from '../../components/mobile/OrderSales.vue'
import OrderCn from '../../components/mobile/OrderCn.vue'

const { isMobile } = useDisplaySize()
const btSelected = ref('sale');
const btType = computed(() => {
  return [
    { id: 'sale', title: 'ขายสินค้า' },
    { id: 'cn', title: 'คืนสินค้า' },
  ];
});

const handleClick = (type) => {
  btSelected.value = type
  console.log(type === 'sale' ? 'ขาย' : 'คืน')
}
</script>
