<script setup lang="ts">
import { files } from "../composables/config"
import FileList from "@/components/FileList.vue"
import { Menu, MenuItem, getCurrentWindow } from "@electron/remote"

//右键餐单
const menu = new Menu()
menu.append(
	new MenuItem({
		label: "create note",
		click: function () {
			console.log("notes created!")
		},
	})
)
// menu.append(new MenuItem({ type: "separator" })) //分割线
menu.append(new MenuItem({ label: "delete note" }))
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

window.addEventListener(
	"contextmenu",
	(e) => {
		e.preventDefault()
		menu.popup({ window: getCurrentWindow() })
	},
	false
)
</script>

<template>
	<div class="file-system">
		<template v-for="file in files">
			<file-list :file="file"></file-list>
		</template>
	</div>
</template>

<style></style>
