import { campuses, ebikeItems, homeStats, quickActions, todayTrips, type TripItem } from '../../mock/bus'

const ebikeQuickActions = [
  { key: 'license', label: '乘车资格', shortLabel: '证', hint: '查看认证状态', pagePath: '/pages/mine/index', tone: 'green' as const },
  { key: 'exam', label: '线上考试', shortLabel: '考', hint: '查看考试与成绩', pagePath: '/pages/mine/index', tone: 'blue' as const },
  { key: 'practice', label: '线下实操', shortLabel: '操', hint: '查看审核与安排', pagePath: '/pages/mine/index', tone: 'amber' as const },
  { key: 'bike', label: '车辆查看', shortLabel: '车', hint: '附近车辆、电量和状态', pagePath: '/pages/mine/index', tone: 'violet' as const },
]

Page({
  data: {
    topInset: 24,
    campuses,
    currentCampus: campuses[0],
    currentMode: 'commute',
    quickActions,
    commuteQuickActions: quickActions,
    ebikeQuickActions,
    homeStats,
    todayTrips,
    ebikeItems,
    activeTrip: todayTrips[0],
  },
  onLoad() {
    const { statusBarHeight = 0 } = wx.getSystemInfoSync()
    this.setData({
      topInset: statusBarHeight + 24,
    })
  },
  onCampusChange(e: any) {
    const campus = campuses[Number(e.detail.value)] || campuses[0]
    this.setData({
      currentCampus: campus,
    })
  },
  onModeChange(e: any) {
    const mode = e.currentTarget.dataset.mode as 'commute' | 'ebike'
    if (!mode || mode === this.data.currentMode) {
      return
    }
    this.setData({
      currentMode: mode,
      quickActions: mode === 'commute' ? this.data.commuteQuickActions : ebikeQuickActions,
    })
  },
  onQuickActionTap(e: WechatMiniprogram.TouchEvent) {
    const path = e.currentTarget.dataset.path as string | undefined
    if (!path) {
      return
    }
    wx.navigateTo({ url: path })
  },
  onTripTap(e: any) {
    const tripId = e.currentTarget.dataset.tripId as string | undefined
    const trip = todayTrips.find((item: TripItem) => item.id === tripId) || todayTrips[0]
    wx.setStorageSync('selectedTrip', trip)
    wx.navigateTo({
      url: '/pages/detail/index',
    })
  },
  onMapTap() {
    wx.navigateTo({
      url: '/pages/map/index',
    })
  },
  onRideTap() {
    wx.navigateTo({
      url: '/pages/reserve/index',
    })
  },
})
