import {
  callAlerts,
  driverPages,
  driverTabPaths,
  driverStats,
  summaryBanners,
  todayTasks,
  tripTimeline,
} from '../../mock/driver'

Page({
  data: {
    topInset: 24,
    currentPath: '/pages/index/index',
    driverName: '刘师傅',
    driverRole: '班车司机 · 湘A · 2187',
    driverPages,
    activePage: 'index',
    driverStats,
    summaryBanners,
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
      if (driverTabPaths.has(url)) {
        wx.switchTab({ url })
      } else {
        wx.redirectTo({ url })
      }
    }
  },
  onOpenPage(e: WechatMiniprogram.BaseEvent) {
    const url = e.currentTarget.dataset.url as string | undefined
    if (url && url !== this.data.currentPath) {
      if (driverTabPaths.has(url)) {
        wx.switchTab({ url })
      } else {
        wx.redirectTo({ url })
      }
    }
  },
})
