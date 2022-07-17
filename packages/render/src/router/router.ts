import {createRouter, createWebHashHistory, NavigationGuardNext, RouteLocationNormalized} from "vue-router"
import Editor from "@/views/Editor.vue"
import {routes} from "@/router/routes";
import {getStayTime} from "@/api/util";

const router = createRouter({
	linkActiveClass: "active",
	history: createWebHashHistory(),
	routes
})

router.beforeEach((to, from, next) => {
	//* 获取逗留时间
	let stayTime=getStayTime(to,from,next)
})

export default router

