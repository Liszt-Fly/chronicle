<template>
	<div class="item" @contextmenu.prevent="generateMenus(file)">
		<span
			><i
				@click="showSubFolder($event, file)"
				:class="[
					icon(file),
					'iconfont',
					{ 'icon-arrow-right': file.isDirectory },
				]"
			></i
		></span>
		<input
			v-model="file.ignoredName"
			:disabled="disabled"
			@blur="finish(file)"
		/>
	</div>
	<div class="subfolder"></div>
</template>

<script>
import { remote } from "electron"
import path from "path"
import fs from "fs"
import { sortFile } from "../fileSort"
export default {
	props: ["file", "basePath", "depth"],
	data() {
		return {
			disabled: true,
			subFiles: [],
		}
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
	methods: {
		finish(file) {
			this.disabled = !this.disabled

			let newname = file.ignoredName + path.extname(file.name)
			fs.renameSync(
				path.resolve(this.basePath, file.name),
				path.resolve(this.basePath, newname)
			)
			sortFile("size", this.basePath, 1).then((res) =>
				this.$emit("filechange", res)
			)
		},
		showSubFolder(event, file) {
			if (file.isDirectory) {
				event.target.classList.toggle("icon-arrow-right")
				event.target.classList.toggle("icon-arrow_down")
			}
			if (event.target.classList.contains("icon-arrow_down")) {
				sortFile("size", file.folderPath, this.depth + 1).then((res) => {
					this.subFiles = res
				})
			} else {
				this.subFiles = null
			}
		},
		generateMenus(file) {
			const { Menu, MenuItem } = remote
			var template = [
				{
					label: "Create File",
					accelerator: "CmdOrCtrl+D",
					click: () => {
						this.createUntitleFile(1)
						sortFile("size", this.basePath, 1).then((res) => {
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
						sortFile("size", this.basePath, 1).then((res) => (this.files = res))
					},
				},
			]
			var m = Menu.buildFromTemplate(template)
			m.popup({ window: remote.getCurrentWindow() })
		},
	},
}
</script>

<style lang="scss" scoped>
.subfolder {
	font-size: 13px;
}
.item {
	background-color: white;
	display: flex;

	flex-direction: row;
	justify-content: space-evenly;

	i {
		font-size: 20px;
	}

	padding: 0 2px 0 2px;
	margin-bottom: 20px;
	font-size: 8px;
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
</style>
