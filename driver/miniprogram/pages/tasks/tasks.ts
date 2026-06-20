import {
  callAlerts,
  driverPages,
  summaryBanners,
  todayTasks,
  tripTimeline,
} from '../../mock/driver'

Page({
  data: {
    topInset: 24,
    currentPath: '/pages/tasks/tasks',
    driverName: '刘师傅',
    driverRole: '班车司机 · 湘A · 2187',
    driverPages,
    summaryBanners,
    activePage: 'tasks',
    activeTaskIndex: 0,
    selectedTask: todayTasks[0],
    todayTasks,
    callAlerts,
    tripTimeline,
  },
  onLoad() {
    const { statusBarHeight = 0 } = wx.getSystemInfoSync()
    this.setData({
      topInset: statusBarHeight + 24,
    })
  },
  onNavigate(e: WechatMiniprogram.BaseEvent) {
    const url = e.currentTarget.dataset.url as string | undefined
    if (url && url !== this.data.currentPath) {
      wx.redirectTo({ url })
    }
  },
  onTaskTap(e: WechatMiniprogram.BaseEvent) {
    const index = Number(e.currentTarget.dataset.index)
    const selectedTask = todayTasks[index] || todayTasks[0]
    this.setData({
      activeTaskIndex: index,
      selectedTask,
    })
    wx.showToast({
      title: '任务已切换',
      icon: 'none',
    })
  },
  onTripAction(e: WechatMiniprogram.BaseEvent) {
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
  onOpenLogs() {
    wx.redirectTo({
      url: '/pages/logs/logs',
    })
  },
})
