App<IAppOption>({
  globalData: {},
  onLaunch() {
    wx.setStorageSync('driverLaunchAt', Date.now())
  },
})
