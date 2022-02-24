import { article } from "./db";
import { ChronicleNode } from "./Node";
import { Parser } from "./Parser";

export function insertNode(position: number, content: string = "", nodetype: ChronicleNode = ChronicleNode.paragraph) {
    let parser = new Parser("")
    parser.type = nodetype
    article.value.splice(position, 0, parser)
    return parser
}