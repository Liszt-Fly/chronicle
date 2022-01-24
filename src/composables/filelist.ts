import { Ref } from "vue"
import { basePath, currentFile } from "./config"
import { msfile } from "./type"
import path from "path"
import { dialog } from "@electron/remote"
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
			const span = event.target as HTMLElement
			span.classList.toggle("icon-arrow-right")
			span.classList.toggle("icon-arrow_down")
			if (span.classList.contains("icon-arrow_down")) {
				console.log(subfolder.dom!)
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
			console.log("开启文件")
			currentFile.value = path.resolve(basePath.value, file.name!)
		} else {
		}
	}
}
