<template>
	<div class="content">
		<div @click="openFile">
			<i class="iconfont icon-file-open"></i>
		</div>
		<div><i class="iconfont icon-04_huaban1_huaban1"></i></div>
		<div>3</div>
		<div>4</div>
		<div>5</div>
	</div>
	<div v-if="files">
		<ul v-for="file in files">
			{{
				file.name
			}}
		</ul>
	</div>
</template>

<script>
import path from "path"
import { ipcRenderer } from "electron"
import { sortFile } from "../fileSort"
export default {
	data() {
		return {
			files: [],
		}
	},
	methods: {
		openFile() {
			ipcRenderer.send("open_event", "open")
		},
	},
	mounted() {
		ipcRenderer.on("open_event", (event, arg) => {
			sortFile("size", arg[0]).then((res) => (this.files = res))
		})
	},
}
</script>

<style lang="scss" scoped>
.content {
	width: 10vw;
	height: 100vh;

	display: flex;
	flex-direction: column;
	justify-content: space-evenly;

	div {
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		i {
			font-size: 35px;
		}
	}
}
</style>
