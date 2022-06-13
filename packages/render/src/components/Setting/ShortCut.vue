<template>
    <div class="shortcut">
        <el-form :model="shortcut" label-width="180px" label-position="left">
            <el-form-item>
                <template #label>
                    <i class="bi bi-type-h1"></i> 设为一级标题
                </template>
                <el-input v-model="shortcut.h1" />
            </el-form-item>
            <el-form-item>
                <template #label>
                    <i class="bi bi-type-h2"></i> 设为二级标题
                </template>
                <el-input v-model="shortcut.h2" />
            </el-form-item>
            <el-form-item>
                <template #label>
                    <i class="bi bi-type-h3"></i> 设为三级标题
                </template>
                <el-input v-model="shortcut.h3" />
            </el-form-item>
            <el-form-item>
                <template #label>
                    <i class="bi bi-sort-up"></i> 提升标题级别
                </template>
                <el-input v-model="shortcut.h_up" />
            </el-form-item>
            <el-form-item>
                <template #label>
                    <i class="bi bi-sort-down"></i> 降低标题级别
                </template>
                <el-input v-model="shortcut.h_down" />
            </el-form-item>
            <el-form-item>
                <template #label>
                    <i class="bi bi-paragraph"></i> 设为段落
                </template>
                <el-input v-model="shortcut.paragraph" />
            </el-form-item>

            <el-divider></el-divider>

            <el-form-item>
                <template #label>
                    <i class="bi bi-type-bold"></i> 字体加粗
                </template>
                <el-input v-model="shortcut.bold" />
            </el-form-item>
            <el-form-item>
                <template #label>
                    <i class="bi bi-type-italic"></i> 设为斜体
                </template>
                <el-input v-model="shortcut.italics" />
            </el-form-item>
            <el-form-item>
                <template #label>
                    <i class="bi bi-code"></i> 设为代码片
                </template>
                <el-input v-model="shortcut.code" />
            </el-form-item>
            <el-form-item>
                <template #label>
                    <i class="bi bi-type-underline"></i> 添加下划线
                </template>
                <el-input v-model="shortcut.underline" />
            </el-form-item>
            <el-form-item>
                <template #label>
                    <i class="bi bi-type-strikethrough"></i> 添加删除线
                </template>
                <el-input v-model="shortcut.delete_line" />
            </el-form-item>

            <el-divider></el-divider>

            <el-form-item>
                <template #label>
                    <i class="bi bi-card-image"></i> 插入图片
                </template>
                <el-input v-model="shortcut.insert_img" />
            </el-form-item>
            <el-form-item>
                <template #label>
                    <i class="bi bi-table"></i> 插入表格
                </template>
                <el-input v-model="shortcut.insert_table" />
            </el-form-item>
            <el-form-item>
                <template #label>
                    <i class="bi bi-quote"></i> 插入引用块
                </template>
                <el-input v-model="shortcut.insert_quote" />
            </el-form-item>
            <el-form-item>
                <template #label>
                    <i class="bi bi-code-square"></i> 插入代码块
                </template>
                <el-input v-model="shortcut.insert_code" />
            </el-form-item>
            <el-form-item>
                <template #label>
                    <i class="bi bi-infinity"></i> 插入公式块
                </template>
                <el-input v-model="shortcut.insert_formula" />
            </el-form-item>

            <el-divider></el-divider>

            <el-form-item>
                <template #label>
                    <i class="bi bi-clipboard-check"></i> 普通复制
                </template>
                <el-input v-model="shortcut.copy" />
            </el-form-item>
            <el-form-item>
                <template #label>
                    <i class="bi bi-clipboard-plus"></i> 以 MarkDown 语法复制
                </template>
                <el-input v-model="shortcut.copy_markdown" />
            </el-form-item>
            <el-form-item>
                <template #label>
                    <i class="bi bi-clipboard-minus"></i> 普通粘贴
                </template>
                <el-input v-model="shortcut.paste" />
            </el-form-item>
            <el-form-item>
                <template #label>
                    <i class="bi bi-clipboard"></i> 粘贴为纯文本
                </template>
                <el-input v-model="shortcut.paste_txt" />
            </el-form-item>
            <el-form-item>
                <template #label>
                    <i class="bi bi-clipboard-x"></i> 剪切
                </template>
                <el-input v-model="shortcut.cut" />
            </el-form-item>

            <el-divider></el-divider>

            <el-form-item>
                <template #label>
                    <i class="bi bi-file-earmark-plus"></i> 新建文件
                </template>
                <el-input v-model="shortcut.new_file" />
            </el-form-item>
            <el-form-item>
                <template #label>
                    <i class="bi bi-file-earmark-check"></i> 保存文件
                </template>
                <el-input v-model="shortcut.save_file" />
            </el-form-item>
            <el-form-item>
                <template #label>
                    <i class="bi bi-file-earmark-check-fill"></i> 另存为
                </template>
                <el-input v-model="shortcut.save_as" />
            </el-form-item>
            <el-form-item>
                <template #label>
                    <i class="bi bi-x-circle"></i> 关闭文件
                </template>
                <el-input v-model="shortcut.close_file" />
            </el-form-item>
            <el-form-item>
                <template #label>
                    <i class="bi bi-arrow-clockwise"></i> 重新打开关闭的文件
                </template>
                <el-input v-model="shortcut.reopen_closed_file" />
            </el-form-item>
            <el-form-item>
                <template #label>
                    <i class="bi bi-lock"></i> 加锁
                </template>
                <el-input v-model="shortcut.lock" />
            </el-form-item>
            <el-form-item>
                <template #label>
                    <i class="bi bi-unlock"></i> 解锁
                </template>
                <el-input v-model="shortcut.unlock" />
            </el-form-item>

            <el-divider></el-divider>

            <el-form-item>
                <template #label>
                    <i class="bi bi-arrows-fullscreen"></i> 全屏
                </template>
                <el-input v-model="shortcut.full_sreen" />
            </el-form-item>
            <el-form-item>
                <template #label>
                    <i class="bi bi-search"></i> 查找
                </template>
                <el-input v-model="shortcut.search" />
            </el-form-item>
            <el-form-item>
                <template #label>
                    <i class="bi bi-arrow-repeat"></i> 替换
                </template>
                <el-input v-model="shortcut.replace" />
            </el-form-item>
        </el-form>

        <el-button class="default" type="primary" @click="restoreDialogVisible = true">{{ $t("setting.default") }}
        </el-button>
    </div>

    <el-dialog v-model="restoreDialogVisible" width="16rem">
        <span>确定恢复默认设置吗？</span>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="restoreDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="restoreDefault, restoreDialogVisible = false">确定
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'

