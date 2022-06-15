<template>
    <div class="control">
        <div v-if="!isMac">
            <el-button-group>
                <el-tooltip :content="$t('control.toggle_sidebar')" placement="bottom-start" effect="dark">
                    <el-button key="plain" text @click="ToggleSidebar" class="contrlIcon">
                        <i class="bi bi-window-sidebar" v-if="sideBar"></i>
                        <i class="bi bi-window" v-else></i>
                    </el-button>
                </el-tooltip>

                <tmplate class="devTools">
                    <el-tooltip :content="$t('control.refresh')" placement="bottom-start" effect="dark">
                        <el-button class="contrlIcon" key="plain" text @click="Refresh">
                            <i class="bi bi-bootstrap-reboot"></i>
                        </el-button>
                    </el-tooltip>
                    <el-tooltip :content="$t('control.toggle_devTools')" placement="bottom-start" effect="dark">
                        <el-button class="contrlIcon" key="plain" text @click="ToggleDevTools">
                            <i class="bi bi-terminal-dash" v-if="devTools"></i>
                            <i class="bi bi-terminal-plus" v-else></i>
                        </el-button>
                    </el-tooltip>
                </tmplate>
            </el-button-group>
        </div>

        <div class="brand">
            {{ workspaceName }}
        </div>

        <div class="btn-groups" v-if="!isMac">
            <el-button-group>
                <el-tooltip :content="$t('control.minimise')" placement="bottom-start" effect="dark">
                    <el-button key="plain" text @click="minWindow">
                        <i class="bi bi-dash-lg"></i>
                    </el-button>
                </el-tooltip>
                <el-tooltip :content="winMax ? $t('control.maximise') : $t('control.restore')" placement="bottom-start"
                    effect="dark">
                    <el-button key="plain" text @click="maxRestoreWindow">
                        <i class="bi bi-square" v-if="winMax"></i>
                        <i class="bi bi-files" v-else style="transform: scaleX(1.3)"></i>
                    </el-button>
                </el-tooltip>
                <el-tooltip :content="$t('control.refresh')" placement="bottom-start" effect="dark">
                    <el-button key="plain" text @click="closeWindow" class="danger">
                        <i class="bi bi-x-lg" @click=""></i>
                    </el-button>
                </el-tooltip>
            </el-button-group>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ipcRenderer } from 'electron'
import { ref } from 'vue'
import { workspaceName } from '@/api/init'

let winMax = ref(true)
let sideBar = ref(true)
let devTools = ref(false)
const isMac = /macintosh|mac os x/i.test(navigator.userAgent);

const minWindow = () => {
    ipcRenderer.send('min-app')
}
const closeWindow = () => {
    ipcRenderer.send('close-app')
}
const maxRestoreWindow = () => {
    ipcRenderer.send('window-max');
}
const Refresh = () => {
    location.reload()
}

const ToggleDevTools = () => {
    devTools.value = !devTools.value;
    ipcRenderer.send('devTools');
}

ipcRenderer.on('main-window-max', () => {
    winMax.value = false
});
ipcRenderer.on('main-window-unmax', () => {
    winMax.value = true
});

const ToggleSidebar = () => {
    sideBar.value = !sideBar.value

    let tab = document.getElementsByClassName("tab-system")[0] as HTMLDivElement;
    if (tab) {
        if (tab.style.display != "none")
            tab.style.display = "none"
        else tab.style.display = "flex"
    }

    let fileSystem = document.getElementsByClassName("column-left")[0] as HTMLDivElement;
    if (fileSystem) {
        if (fileSystem.style.display != "none")
            fileSystem.style.display = "none"
        else fileSystem.style.display = "block"
    }
}

</script>

<style lang="scss" scoped>
.control {
    height: 38px;
    font-size: 1rem;
    font-weight: 900;
    user-select: none;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .el-button.is-text:not(.is-disabled):focus {
        background-color: var(--el-bg-color);
    }

    .el-button.is-text:not(.is-disabled):focus:hover {
        background-color: var(--el-fill-color-light);
    }

    .el-button.is-text:not(.is-disabled).danger:hover {
        background-color: red;
        color: white;
    }

    .bi-back {
        transform: rotate(270deg);
        position: relative;
        bottom: 1px;
    }

    .brand {
        -webkit-app-region: drag;
        user-select: none;
        display: inline-block;
        flex: 1;
        text-align: center;
        color: var(--chronicle-theme-color);
        font-size: 0.9rem;
        line-height: 2.5;

        span {
            font-weight: 900;
        }
    }

    .btn-groups {
        .el-button {
            padding: 12px;
            font-size: 0.7rem;
        }
    }

    .el-button+.el-button {
        margin-left: 0;
    }

    .contrlIcon {
        font-size: 1rem;
        padding-left: 16px;
    }
}
</style>
