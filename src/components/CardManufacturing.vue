<script setup>
import CustomButton from './CustomButton.vue'
import CustomToggle from './CustomToggle.vue'
import functions from '@/composables/Functions.js'
const { formatWithCommas } = functions()
import { inject, computed, onMounted } from 'vue'
import { watchOnce } from '@vueuse/core'

const game = inject('game')

const autoClipperUnlockWatcher = computed(() => game.value.availableFunds >= 5)

onMounted(() => {
  watchOnce(autoClipperUnlockWatcher, () => {
    // console.log('autocliper desbloqueado')
    game.value.isAutoClipperUnlocked = true
  })
})
</script>

<template>
  <div class="p-2 rounded-md divide-y-2 dark:divide-y-2 dark:divide-neutral-700">
    <div id="manufacturingTitle">
      <h1 class="font-bold text-lg pb-1">{{ $t('manufacturing') }}</h1>
    </div>
    <div id="content">
      <h1>
        {{ $t('clipsPerSecond') }}: {{ formatWithCommas(Math.ceil(game.clipsMadePerSecond)) }}
      </h1>
      <br />
      <Transition name="fade-transition">
        <h1 v-if="game.isAutoWireBuyerUnlocked" class="flex items-center">
          <div>
            <CustomToggle
              :onClickFunction="() => game.toggleAutoWireBuyer()"
              :isChecked="game.autoWireBuyer"
            />
          </div>
          {{ $t('autoBuy') }}:
          {{ game.autoWireBuyer ? 'ON' : 'OFF' }}
        </h1>
      </Transition>

      <h1>
        <CustomButton
          :buttonText="$t('buyWire')"
          :onClickFunction="() => game.buyWire()"
          :isDisabled="game.availableFunds < game.wireCost"
        />
        {{ formatWithCommas(game.wireLongitude) }} {{ $t('unidadLongitudCable') }}
      </h1>
      <h1>{{ $t('cost') }}: {{ $t('currency', 0, { number: game.wireCost }) }}</h1>

      <Transition name="fade-transition">
        <div v-if="game.isAutoClipperUnlocked">
          <br />
          <h1>
            <CustomButton
              buttonText="Auto Clippers"
              :onClickFunction="() => game.buyAutoClipper()"
              :isDisabled="game.availableFunds < game.autoClipperCost"
            />
            {{ game.autoClippers }}
          </h1>
          <h1>
            {{ $t('cost') }}:
            {{ $t('currency', 0, { number: formatWithCommas(game.autoClipperCost, 2) }) }}
          </h1>
        </div>
      </Transition>

      <Transition name="fade-transition">
        <div v-if="game.isMegaClipperUnlocked">
          <br />
          <h1>
            <CustomButton
              buttonText="Mega Clippers"
              :onClickFunction="() => game.buyMegaClipper()"
              :isDisabled="game.availableFunds < game.megaClipperCost"
            />
            {{ game.megaClippers }}
          </h1>
          <h1>
            {{ $t('cost') }}:
            {{ $t('currency', 0, { number: formatWithCommas(game.megaClipperCost, 2) }) }}
          </h1>
        </div>
      </Transition>
    </div>
  </div>
</template>
