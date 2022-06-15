<script setup lang="ts">
import TabBar from "@/components/TabBar.vue";
import Control from "@/components/Control.vue";
</script>

<template>
  <Control></Control>
  <div class="main" spellcheck="false">
    <tab-bar></tab-bar>
    <div class="article">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
  </div>
</template>

<style>
.article {
  width: 100%;
}
</style>
