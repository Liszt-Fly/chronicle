<template>
    <div class="setting">
        <div>
            <router-link to="/Setting/Info">
                <el-button key="primary" type="primary" text>{{ $t('setting.info_tab') }}
                </el-button>
            </router-link>
            <router-link to="/Setting/General">
                <el-button key="primary" type="primary" text>{{ $t('setting.general_tab')
                }}
                </el-button>
            </router-link>
            <router-link to="/Setting/Appearance">
                <el-button key="primary" type="primary" text>
                    {{ $t('setting.appearance_tab') }}</el-button>
            </router-link>
            <router-link to="/Setting/Shortcut">
                <el-button key="primary" type="primary" text>{{
                        $t('setting.shortcut_tab')
                }}
                </el-button>
            </router-link>
        </div>

        <el-scrollbar>
            <router-view></router-view>
        </el-scrollbar>
    </div>
</template>

<script lang="ts" setup>
import Shortcut from "@/components/Setting/Shortcut.vue"
import Appearance from "@/components/Setting/Appearance.vue"
import General from "@/components/Setting/General.vue"
import Info from "@/components/Setting/Info.vue"

import { ref } from "vue";
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
