import fsp from "fs-extra"
import { NodeType } from "./type"
import p from "path"
import { getValidName } from "@/api/util"
export class fileNode {
    //* constructor
    constructor(path: string, name: string) {
        this.stat = fsp.statSync(path)
        this.name = name
        this.path = path
        this.createdDate = this.stat.ctime
        this.modifiedDate = this.stat.mtime
        this.type = this.stat.isDirectory() ? NodeType.DIR : NodeType.FILE
        this.tags = []
        this.parent = null

        if (this.type == NodeType.DIR) {
            this.children = []
        }
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
        if (this.type == NodeType.DIR) {
            //sum 两种情况，添加文件夹或者是添加子文件
            if (createdType == NodeType.DIR) {
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
        //* 情况为文件夹的情形
        if (this.type == NodeType.DIR) {
            if (this.parent) {
                this.parent.children = this.parent.children!.filter(item => item.name != this.name)
                this.parent = null
                if (this.children) {
                    this.children.forEach(item => {
                        item.parent = null
                    })
                }
            }

        }
        //* 情况为文件
        else if (this.type == NodeType.FILE) {
            if (this.parent) {
                this.parent.children = this.parent.children!.filter(item => item.name != this.name)
            }
        }
        fsp.removeSync(this.path)
    }
    //* 重命名
    rename(newName: string) {
        this.name = newName
        let prevPath = this.path
        let obj = p.parse(this.path)
        obj.base = newName + ".md"
        obj.name = newName
        //更新
        this.path = p.resolve(obj.dir, obj.base)
        fsp.renameSync(prevPath, this.path)
    }
}