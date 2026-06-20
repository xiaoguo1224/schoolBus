import { attendanceStats, callAlerts, driverStats, ratingHighlights, todayTasks, type DriverTask } from '../../mock/driver'

Page({
  data: {
    topInset: 24,
    driverName: '刘师傅',
    driverRole: '班车司机 · 湘A · 2187',
    driverStats,
    todayTasks,
    callAlerts,
    attendanceStats,
    ratingHighlights,
    selectedTask: todayTasks[0],
  },
  onLoad() {
    const { statusBarHeight = 0 } = wx.getSystemInfoSync()
    this.setData({
      topInset: statusBarHeight + 24,
    })
  },
  onTaskTap(e: any) {
    const taskId = e.currentTarget.dataset.taskId as string | undefined
    const task = todayTasks.find((item: DriverTask) => item.id === taskId) || todayTasks[0]
    this.setData({
      selectedTask: task,
    })
  },
  onStartTrip() {
    wx.showToast({
      title: '已切换运行中',
      icon: 'success',
    })
  },
  onOpenLogs() {
    wx.navigateTo({
      url: '/pages/logs/logs',
    })
  },
  onConfirmArrival() {
    wx.showToast({
      title: '到站已确认',
      icon: 'success',
    })
  },
})
