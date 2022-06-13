<script setup lang="ts">
function empty() { }
</script>

<template>
  <div class="tab-system">
    <div class="tab-bar">
      <div class="sub-tab">
        <div class="tab-item" @click="empty" id="editor">
          <router-link :class="{ 'active': $route.path.includes('Editor') }" to="/Editor/Standard.md">
            <i class="bi bi-box-seam"></i>
          </router-link>
        </div>
        <div class="tab-item" @click="empty" id="stream">
          <router-link to="/Stream">
            <i class="bi bi-layout-wtf"></i>
          </router-link>
        </div>
      </div>
      <div class="sub-tab">
        <div class="tab-item" @click="empty" id="home">
          <router-link to="/">
            <i class="bi bi-house-heart"></i>
          </router-link>
        </div>
        <div class="tab-item" @click="empty" id="setting">
          <router-link to="/Setting">
            <i class="bi bi-sliders2"></i>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
