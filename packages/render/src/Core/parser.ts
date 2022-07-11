import {marked} from "marked";
import {Category, ChronComponent} from "./ParserType";
import {rules} from "./Rules";

export class Parser {
    type: ChronComponent
    content: string
    RenderedContent: string
    level?: number
    category:Category

    constructor(content: string, type: ChronComponent,) {
        this.content = content
        this.RenderedContent = marked.parse(content)
        this.type = type
        this.category=this.dealWithCategory();

    }

    render(dom: HTMLDivElement) {
        console.log(dom);
        //在进行渲染之前存取contnet
        this.content = dom.innerText
        //进行修改对应的类型
        this.analysis();


    }

    private analysis() {
        //* 保存原始状态的notes

        rules.some(rule => {

            if (rule.rule.test(this.content)) {
                this.type = rule.name
            }
        })
        //* 执行完之后进行分情况讨论:
        if(this.type==ChronComponent.HEADING){
            let level=this.content.match(rules[0].rule)![1].length
            let con=this.content.match(rules[0].rule)![2]
            this.level=level
            this.RenderedContent=con
        }
        if(/\*[\s\S]+\*/.test(this.content)){
            this.RenderedContent=marked.parse(this.RenderedContent)
            console.log(this.RenderedContent);

        }
    }

    private dealWithCategory():Category{
        switch (this.type){
            case (ChronComponent.HEADING):
                return Category.BLOCK
            case (ChronComponent.CODEBLOCK):
                return Category.BLOCK
            case (ChronComponent.HR):
                return Category.BLOCK
            case (ChronComponent.FENCES):
                return Category.INLINE;
            case(ChronComponent.TABLE):
                return Category.BLOCK
            case(ChronComponent.QUOTE):
                return Category.BLOCK
            default:
                return Category.BLOCK
        }

    }

}




