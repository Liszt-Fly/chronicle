<template>
	<div id="app">
		<tab-bar v-if="display"></tab-bar>

		<editor></editor>
	</div>
</template>

<script>
import Editor from "./components/editor.vue"
import TabBar from "./components/tabBar.vue"

import { ipcRenderer } from "electron"
export default {
	name: "App",
	data() {
		return {
			display: true,
		}
	},
	mounted() {
		ipcRenderer.on("tab", (event, arg) => {
			this.display = !this.display
		})
	},
	components: { TabBar, Editor },
}
</script>

<style>
#app {
	width: 100vw;
	height: 100vh;
	display: flex;
}
</style>
