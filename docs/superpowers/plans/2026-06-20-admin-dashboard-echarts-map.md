# 智慧通勤后台管理界面重构实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 把 `fronted/` 重构成真正的管理后台界面，首页具备驾驶舱感，候车热力图改用 ECharts 实现，地图调度与管理模块都有真实后台的图形化交互。

**Architecture:** 保留当前静态 Web 交付方式，不引入打包器。把现在过大的 `fronted/app.js` 拆成少量职责清晰的浏览器脚本：数据层、图表层、模块渲染层和入口层分开，`index.html` 负责按顺序加载。首页先完成“看板 + 图表 + 热力图 + 地图调度”的核心演示，再把其它管理模块统一成表格、筛选、状态标签和详情面板，确保每个页面都像真实运营后台。

**Tech Stack:** HTML, CSS, Vanilla JavaScript, ECharts, local static server (`python -m http.server`), browser smoke verification.

## Global Constraints

- 本次仅覆盖后台 Web 界面设计与前端演示交互，不涉及真实接口、权限系统或数据库。
- 热力图必须使用 ECharts 实现，采用热力图或散点热区叠层，不再用手写颜色块。
- 后台采用亮主题、企业中台风格。
- 全部数据采用固定演示数据，但界面必须像真实后台。
- 真实地图服务接入不在本次范围。
- 生产级权限控制不在本次范围。

---

### Task 1: 拆分后台脚本骨架并接入 ECharts

**Files:**
- Modify: `fronted/index.html`
- Modify: `fronted/styles.css`
- Modify: `fronted/app.js`
- Create: `fronted/vendor/echarts.min.js`
- Create: `fronted/data/admin-dashboard-data.js`
- Create: `fronted/renderers/dashboard-shell.js`

**Interfaces:**
- Consumes: `window.echarts`, `window.adminDashboardData`
- Produces: `window.renderDashboardShell(container, state)`, `window.adminDashboardState`

- [ ] **Step 1: 固定脚本加载顺序**

在 `fronted/index.html` 中先加载本地 `fronted/vendor/echarts.min.js`，再加载 `fronted/data/admin-dashboard-data.js`、`fronted/renderers/dashboard-shell.js`，最后加载 `fronted/app.js`。页面仍然保持单页静态结构，但入口脚本不再承载所有渲染逻辑。

```html
<script src="./vendor/echarts.min.js"></script>
<script src="./data/admin-dashboard-data.js"></script>
<script src="./renderers/dashboard-shell.js"></script>
<script src="./app.js"></script>
```

- [ ] **Step 2: 把后台固定数据抽离到独立数据文件**

把当前 `fronted/app.js` 里所有 `modules`、`dispatchRoutes`、`heatmapPeriods`、KPI、表格行和事件流数据移动到 `fronted/data/admin-dashboard-data.js`，并统一挂到 `window.adminDashboardData`。这个文件只负责数据，不写 DOM，不写事件绑定。

- [ ] **Step 3: 重建后台页面骨架**

把 `fronted/styles.css` 中当前偏展示页的样式收拢为标准后台骨架样式：左侧菜单、顶部工具条、主内容区、右侧辅助区、统一卡片、统一表格、统一空状态。把首页容器拆成这些固定节点：

```text
#navList
#moduleKicker
#moduleTitle
#moduleBadge
#moduleSummary
#moduleMetrics
#workspaceTitle
#workspaceSubtitle
#workspace
#moduleCards
#moduleFeed
#moduleTable
```

- [ ] **Step 4: 做脚本级冒烟验证**

运行：

```powershell
node --check fronted/app.js
git diff --check
```

Expected:
- `node --check` 无输出
- `git diff --check` 无新增格式错误

---

### Task 2: 重做首页驾驶舱的 KPI、趋势图和右侧模块栏

**Files:**
- Modify: `fronted/app.js`
- Modify: `fronted/styles.css`
- Create: `fronted/renderers/overview-renderer.js`

**Interfaces:**
- Consumes: `window.adminDashboardData`
- Produces: `renderOverview(state)`, `renderKpiCards(items)`, `renderTrendCharts(series)`

- [ ] **Step 1: 定义首页驾驶舱状态**

在 `fronted/app.js` 里补齐首页状态对象，至少包含这些字段：

```js
const adminDashboardState = {
  activeModuleId: 'dashboard',
  selectedRouteId: 'route-01',
  selectedHeatPeriodId: 'morning',
  selectedStationId: 'north-gate',
  lastAction: '固定数据演示，可切换模块、线路和热度。',
};
```

- [ ] **Step 2: 把首页主视觉改成真正的后台驾驶舱**

首页顶部保留 KPI 卡片，但不再把大段说明文字放在首屏中间。主内容区改成：

```text
左侧：地图调度看板
右侧：ECharts 热力图
下方：趋势图 / 待办 / 实时摘要
```

首页右侧栏要有明确的运营数据，而不是重复描述文案。

