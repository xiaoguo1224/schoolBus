import {
  attendanceStats,
  callAlerts,
  driverStats,
  driverTabs,
  reportReasons,
  ratingHighlights,
  summaryBanners,
  todayTasks,
  tripTimeline,
  vehicleChecks,
  vehicleProfile,
} from '../../mock/driver'

type ViewKey = 'dashboard' | 'vehicle' | 'trip' | 'report' | 'attendance'

Page({
  data: {
    topInset: 24,
    driverName: '刘师傅',
    driverRole: '班车司机 · 湘A · 2187',
    driverStats,
    driverTabs,
    summaryBanners,
    activeView: 'dashboard' as ViewKey,
    activeTaskIndex: 0,
    selectedTask: todayTasks[0],
    todayTasks,
    callAlerts,
    attendanceStats,
    ratingHighlights,
    vehicleProfile,
    vehicleChecks,
    reportReasons,
    activeReportIndex: 0,
    reportNote: '道路拥堵，建议后台关注调度。',
    reportSummary: '异常上报 | 固定数据演示',
    tripTimeline,
    logCount: '12 条',
  },
  onLoad() {
    const { statusBarHeight = 0 } = wx.getSystemInfoSync()
    this.setData({
      topInset: statusBarHeight + 24,
    })
  },
  onViewChange(e: any) {
    const key = e.currentTarget.dataset.key as ViewKey | undefined
    if (!key || key === this.data.activeView) {
      return
    }
    this.setData({
      activeView: key,
    })
  },
  onTaskTap(e: any) {
    const index = Number(e.currentTarget.dataset.index)
    const selectedTask = todayTasks[index] || todayTasks[0]
    this.setData({
      activeTaskIndex: index,
      selectedTask,
      reportNote: `${selectedTask.routeName} 当前状态：${selectedTask.status}`,
    })
    wx.setStorageSync('driverTask', selectedTask)
  },
  onVehicleAction(e: any) {
    const action = e.currentTarget.dataset.action as string | undefined
    const labelMap: Record<string, string> = {
      bind: '车辆已绑定',
      inspect: '已查看检查项',
      refresh: '状态已刷新',
    }
    wx.showToast({
      title: labelMap[action || ''] || '操作完成',
      icon: 'none',
    })
  },
  onTripAction(e: any) {
    const action = e.currentTarget.dataset.action as string | undefined
    const textMap: Record<string, string> = {
      start: '已开始行程',
      arrive: '到站已确认',
      finish: '行程已结束',
    }
    wx.showToast({
      title: textMap[action || ''] || '操作完成',
      icon: 'success',
    })
  },
  onReportTap(e: any) {
    const index = Number(e.currentTarget.dataset.index)
    const reason = reportReasons[index] || reportReasons[0]
    this.setData({
      activeReportIndex: index,
      reportNote: `${reason.label} · ${reason.desc}`,
      reportSummary: `异常上报 | ${reason.label}`,
    })
  },
  onSubmitReport() {
    wx.showToast({
      title: '异常已上报',
      icon: 'success',
    })
  },
  onOpenLogs() {
    wx.navigateTo({
      url: '/pages/logs/logs',
    })
  },
  onCallToast() {
    wx.showToast({
      title: '提醒已同步到后台',
      icon: 'success',
    })
  },
})
