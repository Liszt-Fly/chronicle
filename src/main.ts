import { createApp } from "vue"

import App from "./App.vue"
import router from "@/api/router/router"

import paragraph from "@/components/Main/Editor/components/paragraph.vue"
import codeBlock from "@/components/Main/Editor/components/codeBlock.vue"

// 样式
import "@/style/global.scss"
import "@/themes/Frame/dark/dark.scss"
import "@/themes/Editor/dark/dark.scss"
import "@/themes/Editor/Code/dark/dark.scss"
import "bootstrap-icons/font/bootstrap-icons.css"

const app = createApp(App)

// app.use(hljsVuePlugin)
app.component("paragraph", paragraph)
app.component("codeBlock", codeBlock)
app.use(router).mount("#app")
