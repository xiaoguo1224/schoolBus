import { driverPages, reportReasons, summaryBanners } from '../../mock/driver'

Page({
  data: {
    topInset: 24,
    currentPath: '/pages/report/report',
    driverName: '刘师傅',
    driverRole: '班车司机 · 湘A · 2187',
    driverPages,
    summaryBanners,
    activePage: 'report',
    activeReportIndex: 0,
    reportNote: '道路拥堵，建议后台关注调度。',
    reportSummary: '异常上报 | 固定数据演示',
    reportReasons,
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
  onReportTap(e: WechatMiniprogram.BaseEvent) {
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
})
