<template>
    <el-tag v-for="tag in dynamicTags" :key="tag" closable :disable-transitions="false" @close="handleClose(tag)"
        class="tag">
        {{ tag }}
    </el-tag>
    <el-input v-if="inputVisible" ref="InputRef" v-model="inputValue" size="small" @keyup.enter="handleInputConfirm"
        class="input" @blur="handleInputConfirm" />
    <el-button v-else class="button-new-tag " size="small" @click="showInput">
        + New Tag
    </el-button>
</template>

<script lang="ts" setup>
import { nextTick, ref } from "vue";
import { ElInput } from "element-plus";
import { fileTree } from "@/api/FileTree/fileTree";
import { getTags } from "@/api/util";

const inputValue = ref("");
const dynamicTags = ref(getTags(fileTree.currentFileNode.path));
const inputVisible = ref(false);
const InputRef = ref<InstanceType<typeof ElInput>>();

const handleClose = (tag: string) => {
    dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1);
};

const showInput = () => {
    inputVisible.value = true;
    nextTick(() => {
        InputRef.value!.input!.focus();
    });
};

const handleInputConfirm = () => {
    if (inputValue.value) {
        dynamicTags.value.push(inputValue.value);
    }
    inputVisible.value = false;
    inputValue.value = "";
};
</script>
<style lang="scss">
.input {
    width: 200px;
}
</style>