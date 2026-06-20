(function (window) {
  function renderDashboardShell(container) {
    if (!container) {
      return;
    }

    container.innerHTML = `
      <div class="workspace-shell">
        <div class="workspace-header">
          <div class="workspace-copy">
            <div class="workspace-kicker" id="workspaceKicker"></div>
            <h2 class="workspace-title" id="workspaceTitle"></h2>
            <p class="workspace-subtitle" id="workspaceSubtitle"></p>
          </div>
          <div class="workspace-toolbar" id="workspaceToolbar"></div>
        </div>

        <div class="workspace-grid workspace-grid--hero">
          <section class="panel panel--wide" id="panelPrimary"></section>
          <section class="panel panel--narrow" id="panelSecondary"></section>
        </div>

        <div class="workspace-grid workspace-grid--chart">
          <section class="panel panel--chart" id="panelTertiary"></section>
          <section class="panel panel--chart" id="panelQuaternary"></section>
        </div>

        <section class="panel panel--full" id="panelFooter"></section>
      </div>
    `;
  }

  window.renderDashboardShell = renderDashboardShell;
})(window);
