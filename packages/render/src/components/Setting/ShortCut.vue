<template>
    <div class="shortcut">
        <el-form :model="shortcut" label-width="200px" label-position="left">
            <el-form-item>
                <template #label>
                    <i class="bi bi-type-h1"></i> {{ $t('setting.shortcut.h1') }}
                </template>
                <el-input v-model="shortcut.h1" />
            </el-form-item>
            <el-form-item>
                <template #label>
                    <i class="bi bi-type-h2"></i> {{ $t('setting.shortcut.h2') }}
                </template>
                <el-input v-model="shortcut.h2" />
            </el-form-item>
            <el-form-item>
                <template #label>
                    <i class="bi bi-type-h3"></i> {{ $t('setting.shortcut.h3') }}
                </template>
                <el-input v-model="shortcut.h3" />
            </el-form-item>
            <el-form-item>
                <template #label>
                    <i class="bi bi-sort-up"></i> {{ $t('setting.shortcut.h_up') }}
                </template>
                <el-input v-model="shortcut.h_up" />
            </el-form-item>
            <el-form-item>
                <template #label>
                    <i class="bi bi-sort-down"></i> {{ $t('setting.shortcut.h_down') }}
                </template>
                <el-input v-model="shortcut.h_down" />
            </el-form-item>
            <el-form-item>
                <template #label>
                    <i class="bi bi-paragraph"></i> {{ $t('setting.shortcut.paragraph') }}
                </template>
                <el-input v-model="shortcut.paragraph" />
            </el-form-item>

            <el-divider></el-divider>

            <el-form-item>
                <template #label>
                    <i class="bi bi-type-bold"></i> {{ $t('setting.shortcut.bold') }}
                </template>
                <el-input v-model="shortcut.bold" />
            </el-form-item>
            <el-form-item>
                <template #label>
                    <i class="bi bi-type-italic"></i> {{ $t('setting.shortcut.italics') }}
                </template>
                <el-input v-model="shortcut.italics" />
            </el-form-item>
            <el-form-item>
                <template #label>
                    <i class="bi bi-code"></i> {{ $t('setting.shortcut.code') }}
                </template>
                <el-input v-model="shortcut.code" />
            </el-form-item>
            <el-form-item>
                <template #label>
                    <i class="bi bi-type-underline"></i> {{ $t('setting.shortcut.underline') }}
                </template>
                <el-input v-model="shortcut.underline" />
            </el-form-item>
            <el-form-item>
                <template #label>
                    <i class="bi bi-type-strikethrough"></i> {{ $t('setting.shortcut.strikethrough') }}
                </template>
                <el-input v-model="shortcut.strikethrough" />
            </el-form-item>
            <el-form-item>
                <template #label>
                    <i class="bi bi-file-fill" style="transform: rotate(90deg);"></i> {{
                            $t('setting.shortcut.highlight')
                    }}
                </template>
                <el-input v-model="shortcut.highlight" />
            </el-form-item>
            <el-form-item>
                <template #label>
                    <i class="bi bi-text-indent-left"></i> {{ $t('setting.shortcut.indent_right') }}
                </template>
                <el-input v-model="shortcut.indent_right" />
            </el-form-item>
            <el-form-item>
                <template #label>
                    <i class="bi bi-text-indent-right"></i> {{ $t('setting.shortcut.indent_left') }}
                </template>
                <el-input v-model="shortcut.indent_left" />
            </el-form-item>

            <el-divider></el-divider>

            <el-form-item>
                <template #label>
                    <i class="bi bi-card-image"></i> {{ $t('setting.shortcut.insert_img') }}
                </template>
                <el-input v-model="shortcut.insert_img" />
            </el-form-item>
            <el-form-item>
                <template #label>
                    <i class="bi bi-table"></i> {{ $t('setting.shortcut.insert_table') }}
                </template>
                <el-input v-model="shortcut.insert_table" />
            </el-form-item>
            <el-form-item>
                <template #label>
                    <i class="bi bi-quote"></i> {{ $t('setting.shortcut.insert_quote') }}
                </template>
                <el-input v-model="shortcut.insert_quote" />
            </el-form-item>
            <el-form-item>
                <template #label>
                    <i class="bi bi-code-square"></i> {{ $t('setting.shortcut.insert_code') }}
                </template>
                <el-input v-model="shortcut.insert_code" />
            </el-form-item>
            <el-form-item>
                <template #label>
                    <i class="bi bi-infinity"></i> {{ $t('setting.shortcut.insert_formula') }}
                </template>
                <el-input v-model="shortcut.insert_formula" />
            </el-form-item>

            <el-divider></el-divider>

            <el-form-item>
                <template #label>
                    <i class="bi bi-list-columns-reverse"></i> {{ $t('setting.shortcut.all') }}
                </template>
                <el-input v-model="shortcut.all" />
            </el-form-item>
            <el-form-item>
                <template #label>
                    <i class="bi bi-arrow-counterclockwise"></i> {{ $t('setting.shortcut.undo') }}
                </template>
                <el-input v-model="shortcut.undo" />
            </el-form-item>
            <el-form-item>
                <template #label>
                    <i class="bi bi-arrow-clockwise"></i> {{ $t('setting.shortcut.redo') }}
                </template>
                <el-input v-model="shortcut.redo" />
            </el-form-item>
            <el-form-item>
                <template #label>
                    <i class="bi bi-clipboard-check"></i> {{ $t('setting.shortcut.copy') }}
                </template>
                <el-input v-model="shortcut.copy" />
            </el-form-item>
            <el-form-item>
                <template #label>
                    <i class="bi bi-clipboard-plus"></i> {{ $t('setting.shortcut.copy_markdown') }}
                </template>
                <el-input v-model="shortcut.copy_markdown" />
            </el-form-item>
            <el-form-item>
                <template #label>
                    <i class="bi bi-clipboard-minus"></i> {{ $t('setting.shortcut.paste') }}
                </template>
                <el-input v-model="shortcut.paste" />
            </el-form-item>
            <el-form-item>
                <template #label>
                    <i class="bi bi-clipboard"></i> {{ $t('setting.shortcut.paste_txt') }}
                </template>
                <el-input v-model="shortcut.paste_txt" />
            </el-form-item>
            <el-form-item>
                <template #label>
                    <i class="bi bi-clipboard-x"></i> {{ $t('setting.shortcut.cut') }}
                </template>
                <el-input v-model="shortcut.cut" />
            </el-form-item>

            <el-divider></el-divider>

            <el-form-item>
                <template #label>
                    <i class="bi bi-file-earmark-plus"></i> {{ $t('setting.shortcut.new_file') }}
                </template>
                <el-input v-model="shortcut.new_file" />
            </el-form-item>
            <el-form-item>
                <template #label>
                    <i class="bi bi-save"></i> {{ $t('setting.shortcut.save_file') }}
                </template>
                <el-input v-model="shortcut.save_file" />
            </el-form-item>
            <el-form-item>
                <template #label>
                    <i class="bi bi-save2"></i> {{ $t('setting.shortcut.save_as') }}
                </template>
                <el-input v-model="shortcut.save_as" />
            </el-form-item>
            <el-form-item>
                <template #label>
                    <i class="bi bi-x-circle"></i> {{ $t('setting.shortcut.close_file') }}
                </template>
                <el-input v-model="shortcut.close_file" />
            </el-form-item>
            <el-form-item>
                <template #label>
                    <i class="bi bi-lock"></i> {{ $t('setting.shortcut.lock_file') }}
                </template>
                <el-input v-model="shortcut.lock_file" />
            </el-form-item>
            <el-form-item>
                <template #label>
                    <i class="bi bi-unlock"></i> {{ $t('setting.shortcut.unlock_file') }}
                </template>
                <el-input v-model="shortcut.unlock_file" />
            </el-form-item>

            <el-divider></el-divider>

            <el-form-item>
                <template #label>
                    <i class="bi bi-arrows-fullscreen"></i> {{ $t('setting.shortcut.full_sreen') }}
                </template>
                <el-input v-model="shortcut.full_sreen" />
            </el-form-item>
            <el-form-item>
                <template #label>
                    <i class="bi bi-search"></i> {{ $t('setting.shortcut.search') }}
                </template>
                <el-input v-model="shortcut.search" />
            </el-form-item>
            <el-form-item>
                <template #label>
                    <i class="bi bi-binoculars"></i> {{ $t('setting.shortcut.global_search') }}
                </template>
                <el-input v-model="shortcut.global_search" />
            </el-form-item>
            <el-form-item>
                <template #label>
                    <i class="bi bi-arrow-repeat"></i> {{ $t('setting.shortcut.replace') }}
                </template>
                <el-input v-model="shortcut.replace" />
            </el-form-item>
        </el-form>

        <el-button class="default" type="primary" @click="restoreDialogVisible = true">{{ $t("setting.default") }}
        </el-button>
    </div>

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
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from 'vue'
import { shortcutFile, shortcutFileDefault } from "@/api/init"
import fs from 'fs'

