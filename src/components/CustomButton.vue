<script setup>
const props = defineProps(['buttonText', 'onClickFunction', 'isDisabled'])
</script>

<template>
  <button
    type="button"
    :disabled="isDisabled"
    class="mr-1 my-0.5 px-1.5 rounded bg-slate-300 disabled:bg-neutral-100 disabled:text-neutral-400 enabled:hover:bg-slate-400 enabled:active:scale-95 dark:enabled:hover:bg-slate-600 dark:enabled:bg-slate-700 dark:disabled:bg-slate-700/40 dark:disabled:text-slate-500"
    @click="props.onClickFunction"
  >
    {{ props.buttonText }}
  </button>
</template>

<style scoped></style>
