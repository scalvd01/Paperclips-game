<script setup lang="ts">
	import { Button } from "@/components/ui/button";
	import { useCommonStore } from "@/stores/common";
	import { useManufacturingStore } from "@/stores/manufacturing";
	import { storeToRefs } from "pinia";
	import { computed } from "vue";
	const commonStore = useCommonStore();
	const manufacturingStore = useManufacturingStore();
	const { wireLongitude } = storeToRefs(manufacturingStore);
	const { makePaperclips } = commonStore;

	const canMakePaperclip = computed(() => wireLongitude.value > 0);
</script>

<template>
	<Button
		size="xs"
		:disabled="!canMakePaperclip"
		@click="() => makePaperclips(1)"
		>{{ $t("makePaperclip") }}
	</Button>
</template>
