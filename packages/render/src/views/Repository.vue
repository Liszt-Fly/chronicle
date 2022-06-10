<template>
    <div class="repositories">
        <el-row :gutter="30" style="width: 100%">
            <template v-for="item in repositores">
                <el-col :span="8" :xs="12" :md="6" :sm="8" :lg="4">
                    <card>{{ item.name }}</card>
                </el-col>
            </template>
        </el-row>
    </div>
</template>

<script lang="ts" setup>
import Card from "@/components/Repository/card.vue"
import { repositores } from '@/interfaces/repositories'
</script>
