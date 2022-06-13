// vue app
import { createApp } from "vue"
import App from "./App.vue"
const app = createApp(App)

// 样式
import "bootstrap-icons/font/bootstrap-icons.css"
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
import path from 'path'
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
// import CCodeBlock from "@/components/Editor/CCodeBlock.vue"
// import CHeader from "@/components/Editor/CHeader.vue"
// import CParagraph from "@/components/Editor/CParagraph.vue"
// import CTable from "@/components/Editor/CTable.vue"
// import CDeleteLine from '@/components/Editor/CDeleteLine.vue'
// import CQuoteBlock from '@/components/Editor/CQuoteBlock.vue'
// app.component("CCodeBlock", CCodeBlock)
// app.component("CParagraph", CParagraph)
// app.component("CHeader", CHeader)
// app.component("CTable", CTable)
// app.component("CQuoteBlock", CQuoteBlock)
// app.component("CDeleteLine", CDeleteLine)
