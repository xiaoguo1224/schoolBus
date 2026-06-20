(function (window) {
  function escapeHtml(value) {
    return String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }

  function renderModulePanel(context) {
    const { container, data, module, state, onAction } = context;
    const rows = module.table.rows;
    const selectedRowIndex = typeof state.selectedRowIndex === 'number' ? state.selectedRowIndex : 0;
    const selectedRow = rows[selectedRowIndex] || rows[0] || [];

    window.renderDashboardShell(container, state);

    container.querySelector('#workspaceKicker').textContent = module.kicker;
    container.querySelector('#workspaceTitle').textContent = module.title;
    container.querySelector('#workspaceSubtitle').textContent = `${module.summary} 这里保留固定数据的真实后台交互，包括筛选、选中、操作和详情。`;

    container.querySelector('#workspaceToolbar').innerHTML = `
      <div class="toolbar-group">
        <span class="toolbar-label">筛选视图</span>
        <div class="toolbar-chip-list">
          <button class="toolbar-chip is-active" data-filter="all">全部</button>
          <button class="toolbar-chip" data-filter="active">进行中</button>
          <button class="toolbar-chip" data-filter="review">待审核</button>
          <button class="toolbar-chip" data-filter="done">已完成</button>
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
          <div class="panel-label">${escapeHtml(module.badge)}</div>
          <div class="panel-title">${escapeHtml(module.table.title)}</div>
        </div>
        <span class="status-chip">${escapeHtml(state.lastAction)}</span>
      </div>
      <div class="filter-strip">
        <div class="search-pill">
          <span class="search-pill__label">模块说明</span>
          <span class="search-pill__value">${escapeHtml(module.summary)}</span>
        </div>
      </div>
      <div class="table-wrap table-wrap--large">
        <table class="data-table">
          <thead>
            <tr>
              ${module.table.headers.map((header) => `<th>${escapeHtml(header)}</th>`).join('')}
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            ${rows.map((row, index) => `
              <tr class="${index === selectedRowIndex ? 'is-selected' : ''}" data-row-index="${index}">
                ${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join('')}
                <td>
                  <div class="row-actions">
                    <button class="row-action" data-row-action="detail" data-row-index="${index}">详情</button>
                    <button class="row-action" data-row-action="edit" data-row-index="${index}">编辑</button>
                    <button class="row-action" data-row-action="mark" data-row-index="${index}">标记</button>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;

    container.querySelector('#panelSecondary').innerHTML = `
      <div class="panel-head panel-head--split">
        <div>
          <div class="panel-label">详情抽屉</div>
          <div class="panel-title">选中行详情</div>
        </div>
        <span class="status-chip status-chip--primary">固定数据</span>
      </div>
      <div class="detail-drawer">
        <div class="detail-drawer__head">
          <div class="detail-drawer__title">${escapeHtml(selectedRow[0] || module.title)}</div>
          <div class="detail-drawer__meta">选中第 ${selectedRowIndex + 1} 行</div>
        </div>
        <div class="detail-card">
          <div class="detail-card__label">状态说明</div>
          <div class="detail-card__value">${escapeHtml(selectedRow[selectedRow.length - 1] || '正常')}</div>
          <div class="detail-card__note">点击表格行可切换详情抽屉内容。</div>
        </div>
        <div class="detail-list">
          ${module.table.headers.map((header, index) => `
            <div class="detail-row">
              <span class="detail-row__label">${escapeHtml(header)}</span>
              <span class="detail-row__value">${escapeHtml(selectedRow[index] ?? '—')}</span>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="detail-actions">
        ${module.actions.map((action) => `
          <button class="action-card action-card--soft" data-action-id="${action.id}">
            <span class="action-card__title">${escapeHtml(action.label)}</span>
            <span class="action-card__desc">固定数据演示</span>
          </button>
        `).join('')}
      </div>
    `;

    container.querySelector('#panelTertiary').innerHTML = `
      <div class="panel-head panel-head--split">
        <div>
          <div class="panel-label">指标条</div>
          <div class="panel-title">模块关键数据</div>
        </div>
        <span class="status-chip">${escapeHtml(module.badge)}</span>
      </div>
      <div class="metric-grid metric-grid--compact">
        ${module.metrics.map((metric) => `
          <div class="metric metric--compact metric--${metric.tone || 'primary'}">
            <div class="metric-label">${escapeHtml(metric.label)}</div>
            <div class="metric-value">${escapeHtml(metric.value)}</div>
            <div class="metric-note">${escapeHtml(metric.note)}</div>
          </div>
        `).join('')}
      </div>
    `;

    container.querySelector('#panelQuaternary').innerHTML = `
      <div class="panel-head panel-head--split">
        <div>
          <div class="panel-label">快捷操作</div>
          <div class="panel-title">可执行动作</div>
        </div>
        <span class="status-chip status-chip--accent">演示模式</span>
      </div>
      <div class="action-grid action-grid--soft">
        ${module.actions.map((action) => `
          <button class="action-card action-card--soft" data-action-id="${action.id}">
            <span class="action-card__title">${escapeHtml(action.label)}</span>
            <span class="action-card__desc">单击仅更新固定状态</span>
          </button>
        `).join('')}
      </div>
    `;

    container.querySelector('#panelFooter').innerHTML = `
      <div class="footer-grid footer-grid--single">
        <section class="footer-block footer-block--timeline">
          <div class="panel-head panel-head--split">
            <div>
              <div class="panel-label">实时摘要</div>
              <div class="panel-title">固定演示流</div>
            </div>
            <span class="status-chip">更新时间实时</span>
          </div>
          <div class="timeline-list">
            ${module.feed.map((item) => `
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
      </div>
    `;

    container.querySelectorAll('[data-filter]').forEach((button) => {
      button.addEventListener('click', () => {
        onAction(`已切换筛选：${button.textContent}`);
      });
    });

    container.querySelectorAll('[data-action-id]').forEach((button) => {
      button.addEventListener('click', () => {
        onAction(`执行操作：${button.textContent}`);
      });
    });

    container.querySelectorAll('[data-row-index]').forEach((row) => {
      row.addEventListener('click', (event) => {
        if (event.target.closest('.row-action')) {
          return;
        }
        state.selectedRowIndex = Number(row.dataset.rowIndex);
        onAction(`已查看第 ${state.selectedRowIndex + 1} 条记录`);
      });
    });

    container.querySelectorAll('[data-row-action]').forEach((button) => {
      button.addEventListener('click', (event) => {
        event.stopPropagation();
        const index = Number(button.dataset.rowIndex);
        state.selectedRowIndex = index;
        onAction(`执行行操作：${button.textContent} · 第 ${index + 1} 行`);
      });
    });
  }

  window.renderModulePanel = renderModulePanel;
})(window);
