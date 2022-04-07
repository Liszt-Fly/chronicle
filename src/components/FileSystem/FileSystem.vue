<script setup lang="ts">
import path from 'path'
import { files, storage } from "@/api/configdb"
import { createNote, ifSectionExists, getFiles } from "@/api/FileSystem/filesystem";
import { chronicleArticlePath, chroniclePath } from "@/api/init";
import FileList from "@/components/FileSystem/FileList.vue"
import { Menu, MenuItem } from "@electron/remote"
import { onMounted, ref } from "vue"
import fsp from 'fs-extra'

let menu = new Menu()
onMounted(() => {
	storage.value = []
	getFiles(path.resolve(chronicleArticlePath), storage.value)
	fsp.watch(path.resolve(chronicleArticlePath)).on("change", () => {
		storage.value = []
		getFiles(path.resolve(chronicleArticlePath), storage.value)
	})
})

const fileSystemMenu = [
	new MenuItem({
		label: "新建随笔",
		click: function () {
			createNote(path.resolve(chroniclePath, "assets"))
			// refresh(path.resolve(chroniclePath, "assets"))
		},
	}),
	new MenuItem({
		label: "新建栏目",
		click: function () {
			let index = ifSectionExists(chronicleArticlePath, "section", 1)
			fsp.mkdir(path.resolve(chronicleArticlePath, `section${index}`)).then(() => {
				// refresh(path.resolve(chronicleArticlePath))
			})
				.catch(err => {
					console.log(err)
				})
		},
	}),
]

fileSystemMenu.forEach((item) => {
	menu.append(item)
})

</script>
<template>
	<div class="file-system" ref="filesystem">
		<template v-for="file in storage">
			<file-list :file="file"></file-list>
		</template>
	</div>
</template>
