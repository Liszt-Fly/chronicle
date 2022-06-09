<template>
    <div class="repositories">
        <div class="items">
            <template v-for="item in repositores">
                <card>{{ item.name }}</card>
            </template>

        </div>

        <div class=" description">
            <h2>计算机科学</h2>
            <el-divider></el-divider>
            <ul>
                <li><span>工作空间描述: 计算机科学相关的笔记内容，方便之后复习...</span></li>
                <li><span>笔记数量: 5</span></li>
                <li><span>创建日期: 9月25日</span></li>
                <li><span>模块个数: 3</span></li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Card from "@/components/Repository/card.vue"
import { repositores } from '@/interfaces/repositories'
</script>

<style lang="scss">
@import "../style/global.scss";

.repositories {
    box-sizing: border-box;
    display: flex;
    width: calc(100vw - 2.5rem);
    height: calc(100vh - 30px);
    font-family: "OpenDyslexic Regular";
    color: #666;

    .items {
        width: calc((100vw - 2.5rem)/3);
        height: calc(100vh - 30px);
        border-right: 1px solid #ddd;
        padding: 0 12px;
    }
}

.description {
    width: calc((100vw - 2.5rem)/3*2);
    height: calc(100vh - 30px);

    ul>li {
        list-style-type: square !important;

        color: $themeColor;

        span {
            color: #666;
        }
    }

    h2 {
        text-align: center;
        margin-top: 20px;
        font-size: 1.4rem;
    }
}
</style>