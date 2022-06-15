<script setup lang="ts">
import TabBar from "@/components/TabBar.vue";
import Control from "@/components/Control.vue";
import { menuDisplay } from "./data/configdb";
let hideMenu = () => {

  menuDisplay.value = "none";
};
</script>

<template>
  <Control></Control>
  <div class="main" spellcheck="false" @click="hideMenu">
    <tab-bar></tab-bar>
    <div class=" article">
      <router-view></router-view>
    </div>
  </div>
</template>

<style>
.article {
  width: 100%;
}
</style>
