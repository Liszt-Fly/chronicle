import { createApp } from "vue"
import App from "./App.vue"
import "./assets/global.scss"
import "./assets/markdown.scss"
import "bootstrap-icons/font/bootstrap-icons.css"
import router from "./router/index"
createApp(App).use(router).mount("#app")
