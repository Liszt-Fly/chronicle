<template>
    <div class="trash">
        <el-row>
            <div class="router">
                <i class="bi bi-chevron-left" @click="restore"></i>
                <i class="bi bi-chevron-right"></i>

            </div>
        </el-row>
        <el-divider></el-divider>
        <el-row :gutter="20">
            <template v-for="item in container">
                <el-col :span="4">
                    <div class="card" @click="expand(item)">
                        <i :class="item.children ? 'bi bi-folder2' : 'bi bi-file-earmark-text'"></i>
                        <div>{{ item.name }}</div>
                    </div>

                    <!-- <el-card>
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
                    </el-card> -->
                </el-col>
            </template>
        </el-row>
    </div>
</template>

<script lang="ts" setup>
import { fileNode } from "@/api/FileTree/fileNode";
import { chronicleUserPath } from "@/api/init";
import { trashBin } from "@/data/configdb";
import path from "path";
import { removeExtName } from "@/api/FileSystem/filesystem";
import { onMounted, Ref, ref, watchEffect } from "vue";
import TrashItem from "../components/Trash/TrashItem.vue";
import { NodeType } from "@/api/FileTree/type";
import { Stack } from "@/api/stack";
//* 声明一个container容器，用于切换页面
let container: Ref<fileNode[]> = ref(trashBin.value!.root.children!);
let stack = new Stack<fileNode[]>([])
let stackRef = ref(stack)
stackRef.value.push(container.value)
const expand = (item: fileNode) => {
    if (item.type == NodeType.FOLDER) {
        container.value = item.children!;
        stackRef.value.push(container.value)
        console.log(stackRef.value.peek())
        container.value = stackRef.value.peek()
    }
};

const isTrashBinRoot = (item: fileNode) => {
    return item.parent!.path == path.resolve(chronicleUserPath, ".trash");
};
const restore = () => {

    console.log(stackRef.value.pop())

    container.value = stackRef.value.peek()
};
watchEffect(() => {
    console.log(trashBin.value);
});
</script>

<style lang="scss" scoped>
.trash {
    overflow: scroll;
    height: calc(100vh - var(--brand-height));
    padding: 20px;
    user-select: none;
}

.card {
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;

    i {
        cursor: pointer;
        font-size: 2rem;
    }
}

.router i {
    margin-right: 20px;
}
</style>
