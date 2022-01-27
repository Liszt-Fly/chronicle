<script setup lang="ts">
import { toggleSubfolder, openFile } from "@/composables/filelist"
import { fileListMenu } from "@/composables/menu"
import { getCurrentWindow, Menu } from "@electron/remote"

import { onMounted, reactive, ref } from "vue"
import { msfile } from "../composables/type"
import { validateFilename } from "../composables/util"

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
</script>

<template>
	<div class="folder" v-if="file" ref="fileDom" @contextmenu="menu.popup()">
		<div class="item" @click="toggleSubfold($event, file!, refSubfolder), openFile($event, file!)">
			<span
				:class="[
					'iconfont',
					{ 'icon-arrow-right': file.isDirectory },
					{ 'icon-file': !file.isDirectory },
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
