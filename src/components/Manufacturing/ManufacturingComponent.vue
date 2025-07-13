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
	import { useCommonStore } from "@/stores/common";
	import { computed, onUnmounted, ref } from "vue";
	import { useManufacturingStore } from "@/stores/manufacturing";
	import AutoWireBuyer from "@/components/Manufacturing/AutoWireBuyer.vue";
	import WireCostInsights from "@/components/Manufacturing/WireCostInsights.vue";
	import { IconSparkles } from "@tabler/icons-vue";
	import Clipper from "@/components/Manufacturing/Clipper.vue";

	const commonStore = useCommonStore();
	const { paperclips } = storeToRefs(commonStore);
	const { makePaperclips } = commonStore;

	const manufacturingStore = useManufacturingStore();
	const {
		wireCost,
		wireLongitude,
		canWireBePurchased,
		isWireBuyerEnabled,
		isSmartWireBuyerEnabled,
		autoClippers,
		megaClippers,
		autoClipperCost,
		megaClipperCost,
		isAutoClipperUnlocked,
		isMegaClipperUnlocked,
		computedClipsPerSecondFromAuto,
	} = storeToRefs(manufacturingStore);
	const { buyWire, adjustWirePrice, buyAutoClipper, buyMegaClipper } =
		manufacturingStore;

	let intervals: number[] = [];

	//AUMENTO DE CLIPS POR SEGUNDO
	intervals.push(
		setInterval(() => {
			if (
				wireLongitude.value > 0 &&
				computedClipsPerSecondFromAuto.value / 100 <= wireLongitude.value
			) {
				makePaperclips(computedClipsPerSecondFromAuto.value / 100);
			}
		}, 10),
	);

	//CALCULO DE PRECIO DEL CABLE
	intervals.push(setInterval(adjustWirePrice, 100));

	//iconos check a mostrar
	const showSmartBuyerIcon = computed(
		() => isWireBuyerEnabled.value && isSmartWireBuyerEnabled.value,
	);

	onUnmounted(() => {
		intervals.forEach((interval) => clearInterval(interval));
	});
</script>

<template>
	<Card>
		<CardHeader>
			<CardTitle class="text-xl">{{ $t("manufacturing") }}</CardTitle>
			<CardDescription><Separator /></CardDescription>
		</CardHeader>
		<CardContent class="flex flex-col">
			<h1>
				{{ $t("clipsPerSecond") }}:
				<NumberDisplay :value="computedClipsPerSecondFromAuto" />
			</h1>

			<br />

			<div class="flex items-center space-x-2 mb-2">
				<div id="insightsTriggerDiv"></div>
				<div id="autoWireBuyerTriggerDiv" class="relative">
					<div
						class="absolute flex flex-col gap-0.5 items-center top-0.5 right-0.5"
					>
						<IconSparkles v-if="showSmartBuyerIcon" class="size-3" />
					</div>
				</div>
			</div>
			<AutoWireBuyer />

			<div class="flex mt-1 gap-2">
				<Button
					:disabled="!canWireBePurchased"
					@click="() => buyWire()"
					size="xs"
					>{{ $t("buyWire") }}</Button
				>
				<h1>
					<NumberDisplay
						:value="wireLongitude"
						:maximum-fraction-digits="0"
						sign-display="never"
					/>
					{{ $t("unidadLongitudCable") }}
				</h1>
			</div>
			<h1 class="flex gap-2 items-center">
				{{ $t("cost") }}:
				<NumberDisplay :value="wireCost" :is-currency="true" />
				<div id="percentualWireCostChangeDiv"></div>
			</h1>
			<div id="wireCostHistorySparklineDiv"></div>
			<WireCostInsights />

			<div class="mt-4 space-y-4">
				<Clipper
					v-if="isAutoClipperUnlocked"
					button-text="Auto Clipper"
					type="base"
					:handle-click="buyAutoClipper"
					:quantity="autoClippers"
					:cost="autoClipperCost"
				/>
				<Clipper
					v-if="isMegaClipperUnlocked"
					button-text="Mega Clipper"
					type="mega"
					:handle-click="buyMegaClipper"
					:quantity="megaClippers"
					:cost="megaClipperCost"
				/>
			</div>
		</CardContent>
	</Card>
</template>
