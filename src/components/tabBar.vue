<template>
	<div class="content" v-if="display">
		<!--tabbar图标样式-->
		<div class="tab-bar">
			<div @click="openFile">
				<i class="bi bi-folder"></i>
			</div>
			<div @click="toggleFileSystem">
				<i class="iconfont icon-menu"></i>
			</div>
			<div>
				<i class="bi bi-bookmark-star"></i>
			</div>

			<div><i class="bi bi-gear"></i></div>
			<div><i class="bi bi-calendar-day"></i></div>
		</div>
	</div>
	<div class="file-system" ref="fileSystem">
		<fileitem :file="file" v-for="file in files" :files="files"></fileitem>
	</div>
</template>

<script>
// @ts-nocheck

import path from "path"
import fs from "fs"
import { ipcRenderer, MenuItem, remote } from "electron"
import { sortFile, sortFileInDepth } from "../fileSort"
import fileitem from "./fileitem.vue"
export default {
	components: { fileitem },
	data() {
		return {
			files: [],
			display: true,
			basePath: "",
			disabled: true,
		}
	},

	methods: {
		toggleFileSystem() {
			if (this.$refs.fileSystem.style.display == "none") {
				this.$refs.fileSystem.style.display = "block"
			} else {
				this.$refs.fileSystem.style.display = "none"
			}
		},
		createUntitleFile(index) {
			fs.access(path.resolve(this.basePath, `untitle-${index}.md`), (err) => {
				if (err) {
					fs.writeFileSync(
						path.resolve(this.basePath, `untitle-${index}.md`),
						""
					)
					sortFile("size", this.basePath, 0).then((res) => {
						this.files = res
					})
				} else {
					index++
					console.log(index)
					console.log("重新渲染")
					this.createUntitleFile(index)
				}
			})
		},
		finish(file) {
			this.disabled = !this.disabled
			console.log(file.ignoredName)
			let newname = file.ignoredName + path.extname(file.name)
			fs.renameSync(
				path.resolve(this.basePath, file.name),
				path.resolve(this.basePath, newname)
			)
			sortFile("size", this.basePath, 0).then((res) => (this.files = res))
		},
		openFile() {
			ipcRenderer.send("open_event", "open")
		},
	},
	computed: {},

	mounted() {
		ipcRenderer.on("open_event", (event, arg) => {
			this.basePath = arg[0]
			console.log(arg[0])
			this.files = sortFileInDepth(arg[0], [])
			this.files = sortFileInDepth(arg[0], [])
		})
	},
}
</script>

<style lang="scss" scoped>
.tab-bar {
	background-color: #2c3e50;
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
	background-color: #34495e;
	background-color: #34495e;
	height: 100vh;
	width: 18vw;
	overflow: scroll;
}
</style>
