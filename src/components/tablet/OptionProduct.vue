<template>
    <div class="flex justify-center">
        <div class=" flex flex-col items-center mt-3">
            <div class="flex flex-row">
                <div class="mb-1">
                    <form class="max-w-sm mx-auto">
                        <select v-model="selectedGroup" @change="emitData" 
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-220 p-2.5">
                            <option value="" disabled selected>ประเภท</option>
                            <option v-for="group in dataProduct.group" :key="group" :value="group">
                                {{ group }}
                            </option>
                        </select>
                    </form>
                </div>
                <div class="mb-1 ml-5">
                    <form class="max-w-sm mx-auto">
                        <select v-model="selectedBrand" @change="emitData"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-220 p-2.5">
                            <option value="" disabled selected>แบรนด์</option>
                            <option v-for="brand in dataProduct.brand" :key="brand" :value="brand">
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
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-220 p-2.5">
                            <option value="" disabled selected>ขนาด</option>
                            <option v-for="size in dataProduct.size" :key="size" :value="size">
                                {{ size }}
                            </option>
                        </select>
                    </form>
                </div>
                <div class="mb-1 ml-5">
                    <form class="max-w-sm mx-auto">
                        <select v-model="selectedFlavour" @change="emitData"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-220 p-2.5">
                            <option value="" disabled selected>รสชาติ</option>
                            <option v-for="flavour in dataProduct.flavour" :key="flavour" :value="flavour">
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
import { ref, computed, onMounted, watchEffect } from 'vue'
import { useProductStore } from '../../stores';

const store = useProductStore();
const dataProduct = computed(() => {
    return store.productOption
})

const selectedGroup = ref('')
const selectedBrand = ref('')
const selectedSize = ref('')
const selectedFlavour = ref('')

watchEffect( () => {
    if (selectedGroup.value) {
        store.getDataOpion(selectedGroup.value)
    }
});

const emit = defineEmits(['update:data'])
const emitData = () => {
  const optionProduct = {
    selectedGroup: selectedGroup.value,
    selectedBrand: selectedBrand.value,
    selectedSize: selectedSize.value,
    selectedFlavour: selectedFlavour.value,
  };

  emit('update:data', optionProduct)
}

onMounted(() => {
    store.getDataOpion()
});

</script>