import { ref, watch } from 'vue'

// 不同主题下漂浮装饰使用的 emoji
export const LEAF_MAP = {
  forest: ['🌿', '🍃', '🌰', '🍂', '🌲'],
  sunset: ['🍂', '🌅', '🌻', '🍁', '✨'],
  night:  ['⭐', '🌟', '💫', '🌙', '✨'],
  cherry: ['🌸', '🌸', '🌸', '🌸', '🍃'],
  snow:   ['❄️', '❄️', '⛄', '🌨️', '✨'],
}

// 主题列表（用于渲染切换按钮）
export const THEME_LIST = [
  { key: 'forest', label: '🌞 清晨' },
  { key: 'sunset', label: '🌇 黄昏' },
  { key: 'night',  label: '🌙 星夜' },
  { key: 'cherry', label: '🌸 樱花' },
  { key: 'snow',   label: '❄️ 雪夜' },
]

// 模块级共享状态：整个应用共用同一份主题响应式数据
const theme = ref(localStorage.getItem('forest_theme') || 'forest')

watch(
  theme,
  (val) => {
    if (val && val !== 'forest') document.body.setAttribute('data-theme', val)
    else document.body.removeAttribute('data-theme')
    localStorage.setItem('forest_theme', val)
  },
  { immediate: true }
)

export function useTheme() {
  return { theme, LEAF_MAP, THEME_LIST }
}
