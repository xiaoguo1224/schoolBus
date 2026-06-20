import { buildRouteStops, routeFilters, scheduleTabs, scheduleTrips, type TripItem } from '../../mock/bus'

Page({
  data: {
    topInset: 24,
    scheduleTabs,
    routeFilters,
    selectedTabIndex: 0,
    selectedFilterIndex: 0,
    activeScheduleLabel: scheduleTabs[0],
    trips: scheduleTrips,
    visibleTrips: scheduleTrips,
    selectedTrip: scheduleTrips[0],
    routeStops: buildRouteStops(scheduleTrips[0]),
  },
  onLoad() {
    const { statusBarHeight = 0 } = wx.getSystemInfoSync()
    this.setData({
      topInset: statusBarHeight + 24,
    })
    this.refreshTrips()
  },
  onTabChange(e: any) {
    const index = Number(e.currentTarget.dataset.index)
    this.setData(
      {
        selectedTabIndex: index,
        activeScheduleLabel: scheduleTabs[index] || scheduleTabs[0],
      },
      () => this.refreshTrips(),
    )
  },
  onFilterChange(e: any) {
    const index = Number(e.currentTarget.dataset.index)
    this.setData(
      {
        selectedFilterIndex: index,
      },
      () => this.refreshTrips(),
    )
  },
  onTripTap(e: any) {
    const tripId = e.currentTarget.dataset.tripId as string | undefined
    const trip = this.data.trips.find((item: TripItem) => item.id === tripId) || this.data.trips[0]
    this.setData({
      selectedTrip: trip,
      routeStops: buildRouteStops(trip),
    })
    wx.setStorageSync('selectedTrip', trip)
  },
  onDetailTap() {
    wx.navigateTo({
      url: '/pages/detail/index',
    })
  },
  refreshTrips() {
    const currentFilter = this.data.selectedFilterIndex
    const currentTab = this.data.selectedTabIndex
    let visibleTrips = this.data.trips.slice()

    if (currentTab === 0) {
      visibleTrips = visibleTrips.slice(0, 4)
    } else if (currentTab === 1) {
      visibleTrips = visibleTrips.slice(1, 5)
    } else if (currentTab === 2) {
      visibleTrips = visibleTrips.slice(2, 6)
    }

    if (currentFilter === 1) {
      visibleTrips = visibleTrips.filter((trip: TripItem) => trip.routeName.includes('早高峰'))
    } else if (currentFilter === 2) {
      visibleTrips = visibleTrips.filter((trip: TripItem) => trip.routeName.includes('午间'))
    } else if (currentFilter === 3) {
      visibleTrips = visibleTrips.filter((trip: TripItem) => trip.routeName.includes('返程'))
    } else if (currentFilter === 4) {
      visibleTrips = visibleTrips.filter((trip: TripItem) => trip.routeName.includes('穿梭'))
    }

    const selectedTrip = visibleTrips[0] || this.data.trips[0]
    this.setData({
      visibleTrips,
      selectedTrip,
      routeStops: buildRouteStops(selectedTrip),
    })
    wx.setStorageSync('selectedTrip', selectedTrip)
  },
})
