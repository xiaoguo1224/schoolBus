import { driverPages, driverTabPaths, vehicleChecks, vehicleProfile } from '../../mock/driver'

Page({
  data: {
    topInset: 24,
    currentPath: '/pages/vehicle/vehicle',
    driverName: '刘师傅',
    driverRole: '班车司机 · 湘A · 2187',
    driverPages,
    activePage: 'vehicle',
    vehicleProfile,
    vehicleChecks,
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
  onVehicleAction(e: WechatMiniprogram.BaseEvent) {
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
})
