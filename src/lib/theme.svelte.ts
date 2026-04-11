// Reactive theme store using Svelte 5 runes
function readInitialTheme(): 'dark' | 'light' {
	if (typeof localStorage === 'undefined') return 'dark';
	const stored = localStorage.getItem('theme');
	return stored === 'light' || stored === 'dark' ? stored : 'dark';
}

let current = $state<'dark' | 'light'>(readInitialTheme());

if (typeof document !== 'undefined') {
	document.documentElement.classList.toggle('light', current === 'light');
}

export const theme = {
	get value() {
		return current;
	},
	toggle() {
		current = current === 'dark' ? 'light' : 'dark';
		if (typeof localStorage !== 'undefined') {
			localStorage.setItem('theme', current);
		}
		if (typeof document !== 'undefined') {
			document.documentElement.classList.toggle('light', current === 'light');
		}
	},
};
