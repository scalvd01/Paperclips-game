<script setup lang="ts">
	import {
		Collapsible,
		CollapsibleContent,
		CollapsibleTrigger,
	} from "@/components/ui/collapsible";
	import { Label } from "@/components/ui/label";
	import {
		NumberField,
		NumberFieldContent,
		NumberFieldDecrement,
		NumberFieldIncrement,
		NumberFieldInput,
	} from "@/components/ui/number-field";
	import { onUnmounted, ref, watch } from "vue";
	import {
		Select,
		SelectContent,
		SelectGroup,
		SelectItem,
		SelectLabel,
		SelectTrigger,
		SelectValue,
	} from "@/components/ui/select";
	import {
		IconMinus,
		IconPencilDollar,
		IconPlus,
		IconRobot,
	} from "@tabler/icons-vue";
	import { Button } from "@/components/ui/button";
	import { useManufacturingStore } from "@/stores/manufacturing";
	import { Input } from "@/components/ui/input";
	import { storeToRefs } from "pinia";
	import Switch from "../ui/switch/Switch.vue";
	import Card from "../ui/card/Card.vue";
	import CardContent from "../ui/card/CardContent.vue";
	import Checkbox from "../ui/checkbox/Checkbox.vue";
	import Separator from "../ui/separator/Separator.vue";
	import NumberDisplay from "../common/NumberDisplay.vue";
	import { useIntervalFn } from "@vueuse/core";
	const manufacturingStore = useManufacturingStore();
	const {
		wireCost,
		isWireBuyerEnabled,
		isSmartWireBuyerEnabled,
		smartWireBuyerConditionSymbol,
		smartWireBuyerConditionValue,
		canSmartAutoBuyerBuyWire,
	} = storeToRefs(manufacturingStore);
	const {
		buyWire,
		toggleSmartWireBuyer,
		lowerSmartWireBuyerConditionValue,
		raiseSmartWireBuyerConditionValue,
	} = manufacturingStore;

	const conditionSymbols = ["<", ">", "=", "<=", ">="];

	const buyInterval = setInterval(() => {
		if (canSmartAutoBuyerBuyWire.value) {
			buyWire();
		}
	}, 1000);

	onUnmounted(() => {
		clearInterval(buyInterval);
	});
</script>

<template>
	<Separator class="my-2" />
	<div class="flex items-center space-x-2">
		<label :for="`${$t('smartAutoBuyer')}`">{{ $t("smartAutoBuyer") }}™</label>
		<Checkbox
			:id="`${$t('smartAutoBuyer')}`"
			:checked="isSmartWireBuyerEnabled"
			@update:checked="toggleSmartWireBuyer"
		/>
	</div>
	<Collapsible v-model:open="isSmartWireBuyerEnabled">
		<CollapsibleContent class="flex items-center space-x-2 mt-1">
			<span>{{ $t("buyIf") }}</span>
			<Select v-model="smartWireBuyerConditionSymbol">
				<SelectTrigger class="w-16">
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectLabel>{{ $t("condition") }}</SelectLabel>
						<SelectItem
							v-for="(condition, index) in conditionSymbols"
							:key="index"
							:value="condition"
						>
							{{ condition }}
						</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>
			<div class="space-x-1 flex items-baseline">
				<Button
					@click="() => lowerSmartWireBuyerConditionValue(1)"
					size="icon"
					variant="outline"
				>
					<IconMinus />
				</Button>
				<NumberDisplay
					:value="smartWireBuyerConditionValue"
					:minimum-fraction-digits="0"
					:is-currency="true"
				/>
				<Button
					@click="() => raiseSmartWireBuyerConditionValue(1)"
					size="icon"
					variant="outline"
				>
					<IconPlus />
				</Button>
			</div>
		</CollapsibleContent>
	</Collapsible>
</template>
