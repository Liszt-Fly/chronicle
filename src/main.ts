// vue app
import { createApp } from "vue"
import App from "./App.vue"
const app = createApp(App)

// 样式
import "@/style/global.scss"
import "bootstrap-icons/font/bootstrap-icons.css"
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/style/element-variables.scss'
app.use(ElementPlus)

// i18n
import { createI18n } from 'vue-i18n'
import { messages } from "@/api/language"
import path from 'path'
const i18n = createI18n({
    locale: 'cn',
    fallbackLocale: 'en',
    messages,
})
app.use(i18n)

// Freadline(path.resolve(process.cwd(), "src", "Parser", "example.md")).then(v => {
//     v.map(item => {
//         let parser = new Parser("", item)
//         parser.parse()
//         Parser.parserCollection.push(parser)
//         console.log(Parser.parserCollection)
//     })
// })
// router
import router from "@/api/router/router"
app.use(router)

// mount
app.mount('#app')

// init
import { initSetting } from "@/api/init"
initSetting()
import { locale } from "@/api/init"
i18n.global.locale = locale

// component
import paragraph from "@/components/Main/Editor/components/paragraph.vue"
import codeBlock from "@/components/Main/Editor/components/codeBlock.vue"

import CHeader from "@/components/Main/Editor/components/CHeader.vue"

import CParagraph from "@/components/Main/Editor/components/CParagraph.vue"
import { Freadline } from "./Parser/_readline"
import { Parser } from "./Parser/Parser"
app.component("paragraph", paragraph)
app.component("codeBlock", codeBlock)
app.component("CParagraph", CParagraph)
app.component("CHeader", CHeader)
