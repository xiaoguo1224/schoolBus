import { couponItems, ebikeItems, feedbackItems, profileStats, ratingItems, rideRecords, serviceItems } from '../../mock/bus'

Page({
  data: {
    topInset: 24,
    profileName: '李同学',
    profileCampus: '湘潭大学 · 交通学院',
    profileStats,
    rideRecords,
    serviceItems,
    couponItems,
    feedbackItems,
    ratingItems,
    ebikeItems,
  },
  onLoad() {
    const { statusBarHeight = 0 } = wx.getSystemInfoSync()
    this.setData({
      topInset: statusBarHeight + 24,
    })
  },
  onServiceTap(e: any) {
    const label = e.currentTarget.dataset.label as string | undefined
    if (!label) {
      return
    }
    wx.showToast({
      title: `${label}演示页`,
      icon: 'none',
    })
  },
})
