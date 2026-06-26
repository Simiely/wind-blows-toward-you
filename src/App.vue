<template>
  <view>
    <router-view />
  </view>
</template>

<script setup lang="ts"></script>

<style>
/* 全局样式 */
page {
  background-color: #f7f8fa;
  font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif;
  color: #1a1a2e;
}

/* 自定义导航栏占位 */
.status-bar {
  height: var(--status-bar-height);
}
</style>
