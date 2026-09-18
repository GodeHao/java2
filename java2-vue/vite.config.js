import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 使用相对路径打包，方便直接以静态文件方式打开/部署
export default defineConfig({
  plugins: [vue()],
  base: './',
  server: {
    host: true,
    port: 5173,
    open: true
  }
})
