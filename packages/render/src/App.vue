<script setup lang="ts">
import TabBar from "@/components/TabBar.vue";
import ControlBar from "@/components/ControlBar/ControlBar.vue";
import { dialogVisible, fTree, menuDisplay } from "./data/configdb";
import { onMounted, Ref, ref } from "vue";
import Tag from "@/components/FileSystem/Tag.vue";
import { fileTree } from "./api/FileTree/fileTree";
let hideMenu = () => {

  menuDisplay.value = "none";
};
let tags: Ref<String[]> = ref([])
const close = () => {
  console.log(`读入操作的时候${tags.value}`)
  fileTree.currentFileNode.addTag(tags.value as string[])
}

const passTags = (info: String[]) => {
  console.log(`传入的info为:${info}`)
  tags.value = info
}
</script>

<template>
  <ControlBar></ControlBar>
  <div class="main" spellcheck="false" @click="hideMenu">
    <tab-bar></tab-bar>
    <div class=" article">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
  </div>
  <el-dialog v-model="dialogVisible" title="添加标签" width="60%" @close="close">
    <tag @pass-tags="passTags"></tag>
  </el-dialog>
</template>

<style>
.article {
  width: 100%;
}
</style>
