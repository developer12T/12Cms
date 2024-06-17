<template>
    <div v-show="isDrawerOpen" @click="closeDrawer" class="fixed inset-0 bg-black bg-opacity-50"></div>

    <div v-if="showDrawer" :id="drawerId"
        class="fixed bottom-0 left-0 right-0 z-40 w-full p-4 overflow-y-auto transition-transform bg-white transform-none"
        tabindex="-1" aria-labelledby="drawer-bottom-label">
        <div class="flex flex-col">
            <div>
                <button type="button" :data-drawer-hide="drawerId" :aria-controls="drawerId" @click="closeDrawer"
                    class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center">
                    <Icon class="w-5 h-5" icon="ph:x-bold" />
                </button>
            </div>
            <div class="text-4xl text-center">
                ขอความยินยอม
            </div>
            <div class="mt-5 text-xl">
                12Trading ให้ความสำคัญกับข้อมูลส่วนบุคคลของท่าน
                โปรดอ่านรายละเอียดเกี่ยวกับเงื่อนไขการใช้งานและนโยบายด้านความเป็นส่วนตัว
            </div>
            <div class="flex flex-row justify-center mt-2">
                <div class="bg-gray-200 w-card px-2 shadow-md sm:rounded-lg overflow-auto">
                    1. ข้อมูลส่วนบุคคลของท่านที่ บริษัทฯ เก็บรวบรวม ข้อมูลส่วนบุคคลของท่านที่ บริษัทฯ เก็บรวบรวม ใช้
                    หรือเปิดเผย รวมถึงแต่ไม่จำกัดเพียงข้อมูลส่วนบุคคลของท่านประเภทดังต่อไปนี้
                    1.1 ข้อมูลส่วนตัว เช่น ชื่อ-นามสกุล คำนำหน้าชื่อ เพศ วันเดือนปีเกิด หมายเลขบัตรประจำตัวประชาชน
                    เลขที่บัตรประจำตัวผู้เสียภาษี ตำแหน่ง สัญชาติ อายุ
                    1.2 ข้อมูลเพื่อการติดต่อ เช่น ที่อยู่ หมายเลขโทรศัพท์ หมายเลขโทรศัพท์มือถือ อีเมล
                    1.3 ข้อมูลทางการเงินและธุรกิจ เช่น หมายเลขบัญชีเงินฝากธนาคาร ข้อมูลการทำธุรกรรม
                    รายละเอียดราคาและผลิตภัณฑ์
                </div>
            </div>
            <!-- <div class="flex flex-row mt-2">
                <div class="flex items-center">
                    <input id="link-checkbox" type="checkbox" value=""
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                    <label for="link-checkbox" class="ms-2 text-lg font-medium text-gray-900 dark:text-gray-300">
                        รับทราบและให้ความยินยอม
                    </label>
                </div>
            </div> -->
            <!-- <div class="relative rounded-t-xl overflow-auto p-4">
                <div class="flex flex-nowrap gap-4 font-mono text-white text-xl rounded-lg">
                    <button class="p-4 w-full rounded-lg flex items-center justify-center bg-blue-800 shadow-lg">
                        กลับ
                    </button>
                    <button class="p-4 w-full rounded-lg flex items-center justify-center bg-green-500 shadow-lg">
                        ถัดไป
                    </button>
                </div>
            </div> -->
        </div>
    </div>
</template>

<script setup>
import { Icon } from '@iconify/vue';
import { ref, watch } from 'vue'
const props = defineProps({
    showDrawer: Boolean,
    showBackdrop: Boolean,
    drawerId: Boolean,
})
const isDrawerOpen = ref(props.showDrawer)
const emit = defineEmits(['close-drawer'])
const closeDrawer = () => {
    emit('close-drawer')
};

watch(() => props.showDrawer, (newVal) => {
    if (!newVal) {
        isDrawerOpen.value = false;
        closeDrawer()
    }
})


</script>
