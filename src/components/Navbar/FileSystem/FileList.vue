<script setup lang="ts">
import { toggleSubfolder, openFile } from "@/api/NavBar/FileSystem/filelist"
import { getCurrentWindow, Menu, MenuItem } from "@electron/remote"

import { onMounted, reactive, ref } from "vue"
import { msfile } from "@/api/NavBar/FileSystem/type"
import { flushFiles, validateFilename } from "@/api/NavBar/FileSystem/util"

defineProps({
	file: Object as () => msfile,
})
let subfolder = ref<HTMLDivElement | null>(null)
let refSubfolder = reactive({ dom: subfolder })
const fileDom = ref<HTMLElement | null>(null)
const toggleSubfold = toggleSubfolder

// 右键
const menu = new Menu()
const menuLabels = ["delete note", "add tag", "move"]
menuLabels.forEach(label => {
	menu.append(new MenuItem({ label: label }))
});

</script>

<template>
	<div class="folder" v-if="file" ref="fileDom">
		<div
			class="item"
			@click="toggleSubfold($event, file!, refSubfolder), openFile($event, file!)"
			v-if="validateFilename(file.name!)"
			@contextmenu.stop="menu.popup()"
		>
			<span
				:class="[
					'iconfont',
					{ 'bi bi-folder': file.isDirectory },
					{ 'bi bi-journal-bookmark-fill': !file.isDirectory },
					'file-name',
					'file-icon'
				]"
			></span>
			<span>{{ validateFilename(file.name!) }}</span>
		</div>
		<div
			class="subfolder"
			v-if="file.children && file.children.length > 0"
			ref="subfolder"
			id="subfolder"
		>
			<file-list :files="file.children" :file="f" v-for="	f in file.children"></file-list>
		</div>
	</div>
</template>
