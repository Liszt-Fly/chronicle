<script setup lang="ts">
import TabBar from "@/components/TabBar.vue";
import ControlBar from "@/components/ControlBar.vue";
import { menuDisplay } from "./data/configdb";
let hideMenu = () => {

  menuDisplay.value = "none";
};
</script>

<template>
  <ControlBar></ControlBar>
  <div class="main" spellcheck="false" @click="hideMenu">
    <tab-bar></tab-bar>
    <div class=" article">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
  </div>
</template>

<style>
.article {
  width: 100%;
}
</style>
