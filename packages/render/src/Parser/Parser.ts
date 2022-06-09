
import { v4 } from "uuid"
import { ref, Ref } from "vue"
import { ChronicleNode } from "./Node"

export class Parser {
    //* 指针，指向当前使用的Parser
    public static currentNodeParser: Parser
    //sum 节点的基础内容
    //* uuid随机生成
    public id: string = v4()
    //* 原本的文本内容
    public content: string
    //* 节点的类型标识
    public type?: ChronicleNode
    //* 节点的渲染内容
    public text: string = ""
    //sum Header部分
    public level: number | undefined;
    //sum CodeBlock部分
    public language?: string = ""
    //sum Table部分
    public table?: string[][] = []
    //* 是否使用**进行了包裹?
    public bEmphasized?: boolean = false
    //* 是否使用了~~进行了包裹?
    public bDeleted?: boolean = false

    constructor(content: string) {
        this.content = content
    }

    parse() {
        //sum Header部分解析处理
        if (this.content.startsWith("#")) {
            let tag = this.content.match(/(^#{1,}) (.+)/)
            let level = tag![1].length
            let text = tag![2]

            this.type = ChronicleNode.header
            this.text = text
            this.level = level



        }
        //sum 表格部分
        else if (/\|([^\|]+)\|*?/g.test(this.content)) {
            let reg = /\|([^\|]+)\|*?/g
            let result: RegExpExecArray

            this.table![0] = []
            while (result = reg.exec(this.content)!) {
                let content = result[1]
                this.table![0].push(content)
            }
            this.type = ChronicleNode.table

        }
        else if (/```\w+/.test(this.content)) {

            let reg = /```(\w+)/
            this.type = ChronicleNode.codeblock
            let content = reg.exec(this.content)
            this.language = content![1]

        }
        else if (/^> .+/.test(this.content)) {
            let reg = /^> (.+)/
            let content = reg.exec(this.content)!
            this.type = ChronicleNode.quoteblock
            this.text = content[1]
        }
        else {
            return this.content
        }
    }



}
