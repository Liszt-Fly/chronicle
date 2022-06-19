<template>
    <div class="trash">
        <el-row>
            <template v-for="item in container">
                <el-col :span="6">
                    <el-card>
                        <template #header>
                            {{ item.name }}
                        </template>
                        <div v-if="item.children && item.children.length != 0" @click="expand(item)">状态标志:可以展开</div>
                        <el-divider></el-divider>
                        <div v-if="item.parent && !isTrashBinRoot(item)" @click="restore(item)">状态标志:可以还原</div>
                    </el-card>
                </el-col>
            </template>
        </el-row>
    </div>

</template>

<script lang="ts" setup>
import { fileNode } from '@/api/FileTree/fileNode';
import { chronicleUserPath } from '@/api/init';
import { trashBin } from '@/data/configdb';
import path from "path"
import { onMounted, Ref, ref, watchEffect } from 'vue';
import TrashItem from '../components/Trash/TrashItem.vue';
//* 声明一个container容器，用于切换页面
let container = ref(trashBin.value!.root.children!)
const expand = (item: fileNode) => {
    console.log(item)
    container.value = item.children!
}

const isTrashBinRoot = (item: fileNode) => {
    return item.parent!.path == path.resolve(chronicleUserPath, ".trash")
}
const restore = (item: fileNode) => {

    console.log(item.parent?.children)
    container.value = item.parent!.parent!.children!
}
watchEffect(() => {
    console.log(trashBin.value)
})
</script>

<style>
.trash {
    overflow: scroll;
    height: calc(100vh - var(--brand-height));
}
</style>