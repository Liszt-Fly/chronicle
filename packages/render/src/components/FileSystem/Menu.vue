<script setup lang="ts">
import { fileTree } from "@/api/FileTree/fileTree";
import { NodeType } from "@/api/FileTree/type"
import { bClickedParent, fTree } from "@/api/configdb";

const remove = () => {
    fileTree.currentFileNode.removeSelf()
}

const rename = () => {
    fileTree.currentFileNode.rename("vue")
}

const exportFile = () => {

}

const exportDir = () => {

}

const addChildren = (t: NodeType) => {
    if (bClickedParent.value) {
        fTree.value!.root.addChildren(t)
    }
    else {
        fileTree.currentFileNode.addChildren(t)
    }
}

</script>

<template>
    <div class="menu" shadow="never">
        <template v-if="(fileTree.currentFileNode && fileTree.currentFileNode.type == NodeType.DIR) || bClickedParent">
            <div class="text-item" @click="addChildren(NodeType.FILE)">
                <i class="bi bi-file-earmark-plus"></i>
                <el-divider direction="vertical" />
                <span>新建文件</span>
            </div>
            <div class="text-item" @click="addChildren(NodeType.DIR)">
                <i class="bi bi-folder-plus"></i>
                <el-divider direction="vertical" />
                <span>新建文件夹</span>
            </div>
        </template>

        <template v-if="!bClickedParent">
            <el-divider v-if="fileTree.currentFileNode && fileTree.currentFileNode.type == NodeType.DIR" />
            <div class="text-item">
                <i class="bi bi-files"></i>
                <el-divider direction="vertical" />
                <span>创建副本</span>
            </div>
            <div class="text-item" @click="exportFile"
                v-if="fileTree.currentFileNode && fileTree.currentFileNode.type == NodeType.FILE">
                <i class="bi bi-reply" style="transform: rotate(90deg);"></i>
                <el-divider direction="vertical" />
                <span>导出为 PDF</span>
            </div>
            <div class="text-item" @click="exportDir" v-else>
                <i class="bi bi-reply-all"></i>
                <el-divider direction="vertical" />
                <span>全导出为 PDF</span>
            </div>
            <div class="text-item" @click="rename">
                <i class="bi bi-input-cursor"></i>
                <el-divider direction="vertical" />
                <span>重命名</span>
            </div>
            <div class="text-item" @click="remove">
                <i class="bi bi-trash3"></i>
                <el-divider direction="vertical" />
                <span>删除</span>
            </div>
        </template>

        <template v-if="!bClickedParent">
            <el-divider />
            <div class="text-item">
                <i class="bi bi-bookmarks"></i>
                <el-divider direction="vertical" />
                <span>添加话题</span>
            </div>
        </template>
    </div>
</template>
<style scoped lang="scss">
:root {
    --el-transition-duration: 0;
}

.menu {
    width: 140px;
    position: fixed;
    z-index: 999;
    padding: 4px;
    border-radius: 4px;
    background-color: var(--el-bg-color);
    box-shadow: var(--el-box-shadow-lighter);

    .bi-reply::before,
    .bi-reply-all::before {
        transform: rotateY(180deg);
    }

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
