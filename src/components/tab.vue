<template>
	<!--tabBar样式-->
	<div class="tab-bar" v-if="display">
		<div @click="toggleFileSystem(fileSystem)">
			<i class="iconfont icon-menu"></i>
		</div>

		<div @click="openFile">
			<i class="bi bi-folder"></i>
		</div>

		<div>
			<i class="bi bi-bookmark-star"></i>
		</div>

		<div><i class="bi bi-gear"></i></div>
		<div><i class="bi bi-calendar-day"></i></div>
	</div>

	<!--* 文件系统 -->
	<div class="file-system" ref="fileSystem">
		<file-list
			:file="file"
			v-for="file in files"
			:files="files"
			:basePath="basePath"
		></file-list>
	</div>
</template>

<script setup>
import fileList from "./fileList.vue"
import { toggleFileSystem } from "../Repository/display"
import { ref, reactive } from "@vue/reactivity"

let files = ref([])
let display = reactive(true)
let basePath = ref("")
const fileSystem = ref(null)
</script>

<style lang="scss" scoped>
.tab-bar {
	background-color: #1f1f1f;
	width: 5vw;
	height: 100vh;
	color: white;

	display: flex;
	flex-direction: column;
	justify-content: space-evenly;

	div {
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
	}
}
.file-system {
	background-color: #252525;

	height: 100vh;
	width: 18vw;
	overflow-y: scroll;
	overflow-x: hidden;
}
</style>
