export function checkVersionAndResetLocalStorageIfNeeded() {
	const version = localStorage.getItem("version");
	if (version !== import.meta.env.VITE_APP_VERSION) {
		localStorage.clear();
		localStorage.setItem("version", import.meta.env.VITE_APP_VERSION);
	}
}

export function resetLocalStorage() {
	localStorage.clear();
}
