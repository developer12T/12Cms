<template>

    <div class="flex justify-center p-4">
        <div class="bg-white shadow-lg rounded-lg w-[350px] h-[550px] overflow-y-auto p-6">
            <div class="flex text-xl mb-4 items-center">
                <Icon icon="mdi:store" class="mr-2" />
                ร้านค้า
            </div>
            <hr class="border-gray-300 mb-4" />
            <div class="space-y-2">
                <div class="text-lg font-semibold">{{ utility.storeName }}</div>
                <div>เลขผู้เสียภาษี: {{ utility.storeTax }}</div>
                <div>โทรศัพท์: {{ utility.storePhone }}</div>
                <div>ประเภท: {{ utility.storeType }} / เส้นทาง: {{ utility.storeRoute }}</div>
                <div>LINE ID: {{ utility.storeLine }}</div>
                <div>หมายเหตุ: {{ utility.storeNote }}</div>
            </div>
            <div class="flex text-xl mt-6 mb-4 items-center">
                <Icon icon="mdi:home-map-marker" class="mr-2" />
                ที่อยู่
            </div>
            <hr class="border-gray-300 mb-4" />
            <div class="space-y-2">
                <div>ที่อยู่: {{ utility.storeAddress }}</div>
                <div>แขวง/ตำบล: {{ utility.storeSubdistrict }}</div>
                <div>เขต/อำเภอ: {{ utility.storeDistrict }}</div>
                <div>จังหวัด: {{ utility.storeProvince }}</div>
                <div>รหัสไปรษณีย์: {{ utility.storeZipcode }}</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import { useUtilityStore } from '../../stores'

const utility = useUtilityStore()

// const vStoreName = ref(utility.storeName)
// const vStoreTax = ref(utility.storeTax)
// const vStorePhone = ref(utility.storePhone)
// const vStoreRoute = ref(utility.storeRoute)
// const vStoreType = ref(utility.storeType)
// const vStoreLine = ref(utility.storeLine)
// const vStoreNote = ref(utility.storeNote)

</script>