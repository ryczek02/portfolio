// Reactive theme store using Svelte 5 runes
let current = $state<'dark' | 'light'>('dark');

if (typeof localStorage !== 'undefined') {
	const stored = localStorage.getItem('theme');
	if (stored === 'light' || stored === 'dark') {
		current = stored;
	}
	if (typeof document !== 'undefined') {
		document.documentElement.classList.toggle('light', current === 'light');
	}
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
