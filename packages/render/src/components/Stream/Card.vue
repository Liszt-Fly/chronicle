<template>
  <el-card class="box-card" shadow="never">
    <div class="info">
      <div class="fileName"> {{ removeExtName(file!.name) }} </div>
      <div class="tags">
        <el-row>
          <template v-for="t in ['汉语文学', '计算机系统结构', '算法导论', '全球史观']" :key="t">
            <el-tag size="small" effect="dark">{{ t }}</el-tag>
          </template>
        </el-row>
      </div>
    </div>
    <div class="mask" @click="openFile">
      <div v-html="readFile()" class="thumbnail"></div>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import { marked } from 'marked';
import { qFile } from "@/interfaces/type";
import fsp from "fs-extra";
import { removeExtName } from "@/api/FileSystem/filesystem";
import path from "path"
import router from '@/router/router';
import { chronicleUserPath } from '@/api/init'

const props = defineProps({
  file: Object as () => qFile,
});

function readFile() {
  let thumbnail = fsp.readFileSync(props.file!.path, { encoding: "utf-8" });
  thumbnail = marked.parse(thumbnail);
  return thumbnail;
}

let openFile = () => {
  console.log(`/Editor/${path.relative(path.join(chronicleUserPath, "assets"), props.file!.path).replaceAll("\\", "/")}`)
  router.push(`/Editor/${path.relative(path.join(chronicleUserPath, "assets"), props.file!.path).replaceAll("\\", "/")}`)
}
</script>

<style lang="scss" scoped>
.el-card {
  padding: 8px;
  margin: 12px;
  width: 150px;
  height: 200px;
  min-height: 200px;
  --el-card-padding: 12px;
  --el-font-size-base: 0.8rem;
  position: relative;

  .info {
    .fileName {
      color: var(--chronicle-theme-color);
      font-weight: 900;
      font-size: 1.4rem;
    }

    .tags {
      position: absolute;
      top: 0;
      left: 0;
      width: calc(100% - 20px);
      height: calc(100% - 20px);
      display: flex;
      align-items: flex-end;
      padding: 10px;

      .el-row {
        margin: 0 auto;
      }

      .el-tag--small {
        margin: 2px;
      }
    }
  }

  .mask {
    display: none;
    user-select: none;
    cursor: pointer;
  }

  &:hover {
    box-shadow: var(--chronicle-theme-color) 0px 0px 0px 4px;

    .info {
      display: none
    }

    .mask {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      .thumbnail {
        width: 80%;
        font-size: 0.4rem;
        overflow-x: hidden;
        text-overflow: clip;
        white-space: nowrap;
        margin: 10%
      }
    }
  }
}
</style>
