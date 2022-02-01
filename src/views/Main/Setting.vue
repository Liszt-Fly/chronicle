<template>
    <div class="config">
        <el-form ref="formRef" :model="config" label-width="6rem" label-position="left">
            <el-form-item label="欢迎页面">
                <el-checkbox v-model="config.welcome_switch" label="启动时显示欢迎页面"></el-checkbox>
            </el-form-item>
            <el-form-item label="全局样式">
                <el-select v-model="config.global_style" placeholder="选择全局样式">
                    <el-option label="浅色模式" value="light"></el-option>
                    <el-option label="暗黑模式" value="dark"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="编辑器样式">
                <el-select v-model="config.editor_style" placeholder="选择编辑器样式">
                    <el-option label="浅色模式" value="light"></el-option>
                    <el-option label="暗黑模式" value="dark"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="saveSetting">保存</el-button>
                <el-button @click="restoreDefault">恢复默认值</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue'
const fs = window.require('fs');
let configFile = process.cwd() + "/example/chronicle.config.json"
let config = reactive({
    "global_style": "",
    "editor_style": "",
    "welcome_switch": false,
})

const readSetting = () => {
    try {
        const data = fs.readFileSync(configFile)
        let JSONData = JSON.parse(data)
        for (let key in JSONData) {
            config[key] = JSONData[key]
        }
    } catch {
        restoreDefault()
        saveSetting()
    }
}

const saveSetting = () => {
    const data = JSON.stringify(config);

    fs.writeFile(configFile, data, (err: ErrorEvent) => {
        if (err) {
            throw err;
        }
    });
}

const restoreDefault = () => {
    config.global_style = 'light'
    config.editor_style = 'light'
    config.welcome_switch = true
}

onMounted(() => {
    readSetting()
})
</script>

<style scoped>
.config {
    padding: 1rem;
    margin: auto;
    text-align: center;
}
</style>
