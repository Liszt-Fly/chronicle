<template>
    <div class="workspace">
        <el-row :gutter="30">
            <template v-for="panel in workspace">
                <el-col :span="8" :xs="12" :md="6" :sm="8" :lg="4">
                    <Panel>{{ panel.name }}</Panel>
                </el-col>
            </template>
        </el-row>
    </div>
</template>

<script lang="ts" setup>
import Panel from "@/components/WorkSpace/Panel.vue"
const workspace = [
    {
        name: "计算机科学"
    },
    {
        name: "生物与技术"
    },
    {
        name: "系统工程"
    },
    {
        name: "食品科学"
    }
]</script>

<style>
.workspace {
    box-sizing: border-box;
    padding: 15px;
}
</style>
