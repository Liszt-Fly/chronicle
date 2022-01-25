<script setup lang="ts">
import { tabBarItems, display, files } from "../composables/config"
import TabItem from "../components/TabItem.vue"
</script>

<template>
	<div class="tab-system">
		<div class="tab-bar" v-if="display">
			<template v-for="tabItem in tabBarItems">
				<tab-item :class-name="tabItem.icon" :func="tabItem.func" :to="tabItem.to"></tab-item>
			</template>
		</div>
		<div class="extendedPanel">
			<router-view></router-view>
		</div>
	</div>
</template>

<style lang="scss">
.tab-system {
	display: flex;
	flex-direction: row;
	height: 100vh;
}
.tab-bar {
	width: 5vw;
	height: 100vh;
	background-color: #1f1f1f;
	color: white;
	display: flex;
	flex-direction: column;
	align-items: center;
	// justify-content: space-evenly;
	a {
		text-decoration: none;
	}
}

.tab-item {
	padding: 6px;
}

.extendedPanel {
	width: 18vw;
	height: 100vh;
	background-color: #252525;
	color: #ddd;
	overflow: auto;
}
</style>
