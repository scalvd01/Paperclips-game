<script setup>
import CustomButton from './CustomButton.vue'
import functions from '@/composables/Functions.js'
const { formatWithCommas } = functions()
import { inject, computed } from 'vue'

const game = inject('game')

const availableResearchPoints = computed(
  () => game.value.researchLevel - (game.value.processors + game.value.memory)
)

const maxOperations = computed(
  () => game.value.memory * 1000
)
</script>

<template>
  <div class="p-2 rounded-md divide-y-2 dark:divide-y-2 dark:divide-neutral-700">
    <div id="manufacturingTitle">
      <h1 class="font-bold text-lg pb-1">{{ $t('research') }}</h1>
    </div>
    <div id="content">
      <h1>
        {{ $t('researchLevel') }}: {{ game.researchLevel }}
        <span class="text-xs" v-if="availableResearchPoints > 0"
          >({{ availableResearchPoints }} {{ $t('available') }})</span
        >
      </h1>
      <h1 class="text-sm text-gray-800 dark:text-gray-400">
        +1 = {{ game.nextResearchLevel }} {{ $t('paperclips') }}
      </h1>
      <br />

      <h1>
        <CustomButton
          :buttonText="$t('processors')"
          :onClickFunction="() => game.addProcessor()"
          :isDisabled="availableResearchPoints < 1"
        />
        {{ game.processors }}
      </h1>
      <h1>
        <CustomButton
          :buttonText="$t('memory')"
          :onClickFunction="() => game.addMemory()"
          :isDisabled="availableResearchPoints < 1"
        />
        {{ game.memory }}
      </h1>
      <br />
      <h1>
        {{ $t('operations') }}: {{ formatWithCommas(game.operations) }} /
        {{ formatWithCommas(maxOperations) }}
      </h1>
      <Transition name="fade-transition">
        <h1 v-if="game.isCreativityUnlocked">
          {{ $t('creativity') }}: {{ formatWithCommas(game.creativity) }}
        </h1></Transition
      >
    </div>
  </div>
</template>
