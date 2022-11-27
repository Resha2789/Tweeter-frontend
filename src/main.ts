/** @format */

import { createApp } from 'vue'
import store from '@/store/index'
import App from './App.vue'
import './assets/scss/main.scss'
import router from '@/router/router'

const app = createApp(App)
app.use(store)
app.use(router)

app.mount('#app')
