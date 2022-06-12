<template>
    <div class="repositories">
        <el-row :gutter="30">
            <template v-for="item in repositores">
                <el-col :span="8" :xs="12" :md="6" :sm="8" :lg="4">
                    <card>{{ item.name }}</card>
                </el-col>
            </template>
        </el-row>
    </div>
</template>

<script lang="ts" setup>
import Card from "@/components/Repository/Card.vue"
import { repositores } from '@/interfaces/repositories'
</script>

<style>
.repositories {
    overflow: scroll;
    box-sizing: border-box;
    padding: 15px;
}
</style>
