<script setup lang="ts">
	import { useCommonStore } from "@/stores/common";
	import { computed } from "vue";
	import Button from "@/components/ui/button/Button.vue";
	import { useManufacturingStore } from "@/stores/manufacturing";
	import { storeToRefs } from "pinia";
	import NumberDisplay from "@/components/common/NumberDisplay.vue";

	const commonStore = useCommonStore();
	const manufacturingStore = useManufacturingStore();
	storeToRefs(manufacturingStore);
	const { availableFunds } = storeToRefs(commonStore);

	const props = defineProps<{
		buttonText: string;
		type: "base" | "mega";
		handleClick: Function;
		quantity: number;
		cost: number;
	}>();

	const isButtonDisabled = computed(() => availableFunds.value < props.cost);
</script>

<template>
	<div>
		<div class="flex mt-1 gap-2">
			<Button
				:disabled="isButtonDisabled"
				@click="() => handleClick()"
				size="xs"
				>{{ buttonText }}
			</Button>
			<h1>
				<NumberDisplay :value="quantity" />
			</h1>
		</div>
		<h1 class="flex gap-2 items-center">
			{{ $t("cost") }}:
			<NumberDisplay :value="cost" :is-currency="true" />
		</h1>
	</div>
</template>
