(function (window) {
  function escapeHtml(value) {
    return String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }

  function renderDispatchPanel(context) {
    const { container, data, module, state, mountChart, onAction, setRoute, setStation } = context;
    const activeRoute = data.routeLookup[state.selectedRouteId] || data.routes[0];
    const activeVehicle = data.vehicleLookup[activeRoute.vehicleId];

    window.renderDashboardShell(container, state);

    container.querySelector('#workspaceKicker').textContent = module.kicker;
    container.querySelector('#workspaceTitle').textContent = module.title;
    container.querySelector('#workspaceSubtitle').textContent = `${module.summary} 当前选中 ${activeRoute.shortName}，可继续通过线路卡片切换。`;

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
      <div class="toolbar-group toolbar-group--actions">
        ${module.actions.map((action) => `
          <button class="toolbar-action" data-action-id="${action.id}">${escapeHtml(action.label)}</button>
        `).join('')}
      </div>
    `;

    container.querySelector('#panelPrimary').innerHTML = `
      <div class="panel-head panel-head--split">
        <div>
          <div class="panel-label">地图调度</div>
          <div class="panel-title">${escapeHtml(activeRoute.name)}</div>
        </div>
        <div class="panel-meta">
          <span class="status-chip status-chip--primary">${escapeHtml(activeRoute.status)}</span>
          <span class="status-chip">ETA ${escapeHtml(activeRoute.eta)}</span>
          <span class="status-chip">车辆 ${escapeHtml(activeRoute.vehicleId.replace('bus-', ''))}</span>
        </div>
      </div>
      <div class="map-card">
        <div id="dispatchMapChart" class="chart chart--xl"></div>
      </div>
      <div class="insight-grid">
        <div class="insight-box">
          <div class="insight-label">路线说明</div>
          <div class="insight-copy">${escapeHtml(activeRoute.direction)}</div>
        </div>
        <div class="insight-box">
          <div class="insight-label">当前车辆</div>
          <div class="insight-copy">${escapeHtml(activeVehicle.name)} · ${escapeHtml(activeVehicle.plate)} · ${escapeHtml(activeVehicle.speed)}</div>
        </div>
      </div>
    `;

    container.querySelector('#panelSecondary').innerHTML = `
      <div class="panel-head panel-head--split">
        <div>
          <div class="panel-label">线路详情</div>
          <div class="panel-title">任务与站点联动</div>
        </div>
        <span class="status-chip status-chip--warning">当前调度 ${escapeHtml(activeRoute.shortName)}</span>
      </div>
      <div class="stack-list">
        ${data.routes.map((route) => `
          <button class="stack-item ${route.id === state.selectedRouteId ? 'is-active' : ''}" data-route-id="${route.id}">
            <div class="stack-item__title">${escapeHtml(route.name)}</div>
            <div class="stack-item__desc">${escapeHtml(route.direction)}</div>
            <div class="stack-item__meta">${escapeHtml(route.status)} · ${escapeHtml(route.eta)} · ${escapeHtml(route.seats)}</div>
          </button>
        `).join('')}
      </div>
      <div class="detail-board">
        <div class="detail-board__title">操作态</div>
        <div class="detail-board__grid">
          ${module.actions.map((action) => `
            <button class="action-card action-card--soft" data-action-id="${action.id}">
              <span class="action-card__title">${escapeHtml(action.label)}</span>
              <span class="action-card__desc">固定数据演示</span>
            </button>
          `).join('')}
        </div>
      </div>
    `;

    container.querySelector('#panelTertiary').innerHTML = `
      <div class="panel-head panel-head--split">
        <div>
          <div class="panel-label">座位与路线</div>
          <div class="panel-title">各线路座位占用</div>
        </div>
        <span class="status-chip">固定数据</span>
      </div>
      <div id="dispatchLoadChart" class="chart chart--md"></div>
    `;

    container.querySelector('#panelQuaternary').innerHTML = `
      <div class="panel-head panel-head--split">
        <div>
          <div class="panel-label">车辆状态</div>
          <div class="panel-title">在线、候车与调度分布</div>
        </div>
        <span class="status-chip status-chip--success">同步中</span>
      </div>
      <div id="dispatchStatusChart" class="chart chart--md"></div>
    `;

    container.querySelector('#panelFooter').innerHTML = `
      <div class="footer-grid footer-grid--single">
        <section class="footer-block footer-block--table">
          <div class="panel-head panel-head--split">
            <div>
              <div class="panel-label">${escapeHtml(module.table.title)}</div>
              <div class="panel-title">今日任务列表</div>
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

    container.querySelectorAll('[data-route-id]').forEach((button) => {
      button.addEventListener('click', () => {
        setRoute(button.dataset.routeId);
        onAction(`切换线路：${button.textContent.trim()}`);
      });
    });

    container.querySelectorAll('[data-action-id]').forEach((button) => {
      button.addEventListener('click', () => {
        onAction(`执行调度动作：${button.textContent}`);
      });
    });

    mountChart('dispatchMapChart', buildDispatchMapOption(data, state), {
      click: (params) => {
        if (params?.data?.stationId) {
          setStation(params.data.stationId);
          const routeId = params.data.routeId || activeRoute.id;
          setRoute(routeId);
          onAction(`地图选中站点：${params.data.name}`);
        }
      },
    });
    mountChart('dispatchLoadChart', buildLoadOption(data, activeRoute));
    mountChart('dispatchStatusChart', buildStatusOption(data));
  }

  function buildDispatchMapOption(data, state) {
    const selectedRoute = data.routeLookup[state.selectedRouteId] || data.routes[0];
    const activeVehicle = data.vehicleLookup[selectedRoute.vehicleId];
    return {
      backgroundColor: 'transparent',
      tooltip: { show: false },
      geo: {
        map: 'xtuCampus',
        roam: false,
        left: '4%',
        right: '4%',
        top: '8%',
        bottom: '8%',
        label: {
          show: true,
          color: '#5f738d',
        },
        itemStyle: {
          color: '#f7fbff',
          borderColor: '#81a6db',
          borderWidth: 1.2,
        },
        emphasis: {
          itemStyle: {
            color: '#e9f3ff',
          },
        },
      },
      series: [
        {
          name: '线路',
          type: 'lines',
          coordinateSystem: 'geo',
          zlevel: 2,
          effect: {
            show: true,
            period: 4,
            symbol: 'arrow',
            symbolSize: 8,
          },
          lineStyle: {
            width: 4,
            opacity: 0.95,
            curveness: 0.12,
            color: selectedRoute.color,
          },
          data: [
            {
              coords: selectedRoute.path,
              routeId: selectedRoute.id,
              routeName: selectedRoute.shortName,
            },
          ],
        },
        {
          name: '站点',
          type: 'scatter',
          coordinateSystem: 'geo',
          symbolSize: (value) => Math.max(10, value[2] / 6),
          label: {
            show: true,
            formatter: ({ data: item }) => item.name,
            position: 'right',
            color: '#17314b',
          },
          itemStyle: {
            color: '#17314b',
          },
          data: data.stations.map((station) => ({
            name: station.name,
            value: [station.x, station.y, station.heatWeight * 30],
            stationId: station.id,
            routeId: station.lineIds[0],
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
            formatter: ({ data: item }) => item.name,
            position: 'bottom',
            color: '#1c3d5a',
          },
          itemStyle: {
            color: '#ff7d73',
            shadowBlur: 18,
            shadowColor: 'rgba(255, 125, 115, 0.28)',
          },
          data: data.vehicles.map((vehicle) => ({
            name: vehicle.name,
            value: vehicle.coord,
            vehicleId: vehicle.id,
          })).concat(activeVehicle ? [{ name: `${activeVehicle.name} · 当前`, value: activeVehicle.coord, vehicleId: activeVehicle.id }] : []),
        },
      ],
    };
  }

  function buildLoadOption(data, route) {
    const rows = data.routes.map((item) => Number(item.seats.split('/')[0].trim()));
    return {
      backgroundColor: 'transparent',
      grid: { left: 44, right: 20, top: 40, bottom: 30, containLabel: true },
      tooltip: { show: false },
      xAxis: {
        type: 'category',
        data: data.routes.map((item) => item.shortName),
        axisLabel: { color: '#6d8097' },
        axisLine: { lineStyle: { color: '#c8d5e6' } },
      },
      yAxis: {
        type: 'value',
        axisLabel: { color: '#6d8097' },
        splitLine: { lineStyle: { color: '#e3ebf6' } },
      },
      series: [
        {
          type: 'bar',
          data: rows,
          barWidth: 18,
          itemStyle: {
            color: (params) => (data.routes[params.dataIndex].id === route.id ? route.color : '#8fb2e6'),
            borderRadius: [8, 8, 0, 0],
          },
          label: {
            show: true,
            position: 'top',
            color: '#17314b',
          },
        },
      ],
    };
  }

  function buildStatusOption(data) {
    const counts = {
      运行中: 0,
      候车中: 0,
      调度中: 0,
      待出发: 0,
    };
    data.vehicles.forEach((vehicle) => {
      counts[vehicle.status] = (counts[vehicle.status] || 0) + 1;
    });

    return {
      backgroundColor: 'transparent',
      tooltip: { show: false },
      legend: {
        orient: 'vertical',
        right: 8,
        top: 16,
        textStyle: { color: '#6d8097' },
      },
      series: [
        {
          type: 'pie',
          radius: ['50%', '72%'],
          center: ['38%', '52%'],
          label: {
            color: '#17314b',
          },
          data: Object.entries(counts).map(([name, value], index) => ({
            name,
            value,
            itemStyle: {
              color: ['#2d6cff', '#1fbf8a', '#f59f2a', '#ff7d73'][index % 4],
            },
          })),
        },
      ],
    };
  }

  window.renderDispatchPanel = renderDispatchPanel;
})(window);
