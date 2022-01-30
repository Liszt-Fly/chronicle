<script setup lang="ts">
import { dialog } from "@electron/remote"
import { display, files } from "@/api/configdb";
import { sortFileInDepth } from "@/api/ExtendedPanel/FileSystem/util";

function openRepository() {
	files.value = []
	let path = dialog.showOpenDialogSync({ properties: ["openDirectory"] })
	if (path) {
		sortFileInDepth(path[0], files.value)
	}
	else {
		alert("Please choose a folder as  Reponsitory ")
	}
}

function empty() { }

let tabBarItems = [
	{ item: "folder", icon: "bi bi-archive", func: openRepository, to: "/editor", },
	{ item: "search", icon: "bi bi-search", func: empty, to: "/search" },
	{ item: "tag", icon: "bi bi-bookmark-heart", func: empty, to: "/tag" },
	{ item: "timeline", icon: "bi bi-calendar-event", func: empty, to: "/timeline" },
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
	</div>
</template>
