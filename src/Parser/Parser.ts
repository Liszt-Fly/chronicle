import { v4 } from "uuid"
import { ref, Ref } from "vue"
import { ChronicleNode } from "./Node"

export class Parser {
    public id: string = v4()
    private rule: string
    public content: string
    public type?: ChronicleNode
    public tag: string = ""
    public bMarked: boolean = false
    public text: string = ""
    public static currentParser?: Parser
    public level: number | undefined;
    public dom: Ref = ref<HTMLElement | null>()
    public renderedContent: string = ""
    constructor(rule: string, content: string) {
        this.rule = rule
        this.content = content
    }

    parse() {
        this.bMarked = true
        if (this.content.startsWith("#")) {

            let tag = this.content.match(/(^#{1,}) (.+)/)

            let level = tag![1].length
            let text = tag![2]
            this.type = ChronicleNode.header
            this.text = text
            this.level = level
            // return (`<h${(level)}>${text}</h${level}>`)

        }
        else {

            return this.content
        }
    }
    save() {

    }


}