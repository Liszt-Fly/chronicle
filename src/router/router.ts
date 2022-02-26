import { createRouter, createWebHashHistory } from "vue-router"
import Editor from "@/views/Editor.vue"
import Setting from "@/views/Setting.vue"
import Stream from "@/views/Stream.vue"
const router = createRouter({

	history: createWebHashHistory(),
	routes: [
		{ path: "/", component: Editor, },
		{ path: "/editor", component: Editor, },
		{ path: "/stream", component: Stream, },
		{ path: "/setting", component: Setting, },
	],
})

export default router