<template>
  <div id="app">
    <tab-bar></tab-bar>
  </div>
</template>

<script setup lang="ts">
import TabBar from './views/TabBar.vue'
</script>

<style scoped>
#app {
  display: flex;
  flex-direction: row;
}
</style>
