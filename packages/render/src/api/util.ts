//sum 常用的工具类文件
import { fileNode } from "@/api/FileTree/fileNode"
import { fileTree } from "@/api/FileTree/fileTree"
import { NodeType } from "@/api/FileTree/type"
import fsp from "fs-extra"
import path from "path"

//* 设置文件和文件夹在没有命名的默认名称
function getDefaultName(type: NodeType): string {
    return type == NodeType.FOLDER ? "笔记本" : "笔记"
}
//* 获取不重复的数字
export function getValidNumber(basePath: string, index: number, type: NodeType): number {

    //* 如果是文件夹
    if (type == NodeType.FOLDER) {
        if (fsp.existsSync(path.resolve(basePath, getDefaultName(type) + index.toString()))) {
            return getValidNumber(basePath, index + 1, type)
        }
    }
    //* 如果是文件
    else if (type == NodeType.FILE) {
        if (fsp.existsSync(path.resolve(basePath, getDefaultName(type) + index.toString()) + ".md")) {
            return getValidNumber(basePath, index + 1, type)
        }
    }
    return index;
}

export function getValidName(basePath: string, type: NodeType): string {
    //文件夹系统
    if (type == NodeType.FOLDER) {
        return `${getDefaultName(type)}${getValidNumber(basePath, 1, type)}`
    }
    //文件系统
    else if (type == NodeType.FILE) {
        return `${getDefaultName(type)}${getValidNumber(basePath, 1, type)}.md`
    }
    else {
        return "error"
    }
}
export function setCurrentFileNode(file: fileNode) {
    fileTree.currentFileNode = file
}