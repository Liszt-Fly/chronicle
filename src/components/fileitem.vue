<template>
	<div class="folder">
		<div
			:class="['iconfont', { 'icon-arrow-right': file.isDirectory }]"
			@click="showSubFolder($event, file)"
		>
			{{ file.name }}
		</div>
		<div
			class="subfolder"
			v-if="file.children && file.children.length > 0"
			ref="subfolder"
		>
			<fileitem
				:files="file.children"
				v-for="file in file.children"
				:file="file"
			></fileitem>
		</div>
	</div>
</template>

<script>
import { remote } from "electron"
import path from "path"
import fs from "fs"
import { sortFile } from "../fileSort"
export default {
	props: ["file", "files"],
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
				if (event.target.classList.contains("icon-arrow_down")) {
					this.$refs.subfolder.style.display = "block"
				} else {
					this.$refs.subfolder.style.display = ""
				}
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
.folder {
	position: relative;
	color: white;
	border-bottom: solid 1px #ddd;

	.subfolder {
		padding-left: 10px;

		display: none;
		transition: 1s;
	}
}
</style>
