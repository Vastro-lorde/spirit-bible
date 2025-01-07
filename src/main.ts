import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { init, retrieveLaunchParams } from '@telegram-apps/sdk-vue';

const app = createApp(App);
const pinia = createPinia();
//init(retrieveLaunchParams())


pinia.use(piniaPluginPersistedstate)

app.use(pinia)

app.use(router)

app.mount('#app')
