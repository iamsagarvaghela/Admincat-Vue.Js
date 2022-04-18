import { createApp } from 'vue'
import App from './App.vue'

import router from './routes'  //for routes

import mitt from 'mitt'
import store from './store'

const emitter = mitt()

createApp(App).use(store).provide('emitter',emitter).use(router).mount('#app')

