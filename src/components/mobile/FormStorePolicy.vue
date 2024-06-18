<template>
    <div class="flex justify-center">
        <div class="bg-white shadow-lg rounded-lg w-[350px] h-[550px] overflow-y-auto p-6">
            <div class="text-center font-bold text-lg mb-4">
                ขอความยินยอม
            </div>
            <div
                class="block p-2.5 w-full h-[400px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 overflow-auto">
                <div v-for="policy in policies" :key="policy._id" class="mt-2">
                    <p :class="getClass(policy.title)">
                        <span class="font-bold">{{ policy.title }}</span> {{ policy.text }}
                    </p>
                </div>
            </div>
            <div class="flex items-center mt-4">
                <input id="consent" type="checkbox" v-model="localConsent" @change="updateConsent" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2">
                <label for="consent" class="ms-2 text-sm font-medium text-gray-900">ยินยอมให้เก็บข้อมูล</label>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useStoresStore } from '../../stores'
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  consent: Boolean,
})

const emit = defineEmits(['consent-change'])

const store = useStoresStore();
const localConsent = ref(props.consent);

const policies = computed(() => {
    return store.policies;
})

const getClass = (title) => {
    if (title.includes('.')) {
        return 'ml-4';
    }
    return '';
};

const updateConsent = () => {
    emit('consent-change', localConsent.value);
};

watch(() => props.consent, (newValue) => {
  localConsent.value = newValue;
});

onMounted(() => {
    store.getPolicies();
})

</script>