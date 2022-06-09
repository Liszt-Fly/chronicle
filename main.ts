import { createApp } from 'vue'
import App from './App.vue'
import './samples/node-api'
import "@/style/global.scss"
import '@/style/element-variables.scss'
import "bootstrap-icons/font/bootstrap-icons.css"
import ElementPlus from 'element-plus'
import router from "@/router/router"
const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.mount('#app')
  .$nextTick(window.removeLoading)

//init

import { initSetting } from "@/api/init"
initSetting()