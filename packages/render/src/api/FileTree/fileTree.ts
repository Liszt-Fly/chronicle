import { fileNode } from "./fileNode";
import fs from "fs-extra"
import path from "path"
import { NodeType } from "./type";
export class fileTree {
    //* 文件树的根节点
    root: fileNode
    //* 文件树
    tree: fileNode
    //* 全局静态变量
    static currentFileNode: fileNode
    //* 构造Tree,仅仅在fileTree内部进行调用
    private static constructFileTree(pathName: string, currentNode: fileNode) {
        let list = fs.readdirSync(pathName)
        if (list.length == 0) return
        list.forEach(item => {
            //* 对应的文件/文件夹路径
            let currentPath = path.resolve(pathName, item)
            //* 构建对应的node
            let node = new fileNode(currentPath, item)
            currentNode.children!.push(node)
            //* parent链接
            node.parent = currentNode
            if (node.type == NodeType.FOLDER) {
                this.constructFileTree(node.path, node)
            }
        })
    }
    constructor(root: fileNode) {
        this.root = root
        this.tree = root
        //* 构造tree
        fileTree.constructFileTree(this.tree.path, this.tree)
    }
    //* 寻找对应的node
    getNode(pathName: string, currentNode: fileNode): fileNode | null {
        if (pathName == currentNode.path) {
            return currentNode
        }
        if (currentNode == null) return null
        if (currentNode.children) {
            for (let child of currentNode.children) {
                if (this.getNode(pathName, child)) {
                    return this.getNode(pathName, child)
                }

            }
        }
        return null
    }

}
