<template>
  <view class="skeleton-list">
    <view v-for="i in count" :key="i" class="skeleton-card">
      <view class="skeleton-accent" />
      <view class="skeleton-body">
        <view class="skeleton-icon" />
        <view class="skeleton-content">
          <view class="skeleton-line w-60" />
          <view class="skeleton-line w-40" />
          <view class="skeleton-line w-80" />
          <view class="skeleton-tags">
            <view class="skeleton-tag" />
            <view class="skeleton-tag" />
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
defineProps<{ count?: number }>()
</script>

<style scoped>
.skeleton-list {
  padding: 12px 0;
}

.skeleton-card {
  margin: 12px 16px;
  background: #ffffff;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

.skeleton-accent {
  height: 4px;
  background: #e8e8ed;
}

.skeleton-body {
  display: flex;
  padding: 20px;
  gap: 16px;
}

.skeleton-icon {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: #e8e8ed;
  flex-shrink: 0;
}

.skeleton-content {
  flex: 1;
}

.skeleton-line {
  height: 14px;
  background: linear-gradient(90deg, #e8e8ed 25%, #f0f0f5 50%, #e8e8ed 75%);
  background-size: 200% 100%;
  border-radius: 7px;
  margin-bottom: 10px;
  animation: shimmer 1.5s infinite;
}

.w-60 { width: 60%; }
.w-40 { width: 40%; }
.w-80 { width: 80%; }

.skeleton-tags {
  display: flex;
  gap: 8px;
  margin-top: 4px;
}

.skeleton-tag {
  width: 50px;
  height: 20px;
  background: #e8e8ed;
  border-radius: 8px;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
</style>
