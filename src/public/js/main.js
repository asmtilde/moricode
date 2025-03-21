import { mount } from 'svelte';
import '../css/app.css';
import App from '../svelte/App.svelte';

const app = mount(App, {
    target: document.getElementById('app'),
});

export default app;
