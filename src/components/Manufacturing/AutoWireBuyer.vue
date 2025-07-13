<script setup lang="ts">
	import {
		Collapsible,
		CollapsibleContent,
		CollapsibleTrigger,
	} from "@/components/ui/collapsible";
	import { onUnmounted, ref, watchEffect } from "vue";

	import { IconRobot, IconRobotOff } from "@tabler/icons-vue";
	import { useManufacturingStore } from "@/stores/manufacturing";
	import { storeToRefs } from "pinia";
	import Card from "../ui/card/Card.vue";
	import CardContent from "../ui/card/CardContent.vue";
	import { Toggle } from "@/components/ui/toggle";
	import SmartAutoBuyer from "@/components/Manufacturing/SmartAutoBuyer.vue";
	import Checkbox from "../ui/checkbox/Checkbox.vue";
	import { watchPausable } from "@vueuse/core";

	const manufacturingStore = useManufacturingStore();
	const { isWireBuyerEnabled, isSmartWireBuyerEnabled, wireLongitude } = storeToRefs(manufacturingStore);
	const { toggleWireBuyer, buyWire } = manufacturingStore;
	const isOpen = ref(false);

	const {
		stop: stopWireWatch,
		pause: pauseWireWatch,
		resume: resumeWireWatch,
	} = watchPausable(wireLongitude, () => {
		if (wireLongitude.value < 1) {
			buyWire();
		}
	});

	watchEffect(() => {
		if (isSmartWireBuyerEnabled.value || !isWireBuyerEnabled.value) {
			pauseWireWatch();
		} else {
			resumeWireWatch();
		}
	});

	onUnmounted(() => {
		stopWireWatch();
	});
</script>

<template>
	<Collapsible v-model:open="isOpen">
		<Teleport defer to="#autoWireBuyerTriggerDiv">
			<CollapsibleTrigger>
				<Toggle
					size="sm"
					aria-label="Toggle robot icon"
					:pressed="isOpen"
				>
					<component
						:is="isWireBuyerEnabled ? IconRobot : IconRobotOff"
						class="size-4"
					/>
				</Toggle>
			</CollapsibleTrigger>
		</Teleport>
		<CollapsibleContent>
			<Card class="mb-1">
				<CardContent class="flex flex-col p-3">
					<div class="flex items-center space-x-2">
						<label :for="`${$t('autoBuy')}`">{{ $t("autoBuy") }}</label>
						<Checkbox
							:id="`${$t('autoBuy')}`"
							:checked="isWireBuyerEnabled"
							@update:checked="toggleWireBuyer"
						/>
					</div>
					<Collapsible v-model:open="isWireBuyerEnabled">
						<CollapsibleContent>
							<SmartAutoBuyer />
						</CollapsibleContent>
					</Collapsible>
				</CardContent>
			</Card>
		</CollapsibleContent>
	</Collapsible>
</template>
