<template>
  <el-card class="box-card" shadow="never">
    <template #header>
      <div class="card-header">
        <h3> {{ removeExtName(file!.name) }} </h3>
        <el-row>
          <el-tag effect="plain" size="small">Tag 1</el-tag>
          <el-tag effect="plain" size="small">Tag 2</el-tag>
          <el-tag effect="plain" size="small">Tag 3</el-tag>
        </el-row>
      </div>
    </template>
    <div v-html="readFile()" class="content"></div>
  </el-card>
</template>

<script lang="ts" setup>
import { marked } from 'marked';
import { qFile } from "@/interfaces/type";
import fsp from "fs-extra";
import { removeExtName } from "@/api/FileSystem/filesystem";
const props = defineProps({
  file: Object as () => qFile,
});
function readFile() {
  let content = fsp.readFileSync(props.file!.path, { encoding: "utf-8" });
  content = marked.parse(content);
  // console.log(content);

  return content;
}
</script>

<style lang="scss" scoped>
.el-card {
  padding: 8px;
  margin: 12px;
  height: 40vh;
  --el-card-padding: 12px;
  --el-font-size-base: 0.8rem;

  h3 {
    margin-bottom: 10px;
  }

  &:hover {
    box-shadow: rgb(15 0 0 / 10%) 0px 0px 0px 4px;

  }

  .content {
    width: 100%;
    font-size: 0.4rem;
    overflow-x: hidden;
    text-overflow: clip;
    white-space: nowrap;
  }

  .el-tag--small {
    margin-right: 4px;
  }
}
</style>
