import {createRouter, createWebHashHistory} from "vue-router"
import {routes} from "@/router/routes";
import {getStayTime} from "@/api/util";

const router = createRouter({
	linkActiveClass: "active",
	history: createWebHashHistory(),
	routes
})

router.beforeEach((to, from, next) => {
	//* 获取逗留时间
	getStayTime(to,from,next)
})

export default router

