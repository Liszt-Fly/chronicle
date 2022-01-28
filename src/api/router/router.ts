import { createRouter, createWebHistory } from "vue-router"

import FileSystem from "@/views/NavBar/FileSystem.vue"
import SearchSystem from "@/views/NavBar/SearchSystem.vue"

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: "/",
			component: FileSystem,
		},
		{
			path: "/setting",
			component: SearchSystem,
		},
	],
})

export default router
