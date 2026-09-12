<script setup>
import { computed, inject } from 'vue';
import { refThrottled } from '@vueuse/core'
import functions from '@/composables/Functions.js'
const { formatWithCommas } = functions()
const game = inject('game')
// Throttling (blogpost: batching): el estado muta a 100Hz pero la pantalla va
// a 60fps y nadie lee un contador a más de ~10Hz. Estrangular el display a
// 100ms recorta ~90% de renders y formateos Intl sin que se note.
const clipsRaw = computed(() => Math.floor(game.value.paperclips))
const clipsThrottled = refThrottled(clipsRaw, 100)
const clips = computed(() => formatWithCommas(clipsThrottled.value))
</script>

<template>
  <div class="flex items-end flex-wrap break-words">
    <h1 class="text-5xl max-w-full  font-bold text-gray-800 dark:text-white">
      {{ clips }}
    </h1>
    <span class="mx-2 text-gray-800 dark:text-gray-400">{{ $t('paperclips') }}</span>
  </div>
</template>
