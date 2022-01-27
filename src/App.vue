<script setup lang="ts">
import TabBar from './views/TabBar.vue'
import Editor from './views/Editor.vue';
</script>

<template>
  <div id="main">
    <tab-bar></tab-bar>
    <editor></editor>
  </div>
</template>

<style >
#main {
  display: flex;
  flex-direction: row;
  height: 100vh;
}
</style>
