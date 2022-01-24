<script setup lang="ts">
import { basePath, files } from "../composables/config"
import FileList from "@/components/FileList.vue"
import { Menu } from "@electron/remote"
import { fileSystemMenu } from "@/composables/menu"
import { onMounted, ref } from "vue"
let menu = new Menu()
let filesystem = ref<HTMLElement | null>()
fileSystemMenu.forEach((item) => {
	menu.append(item)
})
</script>

<template>
	<div class="file-system" ref="filesystem" @contextmenu="menu.popup()">
		<template v-for="file in files">
			<file-list :file="file"></file-list>
		</template>
	</div>
</template>

<style>
div.file-system {
	height: 100%;
	width: 100%;
}
</style>
