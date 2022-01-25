<script setup lang="ts">
import TabBar from './views/TabBar.vue'
import Editor from './views/Editor.vue';
</script>

<template>
  <div id="app">
    <tab-bar></tab-bar>
    <editor></editor>
  </div>
</template>

<style >
#app {
  display: flex;
  flex-direction: row;
}
</style>
