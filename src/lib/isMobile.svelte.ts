import { browser } from '$app/environment';

// Reactive mobile flag driven by matchMedia (max-width: 768px).
// Mounted components can read `isMobile.value` and trigger re-renders on resize.
function createIsMobile() {
	let value = $state(false);

	if (browser) {
		const mq = window.matchMedia('(max-width: 768px)');
		value = mq.matches;
		const update = (e: MediaQueryListEvent) => (value = e.matches);
		mq.addEventListener('change', update);
	}

	return {
		get value() {
			return value;
		}
	};
}

export const isMobile = createIsMobile();
