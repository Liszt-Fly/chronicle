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
    <div class="box-card" shadow="never">
        <div class="text-item">
            <i class="bi bi-bookmarks"></i>
            <el-divider direction="vertical" />
            <span>添加话题</span>
        </div>

        <el-divider />

        <template v-if="props.file!.type == NodeType.DIR">
            <div class="text-item" @click="addChildren(NodeType.FILE)">
                <i class="bi bi-file-earmark-plus"></i>
                <el-divider direction="vertical" /><span>新建文件</span>
            </div>
            <div class="text-item" @click="addChildren(NodeType.DIR)">
                <i class="bi bi-folder-plus"></i>
                <el-divider direction="vertical" /><span>新建文件夹</span>
            </div>

            <el-divider />
        </template>

        <div class="text-item" @click="rename">
            <i class="bi bi-files"></i>
            <el-divider direction="vertical" /><span>创建副本</span>
        </div>

        <div class="text-item" @click="rename">
            <i class="bi bi-input-cursor"></i>
            <el-divider direction="vertical" /><span>重命名</span>
        </div>
        <div class="text-item" @click="Adelete">
            <i class="bi bi-trash3"></i>
            <el-divider direction="vertical" />
            <span>删除</span>
        </div>
    </div>
</template>
<style scoped lang="scss">
:root {
    --el-transition-duration: 0;
}

.box-card {
    width: 140px;
    position: fixed;
    z-index: 999;
    padding: 4px;
    border-radius: 4px;
    background-color: var(--el-bg-color);
    box-shadow: var(--el-box-shadow-lighter);

    .el-divider--horizontal {
        margin: 4px;
        width: auto
    }

    .text-item {
        border-radius: 4px;
        font-size: 0.8rem;

        padding: 8px 12px;

        &:hover {
            background-color: var(--el-color-info-light-9);
        }
    }
}
</style>
