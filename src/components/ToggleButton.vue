<template>
    <button :class="[
        'p-4 w-full rounded-lg flex items-center justify-center shadow-lg transition duration-300 ease-in-out transform',
        isActive ? 'bg-gray-100 border border-gray-400 shadow-md' : 'bg-white hover:bg-gray-100'
    ]" @click="handleClick">
        {{ title }}
    </button>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
    id: String,
    title: String,
    isActive: Boolean,
})

const emit = defineEmits(['toggle'])

const handleClick = () => {
    emit('toggle', props.id)
}
</script>