<template>
    <div class="setting">
        <el-form ref="formRef" :model="config" label-width="10rem" label-position="left">
            <el-form-item :label="$t('setting.select_theme')">
                <el-switch v-model="config.theme" :inactive-icon="Moon" :active-icon="Sunny" />
            </el-form-item>
            <el-form-item :label="$t('setting.select_color')">
                <el-color-picker v-model="config.color" />
            </el-form-item>

            <el-divider></el-divider>

            <el-form-item :label="$t('setting.global_font')">
                <el-select v-model="config.global_font">
                    <el-option v-for="gf in global_fonts" :label="gf" :key="gf" :value="gf">{{ gf }}</el-option>
                </el-select>
            </el-form-item>

            <el-form-item :label="$t('setting.code_font')">
                <el-select v-model="config.code_font">
                    <el-option v-for="cf in code_fonts" :label="cf" :key="cf" :value="cf">{{ cf }}</el-option>
                </el-select>
            </el-form-item>

            <el-divider></el-divider>

            <el-form-item :label="$t('setting.language')">
                <el-select v-model="config.locale" :placeholder="$t('setting.select_language')">
                    <el-option v-for="locale in $i18n.availableLocales" :label="locale" :key="`locale-${locale}`"
                        :value="locale">{{ locale }}</el-option>
                </el-select>
            </el-form-item>

            <el-form-item>
                <el-button @click="restoreDialogVisible = true">{{ $t("setting.default") }}</el-button>
            </el-form-item>
        </el-form>

        <el-dialog v-model="restoreDialogVisible" width="16rem">
            <span>确定恢复默认设置吗？</span>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="restoreDialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="restoreDefault(), restoreDialogVisible = false">确定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, watch, watchEffect } from 'vue'
import { configFile, defaultConfigFile } from "@/api/init"
import { Iconfig } from '../interfaces/type';
import { Sunny, Moon } from '@element-plus/icons-vue'

const fs = window.require('fs');
const restoreDialogVisible = ref(false)

const global_fonts = ["Futura", "Verdana", "Arial", "Helvetica", "Adobe Garamond", "Caslon", "Bodoni", "Times New Roman"]
const code_fonts = ["Hack", "Monaco", "Source Code Pro", "San Francisco Mono", "Consolas", "Cascadia Code", "Courier"]

let config: Iconfig = reactive({
    "theme": "",
    color: "",
    "global_font": "",
    "code_font": "",
    "locale": ""
})

const readSetting = (configFile: string) => {
    try {
        const data = fs.readFileSync(configFile)
        let JSONData = JSON.parse(data)
        for (let key in JSONData) {
            config[key] = JSONData[key]
        }
    } catch {
        restoreDefault()
    }
}

const saveSetting = () => {
    const data = JSON.stringify(config);

    fs.writeFileSync(configFile, data, (err: ErrorEvent) => {
        if (err) {
            throw err;
        }
    });

    location.reload()
}

const restoreDefault = () => {
    fs.writeFile(configFile, fs.readFileSync(defaultConfigFile), () => {
        location.reload()
    })
}

onMounted(() => {
    readSetting(configFile)
    watch(config, () => {
        saveSetting()
    })
})
</script>

<style scoped>
.setting {
    padding: 1rem;
    text-align: center;
    max-width: 400px;
    margin: auto;
}
</style>
