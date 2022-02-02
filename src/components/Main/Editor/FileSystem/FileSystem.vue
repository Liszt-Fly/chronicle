<script setup lang="ts">
import { basePath, files } from "@/api/configdb"
import { createNote } from "@/api/Editor/FileSystem/filesystem";
import { flushFiles } from "@/api/Editor/FileSystem/util";
import FileList from "@/components/Main/Editor/FileSystem/FileList.vue"
import { Menu, MenuItem } from "@electron/remote"
import { ref } from "vue"
let filesystem = ref<HTMLElement | null>()
let menu = new Menu()
const fileSystemMenu = [
	new MenuItem({
		label: "新建记录",
		click: function () {
			createNote(basePath.value)
			files.value = []
			flushFiles()
		},
	}),
	new MenuItem({
		label: "新建栏目",
		click: function () {
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
const popMenu=(event:MouseEvent)=>{

}
</script>
<template>
	<div class="file-system" ref="filesystem" @contextmenu="menu.popup($event)">
		<template v-for="file in files">
			<file-list :file="file"></file-list>
		</template>
	</div>
</template>
