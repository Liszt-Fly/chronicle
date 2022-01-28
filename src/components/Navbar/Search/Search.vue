<script setup lang="ts">
import MTag from '../TagSystem/Tag.vue'
</script>

<template>
    <div class="search-box">
        <input type="text" placeholder="search any tag you define...." />
        <span>
            <i class="bi bi-search"></i>
        </span>
    </div>
    <div class="result">
        <div class="item">
            1 钢铁是如何炼成的1
            <m-tag>外国文学</m-tag>
        </div>
        <div class="item">
            2 钢铁是如何炼成的2
            <m-tag>西方文化</m-tag>
        </div>
        <div class="item">
            3 钢铁是如何炼成的3
            <m-tag>计算机</m-tag>
        </div>
        <div class="item">
            4 钢铁是如何炼成的4
            <m-tag>成长</m-tag>
        </div>
    </div>
</template>

<style scoped lang="scss">
.search-box {
    background-color: #f3f3f3;
    display: flex;
    padding-left: 5px;
    padding-bottom: 5px;
    border: solid 2px #ddd;

    padding-top: 5px;
    align-content: space-between;
    input {
        flex: 6;
        border: none;
        outline: none;
        background-color: #f3f3f3;
        display: inline-block;
    }
    span {
        text-align: center;
        flex: 1;

        i {
            color: black;
            padding-right: 10px;
        }
    }
}
.item {
    margin-top: 20px;
    font-size: 0.7rem;
}
</style>
