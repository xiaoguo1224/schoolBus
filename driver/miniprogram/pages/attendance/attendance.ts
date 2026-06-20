import { attendanceStats, driverPages, driverTabPaths, ratingHighlights, tripRecords } from '../../mock/driver'

Page({
  data: {
    topInset: 24,
    currentPath: '/pages/attendance/attendance',
    driverName: '刘师傅',
    driverRole: '班车司机 · 湘A · 2187',
    driverPages,
    activePage: 'attendance',
    attendanceStats,
    ratingHighlights,
    tripRecords,
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
  onOpenLogs() {
    wx.redirectTo({
      url: '/pages/logs/logs',
    })
  },
})
