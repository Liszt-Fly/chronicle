
import { forEach } from "lodash";
import { fileNode } from "./fileNode";

export class FileTree {
    private root: fileNode
    constructor(root: fileNode) {
        this.root = root;
    }

    //* methods
    foreach(root: fileNode) {
        if (root == null) return;
        console.log(root.path)
        if (root.children) {
            root.children.forEach(e => {
                forEach(e)
            })
        }
    }
}


