<template>
    <div class="root">
        <el-row :gutter="20">
            <el-col v-for="tag in dynamicTags" :key="tag" :span="tag.length > 4 ? tag.length : 4">
                <el-tag closable :disable-transitions="false" @close="handleClose(tag)" class="tag" size="default"
                    effect="plain">
                    {{ tag }}
                </el-tag>
            </el-col>
            <el-col :span="4">
                <el-input v-if="inputVisible" ref="InputRef" v-model="inputValue" size="small"
                    @keyup.enter="handleInputConfirm" class="input" @blur="handleInputConfirm" maxlength="12"
                    :show-word-limit="true" />
                <el-button v-else class="tag" size="small" @click="showInput">
                    + New Tag
                </el-button>
            </el-col>
        </el-row>
    </div>
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
        emit('passTags', dynamicTags.value)

    }
    inputVisible.value = false;
    inputValue.value = "";
};

const emit = defineEmits(['passTags'])
</script>
<style lang="scss">
.input {
    width: 120px;
}

.tag {
    margin: 4px 0;
}
</style>