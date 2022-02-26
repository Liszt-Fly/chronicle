<script setup lang="ts">
import { Menu, MenuItem } from "@electron/remote";
import { onMounted, reactive, ref } from "vue";
import { msfile } from "@/interfaces/type";
import fsp from "fs-extra";
import path from "path";
import rmrf from "rimraf";
import { flushFiles, refresh, validateFilename } from "@/api/FileSystem/util";
import { currentFile } from "@/api/configdb";
import {
	createNote,
	ifNoteNameExists,
	ifSectionExists,
} from "@/api/FileSystem/filesystem";
import { chronicleArticlePath } from "@/api/init";
import { loadNodeLists } from "@/api/Editor/Editor";
import { ElMessage, ElMessageBox } from 'element-plus'
const props = defineProps({
	file: Object as () => msfile,
});
let subfolder = ref<HTMLDivElement | null>(null);
let refSubfolder = reactive({ dom: subfolder });
let namebox = ref<HTMLSpanElement | null>(null);
const fileDom = ref<HTMLElement | null>(null);
function openFile(event: MouseEvent, file: msfile) {
	//如果是文件
	if (!file.isDirectory) {
		currentFile.value = props.file!.path!

	}
}
function renameNote(file: msfile) {
	//启用contentEdible
	namebox.value!.contentEditable = "true";

	namebox.value!.focus();

	var sel = window.getSelection()
	let range = sel!.getRangeAt(0);
	range.setEnd(namebox.value!, 5)




}
function toggleSubfolder(
	event: MouseEvent,
	file: msfile,
	subfolder: { dom: HTMLElement | null }
) {
	//如果msfile是directory类型，进行图标转换，以及显隐转换

	if (file.isDirectory) {
		if (event) {
			let item = event.currentTarget as HTMLElement;
			let folder = item.firstElementChild!;
			folder.classList.toggle("bi-caret-right");
			folder.classList.toggle("bi-caret-down");
			if (folder.classList.contains("bi-caret-down")) {
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
function finishReanmeNote(file: msfile) {
	// file.name = namebox.value!.innerText

	let pathObjcet = path.parse(file.path!);
	pathObjcet.base = namebox.value!.innerText;
	namebox.value!.contentEditable = "false";
	console.log(file.path + pathObjcet.ext);
	fsp.renameSync(
		props!.file!.path!,
		path.resolve(pathObjcet.dir, namebox.value!.innerText) + pathObjcet.ext
	);
}

function deleteNoteOrSection(file: msfile) {
	if (!file.isDirectory) {
		fsp.unlinkSync(file.path!);
	} else {
		rmrf(file.path!, (err) => {
			refresh(chronicleArticlePath);
		});

	}
	refresh(chronicleArticlePath);
}

function enter(event: KeyboardEvent) {
	let target = event.target as HTMLDivElement;
	target.blur();
}

function addTag(file: msfile) { }

// 右键菜单
const menu = new Menu();
const menuItems = [
	new MenuItem({
		label: "删除",
		click: () => {
			deleteNoteOrSection(props.file!);
			refresh(chronicleArticlePath);
		},
	}),
	new MenuItem({
		label: "重命名",
		click: () => {
			renameNote(props.file!);
			refresh(chronicleArticlePath);
		},
	}),

];
if (props.file!.isDirectory) {
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
			refresh(path.resolve(process.cwd(), "example", "assets"));
		},
	});

	menuItems.push(new MenuItem({
		label: "添加话题",
		click: () => {
			let index = ifNoteNameExists(props.file!.path!, "undefined", 1);

			createNote(props.file!.path!, `undefined`);
			refresh(chronicleArticlePath);

			currentFile.value = path.resolve(props.file!.path!, `undefined${index}.chron`,)

		},
	}))
	menuItems.push(item);
}
else {
	menuItems.push(new MenuItem({
		label: "添加便签",
		click: () => {
			ElMessageBox.prompt('Please Add Tag', 'Add Tag', {
				confirmButtonText: 'OK',
				cancelButtonText: 'Cancel',

			})
				.then(({ value }) => {

					ElMessage({
						type: 'success',
						message: `Your email is:${value}`,
					})
				})
				.catch(() => {
					ElMessage({
						type: 'info',
						message: 'Input canceled',
					})
				})
		}
	}))
}






menuItems.forEach((item) => {
	menu.append(item);
});
const popMenu = (event: MouseEvent) => {
	menu.popup();
};
</script>

<template>
	<div class="folder" v-if="file" ref="fileDom">
		<div
			class="item"
			tabindex="1"
			@click="toggleSubfolder($event, file!, refSubfolder), openFile($event, file!)"
			v-if="validateFilename(file.name!)"
			@contextmenu.stop="popMenu($event)"
		>
			<span
				:class="[
					'iconfont',
					{ 'bi bi-caret-right': file.isDirectory },
					{ 'bi bi-journal-bookmark-fill': !file.isDirectory },
					'file-name',
					'file-icon',
				]"
				@context.stop
			></span>
			<span
				class="cursor"
				ref="namebox"
				@blur="finishReanmeNote(props.file!)"
				@keydown.enter.prevent="enter($event)"
			>{{ validateFilename(file.name!) }}</span>
		</div>
		<div
			class="subfolder"
			v-if="file.children && file.children.length > 0"
			ref="subfolder"
			id="subfolder"
		>
			<file-list :files="file.children" :file="f" v-for="f in file.children"></file-list>
		</div>
	</div>
</template>
