<script setup lang="ts">
import TabBar from '@/views/TabBar.vue'
</script>

<template>
  <div id="main">
    <tab-bar></tab-bar>
    <router-view></router-view>
  </div>
</template>

<style >
#main {
  display: flex;
  flex-direction: row;
  height: 100vh;
}
</style>
