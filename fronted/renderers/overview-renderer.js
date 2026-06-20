(function (window) {
  function escapeHtml(value) {
    return String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }

  function renderOverview(context) {
    const { container, data, module, state, mountChart, onAction, setRoute, setHeatPeriod } = context;
    const activeRoute = data.routeLookup[state.selectedRouteId] || data.routes[0];
    const activePeriod = data.heatmap.periods.find((period) => period.id === state.selectedHeatPeriodId) || data.heatmap.periods[0];
    const recentStations = activePeriod.hotStations.map((name) => data.stations.find((station) => station.name === name)).filter(Boolean);

    window.renderDashboardShell(container, state);

    container.querySelector('#workspaceKicker').textContent = module.kicker;
    container.querySelector('#workspaceTitle').textContent = module.title;
    container.querySelector('#workspaceSubtitle').textContent = `${module.summary} 当前线路 ${activeRoute.shortName}，热度时段 ${activePeriod.label}。`;

    container.querySelector('#workspaceToolbar').innerHTML = `
      <div class="toolbar-group">
        <span class="toolbar-label">线路切换</span>
        <div class="toolbar-chip-list">
          ${data.routes.map((route) => `
            <button class="toolbar-chip ${route.id === state.selectedRouteId ? 'is-active' : ''}" data-route-id="${route.id}">
              <span class="chip-dot" style="background:${route.color}"></span>
              ${escapeHtml(route.shortName)}
            </button>
          `).join('')}
        </div>
      </div>
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
      <div class="toolbar-group toolbar-group--actions">
        ${module.actions.map((action) => `
          <button class="toolbar-action" data-action-id="${action.id}">${escapeHtml(action.label)}</button>
        `).join('')}
      </div>
    `;

    container.querySelector('#panelPrimary').innerHTML = `
      <div class="panel-head panel-head--split">
        <div>
          <div class="panel-label">地图调度看板</div>
          <div class="panel-title">校园通勤线路与车辆位置</div>
        </div>
        <div class="panel-meta">
          <span class="status-chip status-chip--primary">当前线路 ${escapeHtml(activeRoute.shortName)}</span>
          <span class="status-chip">ETA ${escapeHtml(activeRoute.eta)}</span>
          <span class="status-chip">车辆 ${escapeHtml(activeRoute.vehicleId.replace('bus-', ''))}</span>
        </div>
      </div>
      <div class="map-card">
        <div id="dashboardDispatchMap" class="chart chart--xl"></div>
      </div>
      <div class="mini-grid mini-grid--routes">
        ${data.routes.map((route) => `
          <button class="mini-route ${route.id === state.selectedRouteId ? 'is-active' : ''}" data-route-id="${route.id}">
            <span class="mini-route__name">${escapeHtml(route.name)}</span>
            <span class="mini-route__meta">${escapeHtml(route.direction)}</span>
            <span class="mini-route__status">${escapeHtml(route.status)} · ${escapeHtml(route.eta)}</span>
          </button>
        `).join('')}
      </div>
    `;

    container.querySelector('#panelSecondary').innerHTML = `
      <div class="panel-head panel-head--split">
        <div>
          <div class="panel-label">候车热力图</div>
          <div class="panel-title">${escapeHtml(activePeriod.label)} · ${escapeHtml(activePeriod.range)}</div>
        </div>
        <div class="panel-meta">
          <span class="status-chip status-chip--warning">高热 ${escapeHtml(activePeriod.topStation)}</span>
          <span class="status-chip">站点 ${recentStations.length}</span>
        </div>
      </div>
      <div class="heat-card">
        <div id="dashboardAmapHeatmap" class="chart chart--xl amap-map"></div>
      </div>
      <div class="insight-grid">
        <div class="insight-box">
          <div class="insight-label">调度建议</div>
          <div class="insight-copy">${escapeHtml(activePeriod.suggestion)}</div>
        </div>
        <div class="insight-box">
          <div class="insight-label">高热站点</div>
          <div class="insight-tags">
            ${recentStations.map((station) => `<span class="tag tag--soft">${escapeHtml(station.name)}</span>`).join('')}
          </div>
        </div>
      </div>
    `;

    container.querySelector('#panelTertiary').innerHTML = `
      <div class="panel-head panel-head--split">
        <div>
          <div class="panel-label">订单趋势</div>
          <div class="panel-title">近 7 日扫码乘车变化</div>
        </div>
        <span class="status-chip status-chip--success">趋势上升</span>
      </div>
      <div id="dashboardOrdersChart" class="chart chart--md"></div>
    `;

    container.querySelector('#panelQuaternary').innerHTML = `
      <div class="panel-head panel-head--split">
        <div>
          <div class="panel-label">呼叫与退款</div>
          <div class="panel-title">候车呼叫和退款审核联动</div>
        </div>
        <span class="status-chip">固定数据</span>
      </div>
      <div id="dashboardCallsChart" class="chart chart--md"></div>
    `;

    container.querySelector('#panelFooter').innerHTML = `
      <div class="footer-grid">
        <section class="footer-block">
          <div class="panel-head panel-head--split">
            <div>
              <div class="panel-label">退款趋势</div>
              <div class="panel-title">近 7 日退款审核</div>
            </div>
            <span class="status-chip status-chip--accent">待审 ${module.table.rows[2][1]}</span>
          </div>
          <div id="dashboardRefundsChart" class="chart chart--sm"></div>
        </section>
        <section class="footer-block">
          <div class="panel-head panel-head--split">
            <div>
              <div class="panel-label">实时摘要</div>
              <div class="panel-title">运营事件流</div>
            </div>
            <span class="status-chip">更新时间实时</span>
          </div>
          <div class="timeline-list">
            ${data.dashboard.timeline.map((item) => `
              <article class="timeline-item">
                <div class="timeline-time">${escapeHtml(item.time)}</div>
                <div class="timeline-copy">
                  <div class="timeline-title">${escapeHtml(item.title)}</div>
                  <div class="timeline-desc">${escapeHtml(item.text)}</div>
                </div>
              </article>
            `).join('')}
          </div>
        </section>
        <section class="footer-block footer-block--table">
          <div class="panel-head panel-head--split">
            <div>
              <div class="panel-label">${escapeHtml(module.table.title)}</div>
              <div class="panel-title">关键数据</div>
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
                  <tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join('')}</tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    `;

    container.querySelectorAll('[data-route-id]').forEach((button) => {
      button.addEventListener('click', () => {
        setRoute(button.dataset.routeId);
        onAction(`已切换到 ${data.routeLookup[button.dataset.routeId].shortName}`);
      });
    });

    container.querySelectorAll('[data-heat-id]').forEach((button) => {
      button.addEventListener('click', () => {
        setHeatPeriod(button.dataset.heatId);
        onAction(`已切换到 ${data.heatmap.periods.find((period) => period.id === button.dataset.heatId).label}`);
      });
    });

    container.querySelectorAll('[data-action-id]').forEach((button) => {
      button.addEventListener('click', () => {
        onAction(`执行操作：${button.textContent}`);
      });
    });

    mountChart('dashboardDispatchMap', buildDispatchOption(data, state), {
      click: (params) => {
        if (params?.data?.routeId) {
          setRoute(params.data.routeId);
          onAction(`点击地图选中 ${params.data.routeName}`);
        }
      },
    });

    renderAmapHeatmapPanel({
      containerId: 'dashboardAmapHeatmap',
      data,
      period: activePeriod,
      onAction,
    });
    mountChart('dashboardOrdersChart', buildTrendOption('扫码乘车订单', data.dashboard.orderTrend, data));
    mountChart('dashboardCallsChart', buildTrendComparisonOption('呼叫 / 座位', data.dashboard.callTrend, data.dashboard.loadTrend, data));
    mountChart('dashboardRefundsChart', buildRefundOption(data.dashboard.refundTrend, data));
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

  function buildDispatchOption(data, state) {
    const selectedRoute = data.routeLookup[state.selectedRouteId] || data.routes[0];
    const activeVehicle = data.vehicleLookup[selectedRoute.vehicleId];
    const lineSeries = data.routes.map((route) => ({
      name: route.name,
      type: 'lines',
      coordinateSystem: 'geo',
      zlevel: route.id === selectedRoute.id ? 2 : 1,
      effect: {
        show: route.id === selectedRoute.id,
        period: 4,
        symbol: 'arrow',
        symbolSize: 8,
      },
      lineStyle: {
        width: route.id === selectedRoute.id ? 4 : 2,
        opacity: route.id === selectedRoute.id ? 0.95 : 0.35,
        curveness: 0.12,
        color: route.color,
      },
      data: [
        {
          coords: route.path,
          routeId: route.id,
          routeName: route.shortName,
        },
      ],
    }));

    return {
      backgroundColor: 'transparent',
      tooltip: { show: false },
      geo: {
        map: 'xtuCampus',
        roam: false,
        left: '5%',
        right: '5%',
        top: '8%',
        bottom: '8%',
        silent: false,
        itemStyle: {
          color: '#eef5ff',
          borderColor: '#80a6df',
          borderWidth: 1.3,
          shadowBlur: 24,
          shadowColor: 'rgba(45, 108, 255, 0.08)',
        },
        emphasis: {
          itemStyle: {
            color: '#eff6ff',
          },
          label: {
            show: true,
            color: '#17314b',
          },
        },
        label: {
          show: true,
          color: '#6d8097',
          fontSize: 11,
        },
        regions: data.campusGeoJson.features.map((feature) => ({
          name: feature.properties.name,
          itemStyle: {
            areaColor: feature.properties.name === '湘大校园' ? '#f7fbff' : '#eaf3ff',
          },
        })),
      },
      series: [
        ...lineSeries,
        {
          name: '站点',
          type: 'scatter',
          coordinateSystem: 'geo',
          symbolSize: (value) => Math.max(10, value[2] / 6),
          itemStyle: {
            color: '#17314b',
          },
          label: {
            show: true,
            formatter: ({ data }) => data.name,
            position: 'right',
            color: '#17314b',
            fontSize: 11,
          },
          data: data.stations.map((station) => ({
            name: station.name,
            value: [station.x, station.y, station.heatWeight * 30],
          })),
        },
        {
          name: '车辆',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          rippleEffect: {
            brushType: 'stroke',
          },
          symbolSize: 12,
          label: {
            show: true,
            formatter: ({ data }) => data.name,
            color: '#1c3d5a',
            position: 'bottom',
          },
          itemStyle: {
            color: '#ff7d73',
            shadowBlur: 20,
            shadowColor: 'rgba(255, 125, 115, 0.3)',
          },
          data: data.vehicles.map((vehicle) => ({
            name: vehicle.name,
            value: vehicle.coord,
          })).concat(activeVehicle ? [{ name: `${activeVehicle.name} · 当前`, value: activeVehicle.coord }] : []),
        },
      ],
    };
  }

  function buildTrendOption(name, seriesData, data) {
    return {
      backgroundColor: 'transparent',
      grid: { left: 40, right: 20, top: 52, bottom: 34, containLabel: true },
      tooltip: { show: false },
      xAxis: {
        type: 'category',
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        axisLine: { lineStyle: { color: '#c8d5e6' } },
        axisLabel: { color: '#6d8097' },
      },
      yAxis: {
        type: 'value',
        axisLine: { show: false },
        splitLine: { lineStyle: { color: '#e3ebf6' } },
        axisLabel: { color: '#6d8097' },
      },
      series: [
        {
          name,
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 8,
          lineStyle: { width: 3, color: data.accent || '#2d6cff' },
          itemStyle: { color: data.accent || '#2d6cff' },
          areaStyle: { color: 'rgba(45, 108, 255, 0.12)' },
          data: seriesData,
        },
      ],
    };
  }

  function buildTrendComparisonOption(name, primarySeries, secondarySeries, data) {
    return {
      backgroundColor: 'transparent',
      grid: { left: 40, right: 20, top: 52, bottom: 34, containLabel: true },
      tooltip: { show: false },
      legend: {
        top: 8,
        textStyle: { color: '#6d8097' },
      },
      xAxis: {
        type: 'category',
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        axisLine: { lineStyle: { color: '#c8d5e6' } },
        axisLabel: { color: '#6d8097' },
      },
      yAxis: {
        type: 'value',
        axisLabel: { color: '#6d8097' },
        splitLine: { lineStyle: { color: '#e3ebf6' } },
      },
      series: [
        {
          name: '呼叫',
          type: 'bar',
          data: primarySeries,
          itemStyle: { color: '#1fbf8a' },
          barWidth: 16,
        },
        {
          name: '载客率',
          type: 'line',
          smooth: true,
          data: secondarySeries,
          lineStyle: { color: '#f59f2a', width: 3 },
          itemStyle: { color: '#f59f2a' },
        },
      ],
    };
  }

  function buildRefundOption(seriesData) {
    return {
      backgroundColor: 'transparent',
      grid: { left: 40, right: 20, top: 46, bottom: 28, containLabel: true },
      tooltip: { show: false },
      xAxis: {
        type: 'category',
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        axisLine: { lineStyle: { color: '#c8d5e6' } },
        axisLabel: { color: '#6d8097' },
      },
      yAxis: {
        type: 'value',
        axisLabel: { color: '#6d8097' },
        splitLine: { lineStyle: { color: '#e3ebf6' } },
      },
      series: [
        {
          type: 'bar',
          data: seriesData,
          barWidth: 18,
          itemStyle: {
            borderRadius: [8, 8, 0, 0],
            color: '#ff7d73',
          },
        },
      ],
    };
  }

  window.renderOverview = renderOverview;
})(window);
