<script setup lang="ts">
import TabBar from '@/views/TabBar.vue'
import Editor from '@/views/Main/Editor.vue';
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
