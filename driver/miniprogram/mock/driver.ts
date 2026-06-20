export interface DriverTask {
  id: string
  routeName: string
  departTime: string
  arriveTime: string
  vehicle: string
  seats: string
  status: '待出发' | '进行中' | '已完成'
  note: string
}

export interface AlertItem {
  id: string
  title: string
  station: string
  count: string
  tone: 'good' | 'warn' | 'alert'
}

export interface RecordItem {
  id: string
  routeName: string
  time: string
  status: '准点' | '延误' | '异常'
  note: string
}

export const driverStats = [
  { label: '今日任务', value: '04', hint: '2 条运行中' },
  { label: '呼叫提醒', value: '06', hint: '已接收 5 条' },
  { label: '热点站点', value: '02', hint: '当前高峰站' },
  { label: '准点率', value: '96%', hint: '近 7 天统计' },
]

export const todayTasks: DriverTask[] = [
  { id: 'task-1', routeName: '早高峰接驳 01 线', departTime: '07:20', arriveTime: '07:48', vehicle: '湘A · 2187', seats: '24 / 34', status: '进行中', note: '北门方向，下一站图书馆' },
  { id: 'task-2', routeName: '午间环线 02 线', departTime: '12:10', arriveTime: '12:33', vehicle: '湘A · 5601', seats: '11 / 28', status: '待出发', note: '图书馆集合，等待乘客呼叫' },
  { id: 'task-3', routeName: '晚高峰返程 03 线', departTime: '17:40', arriveTime: '18:08', vehicle: '湘A · 9026', seats: '18 / 34', status: '待出发', note: '南门方向，预计 17:46 到达' },
]

export const callAlerts: AlertItem[] = [
  { id: 'alert-1', title: '北门站点呼叫', station: '北门', count: '12 人候车', tone: 'alert' },
  { id: 'alert-2', title: '图书馆热点提醒', station: '图书馆', count: '热点站点', tone: 'warn' },
  { id: 'alert-3', title: '南校区呼叫', station: '南校区', count: '5 人候车', tone: 'good' },
]

export const tripRecords: RecordItem[] = [
  { id: 'record-1', routeName: '早高峰接驳 01 线', time: '07:20', status: '准点', note: '乘客呼叫已同步' },
  { id: 'record-2', routeName: '午间环线 02 线', time: '12:10', status: '延误', note: '校园东路临时拥堵' },
  { id: 'record-3', routeName: '返程接驳 04 线', time: '08:05', status: '准点', note: '到站确认正常' },
]

export const ratingHighlights = [
  { driver: '刘师傅', score: '4.9', note: '平稳、准点、提醒及时' },
  { driver: '陈师傅', score: '4.8', note: '乘客反馈服务好' },
]

export const attendanceStats = [
  { label: '上班打卡', value: '07:06' },
  { label: '行程开始', value: '07:20' },
  { label: '行程结束', value: '18:18' },
]
