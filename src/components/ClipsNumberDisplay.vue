<script setup>
import { computed,inject } from 'vue';
import functions from '@/composables/Functions.js'
const { formatWithCommas } = functions()
const game = inject('game')
const clips = computed(() => formatWithCommas(game.value.paperclips)  )
</script>

<template>
  <div class="flex items-end flex-wrap break-words">
    <h1 class="text-5xl max-w-full  font-bold text-gray-800 dark:text-white">
      {{ clips }}
    </h1>
    <span class="mx-2 text-gray-800 dark:text-gray-400">{{ $t('paperclips') }}</span>
  </div>
</template>
