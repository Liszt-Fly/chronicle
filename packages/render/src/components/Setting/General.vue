<script setup lang="ts">
import { reactive, ref } from 'vue'

const general = reactive({ autosave: false })
</script>

<template>
    <div class="general">
        <el-form label-width="180px" :model="general" label-position="left">

            <el-form-item>
                <template #label>
                    <i class="bi bi-robot"></i> 自动保存
                </template>
                <el-switch v-model="general.autosave" />
            </el-form-item>


            <div class="home">
                <router-link to="/">
                    <el-button type="primary"><i class="bi bi-house-heart"></i>回到主页</el-button>
                </router-link>
            </div>

            <!-- <h1>Made with ❤️</h1> -->

        </el-form>
    </div>
</template>

<style lang="scss" scoped>
.general {
    padding: 1rem;
    text-align: center;
    max-width: 400px;
    height: 100%;
    margin: auto;
    user-select: none;

    .el-form-item__label i {
        margin-right: 6px;
        font-size: 1rem
    }

    .el-dialog__body {
        text-align: center;
    }

    h1 {
        margin: 20px
    }

    .home {
        width: 100%;
        margin: 20px 0;

        a {
            text-decoration: none;

            i {
                margin-right: 6px;
                font-size: 1rem
            }

            .el-button {
                width: 100%;
            }
        }
    }
}
</style>
