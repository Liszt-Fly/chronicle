import FileSystem from "../views/FileSystem.vue"
import TagSystem from "../views/TagSystem.vue"
import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: "/",
			component: FileSystem,
		},
		{
			path: "/tagsystem",
			component: TagSystem,
		},
	],
})

export default router
