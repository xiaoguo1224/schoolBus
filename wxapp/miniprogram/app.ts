App<IAppOption>({
  globalData: {},
  onLaunch() {
    wx.setStorageSync('appLaunchAt', Date.now())
  },
})
