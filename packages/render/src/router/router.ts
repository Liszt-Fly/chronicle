import { createRouter, createWebHashHistory } from "vue-router"
import Editor from "@/views/Editor.vue"
import Setting from "@/views/Setting.vue"
import Stream from "@/views/Stream.vue"
import Home from "@/views/Home.vue"
import Info from "@/components/Setting/Info.vue"
import Jotting from "@/views/Jotting.vue"
import Trash from "@/views/Trash.vue"

import Appearance from "@/components/Setting/Appearance.vue"
import Shortcut from "@/components/Setting/Shortcut.vue"
import General from "@/components/Setting/General.vue"
import WorkSpace from "@/components/WorkSpace/WorkSpace.vue"

const router = createRouter({
	linkActiveClass: "active",
	history: createWebHashHistory(),
	routes: [
		{ path: "/", name: "Home", component: Home, redirect: '/WorkSpace' },
		{ path: "/Editor/:note([\\s\\S]*)", name: "Editor", component: Editor },
		{ path: "/Stream", name: "Stream", component: Stream },
		{ path: "/Jotting", name: "Jotting", component: Jotting },
		{ path: "/Trash", name: "Trash", component: Trash },
		{ path: "/WorkSpace", name: "WorkSpace", component: WorkSpace },
		{
			path: "/Setting", name: "Setting", component: Setting,
			children: [
				{ path: 'Info', component: Info },
				{ path: 'General', component: General },
				{ path: 'Appearance', component: Appearance },
				{ path: 'Shortcut', component: Shortcut }
			],
		},
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

