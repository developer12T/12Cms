<template>
    <div class="flex justify-center">
        <div class="flex flex-col items-center mt-3">
            <div class="flex flex-row">
                <div class="mb-1">
                    <form class="max-w-sm mx-auto">
                        <select v-model="selectedGroup" @change="emitData"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[170px] p-2.5">
                            <option value="" disabled selected class="text-center">ประเภท</option>
                            <option v-for="group in dataProduct.group" :key="group" :value="group" class="text-center">
                                {{ group }}
                            </option>
                        </select>
                    </form>
                </div>
                <div class="mb-1 ml-3">
                    <form class="max-w-sm mx-auto">
                        <select v-model="selectedBrand" @change="emitData"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[170px] p-2.5">
                            <option value="" disabled selected class="text-center">แบรนด์</option>
                            <option v-for="brand in dataProduct.brand" :key="brand" :value="brand" class="text-center">
                                {{ brand }}
                            </option>
                        </select>
                    </form>
                </div>
            </div>
            <div class="flex flex-row">
                <div class="mb-1">
                    <form class="max-w-sm mx-auto">
                        <select v-model="selectedSize" @change="emitData"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[170px] p-2.5">
                            <option value="" disabled selected class="text-center">ขนาด</option>
                            <option v-for="size in dataProduct.size" :key="size" :value="size" class="text-center">
                                {{ size }}
                            </option>
                        </select>
                    </form>
                </div>
                <div class="mb-1 ml-3">
                    <form class="max-w-sm mx-auto">
                        <select v-model="selectedFlavour" @change="emitData"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[170px] p-2.5">
                            <option value="" disabled selected class="text-center">รสชาติ</option>
                            <option v-for="flavour in dataProduct.flavour" :key="flavour" :value="flavour"
                                class="text-center">
                                {{ flavour }}
                            </option>
                        </select>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, watchEffect } from 'vue'
import { useProductStore } from '../../stores'

const product = useProductStore()

const dataProduct = computed(() => product.productOption)

const selectedGroup = ref(product.selectedGroup)
const selectedBrand = ref(product.selectedBrand)
const selectedSize = ref(product.selectedSize)
const selectedFlavour = ref(product.selectedFlavour)

watch(selectedGroup, (newValue) => {
    selectedBrand.value = ''
    selectedSize.value = ''
    selectedFlavour.value = ''
    
    product.getDataOpion(newValue, selectedBrand.value, selectedSize.value, selectedFlavour.value)
})

watchEffect(() => {
    if (selectedGroup.value || selectedBrand.value || selectedSize.value || selectedFlavour.value) {
        product.getDataOpion(
            selectedGroup.value,
            selectedBrand.value,
            selectedSize.value,
            selectedFlavour.value
        )
    }
})

const emit = defineEmits(['update:data'])
const emitData = () => {
    product.updateSelectedOptions(selectedGroup.value, selectedBrand.value, selectedSize.value, selectedFlavour.value)

    const optionProduct = {
        selectedGroup: selectedGroup.value,
        selectedBrand: selectedBrand.value,
        selectedSize: selectedSize.value,
        selectedFlavour: selectedFlavour.value,
    }

    emit('update:data', optionProduct)
}

onMounted(() => {
    product.getDataOpion()
    emitData()
})
</script>
