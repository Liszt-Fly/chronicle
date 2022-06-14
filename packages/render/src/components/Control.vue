<template>
    <div class="control">
        <el-button key="plain" text> <i class="bi bi-list"></i></el-button>

        <div class="brand">
            <!-- <span>Chronicle</span> -->
        </div>

        <div class="btn-groups">
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

const minWindow = () => {
    ipcRenderer.send('min-app')
}
const closeWindow = () => {
    ipcRenderer.send('close-app')
}
const maxRestoreWindow = () => {
    ipcRenderer.send('window-max');
}

ipcRenderer.on('main-window-max', () => {
    winMax.value = false
});
ipcRenderer.on('main-window-unmax', () => {
    winMax.value = true
});


</script>

<style lang="scss" scoped>
.control {
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
