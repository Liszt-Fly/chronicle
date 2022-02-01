import { createApp } from "vue"

import App from "./App.vue"
import router from "@/api/router/router"

import paragraph from "@/components/Main/Editor/components/paragraph.vue"
import codeBlock from "@/components/Main/Editor/components/codeBlock.vue"

// 样式
import "@/style/global.scss"
import "@/themes/Frame/light/light.scss"
import "@/themes/Editor/light/light.scss"
import "@/themes/Editor/Code/dark/dark.scss"
import "bootstrap-icons/font/bootstrap-icons.css"
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/style/element-variables.scss'

const app = createApp(App)

app.component("paragraph", paragraph)
app.component("codeBlock", codeBlock)
app.use(router)
app.use(ElementPlus)

app.mount("#app")
