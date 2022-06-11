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
    transform: scale(0.5);
    position: relative;
    top: -90px;
    width: 200%;
    left: -50%;
  }

  .el-tag--small {
    margin-right: 4px;
  }
}
</style>
