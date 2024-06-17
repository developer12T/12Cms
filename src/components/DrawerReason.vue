<template>
    <div class="text-center">
        <button type="button" @click="toggleBottomDrawer"
            class="text-white bg-red-500 font-medium rounded-lg sm:text-xs md:text-lg px-6 py-3 inline-flex flex-col items-center justify-center">
            <Icon class="icon sm:h-8 sm:w-8 md:h-10 md:w-10" icon="bi:bag-x" />
            <span class="">ไม่ขาย</span>
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
                ระบุสาเหตุที่ร้านค้าไม่ซื้อ
            </div>
            <div class="mt-5 md:text-2xl">
                รหัสร้านค้า {{ storeID }}
            </div>
            <div class="md:text-2xl">
                ชื่อร้านค้า {{ storeName }}
            </div>
            <div class="mt-5">
                <form class="max-w-sm mx-auto">
                    <select v-model="selectedReason" @change="emitData"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                        <option value="" disabled selected>กรุณาเลือกสาเหตุ</option>
                        <option v-for="reason in dataReason" :key="reason.id" :value="reason.name">
                            {{ reason.name }}
                        </option>
                    </select>
                </form>
            </div>
            <div v-if="selectedReason === 'อื่นๆ'" class="mt-5">
                <textarea v-model="reasonMessage" rows="4"
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-gray-500 focus:border-gray-500"
                    placeholder="ระบุเหตุผล">
                </textarea>
            </div>
            <div class="mt-5">
                <div v-if="!selectedReason || (selectedReason === 'อื่นๆ' && !reasonMessage)">
                    <button type="button" disabled
                        class="w-full focus:outline-none text-white bg-gray-500 font-medium rounded-lg md:text-xl px-5 py-2.5 me-2 mb-2">บันทึก</button>
                </div>
                <div v-else>
                    <button @click="saveReason" type="button"
                        class="w-full focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg md:text-xl px-5 py-2.5 me-2 mb-2">
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
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import { useOptionStore, useRouteStore, useGeolocation } from '../stores'

const props = defineProps({
    storeID: String,
    storeName: String,
})

const option = useOptionStore()
const route = useRouteStore()
const location = useGeolocation()
const dataReason = computed(() => option.reason)

const selectedReason = ref('')
const reasonMessage = ref('')
const isLoading = ref(false)
const showDrawer = ref(false)
const showBackdrop = ref(false)
const drawerId = 'drawer-bottom-example'

const toggleBottomDrawer = () => {
    showDrawer.value = !showDrawer.value
    if (showDrawer.value) {
        showBackdrop.value = true
    }
}
const closeDrawer = () => {
    showDrawer.value = false
    showBackdrop.value = false
}
const emit = defineEmits(['update:data']);
const emitData = () => {
    emit('update:data', { selectedReason: selectedReason.value, reasonMessage: reasonMessage.value })
}

const saveReason = async () => {
    isLoading.value = true
    const reason = selectedReason.value === 'อื่นๆ' ? reasonMessage.value : selectedReason.value
    const data = {
        case: "noSales",
        idRoute: localStorage.getItem('routeId'),
        area: localStorage.getItem('area'),
        storeId: localStorage.getItem('routeStoreId'),
        latitude: location.latitude.value.toString(),
        longtitude: location.longitude.value.toString(),
        note: reason,
    }
    try {
        const response = await route.addVisitStore(data)
        //showAlert.value = true
        isLoading.value = false
        console.log('response', response)
        console.log('checkin', data)
    } catch (error) {
        console.error('Error while sending data:', error)
        isLoading.value = false
    }
}

onMounted(() => {
    option.getReason()
});

</script>