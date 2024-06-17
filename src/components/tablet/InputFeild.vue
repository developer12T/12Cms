<template>
  <div class="flex justify-between">
    <div>
      <label for="id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ label }}
        <span v-if="isRequired">*</span>
      </label>
    </div>
  </div>
  <input :id="id" :type="type" :class="inputClass" :maxlength="maxlength" :required="isRequired" :value="modelValue" :placeholder="placeholder"
    @input="handleInput" :disabled="isDisabled"
    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg">
</template>

<script setup>
const props = defineProps({
  label: String,
  id: String,
  type: String,
  inputClass: String,
  maxlength: Number,
  isRequired: Boolean,
  modelValue: String,
  isDisabled: Boolean,
  placeholder: String,
});
const emit = defineEmits(['update:modelValue'])
const handleInput = (event) => {
  emit('update:modelValue', event.target.value)
};

</script>
