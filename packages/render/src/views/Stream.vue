<script setup lang="ts">
import { onMounted } from "vue";
import Card from "@/components/Stream/Card.vue";
import { qFile } from "@/interfaces/type";
import { chronicleUserPath } from "@/api/init";
import fs from "fs-extra";
import path from "path";
let storage: qFile[] = [];
let filestorage: qFile[] = [];
onMounted(() => { });
function forEachWithNoChildren(Apath: string, storage: qFile[]) {
  let list = fs.readdirSync(Apath);
  if (list.length == 0) return;
  for (const item of list) {
    let file = fs.statSync(path.resolve(Apath, item));
    if (file.isFile()) {
      storage.push({ name: item, path: path.resolve(Apath, item), createdDate: file.birthtime, lastUpdateDate: file.mtime });
    } else {
      forEachWithNoChildren(path.resolve(Apath, item), storage);
    }
  }
}
forEachWithNoChildren(path.resolve(chronicleUserPath, "assets"), storage);
storage.forEach((item) => {
  if (!item.children) {
    if (item.name.startsWith(".")) {
      return;
    }
    filestorage.push(item);
  }
});

onMounted(() => { });
</script>

<template>
  <div class="stream">
    <el-row :gutter="30" style="width: 100%">
      <template v-for="file in filestorage">
        <el-col :span="8" :xs="12" :md="6" :sm="8" :lg="4">
          <card :file="file"></card>
        </el-col>
      </template>
    </el-row>
  </div>
</template>

<style>
.stream {
  overflow: scroll;
  box-sizing: border-box;
  padding: 15px;
  max-height: calc(100vh - 30px);
  width: calc(100vw - 2.5rem);
  display: flex;
  justify-content: space-around;
}
</style>
