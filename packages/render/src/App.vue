<script setup lang="ts">
import TabBar from "@/components/TabBar.vue";
//首先获取设备类型
let agent = navigator.userAgent.toLowerCase();
//再用正则匹配出结果
let iswin = /windows/i.test(agent);
let winHeight = iswin ? "0px" : "40px"

let winStyle = document.createElement('style');
winStyle.innerText = `:root {
		--is-win:${winHeight};
	}`
document.getElementsByTagName('head')[0].appendChild(winStyle);
</script>

<template>
  <div class="app-name" v-if="!iswin">
    Chronicle
  </div>
  <div class="main" spellcheck="false">
    <tab-bar></tab-bar>
    <div class="article">
      <router-view></router-view>
    </div>
  </div>
</template>

<style>
.app-name {
  height: 38px;
  font-size: 0.8rem;
  font-weight: 900;
  font-family: "Chalkboard SE";
  user-select: none;
  app-region: drag;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: center;
  /* border-bottom: 2px solid var(--chronicle-theme-color); */
  /* color: white; */
}

.article {
  width: 100%;
}
</style>
