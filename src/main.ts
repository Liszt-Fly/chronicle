import { createApp } from "vue"
import App from "./App.vue"
import router from "./router/index"
import paragraph from "@/components/CDOM/paragraph.vue"
import codeBlock from "@/components/CDOM/codeBlock.vue"

import "./style/global.css"
import "./style/light.css"
import "bootstrap-icons/font/bootstrap-icons.css"

const app = createApp(App)
app.component("paragraph", paragraph)
app.component("codeBlock", codeBlock)
app.use(router).mount("#app")
