import { createApp } from "vue"
import App from "./App.vue"
import router from "./router/router"
import paragraph from "@/components/Main/Editor/paragraph.vue"
import codeBlock from "@/components/Main/Editor/codeBlock.vue"

import "./style/global.scss"
import "./style/dark.scss"
import "bootstrap-icons/font/bootstrap-icons.css"

const app = createApp(App)

app.component("paragraph", paragraph)
app.component("codeBlock", codeBlock)
app.use(router).mount("#app")
