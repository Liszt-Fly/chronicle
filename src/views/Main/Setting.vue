<template>
    <div class="setting">
        <el-form ref="formRef" :model="setting" label-width="6rem" label-position="left">
            <el-form-item label="欢迎页面">
                <el-checkbox v-model="setting.welcome_switch" label="启动时显示欢迎页面"></el-checkbox>
            </el-form-item>
            <el-form-item label="全局样式">
                <el-select v-model="setting.frame_style" placeholder="选择全局样式">
                    <el-option label="浅色模式" value="light"></el-option>
                    <el-option label="暗黑模式" value="dark"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="编辑器样式">
                <el-select v-model="setting.editor_style" placeholder="选择编辑器样式">
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

let setting = reactive({
    frame_style: '',
    editor_style: '',
    welcome_switch: false,
})

const readSetting = () => {
    // todo:
    console.log("读取配置文件");
}

const saveSetting = () => {
    // todo:
    console.log(JSON.stringify(setting))
}

const restoreDefault = () => {
    setting.frame_style = 'light'
    setting.editor_style = 'light'
    setting.welcome_switch = true
}

onMounted(() => {
    readSetting()
})
</script>

<style scoped>
.setting {
    padding: 1rem;
    margin: auto;
    text-align: center;
}
</style>
