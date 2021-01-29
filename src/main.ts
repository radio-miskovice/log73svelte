import App from './App.svelte';
import { openDb } from './store/database';


const app = new App({
	target: document.body,
	props: {
		version: '0.0.4-alpha'
	}
});

openDb()

export default app;