import { basePath, currentFile, paragraphs } from "./config"
import { msfile } from "./type"
import path from "path"
import { saveNodeLists } from "./cDom"
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
			let span = event.currentTarget as HTMLElement
			let arrow = span.firstElementChild!

			arrow.classList.toggle("icon-arrow-right")
			arrow.classList.toggle("icon-arrow_down")
			if (arrow.classList.contains("icon-arrow_down")) {
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
