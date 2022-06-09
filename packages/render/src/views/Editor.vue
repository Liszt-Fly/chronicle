<script setup lang="ts">
import { onMounted, ref, watchEffect, } from "vue";
import fsp from "fs-extra";
import path from "path";
import { currentFile } from "@/api/configdb";
import FileSystem from "@/views/FileSystem.vue";
import Vditor from "vditor";
import "vditor/dist/index.css";
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
      // vditor!.setValue(editor.value!.innerText);
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
      <div class="editor" id="vditor" ref="editor" @keydown.ctrl="save"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.column {
  overflow: hidden;
}

.column-left {
  height: calc(100vh - 30px);
  background-color: #fff;
  position: relative;
  float: left;
}

.column-right {
  overflow: hidden;
  height: calc(100vh - 30px);
}

.resize-save {
  position: absolute;
  top: 0;
  right: 2px;
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
  margin: 0;
  padding: 0;
  border: none;
  background-color: #fff !important;
  overflow: hidden;

  &:hover {
    overflow-y: auto;
  }
}

.vditor-ir {
  height: calc(100vh - 30px);
  background-color: #fff;
}
</style>
