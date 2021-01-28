import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		version: '0.0.4-alpha'
	}
});

export default app;