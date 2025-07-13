<script setup lang="ts">
	import ClipsNumberDisplay from "./ClipsNumberDisplay.vue";
	import HeaderMenu from "./HeaderMenu.vue";
	import PaperclipLogo from "./PaperclipLogo.vue";
</script>

<template>
	<header class="grid grid-cols-2 mx-2 mt-6 sm:mt-6 sm:mx-8 m-4 gap-3">
		<PaperclipLogo />
		<ClipsNumberDisplay class="order-last col-span-2 justify-center" />
		<HeaderMenu class="flex justify-end" />
	</header>
</template>
