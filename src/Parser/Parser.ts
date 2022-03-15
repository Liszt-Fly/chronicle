
import { v4 } from "uuid"
import { ref, Ref } from "vue"
import { ChronicleNode } from "./Node"
import { marked, Tokenizer } from 'marked'

export class Parser {
    public id: string = v4() //uuid
    public content: string //markdown的文本内容
    public type?: ChronicleNode
    public static currentNodeParser: Parser
    public tag: string = ""
    public language: string = ""
    public bMarked: boolean = false
    public text: string = ""
    public table?: string[][] = []
    //* 是否使用**进行了包裹?
    public bEmphasized?: boolean=false
    public static currentParser?: Parser
    public level: number | undefined;
    public dom: Ref = ref<HTMLElement | null>()
    public renderedContent: string = ""
    constructor(content: string) {
        this.content = content
    }

    parse() {
        this.bMarked = true
        //sum 正则解析模块
        if (this.content.startsWith("#")) {
            let tag = this.content.match(/(^#{1,}) (.+)/)

            let level = tag![1].length
            let text = tag![2]
            this.type = ChronicleNode.header
            this.text = text
            this.level = level
        }
        else if (/\|([^\|]+)\|*?/g.test(this.content)) {
            let reg = /\|([^\|]+)\|*?/g


            let result: RegExpExecArray
            console.log(this.table)
            this.table![0] = []
            while (result = reg.exec(this.content)!) {

                let content = result[1]


                this.table![0].push(content)

            }

            this.type = ChronicleNode.table

        }
        else if (/```\w+/.test(this.content)) {
            console.log(this.content.match(/```(\w+)/))
            let reg = /```(\w+)/
            this.type = ChronicleNode.codeblock
            let content = reg.exec(this.content)
            this.language = content![1]

        }
        else {
            console.log("普通模块")
            return this.content
        }
    }
    save() {

    }


}