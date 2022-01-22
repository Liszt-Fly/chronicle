<script setup lang="ts">
import { basePath, content, files } from "@/composables/config"
import { toggleSubfolder } from "@/composables/filelist"
import {
	createNote,
	deleteNote,
	ifNoteNameExists,
} from "@/composables/filesystem"
import { getCurrentWindow, Menu, MenuItem } from "@electron/remote"
import fs from "fs"
import path from "path"
import { onMounted, reactive, ref, watch } from "vue"
import { msfile } from "../composables/type"
import { flushFiles, validateFilename } from "../composables/util"

defineProps({
	file: Object as () => msfile,
})
let subfolder = ref<HTMLDivElement | null>(null)
let refSubfolder = reactive({ dom: subfolder })
const fileDom = ref<HTMLElement | null>(null)
const toggleSubfold = toggleSubfolder
//右键餐单
const menu = new Menu()
menu.append(
	new MenuItem({
		label: "create note",
		click: function () {
			console.log("notes created!")
			createNote(basePath.value)
			files.value = []
			flushFiles()
		},
	})
)
// menu.append(new MenuItem({ type: "separator" })) //分割线
menu.append(
	new MenuItem({
		label: "delete note",
		click: function () {
			console.log(ifNoteNameExists(basePath.value, "mikedairy", 1))
			flushFiles()
		},
	})
)
menu.append(
	new MenuItem({
		label: "sort",
		submenu: [
			{
				label: "sorted by created time",
			},
			{
				label: "sorted by last modified time",
			},
		],
	})
)
onMounted(() => {
	fileDom.value!.addEventListener("contextmenu", (e) => {
		e.preventDefault()
		menu.popup({ window: getCurrentWindow() })
	})
})
</script>

<template>
	<div class="folder" v-if="file" ref="fileDom">
		<div class="item">
			<span
				:class="[
					'iconfont',
					{ 'icon-arrow-right': file.isDirectory },
					{ 'bi bi-cloud-fog2': !file.isDirectory },
					'file-name',
				]"
				@click=" toggleSubfold($event,file!,refSubfolder)"
				>&nbsp {{ validateFilename(file.name!) }}</span
			>
		</div>
		<div
			class="subfolder"
			v-if="file.children && file.children.length > 0"
			ref="subfolder"
			id="subfolder"
		>
			<file-list
				:files="file.children"
				v-for="file in file.children"
				:file="file"
			></file-list>
		</div>
	</div>
</template>

<style scped lang="scss">
.folder {
	width: 18vw;
	white-space: nowrap;
	overflow-x: hidden;
	overflow-y: scroll;
	display: block;
}

.item {
	&:hover {
		background-color: #343434;
		cursor: pointer;
	}
}
.subfolder {
	text-indent: 10px;
	width: 18vw;
	display: none;
}
.file-name {
	font-size: 0.7rem;
	display: inline-block;
	width: 100%;
	overflow-x: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
</style>
