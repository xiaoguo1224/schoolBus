import { navItems, type PageKey } from '../../mock/bus'

type NavDataSet = {
  path?: string
  key?: PageKey
}

Component({
  properties: {
    activeKey: {
      type: String,
      value: 'home',
    },
  },
  data: {
    items: navItems,
  },
  methods: {
    onNavigate(e: WechatMiniprogram.TouchEvent) {
      const { path, key } = e.currentTarget.dataset as NavDataSet
      if (!path || key === this.properties.activeKey) {
        return
      }
      wx.redirectTo({
        url: path,
      })
    },
  },
})
