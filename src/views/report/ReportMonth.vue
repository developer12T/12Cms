<template>
  <div class="flex flex-col h-full">
    <Table :columns="tableColumns" :data="dataSale" :thClass="'px-8 py-3'" :tdClass="'px-5 py-2'" :hTable="'h-[650px]'">
    </Table>
    <div class="flex-grow z-40">
      <div class="bg-white h-full shadow-md">
        <div class="flex justify-between">
          <div class="mt-5 ml-5 text-xl">
            ยอดขายรวมสุทธิ
          </div>
          <div class="mt-5 mr-5 text-xl">
          </div>
        </div>
        <div class="flex justify-between">
          <div class="ml-5 text-xl">
            ภาษี 7%
          </div>
          <div class="mr-5 text-xl">
          </div>
        </div>
        <div class="flex justify-between">
          <div class="ml-5 text-xl">
            ยอดขายรวม
          </div>
          <div class="mr-5 text-xl">
          </div>
        </div>
        <div class="flex justify-between">
          <div class="ml-5 text-xl">
            เป้ารายเดือน
          </div>
          <div class="mr-5 text-xl">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue';
import { computed, onMounted } from 'vue';
import Table from '../../components/Table.vue';
import { useReportStore } from '../../stores';

export default {
  components: {
    Icon,
    Table,
  },
  setup() {
    const store = useReportStore()
    const dataMonthSale = computed(() => {
      return store.monthSale
    })

    const tableColumns = computed(() => {
      return [
        { id: 'date', title: 'วันที่' },
        { id: 'totalPrice', title: 'จำนวน' },
        { id: '', title: '*' },
      ]
    })

    const dataSale = computed(() => {
      return store.monthSale.map(item => ({
        ...item,
        date: `${item.day}/${item.month}/${item.year}`
      }))
    })

    onMounted(async () => {
      await store.getMonthSale()
      console.log('reportMonth', store.monthSale);
    });

    return {
      tableColumns,
      dataMonthSale,
      dataSale,
    }
  },
};
</script>