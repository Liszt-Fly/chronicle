import { marked } from "marked";
import { ParserType, ChronComponent } from "./ParserType";

export class Parser {
    //标记当前块是行级块还是块级块
    category: ParserType
    type: ChronComponent
    content: string
    RenderedContent: string
    level?: number

    constructor(content: string, type: ChronComponent, category: ParserType) {
        this.content = content
        this.RenderedContent = marked.parse(content)
        this.category = category
        this.type = type
    }
    render(dom: HTMLDivElement) {
        //* 解析为新的组件
        //在进行渲染之前存取contnet
        this.content = dom.innerText
        this.dealWithParserText(dom)

    }
    //* 处理产生的JSON内容，转化为我们需要的内容
    private dealWithParserText(dom: HTMLDivElement) {
        let obj: any = JSON.parse(marked.parse(dom.innerText))
        console.log('obj', obj)
        this.level = obj.level ? obj.level : undefined
        this.RenderedContent = obj.text
        console.log('obj.text', obj.text)
    }


}