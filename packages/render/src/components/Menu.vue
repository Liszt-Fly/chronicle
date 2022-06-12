<script setup lang="ts">
import { fileNode } from "@/FileTree/fileNode"
import { NodeType } from "@/FileTree/type"

const props = defineProps({
    file: fileNode,
});

const Adelete = () => {
    props.file!.removeSelf()
}

const rename = () => {
    props.file!.rename("111")
}

const addChildren = (t: NodeType) => {
    props.file!.addChildren(t)
}

</script>

<template>
    <el-card class="box-card" shadow="never">
        <div class="text-item" @click="Adelete">
            <i class="bi bi-trash3"></i>
            <el-divider direction="vertical" />
            <span>删除</span>
        </div>
        <div class="text-item" @click="rename">
            <i class="bi bi-input-cursor"></i>
            <el-divider direction="vertical" /><span>重命名</span>
        </div>
        <div class="text-item" @click="addChildren(NodeType.FILE)" v-if="props.file!.type == NodeType.DIR">
            <i class="bi bi-file-earmark-plus"></i>
            <el-divider direction="vertical" /><span>新建文件</span>
        </div>
        <div class="text-item" @click="addChildren(NodeType.DIR)" v-if="props.file!.type == NodeType.DIR">
            <i class="bi bi-folder-plus"></i>
            <el-divider direction="vertical" /><span>新建文件夹</span>
        </div>
        <div class="text-item">
            <i class="bi bi-bookmarks"></i>
            <el-divider direction="vertical" />
            <span>添加话题</span>
        </div>
    </el-card>
</template>
<style scoped lang="scss">
:root {
    --el-transition-duration: 0;
}

.box-card {
    width: 140px;
    position: fixed;
    z-index: 999;
    --el-card-padding: 0;
    box-shadow: var(--el-box-shadow-lighter);

    .text-item {
        font-size: 0.8rem;

        padding: 8px 12px;

        &:hover {
            background-color: var(--el-color-primary-light-9);
        }
    }
}
</style>
