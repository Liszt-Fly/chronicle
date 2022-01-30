<script setup lang="ts">
import TabBar from '@/views/TabBar.vue'
</script>

<template>
  <div id="main">
    <tab-bar></tab-bar>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<style >
#main {
  display: flex;
  flex-direction: row;
  height: 100vh;
}
</style>