const shortcut = reactive({
    paragraph: 'Ctrl+0',
    h1: 'Ctrl+1',
    h2: 'Ctrl+2',
    h3: 'Ctrl+3',
    h_up: 'Ctrl+"+"',
    h_down: 'Ctrl+"-"',

    bold: 'Ctrl+B',
    underline: 'Ctrl+U',
    italics: 'Ctrl+I',
    delete_line: 'Ctrl+D',
    code: 'Ctrl+`',

    insert_img: 'Ctrl+Shift+I',
    insert_table: 'Ctrl+T',
    insert_code: 'Ctrl+Shift+`',
    insert_formula: 'Ctrl+Shift+F',
    insert_quote: 'Ctrl+Shift+Q',

    copy: 'Ctrl+C',
    copy_markdown: 'Ctrl+Shift+C',
    paste: 'Ctrl+V',
    paste_txt: 'Ctrl+Shift+V',
    cut: 'Ctrl+X',

    new_file: 'Ctrl+N',
    save_file: 'Ctrl+S',
    save_as: 'Ctrl+Shift+S',
    close_file: 'Ctrl+W',
    reopen_closed_file: 'Ctrl+Shift+T',
    lock: 'Ctrl+L',
    unlock: 'Ctrl+Shift+L',

    full_sreen: 'F11',
    search: 'Ctrl+F',
    replace: 'Ctrl+H'
})

let restoreDialogVisible = ref(false)

let restoreDefault = () => {
    console.log("restore");
}
</script>

<style lang="scss" scoped>
.shortcut {
    padding: 1rem;
    text-align: center;
    max-width: 400px;
    margin: auto;
    user-select: none;

    .el-form-item__label i {
        margin-right: 6px;
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
