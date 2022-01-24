<script setup lang="ts">
import { basePath, files } from "../composables/config"
import FileList from "@/components/FileList.vue"

import { onMounted, ref } from "vue"
</script>

<template>
	<div class="file-system" ref="filesystem">
		<template v-for="file in files">
			<file-list :file="file"></file-list>
		</template>
	</div>
</template>

<style></style>
