<script setup lang="ts">
import path from "path";
import { bClickedParent, fTree } from "@/api/configdb";
import {
  constructFileTree,
} from "@/api/FileSystem/filesystem";
import { chronicleUserPath } from "@/api/init";
import FileList from "@/components/FileSystem/FileList.vue";
// import { Menu, MenuItem } from "@electron/remote/";
import { fileTree } from "@/FileTree/fileTree"
import { onMounted, ref } from "vue";
import { fileNode } from "@/FileTree/fileNode";
import Menu from "@/components/Menu.vue";
let menuDisplay = ref("none")
let menuX = ref(0)
let menuY = ref(0)

let showParentMenu = (e: MouseEvent) => {
  bClickedParent.value = true
  console.log(bClickedParent.value)
  menuDisplay.value = "none"
  setTimeout(() => {
    menuDisplay.value = "block"
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

let showMenu = (e: MouseEvent) => {
  bClickedParent.value = false
  console.log(bClickedParent.value)
  menuDisplay.value = "none"
  setTimeout(() => {
    menuDisplay.value = "block"
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
  menuDisplay.value = "none"
}


onMounted(() => {
  fTree.value = new fileTree(new fileNode(path.resolve(chronicleUserPath, "assets"), "assets"))

  // fileTree.value =
  // constructFileTree(path.resolve(chronicleUserPath, "assets"), fileTree.value)
  // fsp.watch(path.resolve(chronicleUserPath, "assets"), { recursive: true }).on("change", () => {
  // });
});


</script>
<template>
  <div class="file-system" ref="filesystem" @click="hideMenu" @contextmenu.capture="showParentMenu($event)">
    <el-scrollbar height="calc(100vh - 60px)">
      <template v-for="file in fTree?.tree.children" :key="file.path">
        <file-list :file="file" @contextmenu.stop="showMenu($event)">
        </file-list>

      </template>
    </el-scrollbar>
    <Menu :style="{
      display: menuDisplay, top: menuY + 'px', left: menuX + 'px'
    }" @click="hideMenu()"></Menu>
  </div>
</template>
