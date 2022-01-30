import { createRouter, createWebHistory } from "vue-router"
import Editor from "@/views/Main/Editor.vue"
import Search from "@/views/Main/Search.vue"
import Setting from "@/views/Main/Setting.vue"
import Tag from "@/views/Main/Tag.vue"
import Welcome from "@/views/Main/Welcome.vue"
import Timeline from "@/views/Main/Timeline.vue"
const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: "/", component: Welcome, },
		{ path: "/editor", component: Editor, },
		{ path: "/tag", component: Tag, },
		{ path: "/timeline", component: Timeline, },
		{ path: "/search", component: Search, },
		{ path: "/setting", component: Setting, },
	],
})

export default router
