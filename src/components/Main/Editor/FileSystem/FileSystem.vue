<script setup lang="ts">
import path from 'path'
import { basePath, files } from "@/api/configdb"
import { createNote, ifSectionExists } from "@/api/Editor/FileSystem/filesystem";
import { flushFiles, refresh } from "@/api/Editor/FileSystem/util";
import { chronicleArticlePath, chroniclePath } from "@/api/init";
import FileList from "@/components/Main/Editor/FileSystem/FileList.vue"
import { Menu, MenuItem } from "@electron/remote"
import { ref } from "vue"
import fsp from 'fs-extra'
let filesystem = ref<HTMLElement | null>()
let menu = new Menu()
const fileSystemMenu = [
	new MenuItem({
		label: "新建随笔",
		click: function () {
			createNote(path.resolve(chroniclePath, "assets"))
			refresh(path.resolve(chroniclePath, "assets"))
		},
	}),
	new MenuItem({
		label: "新建栏目",
		click: function () {


			let index = ifSectionExists(chronicleArticlePath, "section", 1)
			fsp.mkdir(path.resolve(chronicleArticlePath, `section${index}`)).then(() => {
				refresh(path.resolve(chronicleArticlePath))
			})
				.catch(err => {
					console.log(err)
				})

		},
	}),

	// new MenuItem({
	// 	label: "sort",
	// 	submenu: [
	// 		{ label: "sort by created time", },
	// 		{ label: "sort by last modified time", },
	// 	],
	// }),
]

fileSystemMenu.forEach((item) => {
	menu.append(item)
})
const popMenu = (event: MouseEvent) => {
	console.log(1)
}
</script>
<template>
	<div class="file-system" ref="filesystem" @contextmenu="menu.popup()">
		<template v-for="file in files">
			<file-list :file="file" @contextmenu="popMenu($event)"></file-list>
		</template>
	</div>
</template>
