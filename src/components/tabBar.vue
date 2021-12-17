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
			<div
				@contextmenu.prevent="generateMenus(file)"
				class="item"
				v-for="file in files"
			>
				<span
					><i
						:class="[
							icon(file),
							'iconfont',
							{ 'icon-folder': file.isDirectory },
						]"
					></i
				></span>
				<input
					v-model="file.ignoredName"
					:disabled="disabled"
					@blur="finish(file)"
				/>
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
export default {
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
					sortFile("size", this.basePath).then((res) => {
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
			sortFile("size", this.basePath).then((res) => (this.files = res))
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
					label: "CreateFile",
					accelerator: "CmdOrCtrl+D",
					click: () => {
						this.createUntitleFile(1)
						sortFile("size", this.basePath).then((res) => {
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
					label: "createFolder",
					click: () => {
						fs.mkdirSync(path.resolve(this.basePath, "untitle"))
						sortFile("size", this.basePath).then((res) => (this.files = res))
					},
				},
			]
			var m = Menu.buildFromTemplate(template)
			m.popup({ window: remote.getCurrentWindow() })
		},
	},
	computed: {
		icon() {
			return function (file) {
				return "icon-".concat(path.extname(file.name).substring(1))
			}
		},
	},
	created() {},
	mounted() {
		ipcRenderer.on("open_event", (event, arg) => {
			this.basePath = arg[0]

			sortFile("size", arg[0]).then((res) => (this.files = res))
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

	.item {
		background-color: white;
		display: flex;

		flex-direction: row;
		justify-content: space-evenly;
		i {
			font-size: 25px;
		}

		padding: 0 2px 0 2px;
		margin-bottom: 20px;
		font-size: 10px;
		&:hover {
			background-color: #ddd;
			cursor: default;
		}
		input {
			border: none;
			background-color: transparent;
			&:focus {
				outline: none;
			}
		}
	}
}
</style>