- [ ] **Step 3: 接入首页趋势图**

在 `fronted/renderers/overview-renderer.js` 里实现折线图和柱状图容器渲染，并把图表挂到固定 DOM 节点，例如：

```text
#trendOrdersChart
#trendCallsChart
#trendRefundsChart
```

每个图表都要使用固定演示数据，至少体现近 7 天趋势。

- [ ] **Step 4: 给首页补状态反馈**

点击菜单、图表项或操作按钮后，更新 `adminDashboardState.lastAction`，并把它拼进首页摘要，避免首页仍然像静态海报。

- [ ] **Step 5: 浏览器验收**

运行：

```powershell
python -m http.server 4174
```

然后打开 `http://127.0.0.1:4174/`，确认首页首屏能看到：

- KPI 卡片
- 至少 2 个趋势图
- 调度区和热力图区
- 右侧待办和摘要

---

### Task 3: 用 ECharts 重写候车热力图和地图调度联动

**Files:**
- Modify: `fronted/app.js`
- Modify: `fronted/styles.css`
- Create: `fronted/renderers/heatmap-renderer.js`
- Create: `fronted/renderers/dispatch-renderer.js`

**Interfaces:**
- Consumes: `window.echarts`, `window.adminDashboardData`, `adminDashboardState`
- Produces: `renderHeatmapPanel(state)`, `renderDispatchPanel(state)`, `setSelectedHeatPeriod(id)`, `setSelectedRoute(id)`

- [ ] **Step 1: 建立热力图数据结构**

在 `fronted/data/admin-dashboard-data.js` 里把候车热度整理成 ECharts 需要的三维矩阵：`[hourIndex, stationIndex, value]`，同时保留站点名称、时间段名称和调度建议。不要再保留手写热区块作为主渲染方式。

- [ ] **Step 2: 实现 ECharts heatmap**

在 `fronted/renderers/heatmap-renderer.js` 里生成热力图 option，要求包含：

```js
{
  xAxis: { type: 'category' },
  yAxis: { type: 'category' },
  visualMap: { min: 0, max: 100, calculable: true },
  series: [{ type: 'heatmap' }]
}
```

热力图外层再配一个说明面板，显示：
- 当前时段
- 高热站点
- 调度建议

- [ ] **Step 3: 实现地图调度联动**

在 `fronted/renderers/dispatch-renderer.js` 里把线路、站点、车辆位置做成地图式调度面板。保持固定校园地图底图，但要用图层形式叠加：

- 线路轨迹
- 站点点位
- 车辆位置
- 选中态高亮

热力图点击某个站点后，地图调度面板要切到对应线路或站点，并刷新右侧摘要。

- [ ] **Step 4: 补上操作按钮**

地图调度区至少保留这些动作：

- 发送提醒
- 跟随车辆
- 查看详情
- 标记异常

点击后只更新固定状态，不接真实接口，但要有明确反馈。

- [ ] **Step 5: 浏览器验收**

打开后台页面后确认：

- 热力图是 ECharts 渲染，不是手写块状区域
- 切换时段后图表数据会变化
- 点击高热站点后，地图调度高亮同步变化
- 页面没有丢失图例、标签或摘要

---

### Task 4: 把剩余管理模块改成真实后台卡片、表格和详情面板

**Files:**
- Modify: `fronted/app.js`
- Modify: `fronted/styles.css`
- Create: `fronted/renderers/module-renderer.js`

**Interfaces:**
- Consumes: `window.adminDashboardData`
- Produces: `renderTableModule(moduleId)`, `renderDetailDrawer(rowId)`, `renderActionStrip(actions)`

- [ ] **Step 1: 统一管理模块的页面模板**

把用户、司机、车辆、线路、站点、班次 / 任务、一键呼叫、退款、优惠券、权益、共享电动车这些模块统一成同一套管理后台模板：

- 顶部说明区
- 筛选区
- 表格区
- 状态标签
- 详情抽屉 / 弹窗

不要再用纯文字块堆模块说明。

- [ ] **Step 2: 给每个模块补真实后台动作**

每个模块至少提供 2 个操作按钮，例如：

- 查看详情
- 编辑
- 启停
- 导出
- 标记处理

按钮点击只变更固定状态和右上角操作提示，不连真实接口。

- [ ] **Step 3: 把右侧辅助区做成可阅读的数据流**

右侧栏保留：

- 实时摘要
- 待办列表
- 最近操作
- 状态统计

右侧内容要用表格、时间线和标签，不再只写说明句。

- [ ] **Step 4: 做浏览器级回归**

运行：

```powershell
git diff --check
node --check fronted/app.js
python -m http.server 4174
```

在浏览器里确认：

- 首页不是文字堆砌
- 热力图是 ECharts
- 地图调度是图层式展示
- 所有模块都有数据和操作

- [ ] **Step 5: 提交**

```powershell
git add fronted
git commit -m "feat: rebuild admin dashboard with echarts"
```

