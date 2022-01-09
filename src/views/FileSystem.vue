<script setup lang="ts">
import { files } from "../composables/config"
import FileList from "@/components/FileList.vue"
</script>

<template>
	<div class="file-system">
		<template v-for="file in files">
			<file-list :file="file"></file-list>
		</template>
	</div>
</template>

<style scoped></style>
