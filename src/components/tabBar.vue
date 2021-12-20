<template>
	<div class="content" v-if="display">
		<div class="tab-bar">
			<div @click="openFile">
				<i class="bi bi-folder"></i>
			</div>
			<div>
				<i class="bi bi-bookmark-star"></i>
			</div>
			<div><i class="bi bi-gear"></i></div>
			<div><i class="bi bi-calendar-day"></i></div>
		</div>
	</div>
	<div class="file-system">
		<div v-if="files">
			<div @filechange="finish(file)" class="item" v-for="file in files">
				<fileitem
					:file="file"
					class="item"
					@filechange="refresh"
					:base-path="basePath"
					:depth="file.depth"
				>
				</fileitem>
			</div>
		</div>
	</div>
</template>

<script>
// @ts-nocheck

import path from "path"
import fs from "fs"
import { ipcRenderer, MenuItem, remote } from "electron"
import { sortFile } from "../fileSort"
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
		closeTabBar() {
			this.display = !this.display
		},

		generateMenus(file) {
			const { Menu, MenuItem } = remote
			var template = [
				{
					label: "Create File",
					accelerator: "CmdOrCtrl+D",
					click: () => {
						this.createUntitleFile(1)
						sortFile("size", this.basePath, 0).then((res) => {
							this.files = res
						})
					},
				},
				{
					label: "Delete File/Folder",
					click: () => {
						fs.unlink(path.resolve(this.basePath, file.name), (err) => {
							this.files.forEach((f, i) => {
								if (f.name === file.name) {
									this.files.splice(i, 1)
								}
							})
						})
					},
				},
				{
					label: "Rename File/Folder",
					click: () => {
						this.disabled = false
					},
				},
				{
					label: "create Folder",
					click: () => {
						fs.mkdirSync(path.resolve(this.basePath, "untitle"))
						sortFile("size", this.basePath, 0).then((res) => (this.files = res))
					},
				},
			]
			var m = Menu.buildFromTemplate(template)
			m.popup({ window: remote.getCurrentWindow() })
		},
		refresh(data) {
			console.log(data)
		},
	},
	computed: {
		icon() {
			return function (file) {
				if (file.isDirectory) {
					return null
				}
				return "icon-".concat(path.extname(file.name).substring(1))
			}
		},
	},

	mounted() {
		ipcRenderer.on("open_event", (event, arg) => {
			this.basePath = arg[0]

			sortFile("size", arg[0], 0).then((res) => (this.files = res))
		})
	},
}
</script>

<style lang="scss" scoped>
.tab-bar {
	background-color: #f7f7f7;
	width: 5vw;
	height: 100vh;

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
	display: flex;
	width: 15vw;
	justify-content: space-evenly;
	overflow: scroll;
	padding: 5px;
}
</style>
