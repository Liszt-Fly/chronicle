<template>
    <div class="info">
        <el-form label-width="180px" :model="info" label-position="left">
            <h1> 🎉 Welcome to Chronicle, Made with ❤️</h1>

            <el-button type="primary"><i class="bi bi-plugin"></i>{{ $t('setting.info.sponsorUs') }}
            </el-button>

            <!-- <div class="home">
                <router-link to="/">
                    <el-button type="primary"><i class="bi bi-house-heart"></i>{{ $t('setting.info.home') }}
                    </el-button>
                </router-link>
            </div> -->
        </el-form>
    </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

const info = reactive({})
</script>

<style lang="scss" scoped>
.info {
    padding: 1rem;
    text-align: center;
    max-width: 400px;
    margin: auto;
    user-select: none;

    .el-form-item__label i {
        margin-right: 1rem;
        font-size: 1rem
    }

    h1 {
        margin: 20px
    }

    .el-button i {
        font-size: 1rem;
        margin-right: 6px;
    }

    .home {
        width: 100%;
        margin: 20px 0;

        a {
            text-decoration: none;

            i {
                margin-right: 1rem;
                font-size: 1rem
            }

            .el-button {
                width: 100%;
            }
        }
    }
}
</style>
