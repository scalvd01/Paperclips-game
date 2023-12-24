<script setup>
import CustomButton from "./CustomButton.vue";
import { useCountersStore } from "@/stores/counters";
import { storeToRefs } from "pinia";

import { funciones } from "../composables/funciones.js";
const { formatWithCommas } = funciones();

const store = useCountersStore();
const {
  availableFunds,
  unsoldInventory,
  pricePerClip,
  publicDemand,
  marketingLevel,
  marketingCost,
} = storeToRefs(store);
const { risePricePerClip, lowerPricePerClip, incrementMarketingLevel } = store;
</script>

<template>
  <div
    class="p-2 rounded-md divide-y-2 dark:divide-y-2 dark:divide-neutral-700"
  >
    <div id="title">
      <h1 class="font-bold">Business</h1>
    </div>
    <div id="content">
      <h1>Available funds: $ {{ formatWithCommas(availableFunds,2) }}</h1>
      <h1>Unsold Inventory: {{ formatWithCommas(unsoldInventory)  }}</h1>
      <h1>Price per clip: $ {{ Math.round(pricePerClip * 100) / 100 }}</h1>
      <span
        ><CustomButton
          buttonText="Lower"
          :onClickFunction="lowerPricePerClip"
          :isDisabled="pricePerClip <= 0.01" />
        <CustomButton buttonText="Raise" :onClickFunction="risePricePerClip"
      /></span>
      <br /><br />
      <h1>Public demand: {{ formatWithCommas(publicDemand*10) }}%</h1>
      <br />
      <h1>
        <CustomButton
          buttonText="Marketing"
          :onClickFunction="incrementMarketingLevel"
          :isDisabled="marketingCost > availableFunds"
        />
        Level: {{ marketingLevel }}
      </h1>
      <h1>Cost: $ {{ marketingCost }}</h1>
    </div>
  </div>
</template>
