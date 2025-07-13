<script setup lang="ts">
	import { Button } from "@/components/ui/button";
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle,
	} from "@/components/ui/card";
	import NumberDisplay from "../common/NumberDisplay.vue";
	import { Separator } from "@/components/ui/separator";
	import { storeToRefs } from "pinia";
	import { useBusinessStore } from "@/stores/business";
	import { useCommonStore } from "@/stores/common";
	import { computed, onUnmounted, ref } from "vue";
	import { IconMinus, IconPlus } from "@tabler/icons-vue";
	const businessStore = useBusinessStore();
	const commonStore = useCommonStore();
	const {
		unsoldInventory,
		pricePerClip,
		publicDemand,
		marketingLevel,
		marketingCost,
		averageClipsSoldPerSecond,
		averageRevenuePerSecond,
	} = storeToRefs(businessStore);
	const { risePricePerClip, lowerPricePerClip, incrementMarketingLevel } =
		businessStore;
	const { availableFunds } = storeToRefs(commonStore);

	const canLowerPricePerClip = computed(() => pricePerClip.value > 0.02);
	const canBuyMarketing = computed(
		() => availableFunds.value >= marketingCost.value,
	);

	const income = ref(0);
	const clipsSold = ref(0);

	let intervals: number[] = [];

	function sellClips(clipsDemanded: number) {
		if (unsoldInventory.value <= 0) return;

		const clipsToSell = Math.min(clipsDemanded, unsoldInventory.value);
		const transaction =
			Math.floor(clipsToSell * pricePerClip.value * 1000) / 1000;

		availableFunds.value =
			Math.floor((availableFunds.value + transaction) * 100) / 100;
		income.value += transaction;
		clipsSold.value += clipsToSell;
		unsoldInventory.value -= clipsToSell;
	}

	intervals.push(
		setInterval(() => {
			if (Math.random() < publicDemand.value / 100) {
				sellClips(Math.floor(0.7 * Math.pow(publicDemand.value, 1.15)));
			}
		}, 100),
	);

	onUnmounted(() => {
		intervals.forEach((interval) => clearInterval(interval));
	});
</script>

<template>
	<Card>
		<CardHeader>
			<CardTitle class="text-xl">{{ $t("business") }}</CardTitle>
			<CardDescription><Separator /></CardDescription>
		</CardHeader>
		<CardContent class="flex flex-col">
			<h1>
				{{ $t("availableFunds") }}:
				<NumberDisplay :value="availableFunds" :is-currency="true" />
			</h1>
			<h1>
				{{ $t("avgRev") }}:
				<NumberDisplay :value="(averageRevenuePerSecond)" :is-currency="true" />
			</h1>
			<h1>
				{{ $t("avgSales") }}:
				<NumberDisplay :value="averageClipsSoldPerSecond" />
				<span class="text-xs text-muted-foreground ml-1">
					{{ $t("paperclips") }}
				</span>
			</h1>
			<h1>
				{{ $t("unsoldInventory") }}:
				<NumberDisplay :value="unsoldInventory" :maximum-fraction-digits="0" />
				<span class="text-xs text-muted-foreground ml-1">
					{{ $t("paperclips") }}
				</span>
			</h1>
			<h1 class="flex items-baseline my-1">
				<span class="mr-2">{{ $t("pricePerClip") }}:</span>
				<div class="gap-2 flex items-baseline">
					<Button
						@click="() => lowerPricePerClip()"
						size="icon"
						variant="outline"
						:disabled="!canLowerPricePerClip"
					>
						<IconMinus />
					</Button>
					<NumberDisplay
						:value="pricePerClip"
						:minimum-fraction-digits="2"
						:is-currency="true"
					/>
					<Button
						@click="() => risePricePerClip()"
						size="icon"
						variant="outline"
					>
						<IconPlus />
					</Button>
				</div>
			</h1>
			<br />
			<h1>
				{{ $t("publicDemand") }}:
				<NumberDisplay :value="publicDemand * 10" :is-percentage="true" />
			</h1>
			<div class="flex mt-1 gap-2">
				<Button
					:disabled="!canBuyMarketing"
					@click="() => incrementMarketingLevel()"
					size="xs"
				>
					{{ $t("marketing") }}
				</Button>
				<h1>{{ $t("level") }}: {{ marketingLevel }}</h1>
			</div>
			<h1>
				{{ $t("cost") }}:
				<NumberDisplay :value="marketingCost" :is-currency="true" />
			</h1>
		</CardContent>
	</Card>
</template>
