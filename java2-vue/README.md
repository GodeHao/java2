# 熊出没森林乐园（Vue 3 + Vite）

将原 `java2-main` 纯前端登录演示页面改造成的 **Vue 3 + Vite** 项目。

## 功能
- 多主题切换（清晨 / 黄昏 / 星夜 / 樱花 / 雪夜），主题持久化到 `localStorage`
- 登录 / 注册双 Tab，含实时表单校验
- 登录态记忆（记住我 → `localStorage`，否则 → `sessionStorage`），刷新自动恢复
- 森林主页 + 趣味互动按钮
- 漂浮装饰 emoji 随主题变化

## 目录结构
```
java2-vue/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.js
    ├── App.vue                 # 根组件：视图切换 + 启动恢复登录态
    ├── style.css               # 全局样式 + 多主题变量
    ├── composables/
    │   └── useTheme.js         # 主题响应式状态（模块级共享）
    └── components/
        ├── FallingLeaves.vue   # 漂浮装饰
        ├── AuthCard.vue        # 登录/注册卡片
        └── HomeView.vue        # 森林主页
```

## 运行
```bash
npm install      # 安装依赖
npm run dev      # 启动开发服务器（默认 http://localhost:5173）
npm run build    # 打包到 dist/
npm run preview  # 预览打包结果
```
