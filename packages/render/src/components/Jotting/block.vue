<template>
    <div class="block" :style="{ backgroundColor: level }">
        <div class="data">{{ data }} h</div>
        <div class="date">{{ date }}</div>

    </div>
</template>

<script lang="ts" setup>
import { levelColor } from '@/api/color';
import { computed } from '@vue/reactivity';


const props = defineProps({
    data: Number,
    date: Number
})


const level = computed(() => {
    // let data = props.data!
    let data = Math.random() * 6 + 1
    if (data < 1 && data >= 0) {
        return levelColor.level1
    }
    else if (data >= 2 && data < 3) {
        return levelColor.level2
    }
    else if (data >= 3 && data < 4) {
        return levelColor.level3
    }
    else if (data >= 4 && data < 5) {
        return levelColor.level4
    }
    else if (data >= 5) {
        return levelColor.level5
    }
})
</script>

<style lang="scss">
.block {
    user-select: none;
    height: 30px;
    border: solid 1px #ddd;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    .data {
        display: none
    }

    &:hover .date {
        display: none
    }

    &:hover .data {
        display: block;
    }


}
</style>