const restoreDialogVisible = ref(false)

const shortcut = reactive({
    h1: 'Ctrl+1',
    h2: 'Ctrl+2',
    h3: 'Ctrl+3',
    h_up: 'Ctrl+"+"',
    h_down: 'Ctrl+"-"',
    paragraph: 'Ctrl+0',

    bold: 'Ctrl+B',
    underline: 'Ctrl+U',
    italics: 'Ctrl+I',
    strikethrough: 'Ctrl+D',
    highlight: 'Ctrl+Shift+H',
    code: 'Ctrl+`',
    indent_right: 'Tab',
    indent_left: 'Shift+Tab',

    insert_img: 'Ctrl+Shift+I',
    insert_table: 'Ctrl+T',
    insert_code: 'Ctrl+Shift+`',
    insert_formula: 'Ctrl+Shift+F',
    insert_quote: 'Ctrl+Shift+Q',

    all: 'Ctrl+A',
    undo: 'Ctrl+Z',
    redo: 'Ctrl+Shift+Z',
    copy: 'Ctrl+C',
    copy_markdown: 'Ctrl+Shift+C',
    paste: 'Ctrl+V',
    paste_txt: 'Ctrl+Shift+V',
    cut: 'Ctrl+X',

    new_file: 'Ctrl+N',
    save_file: 'Ctrl+S',
    save_as: 'Ctrl+Shift+S',
    close_file: 'Ctrl+W',
    lock_file: 'Ctrl+L',
    unlock_file: 'Ctrl+Shift+L',

    full_sreen: 'F11',
    search: 'Ctrl+F',
    global_search: 'Ctrl+Shift+F',
    replace: 'Ctrl+H'
})

const readSetting = (shortcutFile: string) => {
    try {
        const data = fs.readFileSync(shortcutFile).toString()
        let JSONData = JSON.parse(data)
        for (let key in JSONData) {
            shortcut[key] = JSONData[key]
        }
    } catch {
        restoreDefault()
    }
}

const saveSetting = () => {
    const data = JSON.stringify(shortcut);
    fs.writeFileSync(shortcutFile, data);
    location.reload()
}

const restoreDefault = () => {
    fs.writeFile(shortcutFile, fs.readFileSync(shortcutFileDefault), () => {
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
    readSetting(shortcutFile)
    watch(shortcut, () => {
        debounce(saveSetting, 1000)
    })
})
</script>

<style lang="scss" scoped>
.shortcut {
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
