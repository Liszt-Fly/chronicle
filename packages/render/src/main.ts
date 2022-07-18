// vue app
import { createApp } from "vue"
import App from "./App.vue"


const app = createApp(App)

// 样式
import "@/style/reset.scss"
import 'bootstrap-icons/font/bootstrap-icons.css'
import '@/style/element-variables.scss'
import 'element-plus/theme-chalk/dark/css-vars.css'
import "@/theme/light.scss"
import "@/theme/dark.scss"
import "@/style/global.scss"
import ElementPlus from 'element-plus'
app.use(ElementPlus)
// i18n
import { createI18n } from 'vue-i18n'
import { messages } from "@/languages/language"
const i18n = createI18n({
    locale: 'cn',
    fallbackLocale: 'en',
    messages,
})
app.use(i18n)

import router from "@/router/router"
app.use(router)

// mount
app.mount('#app').$nextTick(window.removeLoading)


// init
import { initSetting } from "@/api/init"
initSetting()
import { locale } from "@/api/init"
i18n.global.locale = locale

// component
import ChronBullet from "@/components/Editor/ChronBullet.vue"
import ChronParagraph from "./components/Editor/ChronParagraph.vue"
import ChronHeader from "./components/Editor/ChronHeader.vue";


app.component("ChronBullet",ChronBullet)
app.component("ChronParagraph", ChronParagraph)
app.component("ChronHeader", ChronHeader)
