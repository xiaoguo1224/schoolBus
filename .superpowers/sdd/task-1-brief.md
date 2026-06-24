### Task 1: 统一两端小程序壳层和原生导航契约

**Files:**
- Modify: `wxapp/miniprogram/app.json`
- Modify: `wxapp/miniprogram/app.wxss`
- Delete: `wxapp/miniprogram/components/footer-nav/footer-nav.json`
- Delete: `wxapp/miniprogram/components/footer-nav/footer-nav.ts`
- Delete: `wxapp/miniprogram/components/footer-nav/footer-nav.wxml`
- Delete: `wxapp/miniprogram/components/footer-nav/footer-nav.wxss`
- Modify: `driver/miniprogram/app.json`
- Modify: `driver/miniprogram/app.wxss`

**Interfaces:**
- Consumes: 当前两端 `app.json` 的页面顺序、tabBar 入口和全局样式基线。
- Produces: 两端统一的原生 tabBar、干净的全局页面壳层、可直接被各页面复用的导航常量。

- [ ] **Step 1: 把两端 tabBar 改成最终入口**

把用户端和司机端的 `app.json` 改成最终的底部入口，页面顺序和 tab 文案固定下来，不再让页面自己发明一套导航语义。

用户端目标结构：

```json
{
  "pages": [
    "pages/index/index",
    "pages/schedule/index",
    "pages/map/index",
    "pages/detail/index",
    "pages/reserve/index",
    "pages/mine/index"
  ],
  "tabBar": {
    "list": [
      { "pagePath": "pages/index/index", "text": "首页" },
      { "pagePath": "pages/schedule/index", "text": "线路" },
      { "pagePath": "pages/map/index", "text": "地图" },
      { "pagePath": "pages/mine/index", "text": "我的" }
    ]
  }
}
```

司机端目标结构：

```json
{
  "pages": [
    "pages/index/index",
    "pages/tasks/tasks",
    "pages/vehicle/vehicle",
    "pages/trip/trip",
    "pages/report/report",
    "pages/attendance/attendance",
    "pages/logs/logs"
  ],
  "tabBar": {
    "list": [
      { "pagePath": "pages/index/index", "text": "首页" },
      { "pagePath": "pages/tasks/tasks", "text": "任务" },
      { "pagePath": "pages/vehicle/vehicle", "text": "车辆" },
      { "pagePath": "pages/trip/trip", "text": "行程" },
      { "pagePath": "pages/logs/logs", "text": "记录" }
    ]
  }
}
```

- [ ] **Step 2: 删除用户端遗留的页内导航组件**

把 `wxapp/miniprogram/components/footer-nav/*` 全部删除，并从 `wxapp/miniprogram/mock/bus.ts` 里移除只给这个组件用的 `navItems` 及相关类型，避免出现“原生 tabBar + 自定义底部导航”两套并行入口。

这一步的目标不是换个名字，而是让底部导航只保留一套来源：

```text
系统 tabBar = 唯一主入口
页面内快捷入口 = 辅助入口
```

- [ ] **Step 3: 把两端全局样式收敛成微信原生表面**

重写 `wxapp/miniprogram/app.wxss` 和 `driver/miniprogram/app.wxss`，把当前偏演示页的背景、卡片和标题样式收敛成微信原生可读的基础样式。

建议保留的公共样式语义：

```text
page
.app-shell
.page-body
.card
.section-header
.section-title
.section-subtitle
.cell
.badge
.primary-button
.ghost-button
.safe-bottom
```

视觉方向保持如下：

- 用户端以浅绿、浅灰、白底为主，克制、清爽、信息清晰。
- 司机端以浅蓝、白底、状态色为主，强调任务和执行感。
- 两端都不再使用重装饰背景、强渐变和过度拟物。

- [ ] **Step 4: 运行基础校验**

运行：

```powershell
cd wxapp
npm run check

cd ..\driver
npx tsc -p tsconfig.json --noEmit

cd ..
git diff --check
```

Expected:

- `wxapp` 类型检查无报错
- `driver` 类型检查无报错
- `git diff --check` 无格式错误

- [ ] **Step 5: 提交**

```powershell
git add wxapp driver
git commit -m "feat: normalize miniapp shells and navigation"
```

---

