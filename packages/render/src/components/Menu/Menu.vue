<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  menu_items: Array
});

// console.log(props.menu_items)

</script>

<template>
  <div class="menu">
    <template v-for="menu_item in menu_items">
      <div class="text-item" @click="menu_item.func">
        <i :class="menu_item.icon" :style="menu_item.style"></i>
        <el-divider direction="vertical" />
        <span>{{ $t(`editor.menu.${menu_item.text}`) }}</span>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
:root {
  --el-transition-duration: 0;
}

.menu {
  width: 160px;
  position: fixed;
  z-index: 999;
  padding: 4px;
  border-radius: 4px;
  background-color: var(--el-bg-color);
  box-shadow: var(--el-box-shadow-lighter);

  .bi-reply::before,
  .bi-reply-all::before {
    transform: rotateY(180deg);
  }

  .el-divider--horizontal {
    margin: 4px;
    width: auto;
  }

  .text-item {
    border-radius: 4px;
    font-size: 0.8rem;
    padding: 8px 12px;
    text-align: left;

    &:hover {
      background-color: var(--el-color-info-light-9);
      cursor: pointer;
    }
  }
}
</style>
