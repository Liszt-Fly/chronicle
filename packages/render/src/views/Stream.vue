<script setup lang="ts">
import { onMounted } from "vue";
import Paper from "@/components/Stream/Paper.vue";
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
  <el-scrollbar>
    <div class="stream">
      <el-row :gutter="30">
        <template v-for="file in filestorage">
          <el-col :span="8" :xs="12" :md="6" :sm="8" :lg="5">
            <Paper :file="file"></Paper>
          </el-col>
        </template>
      </el-row>
    </div>
  </el-scrollbar>
</template>

<style>
.stream {
  box-sizing: border-box;
  padding: 15px;
}
</style>
