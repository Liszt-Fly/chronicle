import { basePath, currentFile, paragraphs } from "@/api/config"
import { msfile } from "@/api/NavBar/FileSystem/type"
import path from "path"
import { saveNodeLists } from "@/api/Editor/Editor"

//sum filelist API
//* 打开关闭子文件夹
export function toggleSubfolder(
	event: MouseEvent,
	file: msfile,
	subfolder: { dom: HTMLElement | null }
) {
	//如果msfile是directory类型，进行图标转换，以及显隐转换

	if (file.isDirectory) {
		if (event) {
			let item = event.currentTarget as HTMLElement
			let folder = item.firstElementChild!

			folder.classList.toggle("bi-folder")
			folder.classList.toggle("bi-folder2-open")
			if (folder.classList.contains("bi-folder2-open")) {
				subfolder.dom!.style.display = "block"
			} else {
				subfolder.dom!.style.display = ""
			}
		}
	}
}

export function openFile(event: MouseEvent, file: msfile) {
	//如果是文件
	if (!file.isDirectory) {
		if (path.extname(path.resolve(basePath.value, file.name!)) === ".json") {
			//首先保存上一个文件
			if (currentFile.value != "") {
				saveNodeLists(paragraphs.value, currentFile.value)
			}
			currentFile.value = path.resolve(basePath.value, file.name!)
		} else {
		}
	}
}
