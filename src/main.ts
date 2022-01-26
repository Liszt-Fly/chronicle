import { createApp } from "vue"
import App from "./App.vue"
import router from "./router/index"

import "./style/global.scss"
import "./style/markdown.scss"
import "bootstrap-icons/font/bootstrap-icons.css"

createApp(App).use(router).mount("#app")
