<template>
  <el-card class="box-card" shadow="never">
    <h3>{{ removeExtName(file!.name) }}</h3>
    <el-divider></el-divider>
    <div v-text="readFile()"></div>
  </el-card>
</template>

<script lang="ts" setup>
import { qFile } from "@/interfaces/type";
import { onMounted } from "vue";
import fsp from "fs-extra";
import { removeExtName } from "@/api/FileSystem/filesystem";
const props = defineProps({
  file: Object as () => qFile,
});
function readFile() {
  let content = fsp.readFileSync(props.file!.path, { encoding: "utf-8" });
  return content;
}
</script>

<style lang="scss" scoped>
.el-card {
  padding: 12px;
  margin: 12px;

  &:hover {
    overflow-y: auto;
    box-shadow: rgb(15 0 0 / 10%) 0px 0px 0px 4px;
  }
}
</style>
