<script setup lang="ts">

	import { IconChartLine } from "@tabler/icons-vue";
	import { useManufacturingStore } from "@/stores/manufacturing";
	import { storeToRefs } from "pinia";
	import { Toggle } from "@/components/ui/toggle";
	import {
		Collapsible,
		CollapsibleContent,
		CollapsibleTrigger,
	} from "@/components/ui/collapsible";
	import NumberDisplay from "../common/NumberDisplay.vue";
	import SparklineChart from "./SparklineChart.vue";
	const manufacturingStore = useManufacturingStore();
	const { isSparklineEnabled, percentualWireCostChange, wireCostHistory } =
		storeToRefs(manufacturingStore);
</script>

<template>
	<Teleport defer to="#percentualWireCostChangeDiv">
		<div
			v-if="isSparklineEnabled"
			class="text-xs font-medium"
			:class="
				percentualWireCostChange > 0 ? 'text-destructive' : 'text-success'
			"
		>
			<NumberDisplay
				:value="percentualWireCostChange"
				:is-percentage="true"
				sign-display="always"
			/>
		</div>
	</Teleport>

	<Collapsible v-model:open="isSparklineEnabled">
		<Teleport defer to="#insightsTriggerDiv">
			<CollapsibleTrigger>
				<Toggle
					size="sm"
					aria-label="Toggle chart"
					:pressed="isSparklineEnabled"
				>
					<IconChartLine class="size-4" />
				</Toggle>
			</CollapsibleTrigger>
		</Teleport>
		<Teleport defer to="#wireCostHistorySparklineDiv">
			<CollapsibleContent >
				<SparklineChart
					:history="wireCostHistory.reverse()"
					class="h-12 my-1 -mx-5"
				/>
			</CollapsibleContent>
		</Teleport>
	</Collapsible>
</template>
