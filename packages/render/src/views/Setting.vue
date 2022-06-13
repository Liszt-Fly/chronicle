<template>
    <div class="setting">
        <el-tabs tab-position="left">
            <el-scrollbar>
                <el-tab-pane label="通用">
                    <General></General>
                </el-tab-pane>
                <el-tab-pane label="外观">
                    <Appearance></Appearance>
                </el-tab-pane>
                <el-tab-pane label="快捷键">
                    <ShortCut></ShortCut>
                </el-tab-pane>
            </el-scrollbar>
        </el-tabs>
    </div>
</template>

<script lang="ts" setup>
import ShortCut from "@/components/Setting/ShortCut.vue"
import Appearance from "@/components/Setting/Appearance.vue"
import General from "@/components/Setting/General.vue"

</script>

<style lang="scss">
.setting {
    height: 100%;

    .el-tabs {
        height: 100%;

        .el-tabs__header {
            height: 100%;
        }

        .el-tabs__content {
            overflow: auto !important;
            height: 100%;
        }
    }
}
</style>
