<script setup lang="ts">
	import { Button } from "@/components/ui/button";
	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuLabel,
		DropdownMenuRadioGroup,
		DropdownMenuRadioItem,
		DropdownMenuSeparator,
		DropdownMenuTrigger,
	} from "@/components/ui/dropdown-menu";
	import { i18n } from "@/i18n";
	import { IconLanguage } from "@tabler/icons-vue";
	import { useStorage } from "@vueuse/core";

	const langs = {
		es: "Español",
		en: "English",
	};

	const locale = useStorage("locale", i18n.global.locale.value);
</script>

<template>
	<DropdownMenu>
		<DropdownMenuTrigger as-child>
			<Button variant="outline" size="icon">
				<IconLanguage />
			</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent>
			<DropdownMenuLabel>{{ $t("idioma") }}</DropdownMenuLabel>
			<DropdownMenuSeparator />
			<DropdownMenuRadioGroup v-model="locale">
				<DropdownMenuRadioItem
					v-for="(lang, code) in langs"
					:key="lang"
					:value="code"
					class="cursor-pointer"
					@click="() => ($i18n.locale = code)"
				>
					{{ lang }}
				</DropdownMenuRadioItem>
			</DropdownMenuRadioGroup>
		</DropdownMenuContent>
	</DropdownMenu>
</template>
