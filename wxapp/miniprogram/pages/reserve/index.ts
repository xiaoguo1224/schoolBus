import { buildRouteStops, stationOptions, todayTrips, type TripItem } from '../../mock/bus'

Page({
  data: {
    topInset: 24,
    selectedTrip: todayTrips[0],
    routeStops: buildRouteStops(todayTrips[0]),
    stationOptions,
    selectedBoardingIndex: 0,
    selectedAlightingIndex: 1,
    selectedBoarding: stationOptions[0],
    selectedAlighting: stationOptions[1],
    wakeupEnabled: true,
    vibrationEnabled: true,
    paymentMethods: ['微信支付', '乘车权益抵扣', '线下补录'],
    selectedPaymentIndex: 0,
    seatStatus: [
      { label: '空座', value: '12', tone: 'good' },
      { label: '已占座', value: '18', tone: 'warn' },
      { label: '不可用', value: '04', tone: 'mute' },
    ],
    wakeupModes: ['手机震动', '小程序消息', '页面弹窗'],
    selectedWakeupIndex: 0,
  },
  onLoad() {
    const { statusBarHeight = 0 } = wx.getSystemInfoSync()
    this.setData({
      topInset: statusBarHeight + 24,
    })
  },
  onShow() {
    const cachedTrip = wx.getStorageSync('selectedTrip') as TripItem | undefined
    const selectedTrip = cachedTrip || todayTrips[0]
    this.setData({
      selectedTrip,
      routeStops: buildRouteStops(selectedTrip),
    })
    if (cachedTrip) {
      wx.removeStorageSync('selectedTrip')
    }
  },
  onBoardingTap(e: any) {
    const index = Number(e.currentTarget.dataset.index)
    const selectedBoarding = stationOptions[index] || stationOptions[0]
    this.setData({
      selectedBoardingIndex: index,
      selectedBoarding,
    })
  },
  onAlightingTap(e: any) {
    const index = Number(e.currentTarget.dataset.index)
    const selectedAlighting = stationOptions[index] || stationOptions[1]
    this.setData({
      selectedAlightingIndex: index,
      selectedAlighting,
    })
  },
  onPaymentTap(e: any) {
    const index = Number(e.currentTarget.dataset.index)
    this.setData({
      selectedPaymentIndex: index,
    })
  },
  onWakeupTap(e: any) {
    const index = Number(e.currentTarget.dataset.index)
    this.setData({
      selectedWakeupIndex: index,
      wakeupEnabled: index !== 2,
      vibrationEnabled: index === 0,
    })
  },
  onSubmit() {
    wx.showToast({
      title: '订单已生成',
      icon: 'success',
    })
  },
})
