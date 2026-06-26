<template>
  <view class="page-about">
    <!-- 品牌区 -->
    <view class="about-brand">
      <image class="about-logo" src="/static/logo/app-icon.png" mode="aspectFit" />
      <text class="about-name">世界的风吹向你</text>
      <text class="about-version">v1.0.0</text>
    </view>

    <!-- 描述 -->
    <view class="about-section">
      <text class="about-desc">
        这里收录了 Simiely 开发的各类工具与项目。每个项目都源于实际需求，力求简洁、实用。
      </text>
    </view>

    <!-- 信息卡片 -->
    <view class="about-section">
      <view class="info-card">
        <view class="info-item">
          <text class="info-label">开发者</text>
          <text class="info-value">Simiely</text>
        </view>
        <view class="info-item">
          <text class="info-label">技术栈</text>
          <text class="info-value">uni-app · Vue 3 · TypeScript</text>
        </view>
        <view class="info-item">
          <text class="info-label">开源许可</text>
          <text class="info-value">MIT</text>
        </view>
      </view>
    </view>

    <!-- GitHub -->
    <view class="about-section">
      <view class="link-card" @tap="openGitHub">
        <text class="link-icon">🔗</text>
        <view class="link-content">
          <text class="link-title">GitHub</text>
          <text class="link-desc">github.com/Simiely</text>
        </view>
        <text class="link-arrow">›</text>
      </view>
    </view>

    <!-- 底部 -->
    <view class="about-footer">
      <text class="footer-text">世界的风吹向你</text>
      <text class="footer-sub">一切为了还车。</text>
    </view>
  </view>
</template>

<script setup lang="ts">
function openGitHub() {
  uni.setClipboardData({
    data: 'https://github.com/Simiely',
    success: () => {
      uni.showToast({ title: '链接已复制', icon: 'success' })
    }
  })
}
</script>

<style scoped>
.page-about {
  min-height: 100vh;
  padding: 16px;
}

.about-brand {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 0;
}

.about-logo {
  width: 80px;
  height: 80px;
  border-radius: 20px;
  margin-bottom: 16px;
}

.about-name {
  font-size: 24px;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 4px;
}

.about-version {
  font-size: 14px;
  color: #8e8e93;
}

.about-section {
  margin-bottom: 16px;
}

.about-desc {
  font-size: 15px;
  color: #636366;
  line-height: 1.7;
  display: block;
  padding: 0 4px;
}

/* 信息卡片 */
.info-card {
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.05);
}

.info-item {
  display: flex;
  justify-content: space-between;
  padding: 14px 16px;
  border-bottom: 1px solid #f0f0f0;
}

.info-item:last-child {
  border-bottom: none;
}

.info-label {
  font-size: 14px;
  color: #8e8e93;
}

.info-value {
  font-size: 14px;
  font-weight: 500;
  color: #1a1a2e;
}

/* 链接卡片 */
.link-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.05);
}

.link-icon {
  font-size: 24px;
}

.link-content {
  flex: 1;
}

.link-title {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a2e;
  display: block;
}

.link-desc {
  font-size: 13px;
  color: #8e8e93;
  display: block;
  margin-top: 2px;
}

.link-arrow {
  font-size: 24px;
  color: #c7c7cc;
}

/* 底部 */
.about-footer {
  text-align: center;
  padding: 40px 0 20px;
}

.footer-text {
  font-size: 14px;
  color: #c7c7cc;
  display: block;
}

.footer-sub {
  font-size: 12px;
  color: #d1d1d6;
  display: block;
  margin-top: 4px;
}
</style>
