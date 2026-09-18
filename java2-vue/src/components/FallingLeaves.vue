<script setup>
import { computed } from 'vue'
import { useTheme } from '../composables/useTheme'

// 跟随当前主题切换漂浮装饰
const { theme, LEAF_MAP } = useTheme()
const leaves = computed(() => LEAF_MAP[theme.value] || LEAF_MAP.forest)
</script>

<template>
  <div class="leaves" aria-hidden="true">
    <span v-for="(emoji, i) in leaves" :key="i">{{ emoji }}</span>
  </div>
</template>
