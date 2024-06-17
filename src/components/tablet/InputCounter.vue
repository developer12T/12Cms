<template>
    <form class="max-w-xs mx-auto">
        <div class="relative flex items-center">
            <button type="button" @click="decrementCounter"
                class="flex-shrink-0 inline-flex items-center justify-center h-8 w-12">
                <Icon class="icon w-8 h-8" icon="ph:minus-bold" />
            </button>
            <input :id="inputId" :value="counterValue" @input="updateCounter" type="number"
                class="flex-shrink-0 text-gray-900 border border-gray-300 rounded-md bg-transparent text-2xl font-normal focus:outline-none focus:ring-0 h-10 w-20 text-center"
                placeholder="" required />
            <button type="button" @click="incrementCounter"
                class="flex-shrink-0 inline-flex items-center justify-center h-8 w-10">
                <Icon class="icon w-8 h-8" icon="ph:plus-bold" />
            </button>
        </div>
    </form>
</template>
  
<script>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

export default {
    props: {
        initialValue: {
            type: Number,
            default: 1
        },
        inputId: {
            type: String,
            default: 'counter-input'
        }
    },
    components: {
        Icon
    },
    setup(props, { emit }) {
        const counterValue = ref(props.initialValue)

        const incrementCounter = () => {
            counterValue.value++
            emit('increment', counterValue.value)
        }

        const decrementCounter = () => {
            if (counterValue.value > 0) {
                counterValue.value--
                emit('decrement', counterValue.value)
            }
        }

        const updateCounter = (event) => {
            const value = parseInt(event.target.value, 10)
            if (!isNaN(value)) {
                counterValue.value = value
                emit('input', counterValue.value)
            }
        }

        return {
            counterValue,
            incrementCounter,
            decrementCounter,
            updateCounter
        }
    }
}
</script>
  
  