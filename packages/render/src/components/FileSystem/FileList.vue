<script setup lang="ts">
import { Menu, MenuItem } from "@electron/remote";
import { useRouter } from "vue-router";
import { setCurrentFileNode } from "@/api/util";
import path from "path";
import fsp from "fs-extra"
import { validateFilename } from "@/api/FileSystem/filesystem";
import { bClickedParent, cTagContainer, currentFile, fTree } from "@/data/configdb";
import { } from "@/api/FileSystem/filesystem";
import { chronicleUserPath } from "@/api/init";
import { ElMessage, ElMessageBox } from "element-plus";
import { onMounted, reactive, ref, watchEffect } from "vue";
import { fileNode } from "@/api/FileTree/fileNode";
import { NodeType } from "@/api/FileTree/type";
import { fromJSON, parse, stringify, toJSON } from "flatted"
const props = defineProps({
  file: Object as () => fileNode,
});

const router = useRouter();
let subfolder = ref<HTMLDivElement | null>(null);
let refSubfolder = reactive({ dom: subfolder });
let namebox = ref<HTMLSpanElement | null>(null);
const fileDom = ref<HTMLElement | null>(null);
function openFile(event: MouseEvent, file: fileNode) {
  //如果是文件
  if (!file.children) {
    currentFile.value = props.file!.path!;
    let params = path.relative(path.resolve(chronicleUserPath, "assets"), file.path);
    router.push(`/Editor/${params}`);
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
      folder.classList.toggle("bi-folder");
      folder.classList.toggle("bi-folder2-open");
      if (folder.classList.contains("bi-folder2-open")) {
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
      props.file!.removeSelf();
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
      props.file!.addChildren(NodeType.DIR);
    },
  });
  menuItems.push(
    new MenuItem({
      label: "添加文件",
      click: () => {
        props.file!.addChildren(NodeType.FILE);
      },
    })
  );
  menuItems.push(item);
} else {
  menuItems.push(
    new MenuItem({
      label: "添加话题",
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

onMounted(() => {

});

const drop = (e: DragEvent) => {
  // FIXME: 仅仅检查了自己放置自己的情况，还有一种放置本身区域的情况没有做完
  let filepath = e.dataTransfer?.getData("path") as string

  //* 如果放置的区域就是发送的区域，啥也不做
  if (filepath == props.file!.path) return
  console.log(`接收的路径为${props.file!.path}`)
  //* 获取对应的节点
  let node = fTree.value?.getNode(filepath, fTree.value.root)!
  if (props.file!.parent == node.parent && props.file!.type == NodeType.FILE) return
  if (props.file!.children?.includes(node)) return
  //* 当接受区域是文件夹类型
  if (props.file!.type == NodeType.DIR) {

    //* 进行文件操作
    fsp.copySync(node.path, path.resolve(props.file!.path, node.name))
    //* 生成一个node
    let generatedNode = new fileNode(path.resolve(props.file!.path, node.name), node.name)
    generatedNode.parent = props.file!
    generatedNode.parent!.children?.push(generatedNode)
    //* 销毁本身区域的节点内容
    node.removeSelf()
  }
  //* 如果是文件类型
  else if (props.file!.type == NodeType.FILE) {
    //* 开展寻根行动
    let parent = props.file!.parent!
    console.log(`当前的文件是文件，自动寻找父亲组件:${props.file?.path}`)
    //* 进行文件操作
    fsp.copySync(node.path, path.resolve(parent.path, node.name))
    //* 生成一个node
    let generatedNode = new fileNode(path.resolve(parent.path, node.name), node.name)
    generatedNode.parent = parent
    generatedNode.parent!.children?.push(generatedNode)
    node.removeSelf()
  }
  console.log(props.file == null)

}
const startDrag = (e: DragEvent) => {
  console.log(`发送的文件为:${props.file!.path}`)
  e.dataTransfer?.setData("path", props.file!.path)

}

</script>

<template>

  <div class="folder" v-if="file" ref="fileDom">
    <div class="item" tabindex="1" draggable="true" @dragover.prevent @drop="drop($event)"
      @dragstart="startDrag($event)" @click="toggleSubfolder($event, file!, refSubfolder), openFile($event, file!)"
      :data-path="file.path" v-if="validateFilename(file.name!)"
      :class="[{ 'clicked': props.file!.path == currentFile }]" @contextmenu="setCurrentFileNode(props.file!)">
      <i class="bi bi-file-earmark-text" v-if="file.type == NodeType.FILE"></i>
      <i class="bi bi-folder" v-if="file.type == NodeType.DIR"></i>
      <span ref="namebox" @blur="props.file!.rename(namebox!.innerText)" @keydown.enter.prevent="enter($event)">
        {{
            validateFilename(file.name!)
        }}</span>
    </div>
    <div class="subfolder" v-if="file.children" ref="subfolder" id="subfolder">
      <file-list :files="file.children" :file="f" v-for="f in file.children" :key="f.path"></file-list>
    </div>
  </div>


</template>

<style scoped>
i {
  padding-right: 4px;
  font-size: 1rem;
}
</style>
