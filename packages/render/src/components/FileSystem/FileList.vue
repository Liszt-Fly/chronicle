<script setup lang="ts">
import { Menu, MenuItem } from "@electron/remote";
import { useRouter } from 'vue-router'
import { qFile } from "@/interfaces/type";
import fsp from "fs-extra";
import path from "path";
import rmrf from "rimraf";
import {
  validateFilename,
  getFiles,
  writeFileTreeInJSonToStore,
} from "@/api/FileSystem/filesystem";
import { cTagContainer, currentFile, storage } from "@/api/configdb";
import {
  createNote,
  ifNoteNameExists,
  ifSectionExists,
} from "@/api/FileSystem/filesystem";
import { chronicleUserPath } from "@/api/init";
import { ElMessage, ElMessageBox } from "element-plus";
import { onMounted, reactive, ref } from "vue";
const props = defineProps({
  file: Object as () => qFile,
});
const router = useRouter()
let subfolder = ref<HTMLDivElement | null>(null);
let refSubfolder = reactive({ dom: subfolder });
let namebox = ref<HTMLSpanElement | null>(null);
const fileDom = ref<HTMLElement | null>(null);
function openFile(event: MouseEvent, file: qFile) {
  //如果是文件
  if (!file.children) {
    currentFile.value = props.file!.path!;
    let params = path.relative(path.resolve(chronicleUserPath, "assets"), file.path)
    router.push(`/Editor/:${params}`)
  }
}
function renameNote(file: qFile) {
  //启用contentEdible
  namebox.value!.contentEditable = "true";
  namebox.value!.focus();

  let range = new Range();
  console.log(namebox.value!.innerText);
  range.setStart(namebox.value as Node, 0);
  range.setEnd(namebox.value as Node, 1);
  document.getSelection()!.removeAllRanges();
  document.getSelection()!.addRange(range);
}
function toggleSubfolder(
  event: MouseEvent,
  file: qFile,
  subfolder: { dom: HTMLElement | null }
) {
  //如果qFile是directory类型，进行图标转换，以及显隐转换

  if (file.children) {
    if (event) {
      let item = event.currentTarget as HTMLElement;
      let folder = item.firstElementChild!;
      folder.classList.toggle("icon-folder");
      folder.classList.toggle("icon-folder-open");
      if (folder.classList.contains("icon-folder-open")) {
        if (subfolder.dom) {
          subfolder.dom.style.display = "block";
        }
      } else {
        if (subfolder.dom) {
          subfolder.dom.style.display = "";
        }
      }
    }
  }
}
function finishRenameNote(file: qFile) {
  let pathObjcet = path.parse(file.path!);
  pathObjcet.base = namebox.value!.innerText;
  namebox.value!.contentEditable = "false";

  fsp.renameSync(
    props!.file!.path!,
    path.resolve(pathObjcet.dir, namebox.value!.innerText) + pathObjcet.ext
  );
}

function deleteNoteOrSection(file: qFile) {
  if (!file.children) {
    fsp.unlinkSync(file.path!);
  } else {
    rmrf(file.path!, (err) => {
      console.log("err");
    });
  }
  getFiles(path.resolve(chronicleUserPath, "assets"), storage.value);
}

function enter(event: KeyboardEvent) {
  let target = event.target as HTMLDivElement;
  target.blur();
}

// 右键菜单
const menu = new Menu();
const menuItems = [
  new MenuItem({
    label: "删除",
    click: () => {
      deleteNoteOrSection(props.file!);
    },
  }),
  new MenuItem({
    label: "重命名",
    click: () => {
      renameNote(props.file!);
    },
  }),
];
if (props.file!.children) {
  let item = new MenuItem({
    label: "添加子栏目",
    click: () => {
      let index = ifSectionExists(props.file!.path!, "section", 1);
      fsp
        .mkdir(path.resolve(props.file!.path!, `section${index}`))
        .then(() => { })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  menuItems.push(
    new MenuItem({
      label: "添加话题",
      click: () => {
        let index = ifNoteNameExists(props.file!.path!, "undefined", 1);

        createNote(props.file!.path!, `undefined`);

        currentFile.value = path.resolve(props.file!.path!, `undefined${index}.md`);
      },
    })
  );
  menuItems.push(item);
} else {
  menuItems.push(
    new MenuItem({
      label: "添加便签",
      click: () => {
        ElMessageBox.prompt("如果需要添加多个标签，请使用逗号隔开", "Add Tag", {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
        })
          .then(({ value }) => {
            ElMessage({
              type: "success",
              message: `Add Tag:${value}`,
            });
            //将标签存储进tagContainer
            let wordarray: string[] = [];
            if (value.includes(",")) {
              wordarray = value.split(",");
            } else {
              wordarray.push(value);
            }

            cTagContainer.value.push(...wordarray);
            props!.file!.tag = cTagContainer.value;
            writeFileTreeInJSonToStore(storage.value);
          })
          .catch(() => {
            ElMessage({
              type: "info",
              message: "Input canceled",
            });
          });
      },
    })
  );
}

const popMenu = (event: MouseEvent) => {
  menu.popup();
};
onMounted(() => {
  menuItems.forEach((item) => {
    menu.append(item);
  });
});
</script>

<template>
  <div class="folder" v-if="file" ref="fileDom">
    <div class="item" tabindex="1" @click="toggleSubfolder($event, file!, refSubfolder), openFile($event, file!)"
      v-if="validateFilename(file.name!)" @contextmenu.stop="popMenu($event)">
      <span :class="[
        'iconfont',
        { 'iconfont icon-folder': file.children },
        { 'bi bi-filetype-txt': !file.children },
        'file-name',
        'file-icon',
      ]" @context.stop></span>
      <span :class="['cursor', { 'clicked': props.file!.path == currentFile }]" ref="namebox"
        @blur="finishRenameNote(props.file!)" @keydown.enter.prevent="enter($event)">{{
            validateFilename(file.name!)
        }}</span>
    </div>
    <div class="subfolder" v-if="file.children && file.children.length > 0" ref="subfolder" id="subfolder">
      <file-list :files="file.children" :file="f" v-for="f in file.children" :key="f.path"></file-list>
    </div>
  </div>
</template>
