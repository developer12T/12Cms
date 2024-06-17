<template>
  <button :class="buttonClass" @click="handleClick">{{ buttonText }}</button>
  </template>
<script>
export default {
    props: {
    buttonText: {
      type: String,
    },
    buttonClass: {
      type: String,
      default:
        'py-4 px-20 md:text-xl text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-200',
    },
  },
  setup(props) {
    const handleClick = () => {
      // console.log('test');
    };

    return {
        handleClick,
        buttonText: props.buttonText,
    };
  },
}
</script>
