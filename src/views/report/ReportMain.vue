<template>
    <LayoutSub>
        <template v-slot>
            <div class="flex flex-row items-center">
                <div class="mt-2">
                    <ButtonBack />
                </div>
                <div class="mt-2 ml-2 flex items-center">
                    <Icon icon="tdesign:store" width="40" />
                    <span class="ml-2">รายงานยอดขาย</span>
                </div>
            </div>
            <div class="relative rounded-t-xl overflow-auto p-8">
                <div class="flex flex-nowrap gap-4 font-mono text-black md:text-2xl rounded-lg">
                    <button class="p-4 w-full rounded-lg flex items-center justify-center bg-white shadow-lg"
                        v-for="item in btReport" :key="item.id" @click="handleClick(item.id)">
                        {{ item.title }}
                    </button>
                </div>
            </div>
            <div class="flex justify-center">
                <div v-if="btSelected === 'month'">
                    <ReportMonth />
                </div>
                <div v-else-if="btSelected === 'group'">
                    <p>22222</p>
                </div>
                <div v-else-if="btSelected === 'sku'">
                    <p>33333</p>
                </div>
            </div>
        </template>
    </LayoutSub>
</template>
  
<script>
import { Icon } from '@iconify/vue';
import { ref, onMounted, computed } from 'vue';
import LayoutSub from '../LayoutSub.vue';
import ButtonBack from '../../components/ButtonBack.vue'
import ReportMonth from '../report/ReportMonth.vue'

export default {
    components: {
        Icon,
        LayoutSub,
        ButtonBack,
        ReportMonth
    },
    setup() {
        const btSelected = ref('รายเดือน');
        const btReport = computed(() => {
            return [
                { id: 'month', title: 'รายเดือน' },
                { id: 'group', title: 'กลุ่มสินค้า' },
                { id: 'sku', title: 'เป้ากระจาย' },
            ];
        });
        const handleClick = (type) => {
            if (type === 'month') {
                btSelected.value = 'month'

            } else if (type === 'group') {
                btSelected.value = 'group'

            } else if (type === 'sku') {
                btSelected.value = 'sku'
            }
        }
        return {
            btReport,
            handleClick,
            btSelected,
        }
    },
};
</script>
  