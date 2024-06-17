import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueApexCharts from "vue3-apexcharts";
import VueScreen from 'vue-screen'

import App from './App.vue'
import router from './router'

import './index.css'

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.use(VueApexCharts);
app.use(VueScreen, 'tailwind')

app.mount('#app')
