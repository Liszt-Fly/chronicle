import { createRouter, createWebHashHistory } from "vue-router"
import Editor from "@/views/Editor.vue"
import Setting from "@/views/Setting.vue"
import Stream from "@/views/Stream.vue"
import Home from "@/views/Home.vue"

const router = createRouter({
	linkActiveClass: "active",
	history: createWebHashHistory(),
	routes: [
		{ path: "/", name: "Home", component: Home },
		{ path: "/Editor/:note([\\s\\S]*)", name: "Editor", component: Editor },
		{ path: "/Stream", name: "Stream", component: Stream },
		{ path: "/Setting", name: "Setting", component: Setting },
	],
})

let startTime = Date.now()
router.beforeEach((to, from, next) => {
	// 如果to存在，则说明路由发生了跳转
	if (to) {
		if (from.name == "Editor") {
			let note = from.fullPath.substring(8)
			let currentTime = Date.now()
			let stayTime = (currentTime - startTime) / 1000 / 60
			console.log(`${note}, time: ${stayTime}`);
		}
	}
	if (from) {
		startTime = Date.now()
	}
	next()
})

export default router

