<script setup lang="ts">
import { files } from "../../api/config"
import FileList from "@/components/Navbar/FileSystem/FileList.vue"
import { Menu } from "@electron/remote"
import { fileSystemMenu } from "@/api/NavBar/menu"
import { ref } from "vue"
let filesystem = ref<HTMLElement | null>()

let menu = new Menu()
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
