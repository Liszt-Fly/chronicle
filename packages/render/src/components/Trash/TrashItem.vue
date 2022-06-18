<template>
    <!--非递归部分-->
    <el-card>
        <template #header>
            <div class="card-header">
                <span>{{ props.item!.name }}</span>
                <el-button class="button" text>Restore
                </el-button>
            </div>
        </template>
        <template v-for="item in props.item?.children">
            <trash-item :item="item"></trash-item>
        </template>
    </el-card>
</template>

<script lang="ts" setup>
import { fileNode } from '@/api/FileTree/fileNode';
import { onMounted } from 'vue';

onMounted(() => {
    console.log(props.item)
})

const props = defineProps({
    item: Object as () => fileNode
})

const resotre = () => {

}
</script>

<style lang="scss">
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.box-card {
    width: 400px;
}
</style>