<template>
    <div ref="tableContainer" class="relative flex justify-center">
        <Table :columns="tableColumns" :data="filteredData" :thClass="'py-3'" :tdClass="'py-2'" :sTable="tableHeight">
            <template v-slot:approvedText="{ item }">
                <span v-if="item.status === '19'"
                    class="bg-red-100 text-red-800 sm:text-sm md:text-md font-medium px-2.5 py-0.5 rounded">
                    {{ item.approvedText }}
                </span>
                <span v-if="item.status === '1'"
                    class="bg-green-100 text-green-800 sm:text-sm md:text-md font-medium px-2.5 py-0.5 rounded">
                    {{ item.approvedText }}
                </span>
                <span v-if="item.status === '2'"
                    class="bg-blue-100 text-blue-800 sm:text-sm md:text-md font-medium px-2.5 py-0.5 rounded">
                    {{ item.approvedText }}
                </span>
            </template>
        </Table>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useDisplaySize } from '../../composable/DisplaySize'
import { useStoresStore, useUtilityStore } from '../../stores'
import Table from '../../components/Table.vue'

const { isMobile, browserHeight } = useDisplaySize()
const store = useStoresStore()
const search = useUtilityStore()
const customerNew = computed(() => store.storeNew)

const filteredData = computed(() => search.filteredData)
const tableColumns = computed(() => {
    if (isMobile.value) {
        return [
            { id: 'name', title: 'ชื่อร้าน' },
            { id: 'route', title: 'เส้นทาง' },
            { id: 'approvedText', title: 'สถานะ' },
        ]
    } else {
        return [
            { id: 'storeId', title: 'รหัสร้าน' },
            { id: 'name', title: 'ชื่อร้าน' },
            { id: 'route', title: 'เส้นทาง' },
            { id: 'approvedText', title: 'สถานะ' },
        ]
    }
})

const tableContainer = ref(null)
const tableHeight = ref('')

const updateTableHeight = () => {
    if (tableContainer.value) {
        const height = browserHeight.value - 350
        tableHeight.value = `height: ${height}px;`
    }
}

onMounted(() => {
    store.getCustomerNew()
    search.setSearchData(customerNew)

    window.addEventListener('resize', updateTableHeight)
    updateTableHeight()
})

onUnmounted(() => {
    window.removeEventListener('resize', updateTableHeight)
})

</script>