import {Parser} from "@/Core/parser"
import {ChronComponent} from "@/Core/ParserType"
import {Ref, ref} from 'vue'
import {ParserNode} from "@/Core/ParserNode";

export let bContentedible = ref<boolean>(true)
let parser=new Parser("",ChronComponent.PARAGRAPH)
export let grmRoot=new ParserNode(parser)

export const nodes: Ref<ParserNode[]> = ref([])
nodes.value.push(grmRoot)
