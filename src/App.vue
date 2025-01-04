<!-- eslint-disable no-unused-vars -->
<script setup>
import MakePaperclipButton from './components/MakePaperclipButton.vue'
import HeaderComponent from './components/HeaderComponent.vue'
import CardBusiness from './components/CardBusiness.vue'
import CardManufacturing from './components/CardManufacturing.vue'
import CardUpgrades from './components/CardUpgrades.vue'
import CardResearch from './components/CardResearch.vue'
import game from '@/classes/Game'

import { useIntervalFn, watchOnce } from '@vueuse/core'
import functions from '@/composables/Functions.js'
const { mainLoopFunction, slowLoopFunction, saveLoadFunction } = functions()

import { onMounted, provide, computed } from 'vue'
import { initFlowbite } from 'flowbite'

onMounted(() => {
  // initialize components based on data attribute selectors
  initFlowbite()
})

provide('game', game)

const researchCardUnlockWatcher = computed(() => game.value.paperclips >= 2000)
const upgradesCardUnlockWatcher = computed(() => game.value.paperclips >= 2000)

watchOnce(upgradesCardUnlockWatcher, () => {
  game.value.isUpgradesCardUnlocked = true
})

watchOnce(researchCardUnlockWatcher, () => {
  game.value.isResearchUnlocked = true
})
//MAIN LOOP
const { pauseMainLoop, resumeMainLoop, isActiveMainLoop } = useIntervalFn(() => {
  mainLoopFunction()
}, 10)

// SLOW LOOP
const { pauseSlowLoop, resumeSlowLoop, isActiveSlowLoop } = useIntervalFn(() => {
  slowLoopFunction()
}, 100)

// 5 SECOND LOOP
const { pauseSaveLoop, resumeSaveLoop, isActiveSaveLoop } = useIntervalFn(() => {
  saveLoadFunction('save')
}, 5000)
saveLoadFunction('load')
</script>

<template>
  <HeaderComponent />

  <main class="mx-2 sm:mt-6 sm:mx-8">
    <div class="flex justify-center"><MakePaperclipButton /></div>
    <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <CardBusiness />
      <CardManufacturing />
      <Transition name="fade-transition">
        <CardResearch v-if="researchCardUnlockWatcher" />
      </Transition>
      <Transition name="fade-transition">
        <CardUpgrades v-if="upgradesCardUnlockWatcher" />
      </Transition>
    </div>
  </main>
</template>

<style scoped></style>
