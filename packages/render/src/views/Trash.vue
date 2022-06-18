<template>
    <div class="trash">
        <template v-for="item in trashBin!.root.children">
            <trash-item :item="item"></trash-item>
        </template>
    </div>

</template>

<script lang="ts" setup>
import { trashBin } from '@/data/configdb';
import { onMounted, watchEffect } from 'vue';
import TrashItem from '../components/Trash/TrashItem.vue';

watchEffect(() => {
    console.log(trashBin.value)
})
</script>

<style>
/* .trash {} */
</style>