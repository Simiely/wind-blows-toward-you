<template>
  <view class="page-index">
    <!-- 品牌区 -->
    <view class="brand-section">
      <image class="brand-logo" src="/static/logo/app-icon.png" mode="aspectFit" />
      <text class="brand-name">世界的风吹向你</text>
      <text class="brand-slogan">一切为了还车。</text>
    </view>

    <!-- 分类标签 -->
    <view class="category-bar">
      <scroll-view scroll-x class="category-scroll" show-scrollbar="false">
        <view
          v-for="(cat, idx) in categories"
          :key="idx"
          class="category-tab"
          :class="{ active: activeCategory === cat.key }"
          @tap="activeCategory = cat.key"
        >
          <text>{{ cat.label }}</text>
        </view>
      </scroll-view>
    </view>

    <!-- 项目列表 -->
    <view class="project-list">
      <SkeletonLoader v-if="loading" :count="3" />
      <template v-else>
        <ProjectCard
          v-for="(project, idx) in filteredProjects"
          :key="project.id"
          :project="project"
          :delay="idx * 80"
        />
        <view v-if="filteredProjects.length === 0" class="empty-state">
          <text class="empty-text">暂无项目</text>
        </view>
      </template>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { getProjects } from '@/utils/api'
import ProjectCard from '@/components/ProjectCard.vue'
import SkeletonLoader from '@/components/SkeletonLoader.vue'

const projects = ref<any[]>([])
const loading = ref(true)
const activeCategory = ref('all')

const categories = computed(() => {
  const cats = new Set<string>()
  cats.add('all')
  projects.value.forEach((p: any) => {
    if (p.category) cats.add(p.category)
  })
  return Array.from(cats).map(key => ({
    key,
    label: key === 'all' ? '全部' : key === 'android' ? 'Android' : key === 'windows' ? 'Windows' : key === 'web' ? 'Web' : key
  }))
})

const filteredProjects = computed(() => {
  if (activeCategory.value === 'all') return projects.value
  return projects.value.filter((p: any) => p.category === activeCategory.value)
})

onMounted(async () => {
  projects.value = await getProjects()
  loading.value = false
})
</script>

<style scoped>
.page-index {
  min-height: 100vh;
  padding-bottom: 20px;
}

/* 品牌区 */
.brand-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 16px 20px;
  background: linear-gradient(180deg, #ffffff 0%, #f7f8fa 100%);
}

.brand-logo {
  width: 64px;
  height: 64px;
  border-radius: 16px;
  margin-bottom: 12px;
}

.brand-name {
  font-size: 22px;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 4px;
}

.brand-slogan {
  font-size: 13px;
  color: #8e8e93;
}

/* 分类标签 */
.category-bar {
  padding: 0 16px;
  margin-bottom: 4px;
}

.category-scroll {
  white-space: nowrap;
  padding: 8px 0;
}

.category-tab {
  display: inline-flex;
  padding: 6px 18px;
  margin-right: 8px;
  border-radius: 10px;
  background: #f0f0f5;
  font-size: 14px;
  color: #636366;
  transition: all 0.3s ease;
}

.category-tab.active {
  background: #1a1a2e;
  color: #ffffff;
  font-weight: 600;
}

/* 列表 */
.project-list {
  padding-top: 4px;
}

.empty-state {
  display: flex;
  justify-content: center;
  padding: 60px 0;
}

.empty-text {
  font-size: 15px;
  color: #8e8e93;
}
</style>
