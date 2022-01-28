import { createRouter, createWebHistory } from "vue-router"

import FileSystem from "../view/NavBar/FileSystem.vue"
import SearchSystem from "../view/NavBar/SearchSystem.vue"

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
