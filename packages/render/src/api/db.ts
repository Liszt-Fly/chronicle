import { Parser } from "@/Core/parser"
import { ChronComponent, ParserType } from "@/Core/ParserType"
import { Ref, ref } from 'vue'
export let article = ref<Parser[]>([])
export let bContentedible = ref<boolean>(true)
export const nodes: Ref<Parser[]> = ref([])
nodes.value.push(new Parser("123", ChronComponent.PARAGRAPH, ParserType.BLOCK))