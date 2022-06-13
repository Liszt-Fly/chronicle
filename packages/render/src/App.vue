<script setup lang="ts">
import TabBar from "@/components/TabBar.vue";
</script>

<template>
  <div class="app-name">
    Chronicle
  </div>
  <div class="main" spellcheck="false">
    <tab-bar></tab-bar>
    <div class="article">
      <router-view></router-view>
    </div>
  </div>
</template>

<style>
.app-name {
  height: 38px;
  font-size: 0.8rem;
  font-weight: 900;
  font-family: "Chalkboard SE";
  user-select: none;
  app-region: drag;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: center;
  /* border-bottom: 2px solid var(--chronicle-theme-color); */
  /* color: white; */
}

.article {
  width: 100%;
  overflow: scroll;
}
</style>
