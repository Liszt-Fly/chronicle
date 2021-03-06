<script setup lang="ts">
import { fileTree } from "@/api/FileTree/fileTree";
import { NodeType } from "@/api/FileTree/type";
import { bClickedParent, dialogVisible, fTree } from "@/data/configdb";
import { onMounted, ref, watchEffect } from "vue";
import { currentFile, openFiles } from "@/data/configdb";
import router from "@/router/router";

const props = defineProps({
  dom: Object as () => HTMLElement | null,
});
let isPin = ref("false");
let input = () => {
  props.dom!.contentEditable = "true";
  props.dom!.focus();
  let range = new Range();
  range.setStart(props.dom! as Node, 0);
  range.setEnd(props.dom! as Node, 1);
  document.getSelection()!.removeAllRanges();
  document.getSelection()!.addRange(range);
};
const remove = () => {
  openFiles.value.delete(currentFile.value)
  if (openFiles.value.size != 0) {
    currentFile.value = Array.from(openFiles.value).pop()!;
  } else {
    currentFile.value = ""
  }
  fileTree.currentFileNode.removeSelf();
  router.push("/Editor")
};
const addTags = () => {
  dialogVisible.value = true;
};
const rename = () => {
  input();
};
const substitute = () => {
  fileTree.currentFileNode.substitute();
};
const exportFile = () => { };

const exportDir = () => { };

const addChildren = (t: NodeType) => {
  if (bClickedParent.value) {
    fTree.value!.root.addChildren(t);
  } else {
    fileTree.currentFileNode.addChildren(t);
  }
};
</script>

<template>
  <div class="menu">
    <template v-if="
      (fileTree.currentFileNode && fileTree.currentFileNode.type == NodeType.FOLDER) ||
      bClickedParent
    ">
      <div class="text-item" @click="addChildren(NodeType.FILE)">
        <i class="bi bi-file-earmark-plus"></i>
        <el-divider direction="vertical" />
        <span>{{ $t("editor.menu.add_File") }}</span>
      </div>
      <div class="text-item" @click="addChildren(NodeType.FOLDER)">
        <i class="bi bi-folder-plus"></i>
        <el-divider direction="vertical" />
        <span>{{ $t("editor.menu.add_File") }}</span>
      </div>
    </template>

    <template v-if="!bClickedParent">
      <el-divider v-if="
        fileTree.currentFileNode && fileTree.currentFileNode.type == NodeType.FOLDER
      " />
      <div class="text-item" @click="substitute">
        <i class="bi bi-files"></i>
        <el-divider direction="vertical" />
        <span>{{ $t("editor.menu.duplicate") }}</span>
      </div>
      <div class="text-item" @click="exportFile"
        v-if="fileTree.currentFileNode && fileTree.currentFileNode.type == NodeType.FILE">
        <i class="bi bi-reply" style="transform: rotate(90deg)"></i>
        <el-divider direction="vertical" />
        <span>{{ $t("editor.menu.export_PDF") }}</span>
      </div>
      <div class="text-item" @click="exportDir" v-else>
        <i class="bi bi-reply-all"></i>
        <el-divider direction="vertical" />
        <span>{{ $t("editor.menu.export_all") }}</span>
      </div>
      <div class="text-item" @click="rename">
        <i class="bi bi-input-cursor"></i>
        <el-divider direction="vertical" />
        <span>{{ $t("editor.menu.rename") }}</span>
      </div>
      <div class="text-item" @click="remove">
        <i class="bi bi-trash3"></i>
        <el-divider direction="vertical" />
        <span>{{ $t("editor.menu.move_to_trash") }}</span>
      </div>
    </template>

    <template v-if="!bClickedParent">
      <el-divider />
      <div class="text-item" @click="addTags">
        <template v-if="isPin">
          <i class="bi bi-pin"></i>
          <el-divider direction="vertical" />
          <span>{{ $t("editor.menu.pin") }}</span>
        </template>
        <template v-else>
          <i class="bi bi-pin-angle"></i>
          <el-divider direction="vertical" />
          <span>{{ $t("editor.menu.unpin") }}</span>
        </template>
      </div>
      <div class="text-item" @click="addTags">
        <i class="bi bi-bookmarks"></i>
        <el-divider direction="vertical" />
        <span>{{ $t("editor.menu.add_tags") }}</span>
      </div>
    </template>
  </div>
</template>
<style scoped lang="scss">
:root {
  --el-transition-duration: 0;
}

.menu {
  width: 160px;
  position: fixed;
  z-index: 999;
  padding: 4px;
  border-radius: 4px;
  background-color: var(--el-bg-color);
  box-shadow: var(--el-box-shadow-lighter);

  .bi-reply::before,
  .bi-reply-all::before {
    transform: rotateY(180deg);
  }

  .el-divider--horizontal {
    margin: 4px;
    width: auto;
  }

  .text-item {
    border-radius: 4px;
    font-size: 0.8rem;

    padding: 8px 12px;

    &:hover {
      background-color: var(--el-color-info-light-9);
      cursor: pointer;
    }
  }
}

.dialog {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
