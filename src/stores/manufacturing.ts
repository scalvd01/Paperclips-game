import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useCommonStore } from "./common";
import { usePrevious, useRefHistory, useToggle } from "@vueuse/core";

type Operator = "<" | ">" | "=" | ">=" | "<=";
type Comparator = (a: number, b: number) => boolean;

const operators: Record<Operator, Comparator> = {
	"<": (a, b) => a < b,
	">": (a, b) => a > b,
	"=": (a, b) => a === b,
	">=": (a, b) => a >= b,
	"<=": (a, b) => a <= b,
};

export const useManufacturingStore = defineStore(
	"manufacturing",
	() => {
		const wireLongitude = ref(10);
		const wireCost = ref(20);
		const wireBonus = ref(1);
		const timesWirePurchased = ref(0);

		const isAutoWireBuyerUnlocked = ref(true);
		const [isWireBuyerEnabled, toggleWireBuyer] = useToggle(true);
		const [isSmartWireBuyerEnabled, toggleSmartWireBuyer] = useToggle(false);
		const smartWireBuyerConditionSymbol = ref("<");
		const smartWireBuyerConditionValue = ref(20);

		const isSparklineUnlocked = ref(true);
		const isSparklineEnabled =ref(false);

		const isAutoClipperUnlocked = ref(true);
		const autoClippers = ref(0);
		const autoClipperCost = computed(() => {
			if (autoClippers.value === 0) return 5;
			return Math.pow(1.1, autoClippers.value) + 5;
		});
		const autoClipperBoost = ref(1);

		const isMegaClipperUnlocked = ref(true);
		const megaClippers = ref(0);
		const megaClipperCost = computed(() => {
			if (megaClippers.value === 0) return 500;
			return Math.pow(1.07, megaClippers.value) * 1000;
		});
		const megaClipperBoost = ref(1);

		const computedClipsPerSecondFromAuto = computed(() => {
			const autoclippersCPS = autoClipperBoost.value * autoClippers.value;
			const megaclippersCPS = megaClipperBoost.value * (megaClippers.value * 500);
			return autoclippersCPS + megaclippersCPS;
		});

		const previousWireCost = usePrevious(wireCost);

		const percentualWireCostChange = computed(() => {
			if (!previousWireCost.value) return 0;
			return (
				((wireCost.value - previousWireCost.value) / previousWireCost.value) *
				100
			);
		});

		const canWireBePurchased = computed(() => {
			return useCommonStore().availableFunds >= wireCost.value;
		});

		const canSmartAutoBuyerBuyWire = computed(() => {
			if (!isSmartWireBuyerEnabled.value) return false;
			if (!canWireBePurchased.value) return false;

			const compare =
				operators[smartWireBuyerConditionSymbol.value as Operator];
			return compare
				? compare(wireCost.value, smartWireBuyerConditionValue.value)
				: false;
		});

		const { history: wireCostHistory } = useRefHistory(wireCost, {
			capacity: 30,
		});

		const wireBasePrice = ref(20);
		const wirePriceTimer = ref(0);
		function buyWire() {
			if (!canWireBePurchased.value) return;
			wireLongitude.value += 1000 * wireBonus.value;
			useCommonStore().availableFunds -= wireCost.value;
			timesWirePurchased.value++;
			wireBasePrice.value += 0.05;
		}

		function lowerSmartWireBuyerConditionValue(amount: number) {
			smartWireBuyerConditionValue.value -= amount;
		}

		function raiseSmartWireBuyerConditionValue(amount: number) {
			smartWireBuyerConditionValue.value += amount;
		}

		function adjustWirePrice() {
			wirePriceTimer.value++;
			if (wirePriceTimer.value > 100 && wireBasePrice.value > 15) {
				wireBasePrice.value = wireBasePrice.value - wireBasePrice.value / 1000;
				wirePriceTimer.value = 0;
			}
			if (Math.random() < 0.015) {
				let wireAdjust = 6 * (Math.random() * 2 - 1);
				wireCost.value = Math.ceil(wireBasePrice.value + wireAdjust);
			}
		}

		function buyAutoClipper() {
			autoClippers.value++;
			useCommonStore().availableFunds -= autoClipperCost.value;
		}

		function buyMegaClipper() {
			megaClippers.value++;
			useCommonStore().availableFunds -= megaClipperCost.value;
		}

		return {
			wireLongitude,
			wireCost,
			wireBonus,
			timesWirePurchased,
			isAutoWireBuyerUnlocked,
			isAutoClipperUnlocked,
			autoClippers,
			autoClipperBoost,
			isMegaClipperUnlocked,
			megaClippers,
			megaClipperBoost,
			percentualWireCostChange,
			wireCostHistory,
			isWireBuyerEnabled,
			isSparklineEnabled,
			isSmartWireBuyerEnabled,
			isSparklineUnlocked,
			canWireBePurchased,
			canSmartAutoBuyerBuyWire,
			smartWireBuyerConditionSymbol,
			smartWireBuyerConditionValue,
			wireBasePrice,
			wirePriceTimer,
			autoClipperCost,
			megaClipperCost,
			computedClipsPerSecondFromAuto,
			buyAutoClipper,
			buyMegaClipper,
			toggleSmartWireBuyer,
			toggleWireBuyer,
			buyWire,
			adjustWirePrice,
			lowerSmartWireBuyerConditionValue,
			raiseSmartWireBuyerConditionValue,
		};
	},
	// {
	// 	persist: true,
	// },
);
