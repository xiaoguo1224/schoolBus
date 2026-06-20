# 智慧通勤微信小程序信息架构重构实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 把 `wxapp/` 和 `driver/` 两套微信小程序重构为更贴近微信原生体验的信息架构与页面风格，同时保留两套代码独立、功能范围完整、入口清晰可维护。

**Architecture:** 继续保留用户端和司机端两套独立小程序，不合并代码，不引入 Web 化框架。先用 `app.json` 和全局 `app.wxss` 统一每端的导航、页面顺序和视觉基线，再分别重排用户端与司机端的首页、列表页、详情页和服务页，把当前散落的功能收纳到更合理的页面职责中。用户端保留“班车通勤 + 共享电动车”双场景，但首页只做总览；司机端以“今日任务”为首页主线，其它能力围绕任务执行、车辆确认、行程操作和记录回看展开。

**Tech Stack:** 微信小程序原生能力、WXML、WXSS、TypeScript、`wx.*` API、`miniprogram-api-typings`.

## Global Constraints

- 用户端与司机端仍保持两套代码，职责不混用。
- 视觉与交互统一收敛到微信原生风格，避免 Web 化和重装饰。
- 本次不涉及后端接口、数据库、真实支付、真实地图 SDK 或权限体系实现。
- 小程序页面必须使用 WXML / WXSS / TypeScript / `wx.*` API，不写 HTML、CSS、DOM、Vue、React。
- 页面必须在各自 `app.json` 中注册，导航必须以小程序原生 tabBar 为主。
- 本次仅覆盖 `wxapp/` 与 `driver/`，不改 `fronted/` 和 `backend/`。

---

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

### Task 2: 重排用户端首页、线路页、地图页和详情页

**Files:**
- Modify: `wxapp/miniprogram/mock/bus.ts`
- Modify: `wxapp/miniprogram/mock/map.ts`
- Modify: `wxapp/miniprogram/pages/index/index.ts`
- Modify: `wxapp/miniprogram/pages/index/index.wxml`
- Modify: `wxapp/miniprogram/pages/index/index.wxss`
- Modify: `wxapp/miniprogram/pages/schedule/index.ts`
- Modify: `wxapp/miniprogram/pages/schedule/index.wxml`
- Modify: `wxapp/miniprogram/pages/schedule/index.wxss`
- Modify: `wxapp/miniprogram/pages/map/index.ts`
- Modify: `wxapp/miniprogram/pages/map/index.wxml`
- Modify: `wxapp/miniprogram/pages/map/index.wxss`
- Modify: `wxapp/miniprogram/pages/detail/index.ts`
- Modify: `wxapp/miniprogram/pages/detail/index.wxml`
- Modify: `wxapp/miniprogram/pages/detail/index.wxss`

**Interfaces:**
- Consumes: `todayTrips`, `buildRouteStops`, `scheduleTabs`, `routeFilters`, `mapScenes`, `getSceneByTripId`, `campusCenter`.
- Produces: 更克制的首页总览、清晰的线路列表页、地图优先的车辆和站点视图、可从列表页进入的路线详情页。

- [ ] **Step 1: 把用户端首页压缩成“场景总览”**

重做 `wxapp/miniprogram/pages/index/index.*`，首页只保留四类信息：

```text
1. 班车 / 共享电动车场景切换
2. 当前场景的关键状态摘要
3. 2 到 4 个最重要的快捷入口
4. 今日提醒或关键运营状态
```

首页不再承担完整功能清单，不再把优惠券、评价、反馈、记录和共享电动车资格都塞在同一屏里。

首页交互要求：

- `wx.navigateTo` / `wx.switchTab` 只跳转到明确的主入口。
- 场景切换后，页面内快捷入口跟着切换，但 tabBar 不变。
- 班车场景和电动车场景都必须保持“有主次”的结构。

- [ ] **Step 2: 把线路页重做成线路列表 + 详情预览**

重做 `wxapp/miniprogram/pages/schedule/index.*`，让它专注做“线路与班次”。

线路页的结构建议固定为：

```text
顶部：当前日期 / 场景摘要
中部：线路筛选标签
主体：线路卡片列表
底部：选中线路的详情预览
```

