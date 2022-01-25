<script setup lang="ts">
import { basePath, content, files } from "@/composables/config"
import { toggleSubfolder, openFile } from "@/composables/filelist"
import {
	createNote,
	deleteNote,
	ifNoteNameExists,
} from "@/composables/filesystem"
import { fileListMenu, fileSystemMenu } from "@/composables/menu"
import { getCurrentWindow, Menu, MenuItem } from "@electron/remote"

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
fileListMenu.forEach((item) => {
	menu.append(item)
})
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
				@click="toggleSubfold($event, file!, refSubfolder), openFile($event, file!)"
			>&nbsp {{ validateFilename(file.name!) }}</span>
		</div>
		<div
			class="subfolder"
			v-if="file.children && file.children.length > 0"
			ref="subfolder"
			id="subfolder"
		>
			<file-list :files="file.children" :file="f" v-for="	f in 	file.children"></file-list>
		</div>
	</div>
</template>

<style scped lang="scss">
.folder {
	white-space: nowrap;
	overflow-x: hidden;
	display: block;
	overflow-y: auto;
}

.item {
	&:hover {
		background-color: #343434;
		cursor: pointer;
	}
	padding: 6px;
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
