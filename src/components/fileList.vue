<template>
    <div class="folder" v-if="file">
        <div class="item">
            <span
                :class="[
                    'iconfont',
                    { 'icon-arrow-right': file.isDirectory },
                    { 'bi bi-cloud-fog2': !file.isDirectory },
                    'file-name',
                ]"
                @click="showSubFolder($event, file!)"
            >&nbsp {{ file.name }}</span>
        </div>

        <div class="subfolder" v-if="file.children && file.children.length > 0" ref="subfolder">
            <file-list :files="file.children" v-for="file in file.children" :file="file"></file-list>
        </div>
    </div>
</template>
<script setup lang="ts">

import { ref } from 'vue'
import { msfile } from '../composables/type'

defineProps({
    "file": Object as () => msfile,
})

const subfolder = ref<HTMLDivElement | null>(null)
let showSubFolder = (event: MouseEvent, file: msfile) => {
    if (file.isDirectory) {
        if (event) {
            const span = event.target as HTMLSpanElement
            span.classList.toggle('icon-arrow-right')
            span.classList.toggle('icon-arrow_down')
            if (span.classList.contains('icon-arrow_down')) {
                (subfolder.value!).style.display = "block"

            }
            else {
                (subfolder.value!).style.display = ""
            }

        }
    }
}
</script>
<style scoped lang="scss">
.folder {
    width: 18vw;
    white-space: nowrap;
    overflow-x: hidden;
    overflow-y: scroll;
}

.item {
    overflow-x: hidden;
    &:hover {
        background-color: #343434;
        cursor: pointer;
    }
}
.subfolder {
    text-indent: 10px;
    width: 18vw;
    display: none;
}
.file-name {
    font-size: 15px;
    display: inline-block;
    width: 100%;
    overflow-x: hidden;
}
</style>
