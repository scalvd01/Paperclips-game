<!-- eslint-disable no-unused-vars -->
<script setup>
import MakePaperclipButton from './components/MakePaperclipButton.vue'
import HeaderComponent from './components/HeaderComponent.vue'
import CardBusiness from './components/CardBusiness.vue'
import CardManufacturing from './components/CardManufacturing.vue'
// Splitting + deferring (blogpost): Research/Upgrades están ocultas hasta los
// 2000 clips; no descargar ni ejecutar ese JS en el critical path.
import { defineAsyncComponent } from 'vue'
const CardUpgrades = defineAsyncComponent(() => import('./components/CardUpgrades.vue'))
const CardResearch = defineAsyncComponent(() => import('./components/CardResearch.vue'))
import game from '@/classes/Game'

import { useIntervalFn, watchOnce } from '@vueuse/core'
import functions from '@/composables/Functions.js'
const { mainLoopFunction, slowLoopFunction, saveLoadFunction } = functions()

import { onMounted, onUnmounted, provide, computed } from 'vue'

onMounted(() => {
  // Deferring: la carga del save (localStorage + JSON.parse bloqueantes) y
  // flowbite van tras el primer paint, no en el setup síncrono.
  saveLoadFunction('load')
  const initUI = () => import('flowbite').then(({ initFlowbite }) => initFlowbite())
  if ('requestIdleCallback' in window) {
    requestIdleCallback(initUI, { timeout: 2000 })
  } else {
    setTimeout(initUI, 0)
  }
})

provide('game', game)

// Un solo computed compartido (antes dos idénticos evaluados a 100Hz).
const lateGameUnlockWatcher = computed(() => game.value.paperclips >= 2000)

watchOnce(lateGameUnlockWatcher, () => {
  game.value.isUpgradesCardUnlocked = true
  game.value.isResearchUnlocked = true
})
//MAIN LOOP (10ms) y SLOW LOOP (100ms): se mantienen los intervalos porque la
//economía del juego está calibrada a ellos (autoClippers/100 por tick, etc.).
//Prioritizing (blogpost): pausar en pestaña oculta para no quemar CPU ni
//acumular backpressure cuando el navegador throttlea los timers a ~1Hz.
const { pause: pauseMainLoop, resume: resumeMainLoop } = useIntervalFn(
  () => {
    mainLoopFunction()
  },
  10,
  { immediateCallback: false }
)

// SLOW LOOP
const { pause: pauseSlowLoop, resume: resumeSlowLoop } = useIntervalFn(() => {
  slowLoopFunction()
}, 100)

// 5 SECOND LOOP
const { pause: pauseSaveLoop, resume: resumeSaveLoop } = useIntervalFn(() => {
  saveLoadFunction('save')
}, 5000)

function handleVisibility() {
  if (document.hidden) {
    pauseMainLoop()
    pauseSlowLoop()
    pauseSaveLoop()
  } else {
    resumeMainLoop()
    resumeSlowLoop()
    resumeSaveLoop()
  }
}

onMounted(() => {
  document.addEventListener('visibilitychange', handleVisibility)
})

onUnmounted(() => {
  document.removeEventListener('visibilitychange', handleVisibility)
})

</script>

<template>
  <HeaderComponent />

  <main class="mx-2 sm:mt-6 sm:mx-8">
    <div class="flex justify-center"><MakePaperclipButton /></div>
    <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <CardBusiness />
      <CardManufacturing />
      <Transition name="fade-transition">
        <CardResearch v-if="lateGameUnlockWatcher" />
      </Transition>
      <Transition name="fade-transition">
        <CardUpgrades v-if="lateGameUnlockWatcher" />
      </Transition>
    </div>
  </main>
</template>

<style scoped></style>
