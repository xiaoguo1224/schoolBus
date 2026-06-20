const modules = [
  {
    id: 'dashboard',
    label: '首页看板',
    desc: '首页看板',
    kicker: '运营总览',
    title: '调度与运营总览',
    summary: '汇总车辆、线路、候车呼叫、退款待审和共享电动车资格待办，帮助运营人员一眼把握当前运行状态。',
    metrics: [
      { label: '车辆在线', value: '26', note: '6 条线路运行中' },
      { label: '待处理呼叫', value: '08', note: '已同步司机端' },
      { label: '退款待审', value: '03', note: '固定演示数据' },
      { label: '资格待审', value: '12', note: '线下实操队列' },
    ],
    cards: [
      { title: '地图调度看板', desc: '车辆定位、线路轨迹、站点分布和 ETA 同屏显示。', tags: ['实时位置', '线路轨迹', 'ETA'] },
      { title: '候车热力图', desc: '基于呼叫人数和站点热度，观察校园候车高峰。', tags: ['热力图', '高峰站点', '历史回放'] },
      { title: '订单与退款', desc: '扫码支付订单和退款审核在一个工作流里处理。', tags: ['订单', '退款', '异常补录'] },
      { title: '共享电动车资格', desc: '展示考试、实操和资格冻结的运营状态。', tags: ['考试', '实操', '资格'] },
    ],
    feed: [
      { time: '07:32', title: '北门站点呼叫上升', text: '北门候车人数达到阈值，已同步给 17 号车。' },
      { time: '12:08', title: '午间环线即将发车', text: '12:10 班次空座 5 个，运营状态正常。' },
      { time: '16:20', title: '共享电动车实操排队', text: '今日共 18 名用户预约线下实操。' },
    ],
    tableTitle: '运营摘要',
    tableHeaders: ['指标', '今日', '说明'],
    tableRows: [
      ['候车呼叫', '18', '较昨日 +4'],
      ['扫码订单', '124', '稳定增长'],
      ['退款申请', '03', '处理中 1'],
      ['资格通过', '128', '含线上考试'],
    ],
  },
  {
    id: 'dispatch-map',
    label: '地图调度',
    desc: '地图调度',
    kicker: '调度中心',
    title: '地图调度看板',
    summary: '车辆实时位置、线路轨迹、站点呼叫和热力图同屏联动，是后台最核心的作业页面。',
    metrics: [
      { label: '在线车辆', value: '12', note: '实时定位更新' },
      { label: '热点站点', value: '04', note: '当前高热区域' },
      { label: 'ETA 更新', value: '28', note: '近 10 分钟刷新' },
      { label: '异常车辆', value: '01', note: '已标记提醒' },
    ],
    cards: [
      { title: '线路叠层', desc: '在同一张地图上切换线路高亮显示。', tags: ['选中高亮', '站点标签', '路线箭头'] },
      { title: '车辆状态', desc: '空座、已占座、运行中和异常状态统一展示。', tags: ['空座', '占座', '异常'] },
      { title: '呼叫点', desc: '候车呼叫进入地图后可直接定位到站点。', tags: ['呼叫', '站点', '司机提醒'] },
      { title: '调度动作', desc: '给司机发送提醒、查看详情、标记处理。', tags: ['提醒', '确认', '处理'] },
    ],
    feed: [
      { time: '07:20', title: '17 号车进入北门方向', text: '预计 07:31 到达图书馆站。' },
      { time: '12:15', title: '26 号车通过行政楼', text: '当前车速 20 km/h，座位余量 11。' },
      { time: '17:46', title: '32 号车触发到站提醒', text: '研究生院站点已推送手机震动。' },
    ],
    tableTitle: '调度动作',
    tableHeaders: ['动作', '对象', '状态'],
    tableRows: [
      ['发送提醒', '17 号车', '已完成'],
      ['标记异常', '18 号车', '待确认'],
      ['查看详情', '北门呼叫点', '已打开'],
      ['路线跟随', '午间环线', '已跟随'],
    ],
  },
  {
    id: 'heatmap',
    label: '候车热力图',
    desc: '候车热力图',
    kicker: '热度分析',
    title: '候车热力图',
    summary: '按时间段、线路和站点筛选人流密度，辅助司机调度和后台排班优化。',
    metrics: [
      { label: '高热站点', value: '06', note: '热度 > 80' },
      { label: '高峰时段', value: '07:00', note: '早高峰最明显' },
      { label: '线路覆盖', value: '5 条', note: '重点线路已覆盖' },
      { label: '历史记录', value: '30 天', note: '支持回放' },
    ],
    cards: [
      { title: '北门 / 图书馆', desc: '早高峰热度最明显，呼叫最集中。', tags: ['高热', '早高峰', '站点聚集'] },
      { title: '南门 / 研究生院', desc: '返程需求集中，晚高峰排队明显。', tags: ['返程', '高峰', '线路稳定'] },
      { title: '南校区', desc: '穿梭接驳的稳定需求区域。', tags: ['穿梭', '固定流量', '共享电动车'] },
      { title: '东门', desc: '周边站点热度中等，适合增派。', tags: ['中热', '临时增派', '调度'] },
    ],
    feed: [
      { time: '07:30', title: '北门站热度上升', text: '候车人数达到 12，已在地图中标红。' },
      { time: '12:30', title: '图书馆站维持中热', text: '午间环线需求平稳。' },
      { time: '18:00', title: '返程高峰启动', text: '南门与研究生院站点进入高热状态。' },
    ],
    tableTitle: '热力概览',
    tableHeaders: ['站点', '热度', '建议'],
    tableRows: [
      ['北门', '92', '优先加车'],
      ['图书馆', '86', '持续跟踪'],
      ['南门', '89', '返程优先'],
      ['南校区', '74', '保持覆盖'],
    ],
  },
  {
    id: 'users',
    label: '用户管理',
    desc: '用户管理',
    kicker: '基础数据',
    title: '用户管理',
    summary: '维护学生、教职工和园区用户的实名信息、乘车记录、支付记录和共享电动车资格状态。',
    metrics: [
      { label: '用户总数', value: '1,284', note: '固定演示' },
      { label: '今日新增', value: '18', note: '申请已通过' },
      { label: '资格冻结', value: '03', note: '待复核' },
      { label: '活跃用户', value: '286', note: '近 7 天' },
    ],
    cards: [
      { title: '实名信息', desc: '姓名、手机号、学院和角色信息统一展示。', tags: ['实名', '学院', '联系方式'] },
      { title: '乘车历史', desc: '查看乘车时间、座位、线路和退款状态。', tags: ['记录', '座位', '退款'] },
      { title: '优惠券', desc: '查看发放记录和领取记录。', tags: ['活动券', '权益券', '使用记录'] },
      { title: '资格状态', desc: '共享电动车资格通过、冻结和过期状态一览。', tags: ['考试', '实操', '冻结'] },
    ],
    feed: [
      { time: '09:10', title: '新增用户已导入', text: '18 名新用户完成实名绑定。' },
      { time: '11:26', title: '资格冻结申请', text: '1 名用户因违规停用共享电动车资格。' },
      { time: '15:40', title: '乘车记录同步', text: '昨日订单与支付记录完成归档。' },
    ],
    tableTitle: '用户列表摘要',
    tableHeaders: ['姓名', '角色', '资格'],
    tableRows: [
      ['李同学', '学生', '认证通过'],
      ['王老师', '教职工', '认证通过'],
      ['陈同学', '学生', '待实操'],
      ['张同学', '学生', '冻结'],
    ],
  },
  {
    id: 'drivers',
    label: '司机管理',
    desc: '司机管理',
    kicker: '基础数据',
    title: '司机管理',
    summary: '维护司机账号、车辆绑定、任务分配、考勤和评价，保证司机端和后台调度同步。',
    metrics: [
      { label: '司机总数', value: '24', note: '在岗 21' },
      { label: '已绑定车辆', value: '18', note: '运行中 12' },
      { label: '待分配任务', value: '05', note: '可手动指派' },
      { label: '评分平均', value: '4.9', note: '近 30 天' },
    ],
    cards: [
      { title: '司机档案', desc: '账号、手机号和所属线路统一管理。', tags: ['档案', '账号', '线路'] },
      { title: '车辆绑定', desc: '绑定当前执行车辆并展示座位数。', tags: ['绑定', '车牌', '座位'] },
      { title: '考勤', desc: '上下班打卡和行程执行情况同步查看。', tags: ['打卡', '行程', '异常'] },
      { title: '司机评价', desc: '查看乘客评价和投诉记录。', tags: ['评分', '投诉', '反馈'] },
    ],
    feed: [
      { time: '08:00', title: '任务已分配', text: '刘师傅接收早高峰接驳任务。' },
      { time: '12:00', title: '车辆绑定更新', text: '陈师傅完成午间环线车辆确认。' },
      { time: '18:30', title: '评价统计生成', text: '司机平均评分 4.9，投诉率稳定。' },
    ],
    tableTitle: '司机排班',
    tableHeaders: ['司机', '车辆', '状态'],
    tableRows: [
      ['刘师傅', '湘A · 2187', '进行中'],
      ['陈师傅', '湘A · 5601', '待出发'],
      ['王师傅', '湘A · 9026', '待出发'],
      ['赵师傅', '湘A · 6738', '休息'],
    ],
  },
  {
    id: 'vehicles',
    label: '车辆管理',
    desc: '车辆管理',
    kicker: '基础数据',
    title: '车辆管理',
    summary: '统一管理车牌、车型、座位数、状态、保险和年检信息，保证地图与订单显示一致。',
    metrics: [
      { label: '车辆总数', value: '32', note: '运行中 26' },
      { label: '维修中', value: '02', note: '已进场维修' },
      { label: '停用', value: '01', note: '临时封存' },
      { label: '座位二维码', value: '478', note: '可打印' },
    ],
    cards: [
      { title: '运行状态', desc: '空闲、运行中、维修中和异常状态统一维护。', tags: ['状态', '运行', '维修'] },
      { title: '车牌与车型', desc: '查看车辆编号、车牌号和座位数。', tags: ['车牌', '车型', '座位'] },
      { title: '二维码', desc: '座位二维码生成和打印状态。', tags: ['二维码', '打印', '启停'] },
      { title: '证照', desc: '年检和保险信息一体展示。', tags: ['年检', '保险', '合规'] },
    ],
    feed: [
      { time: '10:12', title: '车辆状态同步', text: '18 号车已从维修中切回运行中。' },
      { time: '14:32', title: '二维码批量生成', text: '32 辆车座位码已完成打印。' },
      { time: '17:45', title: '车辆预警', text: '1 辆车保险即将到期，已标记提醒。' },
    ],
    tableTitle: '车辆摘要',
    tableHeaders: ['车牌', '状态', '座位'],
    tableRows: [
      ['湘A · 2187', '运行中', '34'],
      ['湘A · 5601', '运行中', '28'],
      ['湘A · 9026', '运行中', '34'],
      ['湘A · 7710', '维修中', '30'],
    ],
  },
  {
    id: 'routes',
    label: '线路管理',
    desc: '线路管理',
    kicker: '基础数据',
    title: '线路管理',
    summary: '维护线路名称、起终点、站点顺序和线路颜色，保持地图、司机和用户端一致。',
    metrics: [
      { label: '线路数量', value: '06', note: '含穿梭接驳' },
      { label: '站点数量', value: '24', note: '覆盖核心区域' },
      { label: '在线车辆', value: '12', note: '实时分布' },
      { label: '调度中', value: '03', note: '临时任务' },
    ],
    cards: [
      { title: '线路颜色', desc: '地图中以不同颜色区分线路。', tags: ['颜色', '高亮', '图例'] },
      { title: '站点顺序', desc: '站点排序与 ETA 展示统一维护。', tags: ['站点', '顺序', 'ETA'] },
      { title: '线路状态', desc: '运行中、暂停和临时改线统一标记。', tags: ['运行', '改线', '暂停'] },
      { title: '地图同步', desc: '线路调整后同步给司机和乘客端。', tags: ['同步', '地图', '用户端'] },
    ],
    feed: [
      { time: '07:00', title: '早高峰线路上线', text: '01 线与 04 线进入运营状态。' },
      { time: '13:00', title: '午间环线微调', text: '02 线站点顺序保持不变。' },
      { time: '17:00', title: '返程线路启用', text: '03 线和 04 线同步展示。' },
    ],
    tableTitle: '线路摘要',
    tableHeaders: ['线路', '方向', '状态'],
    tableRows: [
      ['早高峰接驳 01 线', '北门 -> 南门', '运行中'],
      ['午间环线 02 线', '图书馆 -> 东门', '运行中'],
      ['晚高峰返程 03 线', '南门 -> 研究生院', '候车中'],
      ['穿梭接驳 05 线', '南校区 -> 图书馆', '候车中'],
    ],
  },
  {
    id: 'stations',
    label: '站点管理',
    desc: '站点管理',
    kicker: '基础数据',
    title: '站点管理',
    summary: '维护站点地址、经纬度、候车范围和所属线路，确保地图和呼叫点统一。',
    metrics: [
      { label: '站点总数', value: '24', note: '重点站点 8' },
      { label: '热门站点', value: '08', note: '候车高热' },
      { label: '呼叫点', value: '19', note: '同步司机端' },
      { label: '站点异常', value: '01', note: '待复核' },
    ],
    cards: [
      { title: '站点范围', desc: '候车范围和定位校验规则统一维护。', tags: ['范围', '定位', '规则'] },
      { title: '热度标签', desc: '热门站点在地图和后台中高亮。', tags: ['热度', '高亮', '排序'] },
      { title: '候车呼叫', desc: '站点呼叫人数自动汇总。', tags: ['呼叫', '人数', '同步'] },
      { title: '线路挂载', desc: '一个站点可挂载多条线路。', tags: ['多线路', '挂载', '编辑'] },
    ],
    feed: [
      { time: '08:20', title: '北门站重新排序', text: '候车范围已更新到地图。' },
      { time: '12:40', title: '图书馆站呼叫增加', text: '候车人数达到 9 人。' },
      { time: '18:10', title: '东门站反馈提交', text: '用户建议增加雨棚。' },
    ],
    tableTitle: '站点摘要',
    tableHeaders: ['站点', '热度', '线路'],
    tableRows: [
      ['北门', '92', '01 / 04'],
      ['图书馆', '86', '01 / 02 / 04'],
      ['南门', '89', '03 / 04'],
      ['南校区', '74', '05 / 06'],
    ],
  },
  {
    id: 'tasks',
    label: '班次 / 任务',
    desc: '班次 / 任务',
    kicker: '运营管理',
    title: '班次 / 任务管理',
    summary: '线路任务、司机任务和临时任务统一排班，保证司机端今日任务与后台一致。',
    metrics: [
      { label: '未开始', value: '06', note: '待执行' },
      { label: '运行中', value: '02', note: '当前线路' },
      { label: '已完成', value: '18', note: '今日累计' },
      { label: '异常', value: '01', note: '待处理' },
    ],
    cards: [
      { title: '任务排班', desc: '按线路和司机分配班次。', tags: ['排班', '线路', '司机'] },
      { title: '临时任务', desc: '临时改线或加车快速录入。', tags: ['临时', '改线', '加车'] },
      { title: '任务状态', desc: '未开始、运行中、完成、取消统一状态。', tags: ['状态', '取消', '完成'] },
      { title: '司机端同步', desc: '任务下发后自动同步到司机小程序。', tags: ['同步', '提醒', '确认'] },
    ],
    feed: [
      { time: '06:50', title: '早高峰任务下发', text: '01 线与 04 线同时启动。' },
      { time: '11:45', title: '午间临时加车', text: '02 线新增 1 次循环。' },
      { time: '16:30', title: '返程任务确认', text: '03 线任务进入待出发。' },
    ],
    tableTitle: '任务摘要',
    tableHeaders: ['任务', '时间', '状态'],
    tableRows: [
      ['早高峰接驳 01 线', '07:20', '运行中'],
      ['午间环线 02 线', '12:10', '待出发'],
      ['晚高峰返程 03 线', '17:40', '待出发'],
      ['穿梭接驳 05 线', '14:15', '已完成'],
    ],
  },
  {
    id: 'calls',
    label: '一键呼叫',
    desc: '一键呼叫',
    kicker: '运营管理',
    title: '一键呼叫管理',
    summary: '统一查看呼叫记录、站点人数和司机处理状态，帮助后台追踪候车需求。',
    metrics: [
      { label: '呼叫记录', value: '18', note: '今日累计' },
      { label: '待处理', value: '04', note: '实时队列' },
      { label: '已同步', value: '14', note: '司机端已接收' },
      { label: '高峰站点', value: '03', note: '北门、图书馆、南门' },
    ],
    cards: [
      { title: '呼叫列表', desc: '查看每个站点的呼叫人数和时间。', tags: ['呼叫', '站点', '时间'] },
      { title: '处理状态', desc: '未处理、已提醒、已完成统一标记。', tags: ['状态', '提醒', '完成'] },
      { title: '司机提醒', desc: '可向司机端单独推送提醒。', tags: ['推送', '司机端', '确认'] },
      { title: '站点联动', desc: '点击呼叫点可联动地图调度。', tags: ['地图', '联动', '调度'] },
    ],
    feed: [
      { time: '07:25', title: '北门呼叫到达阈值', text: '系统自动提醒 17 号车。' },
      { time: '12:18', title: '图书馆呼叫已处理', text: '已在司机端确认接收。' },
      { time: '17:48', title: '南门呼叫聚集', text: '返程高峰优先处理。' },
    ],
    tableTitle: '呼叫摘要',
    tableHeaders: ['站点', '人数', '处理'],
    tableRows: [
      ['北门', '12', '已提醒'],
      ['图书馆', '09', '处理中'],
      ['南门', '14', '已提醒'],
      ['南校区', '05', '待处理'],
    ],
  },
  {
    id: 'qrcodes',
    label: '座位二维码',
    desc: '座位二维码',
    kicker: '运营管理',
    title: '座位二维码管理',
    summary: '生成、打印和绑定座位二维码，保证扫码乘车与座位状态一一对应。',
    metrics: [
      { label: '二维码', value: '478', note: '批量生成' },
      { label: '已绑定', value: '432', note: '车辆座位匹配' },
      { label: '停用', value: '06', note: '异常处理' },
      { label: '待打印', value: '14', note: '导出任务' },
    ],
    cards: [
      { title: '二维码生成', desc: '批量生成并绑定座位。', tags: ['生成', '批量', '绑定'] },
      { title: '打印导出', desc: '下载打印文件并归档。', tags: ['打印', '导出', '归档'] },
      { title: '扫码记录', desc: '查看最近扫码与支付状态。', tags: ['扫码', '支付', '记录'] },
      { title: '停用管理', desc: '异常座位可快速停用。', tags: ['停用', '异常', '恢复'] },
    ],
    feed: [
      { time: '09:20', title: '批量二维码完成', text: '12 辆车二维码已打印。' },
      { time: '13:50', title: '异常二维码停用', text: '1 个座位码因故障停用。' },
      { time: '16:10', title: '扫码记录同步', text: '支付数据已归档到订单管理。' },
    ],
    tableTitle: '二维码摘要',
    tableHeaders: ['车辆', '座位', '状态'],
    tableRows: [
      ['湘A · 2187', '34', '已绑定'],
      ['湘A · 5601', '28', '已绑定'],
      ['湘A · 9026', '34', '已绑定'],
      ['湘A · 7710', '30', '停用 2'],
    ],
  },
  {
    id: 'orders',
    label: '订单管理',
    desc: '订单管理',
    kicker: '运营管理',
    title: '订单管理',
    summary: '查看扫码乘车订单、支付状态、退款状态和异常补录，统一处理财务侧记录。',
    metrics: [
      { label: '订单总数', value: '2,184', note: '固定演示' },
      { label: '支付成功', value: '97%', note: '近 7 天' },
      { label: '退款中', value: '08', note: '待审核' },
      { label: '异常单', value: '04', note: '需复核' },
    ],
    cards: [
      { title: '支付状态', desc: '成功、失败、补录统一查看。', tags: ['支付', '失败', '补录'] },
      { title: '订单明细', desc: '用户、车辆、座位和线路统一归档。', tags: ['用户', '车辆', '座位'] },
      { title: '退款联动', desc: '退款状态和订单状态联动显示。', tags: ['退款', '联动', '审核'] },
      { title: '导出报表', desc: '导出订单与支付流水。', tags: ['报表', '流水', '导出'] },
    ],
    feed: [
      { time: '10:00', title: '支付流水归档', text: '昨日所有订单已同步完成。' },
      { time: '14:05', title: '异常单进入复核', text: '扫码失败 2 单已标记。' },
      { time: '17:00', title: '退款队列更新', text: '3 单进入退款审核。' },
    ],
    tableTitle: '订单摘要',
    tableHeaders: ['订单', '金额', '状态'],
    tableRows: [
      ['OD-1001', '0 元', '已支付'],
      ['OD-1002', '0 元', '已支付'],
      ['OD-1003', '0 元', '退款中'],
      ['OD-1004', '0 元', '失败补录'],
    ],
  },
  {
    id: 'refunds',
    label: '退款管理',
    desc: '退款管理',
    kicker: '运营管理',
    title: '退款管理',
    summary: '审核支付异常、重复支付和运营原因的退款申请，保持财务和用户端状态同步。',
    metrics: [
      { label: '待审核', value: '03', note: '退款队列' },
      { label: '审核通过', value: '12', note: '今日累计' },
      { label: '审核驳回', value: '02', note: '已留意见' },
      { label: '退款完成', value: '11', note: '财务回写' },
    ],
    cards: [
      { title: '申请列表', desc: '展示申请原因和订单信息。', tags: ['申请', '原因', '订单'] },
      { title: '审核流程', desc: '通过、驳回和退款中状态可追踪。', tags: ['审核', '驳回', '退款中'] },
      { title: '日志记录', desc: '记录处理意见与审核人。', tags: ['日志', '处理', '审核人'] },
      { title: '财务同步', desc: '结果写回支付状态。', tags: ['财务', '回写', '状态'] },
    ],
    feed: [
      { time: '09:30', title: '退款申请进入审核', text: '订单 OD-1003 已受理。' },
      { time: '13:15', title: '退款完成', text: '2 笔订单已完成财务回写。' },
      { time: '16:40', title: '驳回记录更新', text: '1 笔申请已附处理意见。' },
    ],
    tableTitle: '退款摘要',
    tableHeaders: ['订单', '原因', '状态'],
    tableRows: [
      ['OD-1003', '重复支付', '退款中'],
      ['OD-1005', '线路异常', '已通过'],
      ['OD-1007', '支付失败', '已驳回'],
      ['OD-1009', '运营补偿', '已完成'],
    ],
  },
  {
    id: 'coupons',
    label: '优惠券管理',
    desc: '优惠券管理',
    kicker: '运营管理',
    title: '优惠券管理',
    summary: '创建活动券、免费乘车券和乘车次数权益，统一控制适用线路、有效期和发放数量。',
    metrics: [
      { label: '优惠券', value: '16', note: '活动配置' },
      { label: '发放量', value: '2,460', note: '已领取' },
      { label: '使用率', value: '68%', note: '近 30 天' },
      { label: '权益规则', value: '04', note: '满次奖励' },
    ],
    cards: [
      { title: '活动配置', desc: '设置门槛、有效期和适用线路。', tags: ['活动', '有效期', '线路'] },
      { title: '发放记录', desc: '查看领取人数与剩余数量。', tags: ['领取', '数量', '记录'] },
      { title: '权益规则', desc: '乘车满次数自动发券。', tags: ['满次', '发券', '积分'] },
      { title: '使用统计', desc: '查看核销与使用热度。', tags: ['核销', '热度', '统计'] },
    ],
    feed: [
      { time: '08:50', title: '新人券发放', text: '80 张新人券已投放。' },
      { time: '12:00', title: '满次权益触发', text: '15 名用户达成免费乘车条件。' },
      { time: '17:10', title: '活动券过期提醒', text: '午间环线折扣券即将到期。' },
    ],
    tableTitle: '优惠券摘要',
    tableHeaders: ['券种', '数量', '状态'],
    tableRows: [
      ['新人券', '300', '发放中'],
      ['满减券', '1200', '可用'],
      ['免费乘车券', '420', '已核销'],
      ['乘车次数权益', '4', '规则启用'],
    ],
  },
  {
    id: 'benefits',
    label: '乘车次数权益',
    desc: '乘车次数权益',
    kicker: '运营管理',
    title: '乘车次数权益管理',
    summary: '将用户乘车次数与奖励策略绑定，支持满次赠券、积分和免费乘车券自动发放。',
    metrics: [
      { label: '权益规则', value: '04', note: '可配置' },
      { label: '达标用户', value: '136', note: '本月累计' },
      { label: '已发权益', value: '246', note: '自动发放' },
      { label: '待复核', value: '03', note: '异常记录' },
    ],
    cards: [
      { title: '满次奖励', desc: '按乘车次数自动发放奖励。', tags: ['满次', '奖励', '自动'] },
      { title: '积分规则', desc: '积分兑换优惠券和权益。', tags: ['积分', '兑换', '规则'] },
      { title: '发放日志', desc: '查看每一次权益触发。', tags: ['日志', '触发', '用户'] },
      { title: '用户进度', desc: '查看个人权益完成情况。', tags: ['进度', '个人', '状态'] },
    ],
    feed: [
      { time: '09:40', title: '权益规则触发', text: '10 次乘车奖励已自动发放。' },
      { time: '13:20', title: '积分兑换完成', text: '12 名用户完成券兑换。' },
      { time: '18:00', title: '满次用户更新', text: '达标人数同步增加。' },
    ],
    tableTitle: '权益摘要',
    tableHeaders: ['规则', '触发', '状态'],
    tableRows: [
      ['满 10 次送券', '136', '启用'],
      ['满 15 次免费', '42', '启用'],
      ['连续乘车积分', '246', '启用'],
      ['活动奖励', '68', '启用'],
    ],
  },
  {
    id: 'feedback',
    label: '问题反馈',
    desc: '问题反馈',
    kicker: '运营管理',
    title: '问题反馈管理',
    summary: '统一处理车辆晚点、二维码异常、站点问题和服务反馈，并记录回复与关闭状态。',
    metrics: [
      { label: '待处理', value: '05', note: '当前队列' },
      { label: '处理中', value: '04', note: '已分配' },
      { label: '已回复', value: '22', note: '今日累计' },
      { label: '已关闭', value: '18', note: '最近完成' },
    ],
    cards: [
      { title: '反馈分类', desc: '按问题类型和站点分类。', tags: ['分类', '站点', '问题'] },
      { title: '处理流转', desc: '分配、回复、关闭状态明确。', tags: ['流转', '回复', '关闭'] },
      { title: '用户回访', desc: '处理完成后可回访确认。', tags: ['回访', '确认', '满意度'] },
      { title: '高频问题', desc: '汇总二维码、晚点和站点类问题。', tags: ['高频', '统计', '排序'] },
    ],
    feed: [
      { time: '10:30', title: '二维码问题反馈', text: '已转给二维码管理模块。' },
      { time: '14:20', title: '站点建议回复', text: '雨棚建议已记录。' },
      { time: '17:25', title: '车辆晚点反馈', text: '延误原因已同步司机端。' },
    ],
    tableTitle: '反馈摘要',
    tableHeaders: ['问题', '类别', '状态'],
    tableRows: [
      ['北门站候车人数偏多', '候车问题', '处理中'],
      ['二维码扫码慢', '二维码问题', '已回复'],
      ['东门建议增加雨棚', '站点问题', '已关闭'],
      ['车辆晚点', '运营问题', '处理中'],
    ],
  },
  {
    id: 'ratings',
    label: '司机评价',
    desc: '司机评价',
    kicker: '运营管理',
    title: '司机评价管理',
    summary: '查看司机评分、投诉内容和乘客留言，为司机考核与服务优化提供依据。',
    metrics: [
      { label: '平均评分', value: '4.9', note: '全员平均' },
      { label: '好评', value: '92%', note: '近 30 天' },
      { label: '投诉', value: '03', note: '待处理' },
      { label: '评价数', value: '286', note: '固定演示' },
    ],
    cards: [
      { title: '评分统计', desc: '按司机、线路和时间段统计。', tags: ['评分', '线路', '统计'] },
      { title: '投诉内容', desc: '投诉与建议分类汇总。', tags: ['投诉', '建议', '分类'] },
      { title: '留言回复', desc: '管理端可直接给出处理意见。', tags: ['留言', '回复', '意见'] },
      { title: '导出数据', desc: '评分数据可导出到报表。', tags: ['导出', '报表', '考核'] },
    ],
    feed: [
      { time: '09:00', title: '司机评分更新', text: '刘师傅评分保持 4.9。' },
      { time: '13:30', title: '投诉已处理', text: '1 条服务投诉已回复。' },
      { time: '18:20', title: '评价报表生成', text: '今日评价同步完毕。' },
    ],
    tableTitle: '评分摘要',
    tableHeaders: ['司机', '评分', '状态'],
    tableRows: [
      ['刘师傅', '4.9', '好评'],
      ['陈师傅', '4.8', '好评'],
      ['王师傅', '4.9', '好评'],
      ['赵师傅', '4.7', '待复核'],
    ],
  },
  {
    id: 'statistics',
    label: '运营统计',
    desc: '运营统计',
    kicker: '运营管理',
    title: '运营统计',
    summary: '汇总扫码、呼叫、退款、线路和共享电动车等指标，为周报和月报提供固定演示。',
    metrics: [
      { label: '扫码订单', value: '2,184', note: '累计' },
      { label: '呼叫次数', value: '468', note: '累计' },
      { label: '退款率', value: '1.2%', note: '稳定' },
      { label: '共享电动车', value: '124', note: '活跃骑行' },
    ],
    cards: [
      { title: '周报/月报', desc: '查看核心指标趋势。', tags: ['周报', '月报', '趋势'] },
      { title: '线路对比', desc: '不同线路的运营对比。', tags: ['线路', '对比', '趋势'] },
      { title: '共享电动车统计', desc: '考试、资格和骑行数据统一展示。', tags: ['电动车', '资格', '骑行'] },
      { title: '财务摘要', desc: '支付与退款形成运营闭环。', tags: ['财务', '支付', '退款'] },
    ],
    feed: [
      { time: '09:00', title: '日报生成', text: '今日运营报表已完成。' },
      { time: '15:00', title: '周趋势更新', text: '近 7 天数据已刷新。' },
      { time: '18:00', title: '月报准备', text: '当前所有模块数据已归档。' },
    ],
    tableTitle: '统计摘要',
    tableHeaders: ['指标', '本日', '说明'],
    tableRows: [
      ['扫码订单', '124', '正常'],
      ['候车呼叫', '18', '上升'],
      ['退款申请', '03', '可控'],
      ['共享电动车骑行', '19', '稳定'],
    ],
  },
  {
    id: 'ebikes',
    label: '共享电动车管理',
    desc: '共享电动车管理',
    kicker: '共享电动车',
    title: '共享电动车管理',
    summary: '车辆、资格、电子围栏、考试和骑行记录统一维护，与班车体系并列展示。',
    metrics: [
      { label: '车辆总数', value: '84', note: '可租 36' },
      { label: '资格通过', value: '128', note: '认证用户' },
      { label: '考试通过率', value: '86%', note: '近 30 天' },
      { label: '围栏告警', value: '02', note: '已处理' },
    ],
    cards: [
      { title: '车辆管理', desc: '查看电量、位置和可租状态。', tags: ['车辆', '电量', '可租'] },
      { title: '电子围栏', desc: '围栏内还车与限区规则。', tags: ['围栏', '还车', '限区'] },
      { title: '考试题库', desc: '线上考试题库与记录。', tags: ['题库', '考试', '记录'] },
      { title: '实操审核', desc: '线下实操通过后更新资格。', tags: ['实操', '审核', '资格'] },
    ],
    feed: [
      { time: '08:30', title: '考试记录更新', text: '12 名用户完成线上考试。' },
      { time: '13:10', title: '围栏告警处理', text: '1 起越界告警已关闭。' },
      { time: '16:50', title: '骑行记录同步', text: '今日骑行数据已入库。' },
    ],
    tableTitle: '电动车摘要',
    tableHeaders: ['车辆', '电量', '状态'],
    tableRows: [
      ['12 号车', '86%', '可租'],
      ['23 号车', '68%', '待实操'],
      ['31 号车', '54%', '资格通过'],
      ['44 号车', '42%', '可租'],
    ],
  },
  {
    id: 'fences',
    label: '电子围栏',
    desc: '电子围栏',
    kicker: '共享电动车',
    title: '电子围栏管理',
    summary: '维护共享电动车的可骑行区域、还车区域和越界告警，保障校园安全和秩序。',
    metrics: [
      { label: '围栏区域', value: '08', note: '校园与园区' },
      { label: '告警', value: '02', note: '今日' },
      { label: '处理完成', value: '08', note: '累计' },
      { label: '限制点', value: '04', note: '停放禁区' },
    ],
    cards: [
      { title: '围栏绘制', desc: '还车区、限行区和禁停区配置。', tags: ['绘制', '还车', '禁停'] },
      { title: '越界提醒', desc: '车辆越界会触发告警。', tags: ['越界', '提醒', '告警'] },
      { title: '区域策略', desc: '不同区域对应不同骑行规则。', tags: ['策略', '规则', '分区'] },
      { title: '告警处理', desc: '告警可快速标记处理状态。', tags: ['处理', '状态', '记录'] },
    ],
    feed: [
      { time: '09:20', title: '围栏规则更新', text: '南校区还车区已调整。' },
      { time: '12:50', title: '越界告警关闭', text: '1 起告警已人工确认。' },
      { time: '17:30', title: '区域策略生效', text: '禁停区规则立即生效。' },
    ],
    tableTitle: '围栏摘要',
    tableHeaders: ['区域', '类型', '状态'],
    tableRows: [
      ['校园中心', '还车区', '启用'],
      ['南校区', '还车区', '启用'],
      ['图书馆周边', '禁停区', '启用'],
      ['东门周边', '限制区', '启用'],
    ],
  },
  {
    id: 'exams',
    label: '线上考试',
    desc: '线上考试',
    kicker: '共享电动车',
    title: '线上考试管理',
    summary: '题库、考试记录和合格分数统一维护，用户考试通过后方可进入线下实操。',
    metrics: [
      { label: '题库题目', value: '120', note: '单选 / 多选 / 判断' },
      { label: '考试记录', value: '246', note: '累计记录' },
      { label: '通过率', value: '86%', note: '近 30 天' },
      { label: '待复考', value: '12', note: '当前队列' },
    ],
    cards: [
      { title: '题库管理', desc: '增删题目并配置合格分数。', tags: ['题库', '分数', '配置'] },
      { title: '考试记录', desc: '查看用户考试结果。', tags: ['记录', '通过', '复考'] },
      { title: '学习资料', desc: '查看考试说明和学习资料。', tags: ['资料', '学习', '规则'] },
      { title: '复考提醒', desc: '不合格用户可再次考试。', tags: ['复考', '提醒', '状态'] },
    ],
    feed: [
      { time: '08:10', title: '考试通过率更新', text: '今天通过率维持在 86%。' },
      { time: '11:40', title: '题库同步完成', text: '新增 8 道安全题。' },
      { time: '16:10', title: '复考名单更新', text: '12 名用户等待复考。' },
    ],
    tableTitle: '考试摘要',
    tableHeaders: ['用户', '结果', '状态'],
    tableRows: [
      ['李同学', '88 分', '已通过'],
      ['王同学', '72 分', '待复考'],
      ['陈同学', '96 分', '已通过'],
      ['赵同学', '64 分', '待复考'],
    ],
  },
  {
    id: 'practices',
    label: '线下实操',
    desc: '线下实操',
    kicker: '共享电动车',
    title: '线下实操审核',
    summary: '用户完成线上考试后进入线下实操队列，管理员可以查看安排、结果和备注。',
    metrics: [
      { label: '实操排队', value: '18', note: '今日预约' },
      { label: '待审核', value: '06', note: '现场结果待录入' },
      { label: '通过', value: '24', note: '本周累计' },
      { label: '缺考', value: '01', note: '自动标记' },
    ],
    cards: [
      { title: '实操安排', desc: '查看每场实操安排和负责人。', tags: ['安排', '负责人', '时间'] },
      { title: '结果录入', desc: '通过、未通过和缺考状态统一录入。', tags: ['结果', '通过', '缺考'] },
      { title: '图片备注', desc: '可附现场照片与说明。', tags: ['照片', '备注', '审核'] },
      { title: '资格更新', desc: '通过后自动更新用户资格。', tags: ['资格', '更新', '同步'] },
    ],
    feed: [
      { time: '10:20', title: '实操场次开始', text: '上午场 8 名用户参加。' },
      { time: '14:30', title: '审核结果录入', text: '5 名用户通过实操。' },
      { time: '17:00', title: '缺考名单更新', text: '1 名用户自动标记缺考。' },
    ],
    tableTitle: '实操摘要',
    tableHeaders: ['用户', '结果', '备注'],
    tableRows: [
      ['李同学', '通过', '现场表现稳定'],
      ['王同学', '未通过', '转弯不规范'],
      ['陈同学', '通过', '还车操作正确'],
      ['赵同学', '缺考', '自动记录'],
    ],
  },
  {
    id: 'licenses',
    label: '乘车资格',
    desc: '乘车资格',
    kicker: '共享电动车',
    title: '乘车资格管理',
    summary: '把线上考试、线下实操和资格冻结统一为一个状态机，便于运营人员快速核查。',
    metrics: [
      { label: '资格通过', value: '128', note: '可扫码租车' },
      { label: '待考试', value: '24', note: '尚未参加' },
      { label: '待实操', value: '18', note: '等待安排' },
      { label: '冻结', value: '03', note: '违规处理' },
    ],
    cards: [
      { title: '状态机', desc: '未认证、待考试、待实操、通过和冻结。', tags: ['状态', '认证', '冻结'] },
      { title: '有效期', desc: '可按有效期自动失效。', tags: ['有效期', '失效', '复审'] },
      { title: '违规处理', desc: '违规后可以冻结并记录原因。', tags: ['违规', '冻结', '原因'] },
      { title: '查询筛选', desc: '按学院、资格和时间筛选。', tags: ['筛选', '学院', '时间'] },
    ],
    feed: [
      { time: '09:10', title: '资格通过更新', text: '12 名用户完成全部认证。' },
      { time: '13:25', title: '冻结资格处理', text: '1 名用户因违规被冻结。' },
      { time: '18:05', title: '资格到期提醒', text: '3 名用户资格即将到期。' },
    ],
    tableTitle: '资格摘要',
    tableHeaders: ['用户', '资格', '状态'],
    tableRows: [
      ['李同学', '通过', '可租车'],
      ['王同学', '待考试', '不可用'],
      ['陈同学', '待实操', '不可用'],
      ['赵同学', '冻结', '不可用'],
    ],
  },
]

