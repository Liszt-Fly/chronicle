<script setup lang="ts">
import { onMounted, ref, watch, watchEffect, } from "vue";
import fsp from "fs-extra";
import path from "path";
import { currentFile } from "@/api/configdb";
import FileSystem from "@/components/FileSystem.vue";
import Vditor from "vditor";

import "vditor/dist/index.css";

import { vditorTheme } from "@/api/init";

let editor = ref<HTMLElement | null>();
let vditor: Vditor | null = null;
//存储文章
function save(event: KeyboardEvent) {
  if (event.keyCode == 83) {
    console.log(vditor!.getValue());
    fsp.writeFileSync(currentFile.value, vditor!.getValue());
    console.log("保存成功");
  }
}

const loadArticle = () => {
  let content = fsp.readFileSync(path.resolve(currentFile.value), { encoding: "utf-8" });
  editor.value!.innerText = content;
};


onMounted(() => {


  vditor = new Vditor("vditor", {

    counter: {
      "enable": true,
      after: (len) => {
      }
    },
    preview: {
      markdown: {
        sanitize: false,
        mark: false,
      },
    },
    cache: {
      enable: false,
    },
    toolbarConfig: {
      hide: true,
      pin: false,
    },
    after: () => {

    },
  });

  watchEffect(() => {

    if (currentFile.value != "") {
      console.log();
      loadArticle();
      vditor = new Vditor("vditor", {
        cache: {
          enable: false,
        },
        toolbarConfig: {
          hide: true,
          pin: false,
        },
      });
    }
  });
});
</script>

<template>
  <div class="column">
    <div class="column-left">
      <!-- 中间调整大小 -->
      <div class="resize-bar"></div>
      <div class="resize-line"></div>
      <!-- 左侧文件系统 -->
      <div class="resize-save">
        <FileSystem></FileSystem>
      </div>
    </div>
    <div class="column-right">
      <!-- 右侧 editor -->
      <el-scrollbar>
        <div class="editor" id="vditor" ref="editor" @keydown.ctrl="save"></div>
      </el-scrollbar>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.column {
  overflow: hidden;
  height: 100%;
}

.column-left {
  position: relative;
  float: left;
  height: calc(100vh - 40px);
}

.column-right {
  overflow: hidden;
  height: calc(100vh - 40px);

}

.resize-save {
  position: absolute;
  top: 0;
  right: 8px;
  bottom: 0;
  left: 0;
  overflow-x: hidden;
  height: 100vh;
}

.resize-bar {
  height: inherit;
  resize: horizontal;
  cursor: ew-resize;
  cursor: col-resize;
  opacity: 0;
  overflow: scroll;
  max-width: 80vw;
  min-width: 120px;
}

/* 拖拽线 */
.resize-line {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  pointer-events: none;
}

.resize-bar::-webkit-scrollbar {
  width: 200px;
  height: inherit;
}
</style>
<style lang="scss" >
.vditor-toolbar {
  display: none !important;
}

.vditor,
.vditor-reset {
  --textarea-background-color: --el-bg-color;
  font-family: var(--chronicle-global-en-font), var(--chronicle-global-cn-font);
  margin: 0;
  padding: 0;
  border: none;
  overflow: hidden;

  &:hover {
    overflow-y: auto;
  }
}

.vditor-reset pre>code {
  font-family: var(--chronicle-code-font);
}
</style>
