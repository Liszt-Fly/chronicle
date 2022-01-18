import FileSystem from "../views/FileSystem.vue"
import { createRouter, createWebHistory } from "vue-router"
import SearchSystem from "../views/SearchSystem.vue"

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: "/",
			component: FileSystem,
		},

		{
			path: "/searchsystem",
			component: SearchSystem,
		},
	],
})

export default router
