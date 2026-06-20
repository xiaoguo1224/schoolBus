import { buildRouteStops, todayTrips, type TripItem } from '../../mock/bus'

type SeatCell = {
  id: string
  label: string
  status: '可坐' | '已占用' | '不可用'
}

function buildSeatGrid(): SeatCell[] {
  return [
    { id: '1a', label: '1A', status: '可坐' },
    { id: '1b', label: '1B', status: '已占用' },
    { id: '2a', label: '2A', status: '可坐' },
    { id: '2b', label: '2B', status: '可坐' },
    { id: '3a', label: '3A', status: '已占用' },
    { id: '3b', label: '3B', status: '可坐' },
    { id: '4a', label: '4A', status: '可坐' },
    { id: '4b', label: '4B', status: '不可用' },
    { id: '5a', label: '5A', status: '可坐' },
    { id: '5b', label: '5B', status: '可坐' },
    { id: '6a', label: '6A', status: '可坐' },
    { id: '6b', label: '6B', status: '已占用' },
  ]
}

Page({
  data: {
    topInset: 24,
    selectedTrip: todayTrips[0],
    routeStops: buildRouteStops(todayTrips[0]),
    seatGrid: buildSeatGrid(),
    summaryItems: [
      { label: '预计到达', value: '07:31' },
      { label: '空座数量', value: '12' },
      { label: '车牌车辆', value: '湘A · 2187' },
    ],
    noticeItems: [
      '车辆支持座位二维码扫码乘车',
      '支付成功后可直接设置下车唤醒',
      '到站前会触发手机震动提醒',
    ],
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
      summaryItems: [
        { label: '预计到达', value: selectedTrip.eta },
        { label: '空座数量', value: `${selectedTrip.seatsLeft}` },
        { label: '车牌车辆', value: selectedTrip.vehicle },
      ],
    })
    if (cachedTrip) {
      wx.removeStorageSync('selectedTrip')
    }
  },
  onReserveTap() {
    wx.setStorageSync('selectedTrip', this.data.selectedTrip)
    wx.navigateTo({
      url: '/pages/reserve/index',
    })
  },
  onMapTap() {
    wx.navigateTo({
      url: '/pages/map/index',
    })
  },
  onCallTap() {
    wx.showToast({
      title: '已同步呼叫提醒',
      icon: 'success',
    })
  },
})
