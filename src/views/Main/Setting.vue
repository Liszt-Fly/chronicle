<template>
    <el-row>
        <el-col :span="24">
            <el-checkbox v-model="welcome_switch" label="展开欢迎页面"></el-checkbox>
        </el-col>
    </el-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

let welcome_switch = ref(true)
</script>

<style >
</style>
