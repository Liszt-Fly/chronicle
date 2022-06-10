<script setup lang="ts">
import TabBar from "@/views/TabBar.vue";
</script>

<template>
  <div class="button-container">Chronicle</div>
  <div class="main" spellcheck="false">
    <tab-bar></tab-bar>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<style>
.button-container {
  height: 40px;
  font-size: 0.8rem;
  font-weight: 900;
  font-family: "Chalkboard SE";
  user-select: none;
  app-region: drag;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
