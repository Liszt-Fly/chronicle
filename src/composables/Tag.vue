<script setup lang="ts">
import { getRandomColor } from "@/composables/config"
</script>

<template>
	<span
		:style="{ backgroundColor: getRandomColor(), color: '#ddd' }"
		class="tag"
	>
		<slot></slot>
	</span>
</template>

<style>
.tag {
	padding: 0px 8px;
	font-size: 0.7rem;
	text-align: center;
	position: absolute;
	right: 0;
}
</style>
