<script setup lang="ts">
import { Menu, MenuItem } from "@electron/remote";
import { useRouter } from 'vue-router'
import { } from "@/interfaces/type";
import path from "path";
import {
  validateFilename,
} from "@/api/FileSystem/filesystem";
import { cTagContainer, currentFile } from "@/api/configdb";
import {
} from "@/api/FileSystem/filesystem";
import { chronicleUserPath } from "@/api/init";
import { ElMessage, ElMessageBox } from "element-plus";
import { onMounted, reactive, ref } from "vue";
import { fileNode } from "@/FileTree/fileNode";
import { NodeType } from "@/FileTree/type";

const props = defineProps({
  file: Object as () => fileNode,
});
const router = useRouter()
let subfolder = ref<HTMLDivElement | null>(null);
let refSubfolder = reactive({ dom: subfolder });
let namebox = ref<HTMLSpanElement | null>(null);
const fileDom = ref<HTMLElement | null>(null);
function openFile(event: MouseEvent, file: fileNode) {
  //如果是文件
  if (!file.children) {
    currentFile.value = props.file!.path!;
    let params = path.relative(path.resolve(chronicleUserPath, "assets"), file.path)
    router.push(`/Editor/:${params}`)
  }
}
function renameNote() {
  //启用contentEdible
  namebox.value!.contentEditable = "true";
  namebox.value!.focus();

  let range = new Range();
  range.setStart(namebox.value as Node, 0);
  range.setEnd(namebox.value as Node, 1);
  document.getSelection()!.removeAllRanges();
  document.getSelection()!.addRange(range);
}
function toggleSubfolder(
  event: MouseEvent,
  file: fileNode,
  subfolder: { dom: HTMLElement | null }
) {
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
      props.file!.removeSelf()
    },
  }),
  new MenuItem({
    label: "重命名",
    click: () => {
      renameNote();

    },
  }),
];
if (props.file!.children) {
  let item = new MenuItem({
    label: "添加子文件夹",
    click: () => {
      props.file!.addChildren(NodeType.DIR)
    },
  });

  menuItems.push(
    new MenuItem({
      label: "添加文件",
      click: () => {
        props.file!.addChildren(NodeType.FILE)

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
              type: "info",
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
        { 'icon-folder': file.children },
        { 'icon-018bijiben-2': !file.children },
        'file-name',
        'file-icon',
      ]" @context.stop></span>
      <span :class="['cursor', { 'clicked': props.file!.path == currentFile }]" ref="namebox"
        @blur="props.file!.rename(namebox!.innerText)" @keydown.enter.prevent="enter($event)">{{
            validateFilename(file.name!)
        }}</span>
    </div>
    <div class="subfolder" v-if="file.children" ref="subfolder" id="subfolder">
      <file-list :files="file.children" :file="f" v-for="f in file.children" :key="f.path"></file-list>
    </div>
  </div>
</template>
