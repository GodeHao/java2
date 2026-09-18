<script setup>
import { ref, onMounted } from 'vue'
import FallingLeaves from './components/FallingLeaves.vue'
import AuthCard from './components/AuthCard.vue'
import HomeView from './components/HomeView.vue'

// 视图状态：'auth' 登录/注册页，'home' 森林主页
const view = ref('auth')
const nick = ref('')

function enter(n) {
  nick.value = n
  view.value = 'home'
}
function logout() {
  view.value = 'auth'
  nick.value = ''
}

// 启动时恢复登录态（localStorage 优先，其次 sessionStorage）
onMounted(() => {
  try {
    const saved =
      localStorage.getItem('forest_user') || sessionStorage.getItem('forest_user')
    if (saved) enter(saved)
  } catch (e) {
    /* 忽略隐私模式下的存储异常 */
  }
})
</script>

<template>
  <FallingLeaves />
  <AuthCard v-if="view === 'auth'" @enter="enter" />
  <HomeView v-else :nick="nick" @logout="logout" />
</template>
