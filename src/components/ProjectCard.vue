<template>
  <view
    class="project-card"
    :style="{ animationDelay: `${delay}ms` }"
    hover-class="card-pressed"
    @tap="goDetail"
  >
    <!-- 顶部色条 -->
    <view class="card-accent" :style="{ backgroundColor: project.bg_color || '#1A1A2E' }" />

    <view class="card-body">
      <!-- 图标区域 -->
      <view class="card-icon" :style="{ backgroundColor: project.bg_color || '#1A1A2E' }">
        <text class="icon-emoji">{{ project.feature_tag?.slice(0, 2) || '🛠' }}</text>
      </view>

      <!-- 文字内容 -->
      <view class="card-content">
        <view class="card-header">
          <text class="card-title">{{ project.title }}</text>
          <text class="card-subtitle">{{ project.subtitle }}</text>
        </view>

        <text class="card-summary">{{ project.summary }}</text>

        <!-- 标签 -->
        <view class="card-tags">
          <view
            v-for="tag in project.tags"
            :key="tag"
            class="tag"
            :style="{ color: project.bg_color || '#1A1A2E', borderColor: project.bg_color || '#1A1A2E' }"
          >
            {{ tag }}
          </view>
        </view>
      </view>

      <!-- 箭头 -->
      <view class="card-arrow">
        <text class="arrow-icon">›</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  project: any
  delay?: number
}>()

function goDetail() {
  uni.navigateTo({
    url: `/pages/detail/detail?id=${props.project.id}`
  })
}
</script>

<style scoped>
.project-card {
  margin: 12px 16px;
  background: #ffffff;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  animation: cardFadeIn 0.5s ease both;
}

@keyframes cardFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card-pressed {
  opacity: 0.92;
  transform: scale(0.98);
}

.card-accent {
  height: 4px;
}

.card-body {
  display: flex;
  align-items: flex-start;
  padding: 20px;
  gap: 16px;
}

.card-icon {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.icon-emoji {
  font-size: 26px;
}

.card-content {
  flex: 1;
  min-width: 0;
}

.card-header {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-bottom: 6px;
}

.card-title {
  font-size: 18px;
  font-weight: 700;
  color: #1a1a2e;
  line-height: 1.3;
}

.card-subtitle {
  font-size: 13px;
  color: #8e8e93;
  line-height: 1.4;
}

.card-summary {
  font-size: 14px;
  color: #636366;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 10px;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tag {
  font-size: 11px;
  padding: 2px 10px;
  border-radius: 8px;
  border: 1px solid;
  background: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
}

.card-arrow {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 52px;
}

.arrow-icon {
  font-size: 24px;
  color: #c7c7cc;
  font-weight: 300;
}
</style>
