<script setup lang="ts">
import { basePath, files } from "../composables/config"
import FileList from "@/components/FileList.vue"
import { Menu, MenuItem, getCurrentWindow } from "@electron/remote"
import { onMounted, ref } from "vue"
import { createNote, deleteNote } from "@/composables/filesystem"
import { flushFiles, sortFileInDepth } from "@/composables/util"




onMounted(() => {})
</script>

<template>
	<div class="file-system" ref="filesystem">
		<template v-for="file in files">
			<file-list :file="file"></file-list>
		</template>
	</div>
</template>

<style></style>
