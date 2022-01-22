<script setup lang="ts">
import { basePath, content } from "@/composables/config"
import { toggleSubfolder } from "@/composables/filelist"
import fs from "fs"
import path from "path"

import { onMounted, reactive, ref, watch } from "vue"
import { msfile } from "../composables/type"
import { validateFilename } from "../composables/util"

defineProps({
	file: Object as () => msfile,
})
let subfolder = ref<HTMLDivElement | null>(null)
let refSubfolder = reactive({ dom: subfolder })

const toggleSubfold = toggleSubfolder
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
				@click=" toggleSubfold($event,file!,refSubfolder)"
				>&nbsp {{ validateFilename(file.name!) }}</span
			>
		</div>
		<div
			class="subfolder"
			v-if="file.children && file.children.length > 0"
			ref="subfolder"
			id="subfolder"
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
