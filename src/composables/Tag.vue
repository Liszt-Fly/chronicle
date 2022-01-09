<script setup lang="ts">
import { getRandomColor } from "@/composables/config"
</script>

<template>
	<div
		:style="{ backgroundColor: getRandomColor(), color: '#ddd' }"
		class="tag"
	>
		<slot></slot>
	</div>
</template>

<style scoped>
.tag {
	padding: 0px 8px;
	font-size: 15px;
	width: 18vw;
	text-align: center;
}
</style>
