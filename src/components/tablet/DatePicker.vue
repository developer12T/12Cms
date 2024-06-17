<template>
    <div class="relative max-w-sm">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <Icon class="icon w-4 h-4 text-gray-500" height="30" width="30" icon="solar:calendar-bold" />
        </div>
        <input ref="datepickerRef" type="text" :id="inputId"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5"
            placeholder="เลือกวันที่" />
    </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import Datepicker from 'flowbite-datepicker/Datepicker';
import { Icon } from '@iconify/vue';

const inputId = 'datepickerId';
const datepickerRef = ref(null);
const selectedDate = ref(null);

onMounted(() => {
    const datepickerEl = document.getElementById(inputId);
    const datepickerInstance = new Datepicker(datepickerEl, {
    });
    datepickerRef.value = datepickerInstance;

    datepickerEl.addEventListener('datepicker:selected', (event) => {
        selectedDate.value = event.detail.date; 
        console.log('Selected Date:', selectedDate.value);
    });
});

</script>
