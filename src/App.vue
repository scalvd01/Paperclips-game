<script setup lang="ts">
	import { useColorMode } from "@vueuse/core";
	import HeaderComponent from "./components/header/HeaderComponent.vue";
	import MakePaperclipButton from "./components/common/MakePaperclipButton.vue";
	import BusinessComponent from "./components/business/BusinessComponent.vue";
	import ManufacturingComponent from "./components/Manufacturing/ManufacturingComponent.vue";

	useColorMode();
	// console.log(import.meta.env.VITE_APP_VERSION);
</script>

<template>
	<HeaderComponent />
	<main class="mx-2 sm:mx-8 my-2">
		<div class="flex justify-center mb-6"><MakePaperclipButton /></div>
		<div
			class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
		>
			<BusinessComponent />
			<ManufacturingComponent />
		</div>
	</main>
</template>
