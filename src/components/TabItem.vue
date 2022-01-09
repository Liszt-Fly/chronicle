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
	<div class="tab-item">
		<router-link :class="className" @click="myFunc()" :to="to"></router-link>
	</div>
</template>

<style scoped>
a {
	color: #ddd;
}
</style>
