<template>
    <div class="card">
        <h3 class="name">
            <slot></slot>
        </h3>
        <el-divider></el-divider>
        <el-skeleton :rows="3" animated />
    </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
</style>