import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useCountersStore = defineStore("counters", () => {
  const paperclips = ref(0);
  const availableFunds = ref(0);
  const unsoldInventory = ref(0);
  const pricePerClip = ref(0.25);
  const publicDemand = computed(() => updatePublicDemand());
  const marketingLevel = ref(1);
  const marketingCost = ref(100);
  const universesSwitched = ref(0);
  const demandBonus = ref(1);
  const clipsSoldPerSecond = ref(0);
  const clipsMadePerSecond = ref(0);
  const wireLongitude = ref(1000); //
  const wireCost = ref(20);
  const autoClippers = ref(0); //
  const autoClipperCost = ref(5);
  const megaClippers = ref(0);
  const megaClipperCost = ref(500);

  function incrementarPaperclip(cantidad) {
    paperclips.value += cantidad;
    unsoldInventory.value += cantidad;
    wireLongitude.value -= cantidad;
  }
  function lowerPricePerClip() {
    pricePerClip.value -= 0.01;
    updatePublicDemand();
  }
  function risePricePerClip() {
    pricePerClip.value += 0.01;
    updatePublicDemand();
  }
  function updatePublicDemand() {
    const value =
      (1 + 0.1 * universesSwitched.value) *
      Math.pow(1.1, marketingLevel.value - 1) *
      demandBonus.value *
      (0.8 / pricePerClip.value);
    updateClipsSoldPerSecond();
    return value;
  }
  function updateClipsSoldPerSecond() {
    clipsSoldPerSecond.value =
      Math.min(1, publicDemand.value / 100) *
      7 *
      Math.pow(publicDemand.value, 1.15);
  }
  function incrementMarketingLevel() {
    marketingLevel.value += 1;
    availableFunds.value -= marketingCost.value;
    updateMarketingCost();
  }
  function updateMarketingCost() {
    marketingCost.value = Math.floor(marketingCost.value * 2);
  }
  function buyWire() {
    wireLongitude.value += 1000;
    availableFunds.value -= wireCost.value;
  }
  //update wire cost en loopsYFunciones (adjustWirePrice)
  function buyAutoClipper() {
    autoClippers.value += 1;
    availableFunds.value -= autoClipperCost.value;
    updateAutoClipperCost();
  }
  function updateAutoClipperCost() {
    autoClipperCost.value = Math.pow(1.1, autoClippers.value) + 5;
  }
  function buyMegaClipper() {
    megaClippers.value += 1;
    availableFunds.value -= megaClipperCost.value;
    updateMegaClipperCost();
  }
  function updateMegaClipperCost() {
    megaClipperCost.value = Math.pow(1.07, megaClippers.value) * 1000;
  }

  return {
    paperclips,
    availableFunds,
    unsoldInventory,
    pricePerClip,
    publicDemand,
    marketingCost,
    marketingLevel,
    universesSwitched,
    demandBonus,
    clipsSoldPerSecond,
    clipsMadePerSecond,
    wireLongitude,
    wireCost,
    autoClippers,
    autoClipperCost,
    megaClippers,
    megaClipperCost,
    incrementarPaperclip,
    risePricePerClip,
    lowerPricePerClip,
    updatePublicDemand,
    updateClipsSoldPerSecond,
    incrementMarketingLevel,
    updateMarketingCost,
    buyWire,
    buyAutoClipper,
    updateAutoClipperCost,
    buyMegaClipper,
    updateMegaClipperCost,
  };
});
