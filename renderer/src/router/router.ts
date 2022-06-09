import { createRouter, createWebHashHistory } from "vue-router"
import Editor from "@/views/Editor.vue"
// import Setting from "@/views/Setting.vue"
// import Stream from "@/views/Stream.vue"
// import Repositories from "@/views/Repositories.vue"


const router = createRouter({
    linkActiveClass: "active",
    history: createWebHashHistory(),
    routes: [
        {
            path: "/", component: Editor,
        },
        // { path: "/stream", component: Stream, },
        // { path: "/setting", component: Setting, },
        // { path: "/repositories", component: Repositories }
    ],
})
export default router