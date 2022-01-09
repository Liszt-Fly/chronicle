<template>
	<div class="tab-bar" v-if="display">
		<template v-for="tabItem in tabBarItems">
			<tab-item :class-name="tabItem.icon" :func="tabItem.func" :to="tabItem.to"></tab-item>
		</template>
	</div>
	<router-view></router-view>
</template>

<script setup lang="ts">
import { tabBarItems, display, files } from "../composables/config"
import TabItem from "../components/TabItem.vue"
import FileList from "@/components/FileList.vue"
</script>

<style scoped lang="scss">
.tab-bar {
	width: 5vw;
	height: 100vh;
	background-color: #1f1f1f;
	color: white;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;
}
.file-system {
	width: 18vw;
	height: 100vh;
	background-color: #252525;
	color: #ddd;
}
</style>
