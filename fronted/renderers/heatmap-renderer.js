(function (window) {
  function escapeHtml(value) {
    return String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }

  function renderHeatmapPanel(context) {
    const { container, data, module, state, mountChart, onAction, setHeatPeriod, setStation } = context;
    const activePeriod = data.heatmap.periods.find((period) => period.id === state.selectedHeatPeriodId) || data.heatmap.periods[0];
    const topStations = activePeriod.hotStations.map((name) => data.stationLookup[data.stations.find((station) => station.name === name)?.id]).filter(Boolean);

    window.renderDashboardShell(container, state);

    container.querySelector('#workspaceKicker').textContent = module.kicker;
    container.querySelector('#workspaceTitle').textContent = module.title;
    container.querySelector('#workspaceSubtitle').textContent = `${module.summary} 当前时段为 ${activePeriod.label}，可继续切换不同热力层。`;

    container.querySelector('#workspaceToolbar').innerHTML = `
      <div class="toolbar-group">
        <span class="toolbar-label">热度时段</span>
        <div class="toolbar-chip-list">
          ${data.heatmap.periods.map((period) => `
            <button class="toolbar-chip ${period.id === state.selectedHeatPeriodId ? 'is-active' : ''}" data-heat-id="${period.id}">
              ${escapeHtml(period.label)}
            </button>
          `).join('')}
        </div>
      </div>
      <div class="toolbar-group">
        <span class="toolbar-label">热点站点</span>
        <div class="toolbar-chip-list">
          ${activePeriod.hotStations.map((stationName) => `
            <button class="toolbar-chip" data-station-name="${escapeHtml(stationName)}">${escapeHtml(stationName)}</button>
          `).join('')}
        </div>
      </div>
      <div class="toolbar-group toolbar-group--actions">
        ${module.actions.map((action) => `
          <button class="toolbar-action" data-action-id="${action.id}">${escapeHtml(action.label)}</button>
        `).join('')}
      </div>
    `;

    container.querySelector('#panelPrimary').innerHTML = `
      <div class="panel-head panel-head--split">
        <div>
          <div class="panel-label">地图热区</div>
          <div class="panel-title">${escapeHtml(activePeriod.label)} · ${escapeHtml(activePeriod.range)}</div>
        </div>
        <div class="panel-meta">
          <span class="status-chip status-chip--warning">Top ${escapeHtml(activePeriod.topStation)}</span>
          <span class="status-chip">${escapeHtml(activePeriod.suggestion.slice(0, 12))}…</span>
        </div>
      </div>
      <div class="map-card">
        <div id="heatmapAmapMap" class="chart chart--xl amap-map"></div>
      </div>
      <div class="insight-grid">
        <div class="insight-box">
          <div class="insight-label">调度建议</div>
          <div class="insight-copy">${escapeHtml(activePeriod.suggestion)}</div>
        </div>
        <div class="insight-box">
          <div class="insight-label">高热站点</div>
          <div class="insight-tags">
            ${topStations.map((station) => `<span class="tag tag--soft">${escapeHtml(station.name)}</span>`).join('')}
          </div>
        </div>
      </div>
    `;

    container.querySelector('#panelSecondary').innerHTML = `
      <div class="panel-head panel-head--split">
        <div>
          <div class="panel-label">时段矩阵</div>
          <div class="panel-title">站点 x 时间热力图</div>
        </div>
        <span class="status-chip status-chip--primary">ECharts Heatmap</span>
      </div>
      <div id="heatmapMatrixChart" class="chart chart--xl"></div>
    `;

    container.querySelector('#panelTertiary').innerHTML = `
      <div class="panel-head panel-head--split">
        <div>
          <div class="panel-label">热度概览</div>
          <div class="panel-title">当前时段的运营提示</div>
        </div>
        <span class="status-chip">固定数据</span>
      </div>
      <div class="metric-grid metric-grid--compact">
        <div class="metric metric--compact">
          <div class="metric-label">高热站点</div>
          <div class="metric-value">${escapeHtml(activePeriod.topStation)}</div>
          <div class="metric-note">优先加车</div>
        </div>
        <div class="metric metric--compact">
          <div class="metric-label">热度范围</div>
          <div class="metric-value">${escapeHtml(activePeriod.range)}</div>
          <div class="metric-note">可切换时段</div>
        </div>
        <div class="metric metric--compact">
          <div class="metric-label">联动站点</div>
          <div class="metric-value">${topStations.length}</div>
          <div class="metric-note">地图同步</div>
        </div>
      </div>
      <div class="stack-list">
        ${topStations.map((station) => `
          <button class="stack-item ${station.id === state.selectedStationId ? 'is-active' : ''}" data-station-id="${station.id}">
            <div class="stack-item__title">${escapeHtml(station.name)}</div>
            <div class="stack-item__desc">${escapeHtml(station.zone)} · 热度 ${Math.round(station.heatWeight * 100)}</div>
          </button>
        `).join('')}
      </div>
    `;

    container.querySelector('#panelQuaternary').innerHTML = `
      <div class="panel-head panel-head--split">
        <div>
          <div class="panel-label">高热动作</div>
          <div class="panel-title">调度建议和操作</div>
        </div>
        <span class="status-chip">可交互</span>
      </div>
      <div class="action-grid">
        ${module.actions.map((action) => `
          <button class="action-card" data-action-id="${action.id}">
            <span class="action-card__title">${escapeHtml(action.label)}</span>
            <span class="action-card__desc">当前热区联动演示</span>
          </button>
        `).join('')}
      </div>
    `;

    container.querySelector('#panelFooter').innerHTML = `
      <div class="footer-grid footer-grid--single">
        <section class="footer-block footer-block--table">
          <div class="panel-head panel-head--split">
            <div>
              <div class="panel-label">${escapeHtml(module.table.title)}</div>
              <div class="panel-title">热点站点列表</div>
            </div>
            <span class="status-chip">${escapeHtml(state.lastAction)}</span>
          </div>
          <div class="table-wrap">
            <table class="data-table">
              <thead>
                <tr>${module.table.headers.map((header) => `<th>${escapeHtml(header)}</th>`).join('')}</tr>
              </thead>
              <tbody>
                ${module.table.rows.map((row) => `
                  <tr>
                    ${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join('')}
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    `;

    container.querySelectorAll('[data-heat-id]').forEach((button) => {
      button.addEventListener('click', () => {
        setHeatPeriod(button.dataset.heatId);
        onAction(`切换候车热力时段：${button.textContent}`);
      });
    });

    container.querySelectorAll('[data-station-name]').forEach((button) => {
      button.addEventListener('click', () => {
        const station = data.stations.find((item) => item.name === button.dataset.stationName);
        if (station) {
          setStation(station.id);
          onAction(`热力图聚焦站点：${station.name}`);
        }
      });
    });

    container.querySelectorAll('[data-station-id]').forEach((button) => {
      button.addEventListener('click', () => {
        setStation(button.dataset.stationId);
        onAction(`查看站点：${button.querySelector('.stack-item__title').textContent}`);
      });
    });

    container.querySelectorAll('[data-action-id]').forEach((button) => {
      button.addEventListener('click', () => {
        onAction(`执行操作：${button.textContent}`);
      });
    });

    renderAmapHeatmapPanel({
      containerId: 'heatmapAmapMap',
      data,
      period: activePeriod,
      onAction,
    });
    mountChart('heatmapMatrixChart', buildMatrixHeatOption(data, activePeriod));
  }

  function renderAmapHeatmapPanel(context) {
    const { containerId, data, period, onAction } = context;
    const container = document.getElementById(containerId);
    if (!container) {
      return;
    }

    if (container.__amapMap && typeof container.__amapMap.destroy === 'function') {
      container.__amapMap.destroy();
    }
    container.__amapMap = null;
    container.innerHTML = `
      <div class="map-fallback">
        <strong>正在加载高德热力图</strong>
        <span>地图中心已定位到湘潭大学，若未配置 key 将显示加载提示。</span>
      </div>
    `;

    window.ensureAmap()
      .then((AMap) => new Promise((resolve) => {
        if (window.__amapHeatmapPluginReady) {
          resolve(AMap);
          return;
        }
        AMap.plugin(['AMap.Heatmap'], () => {
          window.__amapHeatmapPluginReady = true;
          resolve(AMap);
        });
      }))
      .then((AMap) => {
        if (!document.body.contains(container)) {
          return;
        }

        container.innerHTML = '';
        const map = new AMap.Map(container, {
          zoom: 16,
          center: data.amapCenter,
          viewMode: '2D',
          resizeEnable: true,
        });

        map.setCity('湘潭');

        const marker = new AMap.Marker({
          position: data.amapCenter,
          title: '湘潭大学',
          offset: new AMap.Pixel(-10, -10),
        });
        marker.setLabel({
          content: '湘潭大学',
          direction: 'top',
        });
        map.add(marker);

        const heatmap = new AMap.Heatmap(map, {
          radius: 36,
          opacity: [0, 0.88],
          gradient: {
            0.2: '#dbeafe',
            0.45: '#7ab5ff',
            0.7: '#2d6cff',
            0.9: '#1d4ed8',
            1.0: '#7c3aed',
          },
        });
        heatmap.setDataSet({ data: period.amapPoints, max: 100 });

        container.__amapMap = map;
        container.__amapHeatmap = heatmap;

        map.on('click', (event) => {
          const nearest = data.stations.reduce((best, station) => {
            const dx = station.amapCoord[0] - event.lnglat.lng;
            const dy = station.amapCoord[1] - event.lnglat.lat;
            const distance = Math.hypot(dx, dy);
            if (!best || distance < best.distance) {
              return { station, distance };
            }
            return best;
          }, null);
          if (nearest?.station) {
            onAction(`高德热力图点击：${nearest.station.name}`);
          }
        });
      })
      .catch((error) => {
        if (!document.body.contains(container)) {
          return;
        }
        container.innerHTML = `
          <div class="map-fallback map-fallback--error">
            <strong>高德地图未加载</strong>
            <span>${escapeHtml(error.message)}</span>
          </div>
        `;
      });
  }

  function buildMatrixHeatOption(data, period) {
    return {
      backgroundColor: 'transparent',
      grid: { left: 84, right: 22, top: 36, bottom: 40, containLabel: true },
      tooltip: { show: false },
      xAxis: {
        type: 'category',
        data: data.heatmap.timeSlots,
        splitArea: { show: true },
        axisLabel: { color: '#6d8097' },
        axisLine: { lineStyle: { color: '#c8d5e6' } },
      },
      yAxis: {
        type: 'category',
        data: data.stations.map((station) => station.name),
        splitArea: { show: true },
        axisLabel: { color: '#6d8097' },
        axisLine: { lineStyle: { color: '#c8d5e6' } },
      },
      visualMap: {
        min: 0,
        max: 100,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: 0,
        inRange: {
          color: ['#f6fbff', '#b9d7ff', '#7ab5ff', '#2d6cff'],
        },
      },
      series: [
        {
          name: period.label,
          type: 'heatmap',
          data: period.matrix,
          label: {
            show: false,
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: 'rgba(77, 129, 255, 0.24)',
            },
          },
        },
      ],
    };
  }

  window.renderHeatmapPanel = renderHeatmapPanel;
})(window);
