<template>
    <div class="setting">
        <div>
            <el-button key="primary" type="primary" text @click="showTab = 'general'">{{ $t('setting.general_tab') }}
            </el-button>
            <el-button key="primary" type="primary" text @click="showTab = 'appearance'">
                {{ $t('setting.appearance_tab') }}</el-button>
            <el-button key="primary" type="primary" text @click="showTab = 'shortcut'">{{ $t('setting.shortcut_tab') }}
            </el-button>
        </div>

        <el-scrollbar>
            <General v-if="showTab == 'general'"></General>
            <Appearance v-if="showTab == 'appearance'"></Appearance>
            <Shortcut v-if="showTab == 'shortcut'"></Shortcut>
        </el-scrollbar>
    </div>
</template>

<script lang="ts" setup>
import Shortcut from "@/components/Setting/Shortcut.vue"
import Appearance from "@/components/Setting/Appearance.vue"
import General from "@/components/Setting/General.vue"
import { ref } from "vue";

const showTab = ref("general")
</script>

<style lang="scss">
.setting {
    height: 100%;
    display: flex;
    flex-direction: column;

    .el-tabs.el-tabs--left {
        height: 100%;

        .el-tabs__header {
            height: 100%;
        }

        .el-tabs__content {
            overflow: auto !important;
            height: 100%;
        }

        .el-tabs__item.is-left {
            text-align: left;
        }
    }
}
</style>
