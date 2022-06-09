<template>
  <div class="card">
    <h3>{{ removeExtName(file!.name) }}</h3>
    <el-divider></el-divider>
    <div v-html="readFile()"></div>
  </div>
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
.card {
  height: 200px;
  overflow: hidden;

  &:hover {
    overflow-y: auto;
  }

  box-shadow: rgba(15, 15, 15, 0.1) 0px 0px 0px 1px,
  rgba(15, 15, 15, 0.1) 0px 2px 4px;

  h3 {
    text-align: center;
  }

  margin: 0 auto;
  color: #666;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: solid 1px #ddd;

  div {
    font-size: 0.8rem;
  }
}
</style>
