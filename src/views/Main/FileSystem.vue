<script setup lang="ts">
import { basePath, files } from "@/api/configdb"
import { createNote } from "@/api/ExtendedPanel/FileSystem/filesystem";
import { flushFiles } from "@/api/ExtendedPanel/FileSystem/util";
import FileList from "@/components/Navbar/FileSystem/FileList.vue"
import { Menu, MenuItem } from "@electron/remote"
import { ref } from "vue"
let filesystem = ref<HTMLElement | null>()
let menu = new Menu()
const fileSystemMenu = [
	new MenuItem({
		label: "create note",
		click: function () {

			createNote(basePath.value)
			files.value = []
			flushFiles()
		},
	}),

	new MenuItem({
		label: "sort",
		submenu: [
			{ label: "sort by created time", },
			{ label: "sort by last modified time", },
		],
	}),
	new MenuItem({
		label: "delete note",
		click: function () {

		}
	})
]
fileSystemMenu.forEach((item) => {
	menu.append(item)
})
</script>
<template>
	<div  class="file-system" ref="filesystem" @contextmenu="menu.popup()">
		<template v-for="file in files">
			<file-list :file="file"></file-list>
		</template>
	</div>
</template>