用户点击某条线路后，仍然复用 `buildRouteStops()`，但详情区要变成原生风格的站点时间线，而不是更像演示页面的大卡片堆叠。

- [ ] **Step 3: 把地图页重做成“看车、看站、发起呼叫”**

重做 `wxapp/miniprogram/pages/map/index.*`，让地图页成为用户端的实时出行视图。

地图页必须保留这些核心动作：

```text
查看车辆位置
查看站点状态
查看 ETA
一键呼叫
切换关注线路
```

`wxapp/miniprogram/mock/map.ts` 继续作为地图场景的演示数据源，但页面表达要更像微信小程序里的原生地图页，不再像示意图拼装页。

- [ ] **Step 4: 把详情页改成真正的二级详情页**

重做 `wxapp/miniprogram/pages/detail/index.*`，把它从“选择结果回显页”升级为稳定的路线详情页。

详情页要展示：

```text
线路名称
运行方向
当前车辆
司机信息
站点时间线
下一站 ETA
```

如果页面没有选中结果，要自动回退到默认班次，而不是展示空白或报错。

- [ ] **Step 5: 校验用户端首页和详情流转**

运行：

```powershell
cd wxapp
npm run check
git diff --check
```

然后在微信开发者工具里确认：

- 首页只有一个明确主线，不再堆满入口
- 线路页能完成“列表 -> 详情”的流转
- 地图页能从班次或线路进入，并保持可读的车辆和站点状态
- 详情页能独立作为二级页阅读

- [ ] **Step 6: 提交**

```powershell
git add wxapp/miniprogram/mock/bus.ts wxapp/miniprogram/mock/map.ts wxapp/miniprogram/pages/index wxapp/miniprogram/pages/schedule wxapp/miniprogram/pages/map wxapp/miniprogram/pages/detail
git commit -m "feat: restructure user miniapp discovery flow"
```

---

### Task 3: 重排用户端扫码乘车与个人中心

**Files:**
- Modify: `wxapp/miniprogram/pages/reserve/index.ts`
- Modify: `wxapp/miniprogram/pages/reserve/index.wxml`
- Modify: `wxapp/miniprogram/pages/reserve/index.wxss`
- Modify: `wxapp/miniprogram/pages/mine/index.ts`
- Modify: `wxapp/miniprogram/pages/mine/index.wxml`
- Modify: `wxapp/miniprogram/pages/mine/index.wxss`

**Interfaces:**
- Consumes: `selectedTrip` from storage, `stationOptions`, `rideRecords`, `couponItems`, `feedbackItems`, `ratingItems`, `ebikeItems`, `profileStats`.
- Produces: 原生微信风格的扫码乘车流程、分组式个人中心、清晰的记录和服务入口。

- [ ] **Step 1: 把扫码乘车页改成四段式流程**

重做 `wxapp/miniprogram/pages/reserve/index.*`，把当前页面整理成清晰的乘车路径：

```text
扫码识别
座位状态
支付确认
下车点 / 唤醒设置
```

页面必须明显区分“先看状态，再做支付，再设置下车提醒”，不要把座位、支付、提醒和说明混在一屏里。

页面交互要求：

- 选中班次后继续使用 `selectedTrip`。
- 座位状态要以状态标签或列表展示，不再只靠说明文字。
- 支付成功后继续保留下车点选择和唤醒模式设置。

- [ ] **Step 2: 把“我的”改成分组式服务中心**

重做 `wxapp/miniprogram/pages/mine/index.*`，让它成为用户端真正的个人中心，而不是功能堆叠页。

建议分组为：

```text
个人信息
出行记录
支付与退款
优惠券与权益
问题反馈与评价
共享电动车资格
```

`rideRecords`、`couponItems`、`feedbackItems`、`ratingItems`、`ebikeItems` 仍然可以复用，但每组要通过原生列表、卡片或 cell 风格呈现，不再用一大坨网格把所有功能并列摆放。

- [ ] **Step 3: 让“我的”页承担用户服务跳转**

