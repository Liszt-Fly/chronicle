import { Parser } from "@/Parser/Parser";

/*
sum  Paragraph 自然文字节点，直接存储即可
sum  CodeBlock 包装成markdown形式进行存储
sum  Table  需要转化成markdown的Table形式
sum  Title  自然文字节点
*/
export function toCodeBlock(parser: Parser) {
    console.log('```' + parser.language + "\n" + parser.content + "\n" + "```")
    return '```' + parser.language + "\n" + parser.content + "\n" + "```"
}
