import { createRouter, createWebHistory } from "vue-router"

import FileSystem from "@/views/Main/FileSystem.vue"
import SearchSystem from "@/views/Main/SearchSystem.vue"
import SettingSystem from "@/views/Main/Setting.vue"
import TagSystem from "@/views/Main/Tag.vue"

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: "/", component: FileSystem, },
		{ path: "/tag", component: TagSystem, },
		{ path: "/search", component: SearchSystem, },
		{ path: "/setting", component: SettingSystem, },
	],
})

export default router
