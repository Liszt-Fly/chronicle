<script setup lang="ts">
import FileSystem from "@/components/FileSystem/FileSystem.vue";
import { nodes } from "@/api/db"
</script>

<template>
    <div class="column">
        <div class="column-left">
            <!-- 中间调整大小 -->
            <div class="resize-bar"></div>
            <div class="resize-line"></div>
            <!-- 左侧文件系统 -->
            <div class="resize-save">
                <FileSystem></FileSystem>
            </div>
        </div>
        <div class="column-right">
            <!-- 右侧 editor -->
            <el-scrollbar>
                <template v-for="node in nodes">
                    <component :is="node.type" :node="node"></component>
                </template>
            </el-scrollbar>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.column {
    overflow: hidden;
    height: 100%;
}

.column-left {
    position: relative;
    float: left;
    height: calc(100vh - var(--brand-height));
}

.column-right {
    overflow: hidden;
    height: calc(100vh - var(--brand-height));

}

.resize-save {
    position: absolute;
    top: 0;
    right: 8px;
    bottom: 0;
    left: 0;
    overflow-x: hidden;
    height: 100vh;
}

.resize-bar {
    height: inherit;
    resize: horizontal;
    cursor: ew-resize;
    cursor: col-resize;
    opacity: 0;
    overflow: scroll;
    max-width: 80vw;
    min-width: 120px;
}

/* 拖拽线 */
.resize-line {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    pointer-events: none;
}

.resize-bar::-webkit-scrollbar {
    width: 200px;
    height: inherit;
}
</style>
