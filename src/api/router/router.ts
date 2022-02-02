import { createRouter, createWebHistory } from "vue-router"
import Editor from "@/views/Main/Editor.vue"
import Setting from "@/views/Main/Setting.vue"
import Stream from "@/views/Main/Stream.vue"
const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: "/", component: Editor, },
		{ path: "/editor", component: Editor, },
		{ path: "/stream", component: Stream, },
		{ path: "/setting", component: Setting, },
	],
})

export default router
