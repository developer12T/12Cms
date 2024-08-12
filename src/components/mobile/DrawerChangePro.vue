<template>
    <div class="text-center">
        <button type="button" @click="toggleBottomDrawer"
            class="text-white bg-blue-500 font-medium rounded-lg sm:text-xs md:text-lg px-1 py-1 inline-flex flex-col items-center justify-center">
            <Icon class="icon sm:h-5 sm:w-5 md:h-6 md:w-6" icon="mage:exchange-a" />
        </button>
    </div>
    <div v-show="showBackdrop" @click="closeDrawer" class="fixed inset-0 bg-black bg-opacity-50"></div>
    <div v-if="showDrawer"
        class="fixed bottom-0 left-0 right-0 z-40 w-full p-4 overflow-y-auto transition-transform bg-white transform-none"
        :aria-labelledby="drawerId" :id="drawerId" tabindex="-1">
        <div class="flex flex-col">
            <div>
                <button @click="closeDrawer" type="button" :data-drawer-hide="drawerId" :aria-controls="drawerId"
                    class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center">
                    <Icon icon="material-symbols:close" class="icon sm:h-8 sm:w-8 md:h-10 md:w-10" />
                    <span class="sr-only">ปิดเมนู</span>
                </button>
            </div>
            <div class="sm:text-lg md:text-4xl text-center">
                เปลี่ยนของแถม
            </div>
            <div class="mt-2 md:text-2xl">
                {{ productData.proName }}
            </div>
            <div class="mt-5">
                <form class="max-w-sm mx-auto flex space-x-2">
                    <select v-model="selectedChange"
                        class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5">
                        <option value="" disabled selected>เลือกสินค้า</option>
                        <option v-for="item in dataChange" :key="item.id" :value="{ id: item.id, name: item.name }">
                            {{ item.name }}
                        </option>
                    </select>
                    <select v-model="selectedQty"
                        class="w-fit bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5">
                        <option value="" disabled selected>จำนวน</option>
                        <option v-for="n in productData.qty" :key="n" :value="n">
                            {{ n }}
                        </option>
                    </select>
                </form>
            </div>
            <div class="mt-5">
                <button @click="handleChange" type="button" :disabled="isChangeDisabled"
                :class="[isChangeDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500', 'p-4 w-full focus:outline-none text-white font-medium rounded-lg md:text-xl']">
                    <span v-if="isLoading" class="inline-flex items-center">
                        กำลังบันทึก
                        <Icon icon="svg-spinners:3-dots-scale" />
                    </span>
                    <span v-else>
                        บันทึก
                    </span>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import { usePromotionStore, useUtilityStore } from '../../stores'

const props = defineProps({
    productData: {
        type: Object,
        required: true
    }
})

const pro = usePromotionStore()
const util = useUtilityStore()

const dataChange = computed(() => pro.changeList)
const selectedChange = ref('')
const selectedQty = ref('')
const isLoading = ref(false)
const showDrawer = ref(false)
const showBackdrop = ref(false)
const drawerId = 'drawer-bottom-example'

const isChangeDisabled = computed(() => {
    return !selectedChange.value || !selectedQty.value;
});


const toggleBottomDrawer = async () => {
    showDrawer.value = !showDrawer.value
    if (showDrawer.value) {
        showBackdrop.value = true
        await pro.getChangeReward({
            area: util.area,
            storeId: util.storeId,
            proId: props.productData.proId,
        })
    }
}

const closeDrawer = () => {
    showDrawer.value = false
    showBackdrop.value = false
}

const emits = defineEmits(['updateComplete']);

const handleChange = async () => {
    const changePro = {
        area: util.area,
        storeId: util.storeId,
        proId: props.productData.proId,
        productId: selectedChange.value.id,
        productName: selectedChange.value.name,
        qty: selectedQty.value,
        productIdChange: props.productData.productId,
    }
    console.log(changePro)
    try {
        await pro.updateReward(changePro)
        console.log('Update successful:', changePro)
        closeDrawer()
        emits('updateComplete')
    } catch (error) {
        console.error('Update failed:', error);
    }
};


</script>