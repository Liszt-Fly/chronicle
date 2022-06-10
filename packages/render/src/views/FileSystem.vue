<script setup lang="ts">
import path from "path";
import { defaultFileTreePath, storage } from "@/api/configdb";
import {
  createNote,
  ifSectionExists,
  getFiles,
  writeFileTreeInJSonToStore,
  getFileTreeFromJsonToStore,
  constructFileTree,
} from "@/api/FileSystem/filesystem";
import { chronicleUserPath } from "@/api/init";
import FileList from "@/components/FileSystem/FileList.vue";
import { getGlobal, Menu, MenuItem } from "@electron/remote/";
import { onMounted, ref, onBeforeUnmount } from "vue";
import fsp from "fs-extra";
import { fileNode } from "@/FileTree/fileNode";
import { toJSON, fromJSON } from 'flatted'
let menu = new Menu();

onMounted(() => {

  fileSystemMenu.forEach((item) => {
    menu.append(item);
  });
  if (fsp.pathExistsSync(defaultFileTreePath)) {
    storage.value = getFileTreeFromJsonToStore()
  }
  else {
    let root = new fileNode(path.resolve(chronicleUserPath), "assets")
    constructFileTree(path.resolve(chronicleUserPath, "assets"), root)
    console.log(fromJSON(toJSON(root)))
    getFiles(path.resolve(chronicleUserPath, "assets"), storage.value)
    console.log("---------")
    getGlobal("parms").fileTree = storage.value
    writeFileTreeInJSonToStore(storage.value);
  }
  fsp.watch(path.resolve(chronicleUserPath, "assets"), { recursive: true }).on("change", () => {
    storage.value = [];
    getFiles(path.resolve(chronicleUserPath, "assets"), storage.value);
    getGlobal("parms").fileTree = storage.value
    console.log("fileTree has updated")
  });
});

const fileSystemMenu = [
  new MenuItem({
    label: "新建随笔",
    click: function () {
      createNote(path.resolve(chronicleUserPath, "assets"));
    },
  }),
  new MenuItem({
    label: "新建栏目",
    click: function () {
      let index = ifSectionExists(path.resolve(chronicleUserPath, "assets"), "section", 1);
      fsp
        .mkdir(path.resolve(chronicleUserPath, "assets", `section${index}`))
        .then(() => { })
        .catch((err) => {
          console.log(err);
        });
    },
  }),
];

const popMenu = (event: MouseEvent) => {
  menu.popup();
};
</script>
<template>
  <div class="file-system" ref="filesystem" @contextmenu.stop="popMenu($event)">
    <template v-for="file in storage" :key="file.path">
      <file-list :file="file"></file-list>
    </template>
  </div>
</template>
