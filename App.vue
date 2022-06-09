<script setup lang="ts">
import TabBar from "@/views/TabBar.vue";
</script>

<template>
  <div class="button-container">Chronicle</div>
  <div id="main" spellcheck="false">
    <tab-bar></tab-bar>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<style>
#main {
  display: flex;
  flex-direction: row;
  height: calc(100vh - 30px);
}

.button-container {
  height: 30px;
  font-family: "Chalkboard SE";
  user-select: none;
  app-region: drag;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>