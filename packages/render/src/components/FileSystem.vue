<script setup lang="ts">
import path from "path";
import { fileTree } from "@/api/configdb";
import {
  constructFileTree,
} from "@/api/FileSystem/filesystem";
import { chronicleUserPath } from "@/api/init";
import FileList from "@/components/FileSystem/FileList.vue";
// import { Menu, MenuItem } from "@electron/remote/";
import { onMounted, ref } from "vue";
import { fileNode } from "@/FileTree/fileNode";
import { NodeType } from "@/FileTree/type";
import Menu from "@/components/Menu.vue";
let menuDisplay = ref(false)
let menuX = ref(0)
let menuY = ref(0)
let showMenu = (e: MouseEvent) => {
  let target: HTMLElement = e.target as HTMLElement;
  if (target.classList[0] as string !== "item" && target.classList[0] as string !== "file-system")
    target = target.parentElement as HTMLElement;
  console.log(target);
  menuDisplay.value = false
  setTimeout(() => {
    menuDisplay.value = true
    const height = document.body.clientHeight;
    const width = document.body.clientWidth;
    // width is 150, but there is box-shadowing, so ~172
    if (e.clientX + 172 < width) menuX.value = e.clientX;
    else menuX.value = width - 172;
    // height is ~160, padding top & bottom is 10
    if (e.clientY + 160 < height) menuY.value = e.clientY - 10;
    else menuY.value = e.clientY - 170;
  }, 0)
}
let hideMenu = () => {
  menuDisplay.value = false
}
// let menu = new Menu();

onMounted(() => {

  // fileSystemMenu.forEach((item) => {
  //   menu.append(item);
  // });

  fileTree.value = new fileNode(path.resolve(chronicleUserPath, "assets"), "assets")
  console.log(fileTree.value)
  constructFileTree(path.resolve(chronicleUserPath, "assets"), fileTree.value)
  // fsp.watch(path.resolve(chronicleUserPath, "assets"), { recursive: true }).on("change", () => {
  // });
});

// const fileSystemMenu = [
//   new MenuItem({
//     label: "新建文件",
//     click: function () {
//       fileTree.value!.addChildren(NodeType.FILE)
//     },
//   }),
//   new MenuItem({
//     label: "新建文件夹",
//     click: function () {
//       fileTree.value!.addChildren(NodeType.DIR)
//     },
//   }),
// ];

// const popMenu = (event: MouseEvent) => {
//   menu.popup();
// };
</script>
<template>
  <!-- @contextmenu.stop="popMenu($event)" -->
  <div class="file-system" ref="filesystem" @contextmenu="showMenu($event)" @click="hideMenu">
    <template v-for="file in fileTree?.children" :key="file.path">
      <file-list :file="file"></file-list>
    </template>
    <template v-if="menuDisplay">
      <Menu :style="{ top: menuY + 'px', left: menuX + 'px' }" @click="hideMenu"></Menu>
    </template>
  </div>
</template>
