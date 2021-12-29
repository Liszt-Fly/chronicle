<template>
	<div class="folder">
		<div class="item">
			<span
				:class="[
					'iconfont',
					{ 'icon-arrow-right': file.isDirectory },
					{ 'bi bi-cloud-fog2': !file.isDirectory },
					'file-name',
				]"
				@click="showSubFolder($event, file)"
			>
				&nbsp {{ file.name }}
			</span>
		</div>

		<div
			class="subfolder"
			v-if="file.children && file.children.length > 0"
			ref="subfolder"
		>
			<file-list
				:files="file.children"
				v-for="file in file.children"
				:file="file"
			></file-list>
		</div>
	</div>
</template>

<script>
import { remote } from "electron"
import path from "path"
import fs from "fs"
import { sortFile } from "../fileSort"
export default {
	props: ["file", "files", "basePath"],
	data() {
		return {
			disabled: true,
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
			} else {
				if (path.extname(file.name) === ".qy") {
					const data = fs.readFileSync(
						path.resolve(path.join(this.basePath, file.name)),
						"utf-8"
					)
					console.log(data)
				} else {
					alert("该类型的文件格式不能打开")
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
	color: white;

	width: 18vw;
	position: relative;
	span {
		display: inlin-block;
		padding: 10px;
		i {
			color: red;
		}
	}
	.subfolder {
		width: 18vw;

		display: none;
	}
	.file-name {
		font-size: 15px;
		display: inline-block;
		width: 100%;
	}
}

.subfolder {
	text-indent: 10px;
}
.item {
	&:hover {
		background-color: #343434;
	}
}
</style>
