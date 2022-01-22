<script setup lang="ts">
import { basePath, content } from "@/composables/config"
import fs from "fs"
import path from "path"

import { ref } from "vue"
import { msfile } from "../composables/type"
import { validateFilename } from "../composables/util"

defineProps({
	file: Object as () => msfile,
})
const subfolder = ref<HTMLDivElement | null>(null)
let showSubFolder = (event: MouseEvent, file: msfile) => {
	if (file.isDirectory) {
		if (event) {
			const span = event.target as HTMLSpanElement
			span.classList.toggle("icon-arrow-right")
			span.classList.toggle("icon-arrow_down")
			if (span.classList.contains("icon-arrow_down")) {
				subfolder.value!.style.display = "block"
			} else {
				subfolder.value!.style.display = ""
			}
		}
	} else {
		// content.value = format(fs.readFileSync(path.resolve(basePath.value, file.name!), 'utf-8') as unknown as string)
		console.log(
			fs.readFileSync(
				path.resolve(basePath.value, file.name!)
			) as unknown as string
		)
		content.value = fs.readFileSync(
			path.resolve(basePath.value, file.name!)
		) as unknown as string
	}
}
</script>

<template>
	<div class="folder" v-if="file">
		<div class="item">
			<span
				:class="[
					'iconfont',
					{ 'icon-arrow-right': file.isDirectory },
					{ 'bi bi-cloud-fog2': !file.isDirectory },
					'file-name',
				]"
				@click="showSubFolder($event, file!)"
				>&nbsp {{ validateFilename(file.name!) }}</span
			>
		</div>

		<div
			class="subfolder"
			v-if="file.children && file.children.length > 0"
			ref="subfolder"
		>
			<file-list
				:files="file.children"
				v-for="file in file.children"
				:file="file"
			></file-list>
		</div>
	</div>
</template>

<style scped lang="scss">
.folder {
	width: 18vw;
	white-space: nowrap;
	overflow-x: hidden;
	overflow-y: scroll;
	display: block;
}

.item {
	&:hover {
		background-color: #343434;
		cursor: pointer;
	}
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
