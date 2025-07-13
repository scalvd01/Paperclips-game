<script lang="ts" setup>
	import { useCommonStore } from "@/stores/common";
	import { storeToRefs } from "pinia";
import NumberDisplay from "../common/NumberDisplay.vue";

	const commonStore = useCommonStore();
	const { paperclips } = storeToRefs(commonStore);
</script>

<template>
	<div class="inline-flex items-end flex-wrap break-all">
		<h1 class="text-5xl max-w-full font-bold text-foreground ">
			<NumberDisplay :value="paperclips" :maximum-fraction-digits="0"/>
		</h1>
		<span class="mx-2 mb-2 text-muted-foreground">{{ $t("paperclips") }}</span>
	</div>
</template>
