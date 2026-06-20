(function (window, document) {
  const data = window.adminDashboardData;
  const state = window.adminDashboardState;

  if (!data || !state) {
    console.error('adminDashboardData or adminDashboardState is missing.');
    return;
  }

  const charts = new Map();
  const dom = {};

  function escapeHtml(value) {
    return String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }

  function init() {
    cacheDom();
    registerCampusMap();
    renderModule();
    window.addEventListener('resize', resizeCharts);
  }

  function cacheDom() {
    dom.navList = document.getElementById('navList');
    dom.moduleKicker = document.getElementById('moduleKicker');
    dom.moduleTitle = document.getElementById('moduleTitle');
    dom.moduleBadge = document.getElementById('moduleBadge');
    dom.moduleSummary = document.getElementById('moduleSummary');
    dom.moduleActions = document.getElementById('moduleActions');
    dom.moduleMetrics = document.getElementById('moduleMetrics');
    dom.workspaceTitle = document.getElementById('workspaceTitle');
    dom.workspaceSubtitle = document.getElementById('workspaceSubtitle');
    dom.workspace = document.getElementById('workspace');
    dom.cardsTitle = document.getElementById('cardsTitle');
    dom.cardsSubtitle = document.getElementById('cardsSubtitle');
    dom.moduleCards = document.getElementById('moduleCards');
    dom.moduleFeed = document.getElementById('moduleFeed');
    dom.tableTitle = document.getElementById('tableTitle');
    dom.moduleTable = document.getElementById('moduleTable');
  }

  function registerCampusMap() {
    if (!window.echarts || window.__xtuCampusRegistered) {
      return;
    }
    window.echarts.registerMap('xtuCampus', data.campusGeoJson);
    window.__xtuCampusRegistered = true;
  }

  function getModule() {
    return data.moduleMap[state.activeModuleId] || data.moduleMap.dashboard;
  }

  function renderModule() {
    const module = getModule();
    state.activeModuleId = module.id;

    if (typeof state.selectedRowIndex !== 'number') {
      state.selectedRowIndex = 0;
    }

    renderSidebar(module);
    renderHero(module);
    renderRail(module);
    renderWorkspace(module);
    resizeCharts();
  }

  function renderSidebar(activeModule) {
    dom.navList.innerHTML = data.moduleGroups.map((group) => `
      <div class="nav-group">
        <div class="nav-group-title">${escapeHtml(group.title)}</div>
        <div class="nav-group-list">
          ${group.items.map((moduleId) => {
            const module = data.moduleMap[moduleId];
            if (!module) {
              return '';
            }
            return `
              <button class="nav-item ${module.id === activeModule.id ? 'is-active' : ''}" data-module-id="${module.id}">
                <span class="nav-label">${escapeHtml(module.label)}</span>
                <span class="nav-desc">${escapeHtml(module.summary)}</span>
              </button>
            `;
          }).join('')}
        </div>
      </div>
    `).join('');

    dom.navList.querySelectorAll('[data-module-id]').forEach((button) => {
      button.addEventListener('click', () => {
        setActiveModule(button.dataset.moduleId);
        notifyAction(`切换模块：${button.textContent.trim()}`);
      });
    });
  }

  function renderHero(module) {
    dom.moduleKicker.textContent = module.kicker;
    dom.moduleTitle.textContent = module.title;
    dom.moduleBadge.textContent = module.badge;
    dom.moduleSummary.textContent = module.summary;
    dom.moduleActions.innerHTML = module.actions.map((action) => `
      <button class="hero-action" data-hero-action="${action.id}">${escapeHtml(action.label)}</button>
    `).join('');
    dom.moduleMetrics.innerHTML = module.metrics.map((metric) => `
      <article class="metric metric--${metric.tone || 'primary'}">
        <div class="metric-label">${escapeHtml(metric.label)}</div>
        <div class="metric-value">${escapeHtml(metric.value)}</div>
        <div class="metric-note">${escapeHtml(metric.note)}</div>
      </article>
    `).join('');

    dom.moduleActions.querySelectorAll('[data-hero-action]').forEach((button) => {
      button.addEventListener('click', () => {
        notifyAction(`执行操作：${button.textContent}`);
      });
    });
  }

  function renderRail(module) {
    dom.workspaceTitle.textContent = module.title;
    dom.workspaceSubtitle.textContent = `${module.summary} · ${state.lastAction}`;
    dom.cardsTitle.textContent = `${module.label} 卡片`;
    dom.cardsSubtitle.textContent = module.mode === 'dashboard'
      ? '高频动作和重点能力。'
      : '当前模块的关键动作与状态。';
    dom.tableTitle.textContent = module.table.title;

    dom.moduleCards.innerHTML = module.cards.map((card) => `
      <article class="mini-card">
        <div class="mini-card-title">${escapeHtml(card.title)}</div>
        <div class="mini-card-desc">${escapeHtml(card.desc)}</div>
        <div class="tag-list">
          ${card.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}
        </div>
      </article>
    `).join('');

    dom.moduleFeed.innerHTML = module.feed.map((item) => `
      <article class="feed-item">
        <div class="feed-time">${escapeHtml(item.time)}</div>
        <div class="feed-content">
          <div class="feed-title">${escapeHtml(item.title)}</div>
          <div class="feed-text">${escapeHtml(item.text)}</div>
        </div>
      </article>
    `).join('');

    dom.moduleTable.innerHTML = `
      <table class="data-table data-table--rail">
        <thead>
          <tr>
            ${module.table.headers.map((header) => `<th>${escapeHtml(header)}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${module.table.rows.map((row) => `
            <tr>
              ${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join('')}
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }

  function renderWorkspace(module) {
    disposeCharts();
    const sharedContext = {
      container: dom.workspace,
      data,
      module,
      state,
      mountChart,
      onAction: notifyAction,
      setRoute,
      setHeatPeriod,
      setStation,
      setActiveModule,
    };

    switch (module.mode) {
      case 'dashboard':
        window.renderOverview(sharedContext);
        break;
      case 'dispatch':
        window.renderDispatchPanel(sharedContext);
        break;
      case 'heatmap':
        window.renderHeatmapPanel(sharedContext);
        break;
      default:
        window.renderModulePanel(sharedContext);
        break;
    }
  }

  function mountChart(id, option, handlers = {}) {
    if (!window.echarts) {
      return null;
    }

    const element = document.getElementById(id);
    if (!element) {
      return null;
    }

    const existing = charts.get(id);
    if (existing) {
      existing.dispose();
      charts.delete(id);
    }

    const chart = window.echarts.init(element, null, { renderer: 'canvas' });
    chart.setOption(option, true);

    Object.entries(handlers).forEach(([eventName, handler]) => {
      if (typeof handler === 'function') {
        chart.on(eventName, handler);
      }
    });

    charts.set(id, chart);
    return chart;
  }

  function disposeCharts() {
    charts.forEach((chart) => chart.dispose());
    charts.clear();
  }

  function resizeCharts() {
    charts.forEach((chart) => {
      try {
        chart.resize();
      } catch (error) {
        // Ignore resize races during rerender.
      }
    });
  }

  function setActiveModule(moduleId) {
    if (!data.moduleMap[moduleId]) {
      return;
    }
    state.activeModuleId = moduleId;
    state.selectedRowIndex = 0;
  }

  function setRoute(routeId) {
    if (!data.routeLookup[routeId]) {
      return;
    }
    state.selectedRouteId = routeId;
  }

  function setHeatPeriod(periodId) {
    if (!data.heatmap.periods.some((period) => period.id === periodId)) {
      return;
    }
    state.selectedHeatPeriodId = periodId;
  }

  function setStation(stationId) {
    const station = data.stationLookup[stationId];
    if (!station) {
      return;
    }
    state.selectedStationId = stationId;
    if (station.lineIds?.length) {
      state.selectedRouteId = station.lineIds[0];
    }
  }

  function notifyAction(message) {
    state.lastAction = message;
    renderModule();
  }

  function ensureAmap() {
    if (window.AMap) {
      return Promise.resolve(window.AMap);
    }

    const key = window.__AMAP_KEY__ || window.localStorage.getItem('AMAP_KEY') || '';
    if (!key) {
      return Promise.reject(new Error('Missing AMap JSAPI key. Set window.__AMAP_KEY__ first.'));
    }

    if (window.__amapLoadingPromise) {
      return window.__amapLoadingPromise;
    }

    window.__amapLoadingPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://webapi.amap.com/maps?v=1.4.15&key=${encodeURIComponent(key)}&plugin=AMap.Heatmap`;
      script.onload = () => {
        if (window.AMap) {
          resolve(window.AMap);
        } else {
          reject(new Error('AMap script loaded but global AMap was not found.'));
        }
      };
      script.onerror = () => reject(new Error('Failed to load AMap JSAPI.'));
      document.head.appendChild(script);
    });

    return window.__amapLoadingPromise;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }

  window.mountDashboardChart = mountChart;
  window.ensureAmap = ensureAmap;
  window.adminDashboardApi = {
    setActiveModule,
    setRoute,
    setHeatPeriod,
    setStation,
    notifyAction,
    renderModule,
    ensureAmap,
  };
})(window, document);
