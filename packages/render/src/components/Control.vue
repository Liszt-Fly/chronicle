<template>
    <div class="control">
        <div v-if="!isMac">
            <el-tooltip :content="$t('control.switch_sidebar')" placement="bottom-start" effect="dark">
                <el-button key="plain" text @click="ToggleSidebar">
                    <i class="bi bi-window-sidebar" v-if="sideBar"></i>
                    <i class="bi bi-window" v-else></i>
                </el-button>
            </el-tooltip>
            <el-tooltip :content="$t('control.toggle_devTools')" placement="bottom-start" effect="dark">
                <el-button class="devTools" key="plain" text @click="ToggleDevTools">
                    <i class="bi bi-terminal-dash" v-if="devTools"></i>
                    <i class="bi bi-terminal-plus" v-else></i>
                </el-button>
            </el-tooltip>
        </div>

        <div class="brand">
            <!-- <span>Chronicle</span> -->
        </div>

        <div class="btn-groups" v-if="!isMac">
            <el-button key="plain" text @click="minWindow">
                <i class="bi bi-dash-lg"></i>
            </el-button>
            <el-button key="plain" text @click="maxRestoreWindow">
                <i class="bi bi-square" v-if="winMax"></i>
                <i class="bi bi-back" v-else></i>
            </el-button>
            <el-button key="plain" text @click="closeWindow" class="danger">
                <i class="bi bi-x-lg" @click=""></i>
            </el-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ipcRenderer } from 'electron'
import { ref } from 'vue'

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
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 100%;

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
        line-height: 2;

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
}
</style>
