<script setup lang="ts">
const props = defineProps({
	className: {
		type: String,
	},
	func: {
		type: Function,
	},
	to: {
		type: String,
	},
})
const myFunc: Function = props.func!
</script>

<template>
	<div class="tab-item" @click="myFunc()">
		<router-link :class="className" :to="to"></router-link>
	</div>
</template>

