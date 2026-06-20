export type PageKey = 'home' | 'route' | 'map' | 'ride' | 'mine'

export interface NavItem {
  key: PageKey
  label: string
  shortLabel: string
  pagePath: string
}

export interface QuickAction {
  key: string
  label: string
  shortLabel: string
  hint: string
  pagePath: string
  tone: 'green' | 'blue' | 'amber' | 'violet'
}

export interface StatItem {
  label: string
  value: string
  hint: string
}

export interface TripItem {
  id: string
  routeName: string
  direction: string
  departTime: string
  arriveTime: string
  seatsLeft: number
  capacity: number
  vehicle: string
  driver: string
  status: '运行中' | '即将发车' | '候车中'
  fee: string
  from: string
  to: string
  eta: string
}

export interface RouteStop {
  name: string
  time: string
  label: string
  crowd: string
}

export interface RideRecord {
  id: string
  routeName: string
  date: string
  time: string
  boarding: string
  alighting: string
  seat: string
  amount: string
  status: '待出行' | '已完成' | '已退款'
  note: string
}

export interface CouponItem {
  id: string
  title: string
  tag: string
  amount: string
  rule: string
  expiry: string
  status: '可用' | '已领取' | '已使用'
}

export interface FeedbackItem {
  id: string
  title: string
  category: string
  status: '处理中' | '已回复' | '已关闭'
  time: string
}

export interface RatingItem {
  id: string
  driver: string
  score: string
  comment: string
  status: '已评价' | '待评价'
}

export interface EbikeItem {
  id: string
  name: string
  battery: string
  distance: string
  status: '可租' | '考试中' | '待实操' | '资格通过'
  rule: string
}

export interface ServiceItem {
  key: string
  label: string
  hint: string
  pagePath: string
}

export const navItems: NavItem[] = [
  { key: 'home', label: '首页', shortLabel: '首', pagePath: '/pages/index/index' },
  { key: 'route', label: '线路', shortLabel: '线', pagePath: '/pages/schedule/index' },
  { key: 'map', label: '地图', shortLabel: '图', pagePath: '/pages/map/index' },
  { key: 'mine', label: '我的', shortLabel: '我', pagePath: '/pages/mine/index' },
]

export const campuses = ['湘潭大学', '北校区', '南校区']

export const quickActions: QuickAction[] = [
  { key: 'route', label: '查看线路', shortLabel: '线', hint: '通勤路线与站点顺序', pagePath: '/pages/schedule/index', tone: 'green' },
  { key: 'map', label: '实时地图', shortLabel: '图', hint: '车辆位置与 ETA', pagePath: '/pages/map/index', tone: 'blue' },
  { key: 'ride', label: '扫码乘车', shortLabel: '扫', hint: '查看座位状态并支付', pagePath: '/pages/reserve/index', tone: 'amber' },
  { key: 'records', label: '乘车记录', shortLabel: '记', hint: '历史乘车与支付记录', pagePath: '/pages/mine/index', tone: 'violet' },
  { key: 'coupon', label: '优惠券', shortLabel: '券', hint: '运营券与权益进度', pagePath: '/pages/mine/index', tone: 'green' },
  { key: 'ebike', label: '共享电动车', shortLabel: '车', hint: '资格、考试与骑行入口', pagePath: '/pages/mine/index', tone: 'blue' },
]

export const homeStats: StatItem[] = [
  { label: '在线车辆', value: '06', hint: '今日运行中' },
  { label: '候车呼叫', value: '18', hint: '当前站点需求' },
  { label: '空座余量', value: '42', hint: '实时座位状态' },
  { label: '到站提醒', value: '09', hint: '今天已触发' },
]

export const todayTrips: TripItem[] = [
  {
    id: 'trip-1',
    routeName: '早高峰接驳 01 线',
    direction: '北门 -> 南门',
    departTime: '07:20',
    arriveTime: '07:48',
    seatsLeft: 12,
    capacity: 34,
    vehicle: '湘A · 2187',
    driver: '刘师傅',
    status: '运行中',
    fee: '0 元',
    from: '北门',
    to: '南门',
    eta: '07:31 到达',
  },
  {
    id: 'trip-2',
    routeName: '午间环线 02 线',
    direction: '图书馆 -> 东门',
    departTime: '12:10',
    arriveTime: '12:33',
    seatsLeft: 5,
    capacity: 28,
    vehicle: '湘A · 5601',
    driver: '陈师傅',
    status: '即将发车',
    fee: '0 元',
    from: '图书馆',
    to: '东门',
    eta: '12:18 到达',
  },
  {
    id: 'trip-3',
    routeName: '晚高峰返程 03 线',
    direction: '南门 -> 研究生院',
    departTime: '17:40',
    arriveTime: '18:08',
    seatsLeft: 8,
    capacity: 34,
    vehicle: '湘A · 9026',
    driver: '王师傅',
    status: '候车中',
    fee: '0 元',
    from: '南门',
    to: '研究生院',
    eta: '17:46 到达',
  },
]

