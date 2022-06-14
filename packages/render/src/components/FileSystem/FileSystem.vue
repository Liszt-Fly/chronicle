<script setup lang="ts">
import path from "path";
import { bClickedParent, fTree } from "@/data/configdb";
import { chronicleUserPath } from "@/api/init";
import FileList from "@/components/FileSystem/FileList.vue";
import { fileTree } from "@/api/FileTree/fileTree";
import { computed, onMounted, Ref, ref } from "vue";
import { fileNode } from "@/api/FileTree/fileNode";
import fsp from "fs-extra"
import Menu from "@/components/FileSystem/Menu.vue";
let targetDom: Ref<null | HTMLElement> = ref(null);
let menuDisplay = ref("none");
let menuX = ref(0);
let menuY = ref(0);

let showParentMenu = (e: MouseEvent) => {
  bClickedParent.value = true;
  menuDisplay.value = "hidden";
  setTimeout(() => {
    menuDisplay.value = "block";
    const height = document.body.clientHeight;
    // FIXME:
    let menuHeight = 80;

    menuX.value = e.clientX;

    if (e.clientY + menuHeight < height) menuY.value = e.clientY;
    else menuY.value = e.clientY - menuHeight;
  }, 0);
};

const getTargetNode = (node: HTMLElement): HTMLElement => {
  // console.log(`处理前:${node.tagName}`)
  console.log(node == null)
  if (node.tagName == "I") {
    console.log(node.parentElement?.querySelector("span"))
    node = (node.parentElement?.querySelector("span")) as unknown as any
  }
  else if (node.tagName == "DIV") {
    node = node.querySelector("span")!
  }
  console.log(`处理后:${node.tagName}`)
  return node
}
let showMenu = (e: MouseEvent) => {

  targetDom.value = getTargetNode(e.target as HTMLElement)
  console.log(targetDom.value)
  bClickedParent.value = false;
  menuDisplay.value = "hidden";
  setTimeout(() => {
    menuDisplay.value = "block";
    const height = document.body.clientHeight;
    //@ts-ignore
    let menuHeight = document.getElementsByClassName("menu")[0].offsetHeight;

    menuX.value = e.clientX;

    if (e.clientY + menuHeight < height) menuY.value = e.clientY;
    else menuY.value = e.clientY - menuHeight;
  }, 0);
};
let hideMenu = () => {
  menuDisplay.value = "none";
};
const drop = (event: DragEvent) => {
  let filepath = event.dataTransfer?.getData("path") as string
  if (filepath == fTree.value!.root.path) return
  console.log(event.target)
  let target = event.target as HTMLElement
  if (!target.classList.contains("item")) {
    let folder = fTree.value!.root

    //* 寻找节点
    let node = fTree.value?.getNode(filepath, fTree.value.root)!
    fsp.copySync(node.path, path.resolve(folder.path, node.name))

    //* 节点操作
    let generatedNode = new fileNode(path.resolve(folder.path, node.name), node.name)
    generatedNode.parent = folder
    folder.children!.push(generatedNode)
    node.removeSelf()

  }
}
onMounted(() => {
  fTree.value = new fileTree(
    new fileNode(path.resolve(chronicleUserPath, "assets"), "assets")
  );
});
</script>
<template>
  <div class="file-system" ref="filesystem" @click="hideMenu" @contextmenu.capture="showParentMenu($event)"
    @dragover.prevent @drop="drop($event)">
    <el-scrollbar height="calc(100vh - var(--brand-height))">
      <template v-for="file in fTree?.tree.children" :key="file.path">
        <file-list :file="file" @contextmenu.stop="showMenu($event)"> </file-list>
      </template>
    </el-scrollbar>
    <Menu :style="{
      display: menuDisplay,
      top: menuY + 'px',
      left: menuX + 'px',
    }" @click="hideMenu()" :dom="targetDom"></Menu>
  </div>
</template>
