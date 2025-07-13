import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useCommonStore } from "./common";

export const useBusinessStore = defineStore(
	"business",
	() => {
		const unsoldInventory = ref(0);
		const pricePerClip = ref(0.12);
		const demandBonus = ref(1);
		const marketingLevel = ref(1);

		const publicDemand = computed(() => {
			return (
				(1 + 0.1 * useCommonStore().universesSwitched) *
				Math.pow(1.1, marketingLevel.value - 1) *
				demandBonus.value *
				(0.8 / pricePerClip.value)
			);
		});

		const marketingCost = computed(() => {
			return Math.floor(100 * Math.pow(2, marketingLevel.value - 1));
		});

		const averageClipsSoldPerSecond = computed(() => {
			const avg =
				Math.min(1, publicDemand.value / 100) *
				7 *
				Math.pow(publicDemand.value, 1.15);
			return avg < unsoldInventory.value ? avg : unsoldInventory.value;
		});

		const averageRevenuePerSecond = computed(() => {
			return averageClipsSoldPerSecond.value * pricePerClip.value;
		});

		function risePricePerClip() {
			pricePerClip.value += 0.01;
		}

		function lowerPricePerClip() {
			pricePerClip.value -= 0.01;
		}

		function incrementMarketingLevel() {
			marketingLevel.value += 1;
			useCommonStore().availableFunds -= marketingCost.value;
		}

		return {
			unsoldInventory,
			pricePerClip,
			publicDemand,
			demandBonus,
			marketingLevel,
			marketingCost,
			averageClipsSoldPerSecond,
			averageRevenuePerSecond,
			risePricePerClip,
			lowerPricePerClip,
			incrementMarketingLevel,
		};
	},
	// {
	// 	persist: true,
	// },
);
