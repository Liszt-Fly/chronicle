import { createApp } from "vue"

import App from "./App.vue"
import router from "@/api/router/router"

import paragraph from "@/components/Main/Editor/paragraph.vue"
import codeBlock from "@/components/Main/Editor/codeBlock.vue"

import 'highlight.js/styles/stackoverflow-light.css'
import 'highlight.js/lib/common';
import hljsVuePlugin from "@highlightjs/vue-plugin";

import "@/style/global.scss"
import "@/style/dark.scss"
import "bootstrap-icons/font/bootstrap-icons.css"

const app = createApp(App)

app.use(hljsVuePlugin)
app.component("paragraph", paragraph)
app.component("codeBlock", codeBlock)
app.use(router).mount("#app")
