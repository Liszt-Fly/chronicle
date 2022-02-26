<template>
    <div class="setting">
        <el-form ref="formRef" :model="config" label-width="8rem" label-position="left">
            <el-form-item :label="$t('setting.global_theme')">
                <el-select
                    v-model="config.global_theme"
                    :placeholder="$t('setting.select_global_theme')"
                >
                    <el-option :label="$t('setting.light')" value="light"></el-option>
                    <el-option :label="$t('setting.dark')" value="dark"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item :label="$t('setting.editor_theme')">
                <el-select v-model="config.editor_theme" :placeholder="$t('setting.editor_theme')">
                    <el-option :label="$t('setting.light')" value="light"></el-option>
                    <el-option :label="$t('setting.dark')" value="dark"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item :label="$t('setting.code_theme')">
                <el-select
                    v-model="config.code_theme"
                    :placeholder="$t('setting.select_code_theme')"
                >
                    <el-option :label="$t('setting.light')" value="light"></el-option>
                    <el-option :label="$t('setting.dark')" value="dark"></el-option>
                </el-select>
            </el-form-item>

            <el-divider></el-divider>

            <el-form-item :label="$t('setting.global_font')">
                <el-input v-model="config.global_font" clearable />
            </el-form-item>
            <el-form-item :label="$t('setting.code_font')">
                <el-input v-model="config.code_font" clearable />
            </el-form-item>

            <el-divider></el-divider>

            <el-form-item :label="$t('setting.language')">
                <el-select v-model="config.locale" :placeholder="$t('setting.select_language')">
                    <el-option
                        v-for="locale in $i18n.availableLocales"
                        :label="locale"
                        :key="`locale-${locale}`"
                        :value="locale"
                    >{{ locale }}</el-option>
                </el-select>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="saveDialogVisible = true">{{ $t("setting.save") }}</el-button>
                <el-button @click="restoreDialogVisible = true">{{ $t("setting.default") }}</el-button>
            </el-form-item>
        </el-form>

        <el-dialog v-model="saveDialogVisible" width="16rem">
            <span>确定保存吗？</span>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="saveDialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="saveSetting(), saveDialogVisible = false">确定</el-button>
                </span>
            </template>
        </el-dialog>

        <el-dialog v-model="restoreDialogVisible" width="16rem">
            <span>确定恢复默认设置吗？</span>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="restoreDialogVisible = false">取消</el-button>
                    <el-button
                        type="primary"
                        @click="restoreDefault(), restoreDialogVisible = false"
                    >确定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { configFile, defaultConfigFile } from "@/api/init"
import { Iconfig } from '@/api/interfaces/type';

const fs = window.require('fs');

const saveDialogVisible = ref(false)
const restoreDialogVisible = ref(false)

let config: Iconfig = reactive({
    "global_theme": "",
    "editor_theme": "",
    "code_theme": "",
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
    readSetting(defaultConfigFile)
    saveSetting()
}

onMounted(() => {
    readSetting(configFile)
})
</script>

<style scoped>
.setting {
    padding: 1rem;
    text-align: center;
}
</style>
