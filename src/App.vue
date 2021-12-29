<template>
	<div id="app">
		<tab-bar></tab-bar>
	</div>
</template>

<script>
import TabBar from "./components/tabBar.vue"
import tabBar from "./components/tab.vue"

export default {
	name: "App",
	data() {
		return {
			display: true,
		}
	},

	components: { tabBar },
}
</script>

<style>
#app {
	width: 100vw;
	height: 100vh;
	display: flex;
	user-select: none;
	overflow: hidden;
}
</style>
