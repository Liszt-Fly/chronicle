<script setup lang="ts">
import { display, files } from "@/api/config"
import { dialog } from "@electron/remote"
import { sortFileInDepth } from "@/api/NavBar/FileSystem/util"

function chooseFile() {
	files.value = []
	let path = dialog.showOpenDialogSync({ properties: ["openDirectory"] })
	if (path) {
		sortFileInDepth(path[0], files.value)
		console.log(files.value)
	}
}

function empty() {}

let tabBarItems = [
	{
		item: "folder",
		icon: "bi bi-archive",
		func: chooseFile,
		to: "/file-editor",
	},
	{ item: "tag", icon: "bi bi-bookmark-heart", func: empty, to: "/tag" },
	{ item: "search", icon: "bi bi-search", func: empty, to: "/search" },
	{ item: "setting", icon: "bi bi-sliders", func: empty, to: "/setting" },
]
</script>

<template>
	<div class="tab-system">
		<div class="tab-bar" v-if="display">
			<template v-for="tabItem in tabBarItems">
				<div class="tab-item" @click="tabItem.func()">
					<router-link :class="tabItem.icon" :to="tabItem.to"></router-link>
				</div>
			</template>
		</div>
		<div class="extendedPanel">
			<router-view></router-view>
		</div>
	</div>
</template>
