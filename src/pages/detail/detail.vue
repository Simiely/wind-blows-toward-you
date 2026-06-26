<template>
  <view class="page-detail">
    <!-- 加载态 -->
    <view v-if="loading" class="detail-loading">
      <view class="loading-skeleton hero" />
      <view class="loading-skeleton block" />
      <view class="loading-skeleton block" />
    </view>

    <!-- 内容 -->
    <template v-else-if="project">
      <!-- Section 渲染引擎 -->
      <SectionRenderer
        v-for="(section, idx) in project.sections"
        :key="idx"
        :section="section"
        :bg-color="project.bg_color"
      />

      <!-- 底部操作栏 -->
      <view class="action-bar">
        <view class="action-content">
          <button
            class="btn btn-primary"
            :style="{ backgroundColor: project.bg_color || '#1A1A2E' }"
            @tap="handleDownload"
          >
            <text class="btn-icon">📥</text>
            <text>下载</text>
          </button>
          <button
            class="btn btn-secondary"
            @tap="handleViewSource"
          >
            <text class="btn-icon">🔗</text>
            <text>查看源码</text>
          </button>
        </view>
      </view>
    </template>

    <!-- 404 -->
    <view v-else class="detail-error">
      <text class="error-text">项目未找到</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getProjectById } from '@/utils/api'
import SectionRenderer from '@/components/SectionRenderer.vue'

const project = ref<any>(null)
const loading = ref(true)

onMounted(async () => {
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1] as any
  const id = currentPage?.$page?.options?.id || ''

  project.value = await getProjectById(id)
  loading.value = false

  // 更新导航标题
  if (project.value) {
    uni.setNavigationBarTitle({ title: project.value.title })
  }
})

function handleDownload() {
  if (project.value?.download_url) {
    uni.setClipboardData({
      data: project.value.download_url,
      success: () => {
        uni.showToast({ title: '下载链接已复制', icon: 'success' })
      }
    })
  }
}

function handleViewSource() {
  if (project.value?.github_url) {
    uni.setClipboardData({
      data: project.value.github_url,
      success: () => {
        uni.showToast({ title: '源码链接已复制', icon: 'success' })
      }
    })
  }
}
</script>

<style scoped>
.page-detail {
  min-height: 100vh;
  padding-bottom: 100px;
}

/* 加载态 */
.detail-loading {
  padding: 16px;
}

.loading-skeleton {
  background: linear-gradient(90deg, #e8e8ed 25%, #f0f0f5 50%, #e8e8ed 75%);
  background-size: 200% 100%;
  border-radius: 16px;
  animation: shimmer 1.5s infinite;
  margin-bottom: 16px;
}

.loading-skeleton.hero {
  height: 200px;
}

.loading-skeleton.block {
  height: 120px;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

/* 底部操作栏 */
.action-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 12px 16px;
  padding-bottom: calc(12px + env(safe-area-inset-bottom));
  border-top: 1px solid #f0f0f0;
}

.action-content {
  display: flex;
  gap: 12px;
}

.btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 48px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  padding: 0;
}

.btn::after {
  display: none;
}

.btn-primary {
  color: #ffffff;
}

.btn-secondary {
  background: #f0f0f5;
  color: #1a1a2e;
}

.btn-icon {
  font-size: 18px;
}

/* 错误 */
.detail-error {
  display: flex;
  justify-content: center;
  padding: 80px 0;
}

.error-text {
  font-size: 16px;
  color: #8e8e93;
}
</style>