export const scheduleTabs = ['今日', '明日', '本周', '全部']

export const routeFilters = ['全部线路', '早高峰接驳', '午间环线', '返程接驳', '穿梭接驳']

export const scheduleTrips: TripItem[] = [
  ...todayTrips,
  {
    id: 'trip-4',
    routeName: '返程接驳 04 线',
    direction: '研究生院 -> 北门',
    departTime: '08:05',
    arriveTime: '08:30',
    seatsLeft: 16,
    capacity: 34,
    vehicle: '湘A · 6738',
    driver: '赵师傅',
    status: '运行中',
    fee: '0 元',
    from: '研究生院',
    to: '北门',
    eta: '08:13 到达',
  },
  {
    id: 'trip-5',
    routeName: '穿梭接驳 05 线',
    direction: '南校区 -> 图书馆',
    departTime: '14:15',
    arriveTime: '14:38',
    seatsLeft: 20,
    capacity: 30,
    vehicle: '湘A · 4451',
    driver: '周师傅',
    status: '候车中',
    fee: '0 元',
    from: '南校区',
    to: '图书馆',
    eta: '14:28 到达',
  },
  {
    id: 'trip-6',
    routeName: '穿梭接驳 06 线',
    direction: '图书馆 -> 南校区',
    departTime: '16:20',
    arriveTime: '16:40',
    seatsLeft: 14,
    capacity: 30,
    vehicle: '湘A · 7710',
    driver: '孙师傅',
    status: '即将发车',
    fee: '0 元',
    from: '图书馆',
    to: '南校区',
    eta: '16:28 到达',
  },
]

export const stationOptions = [
  '北门',
  '图书馆',
  '行政楼',
  '一教',
  '南苑宿舍',
  '南门',
  '东门',
  '西门',
  '研究生院',
  '南校区',
]

export function buildRouteStops(trip: TripItem): RouteStop[] {
  const routeName = trip.routeName
  let stopNames = [trip.from, trip.to]

  if (routeName.includes('早高峰')) {
    stopNames = [trip.from, '图书馆', '一教', '南苑宿舍', trip.to]
  } else if (routeName.includes('午间')) {
    stopNames = [trip.from, '行政楼', '一教', trip.to]
  } else if (routeName.includes('晚高峰')) {
    stopNames = [trip.from, '南苑宿舍', '图书馆', trip.to]
  } else if (routeName.includes('穿梭')) {
    stopNames = [trip.from, '中转站', '行政楼', trip.to]
  } else if (routeName.includes('返程')) {
    stopNames = [trip.from, '图书馆', trip.to]
  }

  const totalMinutes = stopNames.length > 2 ? 28 : 18
  const stepMinutes = stopNames.length > 1 ? Math.max(6, Math.floor(totalMinutes / (stopNames.length - 1))) : totalMinutes

  const shiftTime = (time: string, offsetMinutes: number) => {
    const [hourText, minuteText] = time.split(':')
    const hour = Number(hourText)
    const minute = Number(minuteText)
    if (Number.isNaN(hour) || Number.isNaN(minute)) {
      return time
    }

    const next = new Date(2026, 0, 1, hour, minute)
    next.setMinutes(next.getMinutes() + offsetMinutes)
    return `${`${next.getHours()}`.padStart(2, '0')}:${`${next.getMinutes()}`.padStart(2, '0')}`
  }

  return stopNames.map((name, index) => ({
    name,
    time: index === stopNames.length - 1 ? trip.arriveTime : shiftTime(trip.departTime, stepMinutes * index),
    label: index === 0 ? '上车点' : index === stopNames.length - 1 ? '到达点' : '途经站',
    crowd: index === 0 ? '候车人数 12' : index === stopNames.length - 1 ? '站点人流较低' : '当前热度中',
  }))
}

