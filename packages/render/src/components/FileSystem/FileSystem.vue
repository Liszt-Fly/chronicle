<script setup lang="ts">
import path from "path";
import { bClickedParent, fTree, menuDisplay, currentFile, openFiles } from "@/data/configdb";
import { chronicleUserPath } from "@/api/init";
import FileList from "@/components/FileSystem/FileList.vue";
import { fileTree } from "@/api/FileTree/fileTree";
import { NodeType } from "@/api/FileTree/type";
import { computed, onMounted, Ref, ref } from "vue";
import { fileNode } from "@/api/FileTree/fileNode";
import fsp from "fs-extra"
import Menu from "@/components/Menu/Menu.vue";
import router from "@/router/router";
let targetDom: Ref<null | HTMLElement> = ref(null);

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
  if (node.tagName == "I") {
    console.log(node.parentElement?.querySelector("span"))
    node = (node.parentElement?.querySelector("span")) as unknown as any
  }
  else if (node.tagName == "DIV") {
    node = node.querySelector("span")!
  }
  // console.log(`处理后:${node.tagName}`)
  return node
}

let showMenu = (e: MouseEvent) => {
  targetDom.value = getTargetNode(e.target as HTMLElement)
  // console.log(targetDom.value)
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
  menuDisplay.value = "hidden";
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
  if (!fileTree.currentFileNode) {
    // fileTree.currentFileNode = fTree.value.root.children![0]
  }
});

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
  // dialogVisible.value = true;
};

const rename = () => {
  targetDom!.contentEditable = "true";
  targetDom!.focus();
  let range = new Range();
  range.setStart(targetDom! as Node, 0);
  range.setEnd(targetDom! as Node, 1);
  document.getSelection()!.removeAllRanges();
  document.getSelection()!.addRange(range);
};

const duplicate = () => {
  fileTree.currentFileNode.duplicate();
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

const addFoler = () => { addChildren(NodeType.FOLDER) };

const addFile = () => { addChildren(NodeType.FILE) };

let menu_items = [
  { icon: "bi bi-file-earmark-plus", text: "add_File", func: addFile },
  { icon: "bi bi-folder-plus", text: "add_File", func: addFoler },
  { icon: "bi bi-files", text: "duplicate", func: duplicate },
  { icon: "bi bi-reply", style: "transform: rotate(90deg)", text: "export_PDF", func: exportFile },
  { icon: "bi bi-reply-all", text: "export_all", func: exportDir },
  { icon: "bi bi-input-cursor", text: "rename", func: rename },
  { icon: "bi bi-trash3", text: "move_to_trash", func: remove },
  { icon: "bi bi-pin", text: "pin", func: addTags },
  { icon: "bi bi-bookmarks", text: "add_tags", func: addTags }
]
</script>

<template>
  <div class="file-system" ref="filesystem" @click="hideMenu" @contextmenu.capture="showParentMenu($event)"
    @dragover.prevent @drop="drop($event)">
    <el-scrollbar height="calc(100vh - var(--brand-height))">
      <template v-for="file in fTree?.tree.children" :key="file.path">
        <file-list :file="file" @contextmenu.stop="showMenu($event)"> </file-list>
      </template>
      <div style="padding-bottom: 40px;"></div>
    </el-scrollbar>
    <Menu :style="{
      display: menuDisplay,
      top: menuY + 'px',
      left: menuX + 'px',
    }" @click="hideMenu()" :menu_items="menu_items"></Menu>
  </div>
</template>
