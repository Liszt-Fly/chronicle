<template>
    <div class="editor" id="vditor" ref="editor" @keydown.ctrl="save"></div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, watchEffect, } from "vue";
import fsp from "fs-extra";
import path from "path";
import { currentFile, openFiles } from "@/data/configdb";
import Vditor from "vditor";
import "@/style/vditor.css"
import { vditorTheme } from "@/api/init";
let editor = ref<HTMLElement | null>();
let vditor: Vditor | null = null;
//存储文章
function save(event: KeyboardEvent) {
    if (event.keyCode == 83) {
        fsp.writeFileSync(currentFile.value, vditor!.getValue());
    }
}

onMounted(() => {
    vditor = new Vditor("vditor", {
        counter: {
            "enable": true, after: (len) => { }
        },
        preview: {
            markdown: {
                sanitize: false,
                mark: false,
            },
        },
        cache: {
            enable: false,
        },
        toolbarConfig: {
            // hide: true,
            pin: false,
        },
        after: () => {
            vditor!.setTheme(vditorTheme, vditorTheme, vditorTheme)
            watchEffect(() => {

                if (currentFile.value != "") {
                    vditor!.setValue(fsp.readFileSync(path.resolve(currentFile.value), { encoding: "utf-8" }), false)
                }
                else if (openFiles.value.size != 0) {
                    currentFile.value = Array.from(openFiles.value).pop()!;
                    vditor!.setValue(fsp.readFileSync(path.resolve(currentFile.value), { encoding: "utf-8" }), false)
                }
                else {
                    vditor!.setValue("")
                }
            });
        },
    });
});
</script>
<style lang="scss" >
.vditor-toolbar {
    display: none !important;
}

.vditor,
.vditor-reset {
    --textarea-background-color: --el-bg-color;
    font-family: var(--chronicle-global-en-font), var(--chronicle-global-cn-font);
    border: none;
    padding: 0 20px;
    overflow: hidden;
    max-width: 1000px;
    margin: auto;
}

.vditor-reset pre>code {
    font-family: var(--chronicle-code-font);
}

.vditor-reset h1,
.vditor-reset h2,
.vditor-reset h3,
.vditor-reset h4,
.vditor-reset h5,
.vditor-reset h6 {
    margin-top: 0
}
</style>