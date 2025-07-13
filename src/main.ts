import { createApp } from "vue";
import "./assets/index.css";
import { createPinia } from "pinia";
import { createPersistedState } from "pinia-plugin-persistedstate";
import { parse, stringify } from "zipson";
import App from "./App.vue";
import { i18n } from "./i18n.ts";

const pinia = createPinia();
pinia.use(
	// Configurar el serializador globalmente
	createPersistedState({
		serializer: {
			deserialize: parse,
			serialize: stringify,
		},
	}),
);

createApp(App).use(pinia).use(i18n).mount("#app");
