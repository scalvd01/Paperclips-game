<script setup>
import { inject } from 'vue'
const game = inject('game')
</script>

<template>
  <button
    type="button"
    :disabled="game.wireLongitude <= 0"
    class="text-xl mr-1 my-0.5 px-1.5 pb-1 rounded bg-slate-300 disabled:bg-neutral-100 disabled:text-neutral-400 enabled:hover:bg-slate-400 enabled:active:scale-95 dark:enabled:hover:bg-slate-600 dark:enabled:bg-slate-700 dark:disabled:bg-slate-700/40 dark:disabled:text-slate-500"
    @click="() => game.addPaperclips(1)"
  >
    <span >{{ $t('makePaperclip') }}</span>
  </button>
</template>
