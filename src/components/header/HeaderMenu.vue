<script setup lang="ts">
	import { Button } from "@/components/ui/button";
	import {
		Popover,
		PopoverContent,
		PopoverTrigger,
	} from "@/components/ui/popover";
	import { IconAlertTriangleFilled, IconSettings } from "@tabler/icons-vue";
	import ColorModeToggle from "../common/ColorModeToggle.vue";
	import LocaleChanger from "../common/LocaleChanger.vue";
	import Separator from "../ui/separator/Separator.vue";
	import Label from "../ui/label/Label.vue";
	import AnimationToggle from "../common/AnimationToggle.vue";
	import { useCommonStore } from "@/stores/common";
	import { storeToRefs } from "pinia";

	const commonStore = useCommonStore();
	const { doAnimate } = storeToRefs(commonStore);
</script>

<template>
	<div>
		<Popover>
			<PopoverTrigger as-child>
				<Button variant="outline" size="icon"> <IconSettings /> </Button>
			</PopoverTrigger>
			<PopoverContent>
				<div class="grid gap-4">
					<div class="space-y-2">
						<h4 class="font-medium leading-none">{{ $t("ajustes") }}</h4>
						<Separator />
					</div>
					<div class="grid gap-2">
						<div class="grid grid-cols-2 items-center gap-4">
							<Label for="colorMode">{{ $t("modo") }}</Label>
							<ColorModeToggle />
						</div>

						<div class="grid grid-cols-2 items-center gap-4">
							<Label for="idioma">{{ $t("idioma") }}</Label>
							<LocaleChanger />
						</div>
						<div class="grid grid-cols-2 items-center gap-4">
							<Label for="animacion">{{ $t("animacion") }}</Label>
							<div class="flex items-center gap-2">
								<AnimationToggle />
								<IconAlertTriangleFilled class="size-5 text-destructive" v-if="doAnimate"/>
							</div>
						</div>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	</div>
</template>
