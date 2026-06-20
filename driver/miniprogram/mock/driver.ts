export interface DriverTask {
  id: string
  routeName: string
  departTime: string
  arriveTime: string
  vehicle: string
  seats: string
  status: '待出发' | '进行中' | '已完成'
  note: string
  nextStop: string
}

export interface DriverViewTab {
  key: 'dashboard' | 'vehicle' | 'trip' | 'report' | 'attendance'
  label: string
  hint: string
}

export interface DriverPageLink {
  key: 'index' | 'tasks' | 'vehicle' | 'trip' | 'report' | 'attendance' | 'logs'
  label: string
  hint: string
  path: string
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

export interface ReportReason {
  label: string
  desc: string
}

export const driverStats = [
  { label: '今日任务', value: '04', hint: '2 条运行中' },
  { label: '呼叫提醒', value: '06', hint: '已接收 5 条' },
  { label: '热点站点', value: '02', hint: '当前高峰站' },
  { label: '准点率', value: '96%', hint: '近 7 天统计' },
]

export const driverTabs: DriverViewTab[] = [
  { key: 'dashboard', label: '今日任务', hint: '查看排班与进度' },
  { key: 'vehicle', label: '车辆绑定', hint: '确认车辆状态' },
  { key: 'trip', label: '行程执行', hint: '开始 / 到站 / 结束' },
  { key: 'report', label: '异常上报', hint: '固定表单演示' },
  { key: 'attendance', label: '考勤评价', hint: '查看考勤与评分' },
]

export const driverPages: DriverPageLink[] = [
  { key: 'index', label: '首页', hint: '运营总览', path: '/pages/index/index' },
  { key: 'tasks', label: '今日任务', hint: '查看排班与进度', path: '/pages/tasks/tasks' },
  { key: 'vehicle', label: '车辆绑定', hint: '确认车辆状态', path: '/pages/vehicle/vehicle' },
  { key: 'trip', label: '行程执行', hint: '开始 / 到站 / 结束', path: '/pages/trip/trip' },
  { key: 'report', label: '异常上报', hint: '固定表单演示', path: '/pages/report/report' },
  { key: 'attendance', label: '考勤评价', hint: '查看考勤与评分', path: '/pages/attendance/attendance' },
  { key: 'logs', label: '流水记录', hint: '行程与考勤', path: '/pages/logs/logs' },
]

export const driverTabPaths = new Set([
  '/pages/index/index',
  '/pages/tasks/tasks',
  '/pages/vehicle/vehicle',
  '/pages/trip/trip',
  '/pages/logs/logs',
])

export const todayTasks: DriverTask[] = [
  {
    id: 'task-1',
    routeName: '早高峰接驳 01 线',
    departTime: '07:20',
    arriveTime: '07:48',
    vehicle: '湘A · 2187',
    seats: '24 / 34',
    status: '进行中',
    note: '北门方向，下一站图书馆',
    nextStop: '图书馆',
  },
  {
    id: 'task-2',
    routeName: '午间环线 02 线',
    departTime: '12:10',
    arriveTime: '12:33',
    vehicle: '湘A · 5601',
    seats: '11 / 28',
    status: '待出发',
    note: '图书馆集合，等待乘客呼叫',
    nextStop: '东门',
  },
  {
    id: 'task-3',
    routeName: '晚高峰返程 03 线',
    departTime: '17:40',
    arriveTime: '18:08',
    vehicle: '湘A · 9026',
    seats: '18 / 34',
    status: '待出发',
    note: '南门方向，预计 17:46 到达',
    nextStop: '研究生院',
  },
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

export const vehicleProfile = {
  plate: '湘A · 2187',
  model: '宇通 34 座',
  bindStatus: '已绑定',
  seatCount: '34 座',
  fuel: '电量 82%',
  odometer: '里程 16,240km',
  maintenance: '下次保养 12 天后',
  certification: '年检与保险正常',
}

export const vehicleChecks = [
  { label: '发动机 / 电池', value: '正常' },
  { label: '胎压 / 刹车', value: '正常' },
  { label: '车载屏', value: '在线' },
  { label: '乘客二维码', value: '已同步' },
]

export const reportReasons: ReportReason[] = [
  { label: '道路拥堵', desc: '提示调度改线或延迟' },
  { label: '乘客较多', desc: '需要加开车辆或补车' },
  { label: '车辆异响', desc: '提交设备检查与维修' },
  { label: '站点异常', desc: '站点临时不可停靠' },
]

export const tripTimeline = [
  { label: '07:20', title: '从北门发车', desc: '早高峰接驳 01 线已运行', tone: 'done' },
  { label: '07:31', title: '到达图书馆', desc: '候车呼叫已同步到司机端', tone: 'doing' },
  { label: '07:48', title: '返回南门', desc: '完成第一段行程', tone: 'todo' },
]

export const summaryBanners = [
  '固定数据演示，所有按钮均可切换状态。',
  '行程、车辆和异常上报都可以直接点击查看。',
  '司机端采用亮色工作台，和用户端区分开。'
]
