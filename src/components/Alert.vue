<template>
    <div v-if="show" :id="alertId" :class="alertClasses" role="alert">
        <div class="flex items-center">
            <h3 class="sm:text-lg md:text-2xl font-medium">{{ title }}</h3>
        </div>
        <div class="mt-2 mb-4 md:text-xl">
            {{ content }}
        </div>
        <div class="relative rounded-t-xl overflow-auto p-4">
            <div class="flex flex-nowrap gap-4 font-mono text-white text-base md:text-lg rounded-lg">
                <button type="button"
                    class="text-white bg-green-500 px-4 py-2 w-full rounded-lg flex items-center justify-center"
                    @click="onConfirm">
                    {{ confirmText }}
                </button>
                <button type="button"
                    class="text-white bg-red-500 px-4 py-2 w-full rounded-lg flex items-center justify-center"
                    @click="onDismiss" aria-label="Close">
                    {{ dismissText }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
    alertId: String,
    title: String,
    content: String,
    color: String,
    confirmText: { type: String, default: 'Confirm' },
    dismissText: { type: String, default: 'Cancel' },
    show: { type: Boolean, default: true }
})

const emit = defineEmits(['confirm', 'dismiss'])

const onConfirm = () => {
    emit('confirm')
}

const onDismiss = () => {
    emit('dismiss')
}

const alertClasses = computed(() => {
    return [
        'p-4 mb-4 fixed top-0 left-0 right-0 z-50 w-full overflow-x-hidden overflow-y-auto rounded-lg',
        props.color,
    ]
})
</script>
