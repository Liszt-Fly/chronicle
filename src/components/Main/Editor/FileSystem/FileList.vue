<script setup lang="ts">
import { Menu, MenuItem } from "@electron/remote"
import { reactive, ref } from "vue"
import { msfile } from "@/types/type"
import fsp from "fs-extra"
import path from "path"
import { flushFiles, validateFilename } from "@/api/ExtendedPanel/FileSystem/util"
import { basePath, currentFile, paragraphs } from "@/api/configdb"
import { dialog } from "electron"
const props = defineProps({
	file: Object as () => msfile,
})
let subfolder = ref<HTMLDivElement | null>(null)
let refSubfolder = reactive({ dom: subfolder })
let namebox = ref<HTMLElement | null>(null)
const fileDom = ref<HTMLElement | null>(null)
function openFile(event: MouseEvent, file: msfile) {
	//如果是文件
	if (!file.isDirectory) {
		console.log(basePath.value)
		if (path.extname(path.resolve(basePath.value, file.name!)) === ".json") {
			//首先保存上一个文件
			if (currentFile.value != "") {

			}
			currentFile.value = path.resolve(basePath.value, file.name!)
		} else {
		}
	}
}
function renameNote(file: msfile) {
	//启用contentEdible
	namebox.value!.contentEditable = "true"
	namebox.value!.focus()
}
function toggleSubfolder(
	event: MouseEvent,
	file: msfile,
	subfolder: { dom: HTMLElement | null }
) {
	//如果msfile是directory类型，进行图标转换，以及显隐转换

	if (file.isDirectory) {
		if (event) {
			let item = event.currentTarget as HTMLElement
			let folder = item.firstElementChild!

			folder.classList.toggle("bi-folder")
			folder.classList.toggle("bi-folder2-open")
			if (folder.classList.contains("bi-folder2-open")) {
				subfolder.dom!.style.display = "block"
			} else {
				subfolder.dom!.style.display = ""
			}
		}
	}
}
function finishReanmeNote(file: msfile) {
	// file.name = namebox.value!.innerText

	let pathObjcet = path.parse(file.path!)
	pathObjcet.base = namebox.value!.innerText
	namebox.value!.contentEditable = "false"
	console.log(file.path + pathObjcet.ext)

	fsp.renameSync(
		props!.file!.path!,
		path.resolve(pathObjcet.dir, namebox.value!.innerText) + pathObjcet.ext
	)


}
function deleteNote(file: msfile) {
	fsp.unlinkSync(file.path!)
}

function enter(event: KeyboardEvent) {
	let target = event.target as HTMLDivElement
	target.blur()
}
function addTag(file: msfile) {


}
// 右键菜单
const menu = new Menu()
const menuItems = [
	new MenuItem({
		label: "delete note",
		click: () => {
			deleteNote(props.file!)
			flushFiles()
		},
	}),
	new MenuItem({
		label: "rename note",
		click: () => {
			renameNote(props.file!)
		},
	}),
	new MenuItem({
		label: "addTag",
		click: () => {

		},
	}),

]
menuItems.forEach((item) => {
	menu.append(item)
})
</script>

<template>
	<div class="folder" v-if="file" ref="fileDom">
		<div
			class="item"
			tabindex="1"
			@click="toggleSubfolder($event, file!, refSubfolder), openFile($event, file!)"
			v-if="validateFilename(file.name!)"
			@contextmenu.stop="menu.popup()"
		>
			<span
				:class="[
					'iconfont',
					{ 'bi bi-folder': file.isDirectory },
					{ 'bi bi-journal-bookmark-fill': !file.isDirectory },
					'file-name',
					'file-icon',
				]"
			></span>
			<span
				ref="namebox"
				@blur="finishReanmeNote(props.file!)"
				@keydown.enter.prevent="enter($event)"
			>{{ validateFilename(file.name!) }}</span>
		</div>
		<div
			class="subfolder"
			v-if="file.children && file.children.length > 0"
			ref="subfolder"
			id="subfolder"
		>
			<file-list :files="file.children" :file="f" v-for="f in file.children"></file-list>
		</div>
	</div>
</template>
