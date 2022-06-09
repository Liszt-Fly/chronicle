<script setup lang="ts">
import path from "path";
import { getGlobal } from '@electron/remote'
import { defaultFileTreePath, storage } from "@/api/configdb";
import {
    createNote,
    ifSectionExists,
    getFiles,
    writeFileTreeInJSonToStore,
    getFileTreeFromJsonToStore,
} from "@/api/FileSystem/filesystem";
import { chronicleArticlePath, chroniclePath } from "@/api/init";
import FileList from "@/components/FileSystem/FileList.vue";

import { onMounted, ref, onBeforeUnmount } from "vue";
import fsp from "fs-extra";
import { MenuItem, Menu } from "@electron/remote";
let menu = new Menu();
onBeforeUnmount(() => {
    writeFileTreeInJSonToStore(storage.value)
})
onMounted(() => {
    // let arg = getGlobal('sharedObject').data
    // console.log(arg);
    fileSystemMenu.forEach((item) => {
        menu.append(item);
    });
    if (fsp.pathExistsSync(defaultFileTreePath)) {
        storage.value = getFileTreeFromJsonToStore()
        // getGlobal('sharedObject').data = storage.value
        console.log("---------")
        console.log(storage)
    }
    else {
        getFiles(chronicleArticlePath, storage.value)
        console.log("---------")
        console.log(storage)
        writeFileTreeInJSonToStore(storage.value);

    }
    fsp.watch(path.resolve(chronicleArticlePath), { recursive: true }).on("change", () => {
        storage.value = [];
        getFiles(path.resolve(chronicleArticlePath), storage.value);
        console.log("fileTree has updated")
    });
});

const fileSystemMenu = [
    new MenuItem({
        label: "新建随笔",
        click: function () {
            createNote(path.resolve(chroniclePath, "assets"));
        },
    }),
    new MenuItem({
        label: "新建栏目",
        click: function () {
            let index = ifSectionExists(chronicleArticlePath, "section", 1);
            fsp
                .mkdir(path.resolve(chronicleArticlePath, `section${index}`))
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