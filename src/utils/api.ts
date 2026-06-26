const CACHE_KEY = 'wind_projects_cache'
const CACHE_TIME_KEY = 'wind_projects_cache_time'
const CACHE_DURATION = 1000 * 60 * 60 * 24 // 24小时

// 远程数据地址（部署后替换为实际 CDN 地址）
const REMOTE_DATA_URL = ''

// 本地兜底数据
import localData from '@/static/data/projects.json'

/**
 * 读取缓存
 */
function getCache() {
  try {
    const data = uni.getStorageSync(CACHE_KEY)
    const time = uni.getStorageSync(CACHE_TIME_KEY)
    if (data && time && Date.now() - time < CACHE_DURATION) {
      return JSON.parse(data)
    }
  } catch (e) { /* ignore */ }
  return null
}

/**
 * 写入缓存
 */
function setCache(data: any) {
  try {
    uni.setStorageSync(CACHE_KEY, JSON.stringify(data))
    uni.setStorageSync(CACHE_TIME_KEY, Date.now())
  } catch (e) { /* ignore */ }
}

/**
 * 获取项目列表
 * 策略: 本地缓存优先 → 远程拉取更新 → 本地 JSON 兜底
 */
export async function getProjects(): Promise<any[]> {
  // 1. 先返回缓存（如果有）
  const cached = getCache()
  if (cached && cached.projects) {
    // 后台发起远程刷新
    refreshProjects().then((projects) => {
      if (projects) {
        setCache({ projects })
      }
    })
    return cached.projects
  }

  // 2. 尝试远程拉取
  try {
    const projects = await refreshProjects()
    if (projects) {
      setCache({ projects })
      return projects
    }
  } catch (e) { /* fallback */ }

  // 3. 本地兜底
  return localData.projects || []
}

/**
 * 刷新远程数据
 */
async function refreshProjects(): Promise<any[] | null> {
  if (!REMOTE_DATA_URL) return null
  try {
    const res = await uni.request({
      url: REMOTE_DATA_URL,
      method: 'GET',
      dataType: 'json'
    })
    if (res.statusCode === 200 && res.data?.projects) {
      return res.data.projects
    }
  } catch (e) { /* ignore */ }
  return null
}

/**
 * 根据 ID 获取单个项目
 */
export async function getProjectById(id: string): Promise<any | null> {
  const projects = await getProjects()
  return projects.find((p: any) => p.id === id) || null
}
