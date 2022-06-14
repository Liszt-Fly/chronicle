<script setup lang="ts">
import { SettingPage } from "@/data/configdb"
</script>

<template>
  <div class="tab-system">
    <div class="tab-bar">
      <div class="sub-tab">
        <el-tooltip :content="$t('tab.repository')" placement="right" effect="light">
          <div class="tab-item" id="editor">
            <router-link :class="{ 'active': $route.path.includes('Editor') }" to="/Editor/README.md">
              <i class="bi bi-box-seam"></i>
            </router-link>
          </div>
        </el-tooltip>

        <el-tooltip :content="$t('tab.stream')" placement="right" effect="light">
          <div class="tab-item" id="stream">
            <router-link to="/Stream">
              <i class="bi bi-columns-gap"></i>
            </router-link>
          </div>
        </el-tooltip>
      </div>
      <div class="sub-tab">
        <el-tooltip :content="$t('tab.setting')" placement="right" effect="light">
          <div class="tab-item" id="setting">
            <router-link :to="SettingPage">
              <i class="bi bi-sliders2"></i>
            </router-link>
          </div>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<style>
.router-link-exact-active button {
  background-color: var(--el-fill-color-light);
}
</style>