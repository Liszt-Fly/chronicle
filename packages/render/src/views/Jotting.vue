<template>
    <div class="jotting">
        <el-row :gutter="1">
            <template v-for="m in getCurrentTargetDate(2022, 5)">
                <el-col :span="1">
                    <block :data="0.4" :date="m"></block>
                </el-col>
            </template>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { getCurrentTargetDate } from '@/api/util';
import { onMounted } from 'vue';
import Block from "@/components/Jotting/block.vue"
onMounted(() => {
    getCurrentTargetDate(2022, 2)
})
</script>