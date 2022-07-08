import {Parser} from "@/Core/parser";
import {Category} from "@/Core/ParserType";

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
    //* 链接下一个节点
    link(node:ParserNode){
        //首先检查下一个节点是否为空
        if(this.next==null){
            this.next=node
        }
        else{
            //* 抛出错误提示
            console.log("当前的节点已经链接了下一个节点");
        }
    }
}