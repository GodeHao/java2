<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({ nick: { type: String, default: '' } })
const emit = defineEmits(['logout'])

const title = ref('')

const BEARS = ['熊大', '熊二', '光头强', '蹦蹦', '涂涂', '吉吉']
const TIPS = {
  '🍯 采蜂蜜': '熊二：蜂蜜真甜！🐻',
  '🌰 捡松果': '蹦蹦：捡到一颗大松果！🌰',
  '🪓 阻止光头强': '熊大：光头强又在砍树，快拦住他！💪',
}

onMounted(() => {
  const pick = BEARS.includes(props.nick) ? props.nick : '小伙伴'
  if (pick === '光头强') title.value = '光头强！今天不许砍树 🪓❌'
  else title.value = '欢迎来到狗熊岭，' + pick + '！'
})

function onFun(btn) {
  alert(TIPS[btn] || '出发啦！')
}
function onLogout() {
  try {
    localStorage.removeItem('forest_user')
    sessionStorage.removeItem('forest_user')
  } catch (e) {
    /* 忽略存储异常 */
  }
  emit('logout')
}
</script>

<template>
  <div class="home-wrap">
    <header class="home-header">
      <div class="home-brand">🐻 熊出没森林乐园</div>
      <div class="home-user">
        <span>Hi, {{ nick }}</span>
        <button class="btn-logout" @click="onLogout">退出森林</button>
      </div>
    </header>
    <main class="home-main">
      <div class="scene">
        <div class="scene-emoji">🌲🌳🐻🌲🐝🌳🐻‍❄️🌲</div>
        <h2 class="pop">{{ title }}</h2>
        <p>今天也要和熊大熊二一起，保护好这片大森林哦～</p>
        <div class="actions">
          <button class="fun-btn" @click="onFun('🍯 采蜂蜜')">🍯 采蜂蜜</button>
          <button class="fun-btn" @click="onFun('🌰 捡松果')">🌰 捡松果</button>
          <button class="fun-btn" @click="onFun('🪓 阻止光头强')">🪓 阻止光头强</button>
        </div>
      </div>
    </main>
  </div>
</template>
