<template>
    <el-card class="panel" shadow="never">
        <h3 class="name">
            <slot></slot>
        </h3>
        <el-divider></el-divider>
        <el-skeleton :rows="2" animated />
    </el-card>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.panel {
    padding: 12px;
    margin: 12px;
    width: 150px;
    height: 200px;

    &:hover {
        box-shadow: var(--chronicle-theme-color) 0px 0px 0px 4px;
    }
}
</style>