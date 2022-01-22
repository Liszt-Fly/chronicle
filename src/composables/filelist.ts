import { Ref } from "vue"
import { msfile } from "./type"

//sum filelist API
//* 打开关闭子文件夹
export function toggleSubfolder(
	event: MouseEvent,
	file: msfile,
	subfolder: { dom: HTMLElement | null }
) {
	//如果msfile是directory类型，进行图标转换，以及显隐转换
	console.log(subfolder.dom)
	if (file.isDirectory) {
		if (event) {
			const span = event.target as HTMLElement
			span.classList.toggle("icon-arrow-right")
			span.classList.toggle("icon-arrow_down")
			if (span.classList.contains("icon-arrow_down")) {
				subfolder.dom!.style.display = "block"
			} else {
				subfolder.dom!.style.display = ""
			}
		}
	}
}
