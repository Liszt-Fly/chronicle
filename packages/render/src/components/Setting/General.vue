<script setup lang="ts">

</script>
<template>
    <div class="general">
        <el-form label-width="180px" label-position="left">
            <h1>Made with ❤️</h1>

            <router-link to="/">
                <el-button type="primary"><i class="bi bi-house-heart"></i>回到主页</el-button>
            </router-link>

            <el-form-item>

            </el-form-item>
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

    h1 {
        margin: 20px
    }

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
</style>
