<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue'
import { generalFile, generalFileDefault } from "@/api/init"
import fs from 'fs-extra'

const autoSaveTimes = [3, 5, 10, 60]
const general = reactive({
    devTools: false,
    autoSave: false,
    autoSaveTime: 3
})

const readSetting = (generalFile: string) => {
    try {
        const data = fs.readFileSync(generalFile).toString()
        let JSONData = JSON.parse(data)
        for (let key in JSONData) {
            general[key] = JSONData[key]
        }
    } catch {
        restoreDefault()
    }
}

const saveSetting = () => {
    const data = JSON.stringify(general);
    fs.writeFileSync(generalFile, data);
    location.reload()
}

const restoreDefault = () => {
    fs.writeFile(generalFile, fs.readFileSync(generalFileDefault), () => {
        location.reload()
    })
}

onMounted(() => {
    readSetting(generalFile)
    watch(general, () => {
        saveSetting()
    })
})
</script>

<template>
    <div class="general">
        <el-form label-width="180px" :model="general" label-position="left">
            <el-form-item>
                <template #label>
                    <i class="bi bi-terminal"></i> 开发者工具
                </template>
                <el-switch v-model="general.devTools" />
            </el-form-item>

            <el-divider></el-divider>

            <el-form-item>
                <template #label>
                    <i class="bi bi-file-earmark-arrow-down"></i> 自动保存
                </template>
                <el-switch v-model="general.autoSave" />
            </el-form-item>

            <el-form-item>
                <template #label>
                    <i class="bi bi-stopwatch"></i> 自动保存间隔
                </template>
                <el-select :disabled="!general.autoSave" v-model="general.autoSaveTime" placeholder="Select">
                    <el-option v-for="time in autoSaveTimes" :key="time" :label="time + '分钟'" :value="time" />
                </el-select>
            </el-form-item>

            <div class="home">
                <router-link to="/">
                    <el-button type="primary"><i class="bi bi-house-heart"></i>回到主页</el-button>
                </router-link>
            </div>

            <!-- <h1>Made with ❤️</h1> -->

        </el-form>
    </div>
</template>

<style lang="scss" scoped>
.general {
    padding: 1rem;
    text-align: center;
    max-width: 400px;
    height: 100%;
    margin: auto;
    user-select: none;

    .el-form-item__label i {
        margin-right: 6px;
        font-size: 1rem
    }

    .el-dialog__body {
        text-align: center;
    }

    h1 {
        margin: 20px
    }

    .home {
        width: 100%;
        margin: 20px 0;

        a {
            text-decoration: none;

            i {
                margin-right: 6px;
                font-size: 1rem
            }

            .el-button {
                width: 100%;
            }
        }
    }
}
</style>
