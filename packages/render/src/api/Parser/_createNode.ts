import { article } from "../dbb";
import { ChronicleNode } from "./Node";
import { Parser } from "./Parser";
//* 创建新的节点
export function createNode(nodetype: ChronicleNode = ChronicleNode.paragraph, content: string = "") {
    let parser = new Parser(" ")
    parser.type = nodetype
    article.value.push(parser)
    return parser

}