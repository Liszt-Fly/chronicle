<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue'
import { appearanceFile, appearanceFileDefault } from "@/api/init"
import { Sunny, Moon } from '@element-plus/icons-vue'
import fs from 'fs'

const restoreDialogVisible = ref(false)
const global_en_fonts = ["Verdana", "Arial", "Times New Roman"]
const global_cn_fonts = ["微软雅黑", "楷体", "宋体"]
const code_fonts = ["Consolas", "Cascadia Code", "Courier"]
const predefineColors = [
    "#f596aa", "#9f353a", "#cb4042", "#b9887d", "#947a6d", "#939650", "#89916b", "#b5caa0", "#58b2dc", "#6a4c9c", "#ffb11b"
]

let appearance = reactive({
    "theme": "",
    "color": "",
    "global_en_font": "",
    "global_cn_font": "",
    "code_font": "",
})

const readSetting = (appearanceFile: string) => {
    try {
        const data = fs.readFileSync(appearanceFile).toString()
        let JSONData = JSON.parse(data)
        for (let key in JSONData) {
            appearance[key] = JSONData[key]
        }
    } catch {
        restoreDefault()
    }
}

const saveSetting = () => {
    const data = JSON.stringify(appearance);
    fs.writeFileSync(appearanceFile, data);
    location.reload()
}

const restoreDefault = () => {
    fs.writeFile(appearanceFile, fs.readFileSync(appearanceFileDefault), () => {
        location.reload()
    })
}

let timeout = null

const debounce = (fn, wait) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => {
        fn()
    }, wait)
}

onMounted(() => {
    readSetting(appearanceFile)
    watch(appearance, () => {
        debounce(saveSetting, 1000)
    })
})
</script>

<template>
    <div class="appearance">
        <el-form ref="formRef" :model="appearance" label-width="200px" label-position="left">
            <el-form-item>
                <template #label>
                    <i class="bi bi-brightness-alt-high"></i> {{ $t('setting.appearance.theme') }}
                </template>
                <el-switch v-model="appearance.theme" :inactive-icon="Moon" :active-icon="Sunny" inline-prompt />
            </el-form-item>
            <el-form-item>
                <template #label>
                    <i class="bi bi-paint-bucket"></i> {{ $t('setting.appearance.color') }}
                </template>
                <el-color-picker v-model="appearance.color" :predefine="predefineColors" />
            </el-form-item>

            <el-divider></el-divider>

            <el-form-item>
                <template #label>
                    <i class="bi bi-type"></i> {{ $t('setting.appearance.global_en_font') }}
                </template>
                <el-select v-model="appearance.global_en_font">
                    <el-option v-for="gf in global_en_fonts" :label="gf" :key="gf" :value="gf">{{ gf }}
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item>
                <template #label>
                    <i class="bi bi-fonts"></i> {{ $t('setting.appearance.global_cn_font') }}
                </template>
                <el-select v-model="appearance.global_cn_font">
                    <el-option v-for="gf in global_cn_fonts" :label="gf" :key="gf" :value="gf">{{ gf }}
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item>
                <template #label>
                    <i class="bi bi-braces"></i> {{ $t('setting.appearance.code_font') }}
                </template>
                <el-select v-model="appearance.code_font">
                    <el-option v-for="cf in code_fonts" :label="cf" :key="cf" :value="cf">{{ cf }}
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>

        <el-button class="default" type="primary" @click="restoreDialogVisible = true">{{ $t("setting.default") }}
        </el-button>

        <el-dialog v-model="restoreDialogVisible" width="300px">
            <span>{{ $t("setting.restore") }}</span>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="restoreDialogVisible = false">{{ $t("setting.cancel") }}</el-button>
                    <el-button type="primary" @click="restoreDefault(), restoreDialogVisible = false">{{
                            $t("setting.sure")
                    }}
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<style lang="scss" scoped>
.appearance {
    padding: 1rem;
    text-align: center;
    max-width: 400px;
    margin: auto;
    user-select: none;

    .el-form-item__label i {
        margin-right: 1rem;
        font-size: 1rem
    }

    .default {
        width: 100%;
    }

    .el-dialog__body {
        text-align: center;
    }
}
</style>

<style>
.el-switch__core .el-switch__inner {
    transition: none !important;
}

.el-switch .el-icon.is-icon.is-show {
    position: relative;
    right: 18px;
    color: var(--el-color-info);
    z-index: 99;
    font-size: 0.8rem;
}

.el-switch.is-checked .el-icon.is-icon.is-show {
    position: relative;
    left: 19px;
    color: var(--el-color-info);
    z-index: 99;
    font-size: 0.7rem;
}
</style>
