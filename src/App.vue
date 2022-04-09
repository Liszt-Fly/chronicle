<script setup lang="ts">
import TabBar from '@/views/TabBar.vue'
import Path from "path"

import { onMounted } from 'vue';

onMounted(() => {

})
</script>

<template>
  <div id="main" spellcheck="false">
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
