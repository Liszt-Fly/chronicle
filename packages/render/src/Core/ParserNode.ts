import {Parser} from "@/Core/parser";
import {Category} from "@/Core/ParserType";
import {nodes} from "@/api/db";

export class ParserNode {
    parser:Parser
    children?:ParserNode[]
    parent:ParserNode|null
    next:ParserNode|null
    constructor(parser:Parser) {
        this.parser=parser
        this.parent=null
        this.next=null
        if(this.parser.category==Category.BLOCK){
            //* 初始化children
            this.children=[]
        }
    }
    //* 链接节点
    link(node:ParserNode){
        if(this.parent){
                this.parent.children!.push(node)
                this.next=node
        }
        else{
            nodes.value.push(node)
        }

    }

}