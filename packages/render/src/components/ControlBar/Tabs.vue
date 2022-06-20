<template>
    <el-scrollbar>
        <div class="scrollbar-flex-content">
            <el-tag v-for="file in openFiles" effect="plain" :key="file" closable type="info"
                @click="toggleCurrentFile(file)" class="tab-item" @close="remove(file)"
                :class="{ 'tab-item-active': file == currentFile }">
                {{ path.relative(path.join(chronicleUserPath, "assets"), file).replaceAll("\\", "/") }}
            </el-tag>
        </div>
    </el-scrollbar>
</template>

<script lang="ts" setup>
import { openFiles, currentFile } from "@/data/configdb"
import { chronicleUserPath } from "@/api/init"
import path from "path"

let toggleCurrentFile = (file: string) => {
    currentFile.value = file
}

let remove = (file: string) => {

    openFiles.value.delete(file)
    if (openFiles.value.size != 0)
        currentFile.value = Array.from(openFiles.value).pop()!;
    else
        currentFile.value = "";
}
</script>

<style lang="scss" scoped>
.scrollbar-flex-content {
    display: flex;
}

.tab-item-active {
    background-color: var(--chronicle-theme-color);
    color: var(--el-bg-color);
}

.tab-item {
    cursor: pointer;
    border: none;
    padding-right: 25px !important;
    margin: 4px 2px;

    &:hover {
        background-color: var(--el-color-info-light-9);
        color: var(--chronicle-theme-color);
        padding-right: 5px !important;
    }
}
</style>

<style>
.tab-item .el-icon.el-tag__close {
    display: none;
}

.tab-item:hover .el-icon.el-tag__close {
    display: inline-flex;
}
</style>
