<template>
    <div class="trash">
        <el-row :gutter="20">
            <template v-for="item in container">
                <el-col :span="6">
                    <el-card>
                        <template #header class="header">
                            <div class="header"> <i class="bi bi-arrow-left" v-if="item.parent && !isTrashBinRoot(item)"
                                    @click="restore(item)"></i> {{ removeExtName(item.name) }} <i
                                    class="bi bi-arrow-right" v-if="item.children && item.children.length != 0"
                                    @click="expand(item)"></i>
                            </div>

                        </template>
                        <ul>
                            <li> 距离自动删除还剩余: 30天</li>

                            <li>进入回收站时间: 2022/2/13</li>
                        </ul>
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
import { removeExtName } from "@/api/FileSystem/filesystem"
import { onMounted, Ref, ref, watchEffect } from 'vue';
import TrashItem from '../components/Trash/TrashItem.vue';
//* 声明一个container容器，用于切换页面
let container = ref(trashBin.value!.root.children!)
const expand = (item: fileNode) => {
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

<style lang="scss">
.trash {
    overflow: scroll;
    height: calc(100vh - var(--brand-height));
}

.header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    i {
        cursor: pointer;
    }

}
</style>