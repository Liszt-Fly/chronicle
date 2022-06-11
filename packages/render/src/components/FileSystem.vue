<script setup lang="ts">
import path from "path";
import { fileTree } from "@/api/configdb";
import {
  constructFileTree,
} from "@/api/FileSystem/filesystem";
import { chronicleUserPath } from "@/api/init";
import FileList from "@/components/FileSystem/FileList.vue";
import { Menu, MenuItem } from "@electron/remote/";
import { onMounted } from "vue";
import { fileNode } from "@/FileTree/fileNode";
import { NodeType } from "@/FileTree/type";
let menu = new Menu();

onMounted(() => {

  fileSystemMenu.forEach((item) => {
    menu.append(item);
  });

  fileTree.value = new fileNode(path.resolve(chronicleUserPath, "assets"), "assets")
  console.log(fileTree.value)
  constructFileTree(path.resolve(chronicleUserPath, "assets"), fileTree.value)
  // fsp.watch(path.resolve(chronicleUserPath, "assets"), { recursive: true }).on("change", () => {
  // });
});

const fileSystemMenu = [
  new MenuItem({
    label: "新建文件",
    click: function () {
      fileTree.value!.addChildren(NodeType.FILE)
    },
  }),
  new MenuItem({
    label: "新建文件夹",
    click: function () {
      fileTree.value!.addChildren(NodeType.DIR)
    },
  }),
];

const popMenu = (event: MouseEvent) => {
  menu.popup();
};
</script>
<template>
  <div class="file-system" ref="filesystem" @contextmenu.stop="popMenu($event)">
    <template v-for="file in fileTree?.children" :key="file.path">
      <file-list :file="file"></file-list>
    </template>
  </div>
</template>
