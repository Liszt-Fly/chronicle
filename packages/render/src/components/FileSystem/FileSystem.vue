<script setup lang="ts">
import path from "path";
import { bClickedParent, fTree } from "@/api/configdb";
import { chronicleUserPath } from "@/api/init";
import FileList from "@/components/FileSystem/FileList.vue";
import { fileTree } from "@/api/FileTree/fileTree"
import { onMounted, ref } from "vue";
import { fileNode } from "@/api/FileTree/fileNode";
import Menu from "@/components/FileSystem/Menu.vue";
let menuDisplay = ref("none")
let menuX = ref(0)
let menuY = ref(0)

let showParentMenu = (e: MouseEvent) => {
  bClickedParent.value = true
  menuDisplay.value = "hidden"
  setTimeout(() => {
    menuDisplay.value = "block"
    const height = document.body.clientHeight;
    // FIXME:
    let menuHeight = 80

    menuX.value = e.clientX

    if (e.clientY + menuHeight < height) menuY.value = e.clientY;
    else menuY.value = e.clientY - menuHeight;
  }, 0)
}

let showMenu = (e: MouseEvent) => {
  bClickedParent.value = false
  menuDisplay.value = "hidden"
  setTimeout(() => {
    menuDisplay.value = "block"
    const height = document.body.clientHeight;
    let menuHeight = document.getElementsByClassName("menu")[0].offsetHeight

    menuX.value = e.clientX

    if (e.clientY + menuHeight < height) menuY.value = e.clientY;
    else menuY.value = e.clientY - menuHeight;
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
    <el-scrollbar height="calc(100vh - var(--is-win))">
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
