<script setup lang="ts">
import { SettingPage } from "@/data/configdb"
</script>

<template>
  <div class="tab-system">
    <div class="tab-bar">
      <div class="sub-tab">
        <el-tooltip :content="$t('tab.repository')" placement="right" effect="customized">
          <div class="tab-item" id="editor">
            <router-link :class="{ 'active': $route.path.includes('Editor') }" to="/Editor">
              <i class="bi bi-box2"></i>
            </router-link>
          </div>
        </el-tooltip>
        <el-tooltip :content="$t('tab.jotting')" placement="right" effect="customized">
          <div class="tab-item" id="jotting">
            <router-link to="/Jotting">
              <i class="bi bi-card-heading" style="transform: scaleY(1.1); display: inherit;"></i>
            </router-link>
          </div>
        </el-tooltip>
        <el-tooltip :content="$t('tab.stream')" placement="right" effect="customized">
          <div class="tab-item" id="stream">
            <router-link to="/Stream">
              <i class="bi bi-kanban"></i>
            </router-link>
          </div>
        </el-tooltip>
        <el-tooltip :content="$t('tab.security')" placement="right" effect="customized">
          <div class="tab-item" id="stream">
            <router-link to="/Security">
              <i class="bi bi-safe2"></i>
            </router-link>
          </div>
        </el-tooltip>
      </div>
      <div class="sub-tab">
        <el-tooltip :content="$t('tab.trash')" placement="right" effect="customized">
          <div class="tab-item" id="trash">
            <router-link to="/Trash">
              <i class="bi bi-trash3"></i>
            </router-link>
          </div>
        </el-tooltip>
        <el-tooltip :content="$t('tab.workspace')" placement="right" effect="customized">
          <div class="tab-item" id="workspace">
            <router-link to="/WorkSpace">
              <i class="bi bi-collection"></i>
            </router-link>
          </div>
        </el-tooltip>
        <el-tooltip :content="$t('tab.setting')" placement="right" effect="customized">
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