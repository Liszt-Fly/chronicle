<script setup lang="ts">
import TabBar from "@/components/TabBar.vue";
import Control from "@/components/Control.vue";
</script>

<template>
  <div class="title">
    <Control></Control>
  </div>
  <div class="main" spellcheck="false">
    <tab-bar></tab-bar>
    <div class="article">
      <router-view></router-view>
    </div>
  </div>
</template>

<style>
.title {
  height: 38px;
  font-size: 1rem;
  font-weight: 900;
  font-family: "Chalkboard SE";
  user-select: none;
  text-align: left;
}

.article {
  width: 100%;
}
</style>
