<script setup lang="ts">
import { tabBarItems, display, files } from "../api/config"
import TabItem from "../components/Navbar/TabItem.vue"
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
