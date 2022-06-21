import fsp from "fs-extra"
import { NodeType } from "./type"
import p from "path"
import { getValidName } from "@/api/util"
import deepclone from "deep-clone"
import matter from 'gray-matter'
import { removeExtName } from "../FileSystem/filesystem"
import { trashBin } from "@/data/configdb"
import deepClone from "deep-clone"
import { chronicleUserPath } from "../init"
export class fileNode {
    //* constructor
    constructor(path: string, name: string) {

        this.stat = fsp.statSync(path)
        this.name = name
        this.path = path
        this.createdDate = this.stat.ctime
        this.modifiedDate = this.stat.mtime
        this.type = this.stat.isDirectory() ? NodeType.FOLDER : NodeType.FILE
        this.tags = []
        this.parent = null

        if (this.type == NodeType.FOLDER) {
            this.children = []
        }

        this.checkValidateFrontMatter()
    }
    //* property
    name: string
    path: string
    stat: fsp.Stats
    createdDate: Date
    modifiedDate: Date
    type: NodeType
    tags: string[]
    parent: fileNode | null
    children?: fileNode[] | null

    //* methods
    addChildren(createdType: NodeType) {
        let name = getValidName(this.path, createdType)
        if (this.type == NodeType.FOLDER) {
            //sum 两种情况，添加文件夹或者是添加子文件
            if (createdType == NodeType.FOLDER) {
                fsp.mkdirsSync(p.resolve(this.path, name))
            }
            else if (createdType == NodeType.FILE) {
                fsp.createFileSync(p.resolve(this.path, name))
            }
        }
        let node: fileNode = new fileNode(p.resolve(this.path, name), name)
        this.children!.push(node)
        node.parent = this



    }
    //* 删除
    removeSelf() {
        let name = this.name
        //* 生成一个新的节点，放入垃圾箱中
        let generatedNode = deepClone(this)
        console.log(generatedNode)

        //* 情况为文件夹的情形
        if (this.type == NodeType.FOLDER) {
            if (this.parent) {
                this.parent.children = this.parent.children!.filter(item => item.name != this.name)
                this.parent = null
            }

        }
        //* 情况为文件
        else if (this.type == NodeType.FILE) {
            if (this.parent) {
                this.parent.children = this.parent.children!.filter(item => item.name != this.name)
                this.parent = null
            }
        }
        fsp.moveSync(this.path, p.resolve(chronicleUserPath, ".trash", name))
        trashBin.value?.root.children?.push(generatedNode)
    }
    //* 重命名
    rename(newName: string) {
        this.name = newName
        let prevPath = this.path
        let obj = p.parse(this.path)
        obj.base = newName + ".md"
        console.log(obj.base)
        obj.name = newName
        //更新
        this.path = p.resolve(obj.dir, obj.base)
        fsp.renameSync(prevPath, this.path)
    }
    //* 替身
    substitute() {
        let name = ""
        let path = ""
        if (this.type == NodeType.FILE) {
            name = removeExtName(this.name) + "的副本"
            path = p.resolve(p.parse(this.path).dir, name + ".md")
            fsp.copySync(this.path, path)
        }
        else {
            name = this.name + "的副本"
            path = p.resolve(p.parse(this.path).dir, name)

            fsp.copySync(this.path, path)

        }
        let children = deepclone(this.children)
        let node = new fileNode(path, name)
        node.children = children
        console.log(node)

        this.parent?.children?.push(node)
        node.parent = this.parent
    }

    checkValidateFrontMatter() {
        //* 如果是FILE类型，就进行执行
        if (this.type == NodeType.FILE) {
            let obj = matter.read(this.path)

            if (Object.keys(obj.data).length == 0) {

                fsp.writeFileSync(this.path, matter.stringify(obj.content, { star: false, tags: [] }))
            }

        }
    }
    addTag(tags: string[]) {
        let obj = matter.read(this.path)
        console.log(obj)
        console.log(tags)
        fsp.writeFileSync(this.path, matter.stringify(obj.content, { tags, star: obj.data.star }))
    }
}

export class trashFileNode extends fileNode {

}