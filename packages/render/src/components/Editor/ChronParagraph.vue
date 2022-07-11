<template>
    <p  :contenteditable="bContentedible" class="chron" ref="paragraph" @keydown="input" @blur="render"  @mousedown="mousedown" @mouseup="bContentedible.value=true"  >
        {{ parser?.content ? parser.content : "" }}
    </p>
</template>

<script lang="ts" setup>
import {Parser} from '@/Core/parser';
import {ChronComponent} from '@/Core/ParserType';
import {onMounted, ref} from 'vue';
import {ParserNode} from "@/Core/ParserNode";
import {bContentedible} from "@/api/db"

const props = defineProps({
    parser: Object as () => Parser,
    node:Object as ()=>ParserNode
})
const paragraph = ref<HTMLDivElement | null>(null)
const mousedown=()=>{
  console.log("mousedown");
}
onMounted(() => {
    paragraph.value!.innerText=props.parser!.content
    paragraph.value!.focus()

})
const input = (e: KeyboardEvent) => {
    switch (e.key) {
        case ("Enter"):
            e.preventDefault()
        render(e)
    }
}

const render = (e:Event) => {
  if(paragraph.value){
    props.parser!.render(paragraph.value!)
    if(e.type=="keydown"){
      props.node!.link(new ParserNode(new Parser("",ChronComponent.PARAGRAPH)))
    }
  }
}
</script>

<style lang="scss">
.chron{

}
.chron:focus {
    outline: red solid 1px ;
}
</style>