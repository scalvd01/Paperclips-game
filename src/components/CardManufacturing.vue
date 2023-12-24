<script setup>
import CustomButton from "./CustomButton.vue";
import CustomToggle from "./CustomToggle.vue";
import { useCountersStore } from "@/stores/counters";
import { useStatesStore } from "@/stores/states";
import { storeToRefs } from "pinia";
import { funciones } from "../composables/funciones.js";
const { formatWithCommas } = funciones();

const store = useCountersStore();
const {
  paperclips,
  availableFunds,
  wireLongitude,
  wireCost,
  autoClippers,
  autoClipperCost,
  megaClippers,
  megaClipperCost,
  clipsMadePerSecond,
} = storeToRefs(store);
const { buyWire, buyAutoClipper, buyMegaClipper } = store;

const states = useStatesStore();
const { autoWireBuyer } = storeToRefs(states);
const { toggleAutoWireBuyer } = states;
</script>

<template>
  <div
    class="p-2 rounded-md divide-y-2 dark:divide-y-2 dark:divide-neutral-700"
  >
    <div id="title">
      <h1 class="font-bold">Manufacturing</h1>
    </div>
    <div id="content">
      <h1>
        Clips per second: {{ formatWithCommas(Math.ceil(clipsMadePerSecond)) }}
      </h1>
      <br />
      <h1 v-if="paperclips >= 3000" class="flex items-center">
        <div><CustomToggle :onClickFunction="toggleAutoWireBuyer" /></div>
        Auto buy:
        {{ autoWireBuyer ? "ON" : "OFF" }}
      </h1>
      <h1>
        <CustomButton
          buttonText="Buy Wire"
          :onClickFunction="buyWire"
          :isDisabled="availableFunds < wireCost"
        />
        {{ formatWithCommas(wireLongitude) }} inches
      </h1>
      <h1>Cost: $ {{ wireCost }}</h1>
      <br />
      <h1>
        <CustomButton
          buttonText="Auto Clippers"
          :onClickFunction="buyAutoClipper"
          :isDisabled="availableFunds < autoClipperCost"
        />
        {{ autoClippers }}
      </h1>
      <h1>Cost: $ {{ formatWithCommas(autoClipperCost, 2) }}</h1>
      <br />
      <h1 v-if="autoClippers >= 30">
        <CustomButton
          buttonText="Mega Clippers"
          :onClickFunction="buyMegaClipper"
          :isDisabled="availableFunds < megaClipperCost"
        />
        {{ megaClippers }}
      </h1>
      <h1 v-if="autoClippers >= 30">
        Cost: $ {{ formatWithCommas(megaClipperCost, 2) }}
      </h1>
    </div>
  </div>
</template>