在 `wxapp/miniprogram/pages/mine/index.ts` 里，把当前的占位 `showToast` 演示改成真正的页面跳转或明确的功能入口行为。

目标是让这几个动作都能被用户理解：

```text
查看乘车记录
发起退款申请
查看优惠券
查看问题反馈
查看司机评价
查看共享电动车资格
```

如果某个入口暂时没有独立页面，也要在页面内明确标成“待进入详情”或“待确认”，不要装作已经完成。

- [ ] **Step 4: 收紧用户端记录页的视觉语言**

把 `reserve` 和 `mine` 相关样式改成微信原生常见的列表、标签、按钮和轻卡片，少用重阴影和过大的圆角。

建议保留的样式语义：

```text
.page
.card
.cell
.cell-group
.badge
.section-title
.section-subtitle
.primary-button
```

- [ ] **Step 5: 校验用户端服务中心流转**

运行：

```powershell
cd wxapp
npm run check
git diff --check
```

然后在微信开发者工具里确认：

- 扫码乘车是一个完整流程，不是单页说明
- 支付、下车点和唤醒设置的顺序是自然的
- “我的”不再像杂物箱，而像真正的个人中心
- 记录、券包、反馈和资格入口都能找到明确位置

- [ ] **Step 6: 提交**

```powershell
git add wxapp/miniprogram/pages/reserve wxapp/miniprogram/pages/mine
git commit -m "feat: restructure user ride and profile center"
```

---

### Task 4: 重排司机端首页、任务、车辆、行程和记录

**Files:**
- Modify: `driver/miniprogram/pages/index/index.ts`
- Modify: `driver/miniprogram/pages/index/index.wxml`
- Modify: `driver/miniprogram/pages/index/index.wxss`
- Modify: `driver/miniprogram/pages/tasks/tasks.ts`
- Modify: `driver/miniprogram/pages/tasks/tasks.wxml`
- Modify: `driver/miniprogram/pages/tasks/tasks.wxss`
- Modify: `driver/miniprogram/pages/vehicle/vehicle.ts`
- Modify: `driver/miniprogram/pages/vehicle/vehicle.wxml`
- Modify: `driver/miniprogram/pages/vehicle/vehicle.wxss`
- Modify: `driver/miniprogram/pages/trip/trip.ts`
- Modify: `driver/miniprogram/pages/trip/trip.wxml`
- Modify: `driver/miniprogram/pages/trip/trip.wxss`
- Modify: `driver/miniprogram/pages/report/report.ts`
- Modify: `driver/miniprogram/pages/report/report.wxml`
- Modify: `driver/miniprogram/pages/report/report.wxss`
- Modify: `driver/miniprogram/pages/attendance/attendance.ts`
- Modify: `driver/miniprogram/pages/attendance/attendance.wxml`
- Modify: `driver/miniprogram/pages/attendance/attendance.wxss`
- Modify: `driver/miniprogram/pages/logs/logs.ts`
- Modify: `driver/miniprogram/pages/logs/logs.wxml`
- Modify: `driver/miniprogram/pages/logs/logs.wxss`

**Interfaces:**
- Consumes: `driverPages`, `driverTabPaths`, `todayTasks`, `callAlerts`, `tripTimeline`, `vehicleProfile`, `vehicleChecks`, `reportReasons`, `attendanceStats`, `tripRecords`, `ratingHighlights`.
- Produces: 以“今日任务”为主线的司机工作台、清晰的任务执行页、车辆确认页、行程执行页、异常上报页、考勤和记录页。

- [ ] **Step 1: 把司机首页改成今日任务总览**

重做 `driver/miniprogram/pages/index/index.*`，首页第一眼必须回答三个问题：

```text
今天跑什么
现在该处理什么
下一步去哪一页
```

首页保留的内容只应包括：

- 今日任务摘要
- 呼叫提醒摘要
- 热点站点摘要
- 下一步操作入口

首页不要再像“多个司机页面的说明集合”，要像一个真正的工作台。

- [ ] **Step 2: 把任务页改成任务列表 + 提醒面板**

重做 `driver/miniprogram/pages/tasks/tasks.*`，让任务页承担“查看今日任务、查看候车呼叫、查看热点提醒”的职责。

