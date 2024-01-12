<script setup>
import CustomButton from './CustomButton.vue'
import functions from '@/composables/Functions.js'
const { formatWithCommas } = functions()
import { inject } from 'vue'

const game = inject('game')
</script>

<template>
  <div class="p-2 rounded-md divide-y-2 dark:divide-y-2 dark:divide-neutral-700">
    <div id="businessTitle">
      <h1 class="font-bold">{{ $t('business') }}</h1>
    </div>
    <div id="content">
      <h1>
        {{ $t('availableFunds') }}:
        {{ $t('currency', 0, { number: formatWithCommas(game.availableFunds, 2) }) }}
      </h1>
      <h1>
        {{ $t('unsoldInventory') }}: {{ formatWithCommas(game.unsoldInventory) }}
        <span class="text-xs text-gray-800 dark:text-gray-400">{{ $t('paperclips') }}</span>
      </h1>
      <Transition name="fade-transition">
        <div v-if="game.isAvgSalesAndRevUnlocked">
          <h1>
            {{ $t('avgRev') }}:
            {{ $t('currency', 0, { number: formatWithCommas(game.avgRev, 2) }) }}
          </h1>
          <h1>{{ $t('avgSales') }}: {{ formatWithCommas(Math.round(game.avgSales)) }}</h1>
        </div>
      </Transition>
      <h1>
        {{ $t('pricePerClip') }}:
        {{ $t('currency', 0, { number: Math.round(game.pricePerClip * 100) / 100 }) }}
      </h1>
      <span
        ><CustomButton
          :buttonText="$t('lower')"
          :onClickFunction="() => game.lowerPricePerClip()"
          :isDisabled="game.pricePerClip <= 0.01" />
        <CustomButton :buttonText="$t('raise')" :onClickFunction="() => game.risePricePerClip()"
      /></span>
      <br /><br />
      <h1>{{ $t('publicDemand') }}: {{ formatWithCommas(game.publicDemand * 10) }}%</h1>
      <br />
      <h1>
        <CustomButton
          :buttonText="$t('marketing')"
          :onClickFunction="() => game.incrementMarketingLevel()"
          :isDisabled="game.marketingCost > game.availableFunds"
        />
        {{ $t('level') }}: {{ game.marketingLevel }}
      </h1>
      <h1>{{ $t('cost') }}: {{ $t('currency', 0, { number: game.marketingCost }) }}</h1>
    </div>
  </div>
</template>
