<template>
  <view>
    <!-- Hero 区域 -->
    <view v-if="section.type === 'hero'" class="section-hero" :style="{ backgroundColor: bgColor || '#1A1A2E' }">
      <text class="hero-subtitle">{{ section.subtitle || '' }}</text>
      <text class="hero-title">{{ section.title || '' }}</text>
      <text class="hero-content">{{ section.content || '' }}</text>
    </view>

    <!-- 高亮区域 -->
    <view v-if="section.type === 'highlight'" class="section-highlight">
      <view class="highlight-block">
        <text class="highlight-text">{{ section.content }}</text>
      </view>
    </view>

    <!-- 步骤说明 -->
    <view v-if="section.type === 'steps'" class="section-steps">
      <text class="section-title">{{ section.title || '' }}</text>
      <view v-for="(item, idx) in section.items" :key="idx" class="step-item">
        <view class="step-number" :style="{ backgroundColor: bgColor || '#1A1A2E' }">
          <text class="step-num-text">{{ item.step }}</text>
        </view>
        <view class="step-content">
          <view class="step-header">
            <text class="step-icon">{{ item.icon }}</text>
            <text class="step-title">{{ item.title }}</text>
          </view>
          <text class="step-desc">{{ item.desc }}</text>
        </view>
      </view>
    </view>

    <!-- 架构/层级图 -->
    <view v-if="section.type === 'architecture'" class="section-architecture">
      <text class="section-title">{{ section.title || '' }}</text>
      <view v-for="(system, sidx) in section.systems" :key="sidx" class="arch-system">
        <text class="arch-system-name">{{ system.name }}</text>
        <view v-for="(item, iidx) in system.items" :key="iidx" class="arch-item">
          <view class="arch-level" :class="'level-' + (iidx + 1)">
            <text class="arch-level-text">{{ item.level }}</text>
          </view>
          <text class="arch-desc">{{ item.desc }}</text>
        </view>
      </view>
    </view>

    <!-- 技术规格 -->
    <view v-if="section.type === 'specs'" class="section-specs">
      <text class="section-title">{{ section.title || '' }}</text>
      <view class="specs-grid">
        <view v-for="(field, idx) in section.fields" :key="idx" class="spec-item">
          <text class="spec-label">{{ field.label }}</text>
          <text class="spec-value">{{ field.value }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{
  section: any
  bgColor?: string
}>()
</script>

<style scoped>
.section-title {
  font-size: 20px;
  font-weight: 700;
  color: #1a1a2e;
  display: block;
  margin-bottom: 16px;
}

/* ========= Hero ========= */
.section-hero {
  padding: 40px 24px 36px;
  margin: 0 0 16px;
}

.hero-subtitle {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
  display: block;
  margin-bottom: 8px;
  letter-spacing: 1px;
}

.hero-title {
  font-size: 32px;
  font-weight: 700;
  color: #ffffff;
  display: block;
  line-height: 1.3;
  margin-bottom: 12px;
}

.hero-content {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);
  display: block;
  line-height: 1.6;
}

/* ========= Highlight ========= */
.section-highlight {
  padding: 0 16px;
  margin-bottom: 16px;
}

.highlight-block {
  background: #f0f4ff;
  border-radius: 16px;
  padding: 20px;
  border-left: 4px solid #1a1a2e;
}

.highlight-text {
  font-size: 15px;
  color: #1a1a2e;
  line-height: 1.7;
}

/* ========= Steps ========= */
.section-steps {
  padding: 0 16px;
  margin-bottom: 24px;
}

.step-item {
  display: flex;
  gap: 14px;
  margin-bottom: 16px;
}

.step-number {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.step-num-text {
  font-size: 13px;
  font-weight: 700;
  color: #ffffff;
}

.step-content {
  flex: 1;
  background: #ffffff;
  border-radius: 14px;
  padding: 14px 16px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.05);
}

.step-header {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 6px;
}

.step-icon {
  font-size: 18px;
}

.step-title {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a2e;
}

.step-desc {
  font-size: 13px;
  color: #636366;
  line-height: 1.5;
}

/* ========= Architecture ========= */
.section-architecture {
  padding: 0 16px;
  margin-bottom: 24px;
}

.arch-system {
  background: #ffffff;
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 12px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.05);
}

.arch-system-name {
  font-size: 15px;
  font-weight: 600;
  color: #1a1a2e;
  display: block;
  margin-bottom: 12px;
  padding-bottom: 10px;
  border-bottom: 1px solid #f0f0f0;
}

.arch-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 10px;
}

.arch-item:last-child {
  margin-bottom: 0;
}

.arch-level {
  padding: 2px 10px;
  border-radius: 6px;
  flex-shrink: 0;
  min-width: 40px;
  text-align: center;
}

.level-1 { background: #e8f5e9; }
.level-2 { background: #fff3e0; }
.level-3 { background: #fce4ec; }
.level-4 { background: #f3e5f5; }

.arch-level-text {
  font-size: 11px;
  font-weight: 600;
  color: #1a1a2e;
}

.arch-desc {
  font-size: 13px;
  color: #636366;
  line-height: 1.5;
  flex: 1;
}

/* ========= Specs ========= */
.section-specs {
  padding: 0 16px;
  margin-bottom: 24px;
}

.specs-grid {
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.05);
}

.spec-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  border-bottom: 1px solid #f0f0f0;
}

.spec-item:last-child {
  border-bottom: none;
}

.spec-label {
  font-size: 14px;
  color: #8e8e93;
}

.spec-value {
  font-size: 14px;
  font-weight: 500;
  color: #1a1a2e;
  text-align: right;
}
</style>
