<script setup>
import { ref, reactive } from 'vue'
import { useTheme } from '../composables/useTheme'

const { theme, THEME_LIST } = useTheme()
const emit = defineEmits(['enter'])

const tab = ref('login') // 'login' | 'register'

const login = reactive({ account: '', password: '', remember: true })
const register = reactive({ nick: '', password: '', confirm: '' })

const loginMsg = ref({ text: '', ok: false })
const registerMsg = ref({ text: '', ok: false })
const loginErrors = reactive({ account: false, password: false })
const registerErrors = reactive({ nick: false, password: false, confirm: false })

function validateLogin() {
  if (!login.account.trim())
    return { ok: false, msg: '请先取个森林昵称～', field: 'account' }
  if (login.password.length < 6)
    return { ok: false, msg: '密码至少 6 位哦', field: 'password' }
  return { ok: true, msg: '可以进入森林啦！', field: '' }
}
function validateRegister() {
  if (!register.nick.trim())
    return { ok: false, msg: '请取个森林昵称', field: 'nick' }
  if (register.password.length < 6)
    return { ok: false, msg: '密码至少 6 位', field: 'password' }
  if (register.password !== register.confirm)
    return { ok: false, msg: '两次密码不一致', field: 'confirm' }
  return { ok: true, msg: '可以加入狗熊岭啦！', field: '' }
}

// 实时校验：只显示与当前输入字段相关的提示
function checkLogin(field) {
  const r = validateLogin()
  loginErrors.account = !r.ok && r.field === 'account'
  loginErrors.password = !r.ok && r.field === 'password'
  if (r.ok) loginMsg.value = { text: r.msg, ok: true }
  else if (r.field === field) loginMsg.value = { text: r.msg, ok: false }
  else loginMsg.value = { text: '', ok: false }
}
function checkRegister(field) {
  const r = validateRegister()
  registerErrors.nick = !r.ok && r.field === 'nick'
  registerErrors.password = !r.ok && r.field === 'password'
  registerErrors.confirm = !r.ok && r.field === 'confirm'
  if (r.ok) registerMsg.value = { text: r.msg, ok: true }
  else if (r.field === field) registerMsg.value = { text: r.msg, ok: false }
  else registerMsg.value = { text: '', ok: false }
}

function enterForest(name, remember) {
  try {
    sessionStorage.removeItem('forest_user')
    localStorage.removeItem('forest_user')
    if (remember) localStorage.setItem('forest_user', name)
    else sessionStorage.setItem('forest_user', name)
  } catch (e) {
    /* 忽略存储异常 */
  }
  emit('enter', name)
}

function submitLogin() {
  const r = validateLogin()
  loginMsg.value = { text: r.msg, ok: r.ok }
  if (!r.ok) return
  enterForest(login.account.trim(), login.remember)
}
function submitRegister() {
  const r = validateRegister()
  registerMsg.value = { text: r.msg, ok: r.ok }
  if (!r.ok) return
  enterForest(register.nick.trim(), true) // 注册默认记住
}
</script>

<template>
  <div class="auth-wrap">
    <div class="auth-card">
      <div class="bears">
        <div class="bear bear-big">🐻</div>
        <div class="bear bear-small">🐻‍❄️</div>
      </div>

      <div class="brand">
        <h1>🐻 熊出没森林乐园 🌲</h1>
        <p class="slogan">和熊大熊二一起守护狗熊岭</p>
      </div>

      <!-- 风格切换：多主题 -->
      <div class="theme-switch">
        <button
          v-for="t in THEME_LIST"
          :key="t.key"
          class="theme-btn"
          :class="{ active: theme === t.key }"
          @click="theme = t.key"
        >
          {{ t.label }}
        </button>
      </div>

      <div class="tabs">
        <button class="tab" :class="{ active: tab === 'login' }" @click="tab = 'login'">登录</button>
        <button class="tab" :class="{ active: tab === 'register' }" @click="tab = 'register'">注册</button>
      </div>

      <!-- 登录表单 -->
      <form class="form" :class="{ active: tab === 'login' }" autocomplete="off" novalidate @submit.prevent="submitLogin">
        <label>森林昵称
          <input
            type="text"
            name="account"
            v-model="login.account"
            placeholder="例如：熊大 / 熊二 / 光头强"
            :class="{ 'input-error': loginErrors.account }"
            @input="checkLogin('account')"
          />
        </label>
        <label>密码
          <input
            type="password"
            name="password"
            v-model="login.password"
            placeholder="请输入密码"
            :class="{ 'input-error': loginErrors.password }"
            @input="checkLogin('password')"
          />
        </label>
        <p class="form-msg" :class="{ ok: loginMsg.ok }">{{ loginMsg.text }}</p>
        <div class="row">
          <label class="remember"><input type="checkbox" v-model="login.remember" /> 记住我</label>
          <a href="#" class="link">忘记密码？</a>
        </div>
        <button type="submit" class="btn-primary">🌳 进入森林</button>
        <p class="hint">提示：任意昵称 + 密码（≥6位）即可进入</p>
      </form>

      <!-- 注册表单 -->
      <form class="form" :class="{ active: tab === 'register' }" autocomplete="off" novalidate @submit.prevent="submitRegister">
        <label>取个森林昵称
          <input
            type="text"
            name="nick"
            v-model="register.nick"
            placeholder="你的专属昵称"
            :class="{ 'input-error': registerErrors.nick }"
            @input="checkRegister('nick')"
          />
        </label>
        <label>设置密码
          <input
            type="password"
            name="password"
            v-model="register.password"
            placeholder="至少6位"
            :class="{ 'input-error': registerErrors.password }"
            @input="checkRegister('password')"
          />
        </label>
        <label>确认密码
          <input
            type="password"
            name="confirm"
            v-model="register.confirm"
            placeholder="再输一次"
            :class="{ 'input-error': registerErrors.confirm }"
            @input="checkRegister('confirm')"
          />
        </label>
        <p class="form-msg" :class="{ ok: registerMsg.ok }">{{ registerMsg.text }}</p>
        <button type="submit" class="btn-primary">🐾 加入狗熊岭</button>
      </form>
    </div>
  </div>
</template>
