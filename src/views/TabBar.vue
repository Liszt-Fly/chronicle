<script setup lang="ts">
import { files } from "@/api/configdb";
import { sortFileInDepth } from "@/api/Editor/FileSystem/util";
import { chroniclePath } from "@/api/init"
import { onMounted } from "vue"

onMounted(() => {
	openRepository()
})

function openRepository() {
	files.value = []
	let path = chroniclePath + "/assets"
	sortFileInDepth(path, files.value)

	// let path = dialog.showOpenDialogSync({ properties: ["openDirectory"] })
	// if (path) {
	// 	sortFileInDepth(path[0], files.value)
	// }
	// else {
	// 	alert("Please choose a folder as  Reponsitory ")
	// }
}

function empty() { }

</script>

<template>
	<div class="tab-system">
		<div class="tab-bar">
			<div class="sub-tab">
				<div class="tab-item" @click="openRepository" id="folder">
					<router-link to="/editor">
						<i class="bi bi-archive"></i>
					</router-link>
				</div>
				<div class="tab-item" @click="empty" id="search">
					<router-link to="/search">
						<i class="bi bi-search"></i>
					</router-link>
				</div>
				<div class="tab-item" @click="empty" id="tag">
					<router-link to="/tag">
						<i class="bi bi-bookmark-heart"></i>
					</router-link>
				</div>
				<div class="tab-item" @click="empty" id="timeline">
					<router-link to="/timeline">
						<i class="bi bi-calendar-event"></i>
					</router-link>
				</div>
			</div>
			<div class="tab-item" @click="empty" id="setting">
				<router-link to="/setting">
					<i class="bi bi-gear-wide-connected"></i>
				</router-link>
			</div>
		</div>
	</div>
</template>
