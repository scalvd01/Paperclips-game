import { createI18n } from "vue-i18n";
import { useStorage } from "@vueuse/core";
import en from "./locales/en.json";
import es from "./locales/es.json";

interface Locale {
	[key: string]: any;
}

function loadLocaleMessages() {
	const locales: Locale[] = [{ en: en }, { es: es }];
	const messages: Record<string, any> = {};

	locales.forEach((lang) => {
		const key = Object.keys(lang)[0];
		messages[key] = lang[key];
	});
	return messages;
}

export const i18n = createI18n({
	legacy: false,
	locale: useStorage("locale", "es").value,
	fallbackLocale: "en",
	warnHtmlInMessage: "off",
	messages: loadLocaleMessages(),
});
