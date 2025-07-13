import { defineStore } from "pinia";
import { ref } from "vue";
import { useBusinessStore } from "./business";
import { useManufacturingStore } from "./manufacturing";
import { useToggle } from "@vueuse/core";

export const useCommonStore = defineStore(
	"common",
	() => {
		const paperclips = ref(0);
		const availableFunds = ref(10000000);
		const universesSwitched = ref(0);
		const [doAnimate, toggleAnimate] = useToggle(false);

		function addPaperclips(amount: number) {
			paperclips.value += amount;
		}

		function makePaperclips(amount: number) {
			if (
				useManufacturingStore().wireLongitude > 0 &&
				amount <= useManufacturingStore().wireLongitude
			) {
				paperclips.value += amount;
				useBusinessStore().unsoldInventory += amount;
				useManufacturingStore().wireLongitude -= amount;
			}
		}

		function substractPaperclips(amount: number) {
			paperclips.value -= amount;
		}

		return {
			paperclips,
			availableFunds,
			universesSwitched,
			doAnimate,
			toggleAnimate,
			addPaperclips,
			makePaperclips,
			substractPaperclips,
		};
	},
	// {
	// 	persist: true,
	// },
);