const navList = document.getElementById('navList')
const moduleKicker = document.getElementById('moduleKicker')
const moduleTitle = document.getElementById('moduleTitle')
const moduleBadge = document.getElementById('moduleBadge')
const moduleSummary = document.getElementById('moduleSummary')
const moduleMetrics = document.getElementById('moduleMetrics')
const moduleCards = document.getElementById('moduleCards')
const moduleFeed = document.getElementById('moduleFeed')
const moduleTable = document.getElementById('moduleTable')
const panelTitle = document.getElementById('panelTitle')
const panelSubtitle = document.getElementById('panelSubtitle')
const tableTitle = document.getElementById('tableTitle')

function renderNav(activeId) {
  if (!navList) {
    return
  }
  navList.innerHTML = modules
    .map(
      (item) => `
        <div class="nav-item ${item.id === activeId ? 'is-active' : ''}" data-id="${item.id}">
          <div class="nav-label">${item.label}</div>
          <div class="nav-desc">${item.desc}</div>
        </div>
      `,
    )
    .join('')

  navList.querySelectorAll('.nav-item').forEach((el) => {
    el.addEventListener('click', () => renderModule(el.getAttribute('data-id') || 'dashboard'))
  })
}

function renderModule(id) {
  const module = modules.find((item) => item.id === id) || modules[0]
  if (moduleKicker) moduleKicker.textContent = module.kicker
  if (moduleTitle) moduleTitle.textContent = module.title
  if (moduleBadge) moduleBadge.textContent = module.label
  if (moduleSummary) moduleSummary.textContent = module.summary
  if (panelTitle) panelTitle.textContent = module.title
  if (panelSubtitle) panelSubtitle.textContent = `${module.label} 的固定数据演示`
  if (tableTitle) tableTitle.textContent = `${module.title} - ${module.tableTitle}`

  if (moduleMetrics) {
    moduleMetrics.innerHTML = module.metrics
      .map(
        (metric) => `
          <div class="metric">
            <div class="metric-label">${metric.label}</div>
            <div class="metric-value">${metric.value}</div>
            <div class="metric-note">${metric.note}</div>
          </div>
        `,
      )
      .join('')
  }

  if (moduleCards) {
    moduleCards.innerHTML = module.cards
      .map(
        (card) => `
          <article class="mini-card">
            <div class="mini-card-title">${card.title}</div>
            <div class="mini-card-desc">${card.desc}</div>
            <div class="mini-card-footer">
              ${card.tags.map((tag) => `<span class="tag">${tag}</span>`).join('')}
            </div>
          </article>
        `,
      )
      .join('')
  }

  if (moduleFeed) {
    moduleFeed.innerHTML = module.feed
      .map(
        (item) => `
          <article class="feed-item">
            <div class="feed-head">
              <div class="feed-title">${item.title}</div>
              <div class="feed-time">${item.time}</div>
            </div>
            <div class="feed-text">${item.text}</div>
          </article>
        `,
      )
      .join('')
  }

  if (moduleTable) {
    moduleTable.innerHTML = `
      <table class="data-table">
        <thead>
          <tr>${module.tableHeaders.map((header) => `<th>${header}</th>`).join('')}</tr>
        </thead>
        <tbody>
          ${module.tableRows
            .map(
              (row) => `
                <tr>
                  <td>${row[0]}</td>
                  <td>${row[1]}</td>
                  <td><span class="table-badge ${getBadgeTone(row[2])}">${row[2]}</span></td>
                </tr>
              `,
            )
            .join('')}
        </tbody>
      </table>
    `
  }

  renderNav(module.id)
}

function getBadgeTone(value) {
  const text = String(value)
  if (text.includes('运行中') || text.includes('通过') || text.includes('已支付') || text.includes('可租') || text.includes('已完成') || text.includes('已绑定') || text.includes('启用')) {
    return 'good'
  }
  if (text.includes('待') || text.includes('处理中') || text.includes('待处理') || text.includes('待复考') || text.includes('待出发')) {
    return 'warn'
  }
  if (text.includes('异常') || text.includes('冻结') || text.includes('停用') || text.includes('驳回') || text.includes('缺考')) {
    return 'danger'
  }
  return 'info'
}

renderModule('dashboard')
