//sum filesystem使用的api
import fsp from "fs-extra"
import path from "path"
import fs from "fs"
import { qFile } from "@/interfaces/type"
import { defaultFileTreePath } from "../configdb"
import { chroniclePath } from "../init"

//* 创建新的Note文件
export function createNote(currentPath: string, noteName?: string) {
    //创建默认文件
    if (noteName == undefined) {
        noteName = "undefined"
    }

    let index = ifNoteNameExists(currentPath, removeExtName(noteName), 1)
    let fileName = ifFileHasExtname(
        path.resolve(currentPath, `${noteName}${index}`)
    )

    fsp.createFileSync(path.resolve(currentPath, `${fileName}`))

}

//* 删除Note
export function deleteNote(currentPath: string, noteName: string) {
    fsp.unlinkSync(path.resolve(currentPath, ifFileHasExtname(noteName)))
}

export function ifNoteNameExists(
    currentPath: string,
    noteName: string,
    index: number
): number {
    //如果名字存在，进行递归
    if (fsp.existsSync(path.resolve(currentPath, ifFileHasExtname(noteName + index)))) {
        return ifNoteNameExists(currentPath, removeExtName(noteName), index + 1)
    } else {
        return index
    }
}

export function ifSectionExists(PATH: string, section: string, index: number): number {
    if (fsp.existsSync(path.resolve(PATH, section + index))) {
        return ifSectionExists(PATH, section, index + 1)
    }
    else {
        return index;
    }
}

//* 判断文件是否有后缀,如果没有，添加后缀
function ifFileHasExtname(file: string): string {
    if (path.extname(file)) {
        return file
    } else {
        return file.concat(".md")
    }
}

export function removeExtName(file: string): string {
    if (path.extname(file)) {
        let remainedLength = file.length - path.extname(file).length + 1
        //截取字符串
        return file.substring(0, remainedLength - 1)
    } else {
        return file
    }
}


export let validateFilename = function validateFilename(
    filename: string
): string | undefined {
    //省略扩展名
    let length = filename.length - path.extname(filename).length
    if (filename == ".DS_Store") return undefined
    else if (path.extname(filename) == ".md" || path.extname(filename) == "")
        return filename.substring(0, length)
    else return undefined
}

export function bKeyBoardTarget(object: any): object is KeyboardEvent {
    return "altKey" in object
}




export function getFiles(pathName: string, storage: qFile[]) {
    let list = fs.readdirSync(pathName)
    if (list.length == 0) return
    for (let i of list) {
        let stat = fs.lstatSync(path.resolve(pathName, i));
        let bDir = stat.isDirectory()
        console.log(stat.birthtime)
        if (bDir) {
            let newStorage: any[] = []
            storage.push({ name: i, children: newStorage, path: path.resolve(pathName, i), createdDate: stat.birthtime, lastUpdateDate: stat.mtime })
            getFiles(path.resolve(pathName, i), newStorage)
        }
        else {
            if (i != ".DS_Store") {
                storage.push({ name: i, path: path.resolve(pathName, i), createdDate: stat.birthtime, lastUpdateDate: stat.mtime });
            }
        }
    }
}
//* 内存=>硬盘 JSON存储FileTree
export const writeFileTreeInJSonToStore = (storage: qFile[]) => {

    fsp.writeFileSync(
        path.resolve(chroniclePath, "fileTree.json"),
        JSON.stringify(storage, null, 2)
    );
    console.log("函数已经调用");
};

export const getFileTreeFromJsonToStore = (path: string = defaultFileTreePath): qFile[] => {
    console.log("读取成功")
    return fsp.readJSONSync(path)
}