export const rideRecords: RideRecord[] = [
  {
    id: 'order-1001',
    routeName: '早高峰接驳 01 线',
    date: '2026-06-18',
    time: '07:20',
    boarding: '北门',
    alighting: '南门',
    seat: '2A',
    amount: '0 元',
    status: '待出行',
    note: '明天 06:50 前可取消',
  },
  {
    id: 'order-1002',
    routeName: '午间环线 02 线',
    date: '2026-06-17',
    time: '12:10',
    boarding: '图书馆',
    alighting: '东门',
    seat: '4B',
    amount: '0 元',
    status: '已完成',
    note: '已乘车 1 次',
  },
  {
    id: 'order-1003',
    routeName: '晚高峰返程 03 线',
    date: '2026-06-16',
    time: '17:40',
    boarding: '南门',
    alighting: '研究生院',
    seat: '7C',
    amount: '0 元',
    status: '已完成',
    note: '已开启下车唤醒',
  },
  {
    id: 'order-1004',
    routeName: '穿梭接驳 05 线',
    date: '2026-06-14',
    time: '14:15',
    boarding: '南校区',
    alighting: '图书馆',
    seat: '1D',
    amount: '0 元',
    status: '已退款',
    note: '线路临时调整，已退款',
  },
]

export const couponItems: CouponItem[] = [
  { id: 'coupon-1', title: '满 0 减 1 元', tag: '新人券', amount: '1 元', rule: '任意线路可用', expiry: '2026-07-01', status: '可用' },
  { id: 'coupon-2', title: '乘车满 10 次', tag: '权益券', amount: '免费 1 次', rule: '指定班车可用', expiry: '2026-08-15', status: '已领取' },
  { id: 'coupon-3', title: '午间线路折扣', tag: '活动券', amount: '8 折', rule: '午间环线可用', expiry: '2026-06-30', status: '已使用' },
]

export const feedbackItems: FeedbackItem[] = [
  { id: 'feedback-1', title: '北门站候车人数偏多', category: '候车问题', status: '处理中', time: '06-19 07:26' },
  { id: 'feedback-2', title: '二维码扫码速度慢', category: '二维码问题', status: '已回复', time: '06-18 12:42' },
  { id: 'feedback-3', title: '东门站点建议增加雨棚', category: '站点问题', status: '已关闭', time: '06-15 18:05' },
]

export const ratingItems: RatingItem[] = [
  { id: 'rating-1', driver: '刘师傅', score: '4.9', comment: '开车稳，提醒到位', status: '已评价' },
  { id: 'rating-2', driver: '陈师傅', score: '4.8', comment: '到站确认及时，服务好', status: '已评价' },
  { id: 'rating-3', driver: '王师傅', score: '--', comment: '乘车后可评价', status: '待评价' },
]

export const ebikeItems: EbikeItem[] = [
  { id: 'ebike-1', name: '校园共享车 12 号', battery: '86%', distance: '120 米', status: '可租', rule: '认证通过后扫码使用' },
  { id: 'ebike-2', name: '校园共享车 23 号', battery: '68%', distance: '340 米', status: '待实操', rule: '线上考试已通过' },
  { id: 'ebike-3', name: '校园共享车 31 号', battery: '54%', distance: '620 米', status: '资格通过', rule: '可在围栏内还车' },
]

export const serviceItems: ServiceItem[] = [
  { key: 'records', label: '乘车记录', hint: '查看历史出行与座位', pagePath: '/pages/mine/index' },
  { key: 'refund', label: '退款申请', hint: '异常支付快速处理', pagePath: '/pages/mine/index' },
  { key: 'feedback', label: '问题反馈', hint: '提交乘车与站点问题', pagePath: '/pages/mine/index' },
  { key: 'rating', label: '司机评价', hint: '完成后打分留言', pagePath: '/pages/mine/index' },
  { key: 'coupons', label: '优惠券', hint: '查看可用权益与活动券', pagePath: '/pages/mine/index' },
  { key: 'ebike', label: '共享电动车', hint: '资格、考试、骑行入口', pagePath: '/pages/mine/index' },
]

export const profileStats = [
  { label: '我的乘车', value: '28' },
  { label: '待出行', value: '02' },
  { label: '已完成', value: '24' },
  { label: '退款中', value: '01' },
]
