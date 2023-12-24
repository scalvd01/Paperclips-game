import { ref } from "vue";
import { defineStore } from "pinia";

export const useStatesStore = defineStore("states", () => {
  const autoWireBuyer = ref(false);
  function toggleAutoWireBuyer() {
    autoWireBuyer.value = !(autoWireBuyer.value);
  }

  return {
    autoWireBuyer,
    toggleAutoWireBuyer,
  };
});
