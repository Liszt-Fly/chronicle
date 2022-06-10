<template>
    <el-card class="box-card" shadow="never">
        <h3 class="name">
            <slot></slot>
        </h3>
        <el-divider></el-divider>
        <el-skeleton :rows="2" animated />
    </el-card>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.el-card {
    padding: 12px;
    margin: 12px;

    &:hover {
        overflow-y: auto;
        box-shadow: rgb(15 0 0 / 10%) 0px 0px 0px 4px;
    }
}
</style>