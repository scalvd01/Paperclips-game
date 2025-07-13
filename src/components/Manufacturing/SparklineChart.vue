<script setup lang="ts">
	// import { LineChart } from "@/components/ui/chart-line";
	import { AreaChart } from "@/components/ui/chart-area";
	import { CurveType } from "@unovis/ts";
	import { formattedValue } from "@/utils/format";
	import type { UseRefHistoryRecord } from "@vueuse/core";

	defineProps<{
		history: UseRefHistoryRecord<number>[];
	}>();
</script>

<template>
	<AreaChart
		index="timestamp"
		:data="history"
		:categories="['snapshot']"
		:y-formatter="
			(tick) => {
				return typeof tick === 'number'
					? ` ${formattedValue(tick, true, 0)}`
					: '';
			}
		"
		:show-tooltip="false"
		:show-legend="false"
		:show-x-axis="false"
		:curve-type="CurveType.Linear"
	/>
</template>
