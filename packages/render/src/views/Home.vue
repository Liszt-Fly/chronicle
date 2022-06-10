<template>
    <el-scrollbar>
        <div>
            <div class="info">
                <h1> 🎉 Welcome to Chronicle 😊</h1>
            </div>
            <Repository></Repository>
        </div>
    </el-scrollbar>
</template>

<script lang="ts" setup>
import Repository from "@/components/Repository.vue";
</script>

<style>
.info {
    height: 20vh;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>