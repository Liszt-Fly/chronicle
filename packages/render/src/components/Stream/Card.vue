<template>
  <el-card class="box-card" shadow="never">
    <div v-html="readFile()" class="content"></div>
    <div class="tags">
      <el-row :gutter="20" justify="space-evenly">
        <el-col :span="6">
          <el-tag size="small" effect="dark">Tag 1</el-tag>
        </el-col>
        <el-col :span="6">
          <el-tag size="small" effect="dark">Tag 1</el-tag>
        </el-col>
        <el-col :span="6">
          <el-tag size="small" effect="dark">Tag 1</el-tag>
        </el-col>
      </el-row>
    </div>
  </el-card>
  <div class="fileName"> {{ removeExtName(file!.name) }} </div>
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
  height: 30vh;
  --el-card-padding: 12px;
  --el-font-size-base: 0.8rem;
  position: relative;

  .tags {
    display: none;
  }

  &:hover {
    box-shadow: var(--el-color-primary) 0px 0px 0px 4px;

    +.fileName {
      color: var(--el-color-primary);
    }

    .tags {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: flex-end;

      .el-row {
        width: 90%;
      }

      .el-tag--small {
        margin: 2px;
      }
    }
  }

  .content {
    width: 100%;
    font-size: 0.4rem;
    overflow-x: hidden;
    text-overflow: clip;
    white-space: nowrap;
  }
}

.fileName {
  text-align: center;
  width: 100%;
  display: inline-block;
}
</style>
