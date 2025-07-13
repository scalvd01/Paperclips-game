<script setup lang="ts">
	import { computed } from "vue";
	import { i18n } from "@/i18n";
	import { currencyCodes } from "@/utils/format";
	import NumberFlow from "@number-flow/vue";
	import { useCommonStore } from "@/stores/common";
	import { storeToRefs } from "pinia";

	const commonStore = useCommonStore();
	const { doAnimate } = storeToRefs(commonStore);

	const props = withDefaults(
		defineProps<{
			value: number;
			isCurrency?: boolean;
			isPercentage?: boolean;
			maximumFractionDigits?: number;
			minimumFractionDigits?: number;
			signDisplay?: "auto" | "always" | "exceptZero" | "never";
		}>(),
		{
			isCurrency: false,
			isPercentage: false,
			maximumFractionDigits: 2,
			minimumFractionDigits: 0,
			signDisplay: "auto",
		},
	);

	const styleOption: "currency" | "decimal" = props.isCurrency
		? "currency"
		: "decimal";

	const formatOptions = computed(() => ({
		style: styleOption,
		currency: currencyCodes[i18n.global.locale.value],
		maximumFractionDigits: props.maximumFractionDigits,
		minimumFractionDigits: props.minimumFractionDigits,
		signDisplay: props.signDisplay,
	}));
</script>

<template>
	<NumberFlow
		:animated="doAnimate"
		:value="value"
		:locales="i18n.global.locale.value"
		:format="formatOptions"
		:transformTiming="{
			duration: 300,
			easing: 'ease-out',
		}"
		:spinTiming="{
			duration: 300,
			easing:
				'linear(0, 0.0039 0.87%, 0.0199, 0.0459 3.19%, 0.0892 4.65%, 0.1865 7.26%, 0.5218 15.39%, 0.6249, 0.7132, 0.7864, 0.8453 27%, 0.8955, 0.9328, 0.9596 36.58%, 0.9706 38.32%, 0.9808 40.35%, 0.9946 44.42%, 1.003 49.35%, 1.0056 53.13%, 1.0063 58.06%, 1.0014 80.71%, 1.0001 99.87%)',
		}"
		:opacityTiming="{
			// Used for fading in/out characters:
			duration: 100,
			easing: 'ease-out',
		}"
	/>{{ isPercentage ? "%" : "" }}
</template>
