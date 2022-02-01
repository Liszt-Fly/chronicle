<template>
    <div class="setting">
        <el-form ref="formRef" :model="config" label-width="6rem" label-position="left">
            <el-form-item label="欢迎页面">
                <el-checkbox v-model="config.welcome_switch" label="启动时显示欢迎页面"></el-checkbox>
            </el-form-item>
            <el-form-item label="全局主题">
                <el-select v-model="config.global_theme" placeholder="选择全局主题">
                    <el-option label="light" value="light"></el-option>
                    <el-option label="dark" value="dark"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="编辑器主题">
                <el-select v-model="config.editor_theme" placeholder="选择编辑器主题">
                    <el-option label="light" value="light"></el-option>
                    <el-option label="dark" value="dark"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="代码块主题">
                <el-select v-model="config.code_theme" placeholder="选择代码块主题">
                    <el-option label="light" value="light"></el-option>
                    <el-option label="dark" value="dark"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="saveDialogVisible = true">保存</el-button>
                <el-button @click="restoreDialogVisible = true">恢复默认值</el-button>
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

const fs = window.require('fs');

const saveDialogVisible = ref(false)
const restoreDialogVisible = ref(false)

let config = reactive({
    "global_theme": "",
    "editor_theme": "",
    "code_theme": "",
    "welcome_switch": false,
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
    margin: auto;
    text-align: center;
    width: 60%;
}
</style>
