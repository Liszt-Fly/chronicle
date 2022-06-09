<template>
    <div class="card">
        <div class="name">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
@import "../../style/global.scss";

.card {
    border-right: none;
    padding: 8px;
    border-bottom: 1.5px $themeColor solid;
    display: flex;
    user-select: none;
    align-items: center;

    div {
        margin-right: 20px;
    }

    .description {

        color: rgb(39, 39, 39);
        font-size: 0.9rem;
    }
}
</style>