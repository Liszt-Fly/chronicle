<template>
  <!--根节点-->
<div contenteditable="false" tabindex="-1">

  <template v-for="node in nodes">
    <component :is="node.parser.type" :node="node" :parser="node.parser" ></component>
  </template>
</div>

</template>

<script lang="ts" setup>
import   {nodes} from "@/api/db"
</script>

<style lang="scss">
.chron{
  min-height: 20px;

}
</style>