页面结构建议固定为：

```text
任务列表
当前选中任务
提醒面板
执行节奏
```

任务列表点击后，右侧或下方要能看到该任务的状态、下一站和操作提示，而不是只做一列静态卡片。

- [ ] **Step 3: 把车辆页改成绑定与检查页**

重做 `driver/miniprogram/pages/vehicle/vehicle.*`，让它承担车辆绑定、车辆状态和基础检查。

页面必须明确展示：

```text
车牌 / 车辆编号
座位数
绑定状态
车况检查
基础运行状态
```

按钮动作要聚焦“确认车辆”“检查状态”“进入行程”，不要把不相关的说明堆在一起。

- [ ] **Step 4: 把行程页改成司机的核心操作页**

重做 `driver/miniprogram/pages/trip/trip.*`，把行程页整理成真正的执行面板。

行程页必须保留这些操作：

```text
开始行程
到站确认
结束行程
异常上报
```

页面上还要有当前行程进度、当前车辆、下一站和关键提醒，不要再做成纯结果展示页。

- [ ] **Step 5: 把异常上报、考勤和记录页改成低频辅助页**

重做 `driver/miniprogram/pages/report/report.*`、`driver/miniprogram/pages/attendance/attendance.*`、`driver/miniprogram/pages/logs/logs.*`，把它们统一收纳为辅助页：

```text
report = 行程中的异常上报入口
attendance = 考勤与评价
logs = 历史记录与回执
```

这三个页面要更像“从工作流分出来的二级页”，而不是各自独立的展示页。

- [ ] **Step 6: 校验司机端工作流**

运行：

```powershell
cd driver
npx tsc -p tsconfig.json --noEmit
git diff --check
```

然后在微信开发者工具里确认：

- 首页第一屏就是今日任务
- 任务、车辆、行程、记录四个底部入口都能解释自己的职责
- 异常上报、考勤和历史记录不再抢主入口
- 整体视觉更像原生微信工作台，而不是演示海报

- [ ] **Step 7: 提交**

```powershell
git add driver/miniprogram/pages/index driver/miniprogram/pages/tasks driver/miniprogram/pages/vehicle driver/miniprogram/pages/trip driver/miniprogram/pages/report driver/miniprogram/pages/attendance driver/miniprogram/pages/logs
git commit -m "feat: restructure driver miniapp workbench"
```

---

### Task 5: 全量回归、文档对齐和最终清理

**Files:**
- Modify: `docs/功能分析.md`
- Modify: `docs/智慧通勤综合服务平台_校园车与共享电动车调研文档.md` 仅在页面归属或名称确实需要同步时更新

**Interfaces:**
- Consumes: 已完成的用户端和司机端新页面结构。
- Produces: 与代码一致的功能归属说明、可交接的最终检查结果。

- [ ] **Step 1: 对齐文档中的页面归属**

把 `docs/功能分析.md` 里的用户端和司机端页面说明更新为新结构，重点对齐这些内容：

```text
用户端：首页 / 线路 / 地图 / 扫码乘车 / 我的
司机端：首页 / 任务 / 车辆 / 行程 / 记录
```

文档只同步最终的页面归属和功能边界，不补具体技术选型。

- [ ] **Step 2: 做一次跨应用类型检查**

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

- 两端类型检查都通过
- 没有未格式化的改动
- 没有遗留的死导航、死页面或明显冲突

- [ ] **Step 3: 做微信开发者工具人工回归**

在微信开发者工具里分别打开 `wxapp/` 和 `driver/`，按以下路径走一遍：

```text
用户端：首页 -> 线路 -> 地图 -> 扫码乘车 -> 我的
司机端：首页 -> 任务 -> 车辆 -> 行程 -> 记录
```

重点确认：

- tabBar 顺序和页面职责一致
- 用户端双场景切换没有破坏主结构
- 司机端首页仍是“今日任务”
- 页面视觉统一成微信原生风格

- [ ] **Step 4: 最后提交**

```powershell
git add docs wxapp driver
git commit -m "docs: align miniapp restructure plan and references"
```
