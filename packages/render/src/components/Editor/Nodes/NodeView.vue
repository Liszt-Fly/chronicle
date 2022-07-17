<template>
  <!--根节点-->
<div contenteditable="true" tabindex="-1" style="display:none" @input="input">

  <template v-for="node in nodes">
    <component :is="node.parser.type" :node="node" :parser="node.parser" ></component>
  </template>
</div>

</template>

<script lang="ts" setup>
import   {nodes} from "@/api/db"
const input=(e:KeyboardEvent)=>{
  e.stopImmediatePropagation();

}
</script>

<style lang="scss">
.chron{
  min-height: 20px;

}
</style>