<script setup lang="ts">
function empty() { }
</script>

<template>
  <div class="tab-system">
    <div class="tab-bar">
      <div class="sub-tab">
        <div class="tab-item" @click="empty" id="archive">
          <router-link to="/Editor/:Standard.md">
            <i class="bi bi-archive"></i>
          </router-link>
        </div>
        <div class="tab-item" @click="empty" id="stream">
          <router-link to="/Stream">
            <i class="bi bi-layout-wtf"></i>
          </router-link>
        </div>
        <div class="tab-item" @click="empty" id="stream">
          <router-link to="/Repositories">
            <i class="bi bi-boxes"></i>
          </router-link>
        </div>
      </div>

      <div class="tab-item" @click="empty" id="setting">
        <router-link to="/Setting">
          <i class="bi bi-tools"></i>
        </router-link>
      </div>

    </div>
  </div>
</template>
