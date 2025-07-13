<script setup lang="ts">
	import { Switch } from "@/components/ui/switch";
	import { useCommonStore } from "@/stores/common";
	import { storeToRefs } from "pinia";

	const commonStore = useCommonStore();
	const { doAnimate } = storeToRefs(commonStore);
	const { toggleAnimate } = commonStore;
</script>
<template>
	<Switch :checked="doAnimate" @update:checked="toggleAnimate" />
</template>
