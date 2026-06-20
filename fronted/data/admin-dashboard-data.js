(function (window) {
  const campusGeoJson = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: { name: '湘大校园' },
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [6, 88], [18, 96], [38, 98], [58, 94], [78, 88], [92, 76],
              [96, 58], [92, 38], [84, 20], [64, 8], [42, 6], [22, 10],
              [8, 22], [4, 44], [4, 66], [6, 88],
            ],
          ],
        },
      },
      {
        type: 'Feature',
        properties: { name: '北校区' },
        geometry: {
          type: 'Polygon',
          coordinates: [[[10, 84], [24, 88], [30, 80], [18, 74], [10, 84]]],
        },
      },
      {
        type: 'Feature',
        properties: { name: '教学区' },
        geometry: {
          type: 'Polygon',
          coordinates: [[[28, 70], [48, 76], [54, 64], [36, 58], [28, 70]]],
        },
      },
      {
        type: 'Feature',
        properties: { name: '生活区' },
        geometry: {
          type: 'Polygon',
          coordinates: [[[60, 64], [82, 70], [88, 54], [68, 48], [60, 64]]],
        },
      },
      {
        type: 'Feature',
        properties: { name: '南校区' },
        geometry: {
          type: 'Polygon',
          coordinates: [[[18, 34], [36, 40], [42, 22], [24, 16], [18, 34]]],
        },
      },
      {
        type: 'Feature',
        properties: { name: '东门片区' },
        geometry: {
          type: 'Polygon',
          coordinates: [[[72, 36], [88, 40], [90, 26], [76, 22], [72, 36]]],
        },
      },
    ],
  };

  const stations = [
    { id: 'north-gate', name: '北门', x: 14, y: 84, zone: '北校区', heatWeight: 1.08, callWeight: 1.00, lineIds: ['route-01', 'route-04'] },
    { id: 'library', name: '图书馆', x: 33, y: 76, zone: '教学区', heatWeight: 1.12, callWeight: 1.10, lineIds: ['route-01', 'route-02', 'route-05'] },
    { id: 'admin', name: '行政楼', x: 48, y: 67, zone: '教学区', heatWeight: 0.90, callWeight: 0.82, lineIds: ['route-01', 'route-02'] },
    { id: 'south-gate', name: '南门', x: 68, y: 56, zone: '生活区', heatWeight: 1.05, callWeight: 1.02, lineIds: ['route-03', 'route-04'] },
    { id: 'graduate', name: '研究生院', x: 82, y: 44, zone: '东门片区', heatWeight: 0.98, callWeight: 1.06, lineIds: ['route-03', 'route-06'] },
    { id: 'east-gate', name: '东门', x: 87, y: 28, zone: '东门片区', heatWeight: 0.72, callWeight: 0.70, lineIds: ['route-05', 'route-06'] },
    { id: 'south-campus', name: '南校区', x: 30, y: 24, zone: '南校区', heatWeight: 0.84, callWeight: 0.80, lineIds: ['route-05', 'route-06'] },
    { id: 'dormitory', name: '宿舍区', x: 22, y: 18, zone: '南校区', heatWeight: 0.96, callWeight: 0.94, lineIds: ['route-03', 'route-05'] },
  ];

  const amapCenter = [112.862867, 27.883392];

  function toAmapCoord(x, y) {
    return [
      Number((amapCenter[0] + (x - 50) * 0.0013).toFixed(6)),
      Number((amapCenter[1] + (y - 50) * 0.0010).toFixed(6)),
    ];
  }

  stations.forEach((station) => {
    station.amapCoord = toAmapCoord(station.x, station.y);
  });

  const routes = [
    {
      id: 'route-01',
      name: '早高峰接驳 01 线',
      shortName: '01 线',
      color: '#2d6cff',
      direction: '北门 → 图书馆 → 行政楼 → 南门',
      status: '运行中',
      seats: '34 / 34',
      vehicleId: 'bus-17',
      eta: '07:31',
      stops: ['north-gate', 'library', 'admin', 'south-gate'],
      path: [[14, 84], [20, 82], [28, 78], [36, 73], [46, 67], [58, 61], [68, 56]],
    },
    {
      id: 'route-02',
      name: '午间环线 02 线',
      shortName: '02 线',
      color: '#1fbf8a',
      direction: '图书馆 → 行政楼 → 研究生院 → 图书馆',
      status: '运行中',
      seats: '28 / 28',
      vehicleId: 'bus-23',
      eta: '12:10',
      stops: ['library', 'admin', 'graduate', 'library'],
      path: [[33, 76], [40, 72], [48, 67], [60, 57], [72, 50], [82, 44], [68, 52], [48, 64], [33, 76]],
    },
    {
      id: 'route-03',
      name: '晚高峰返程 03 线',
      shortName: '03 线',
      color: '#f59f2a',
      direction: '南门 → 研究生院 → 宿舍区',
      status: '候车中',
      seats: '30 / 30',
      vehicleId: 'bus-05',
      eta: '18:02',
      stops: ['south-gate', 'graduate', 'dormitory'],
      path: [[68, 56], [74, 50], [82, 44], [76, 38], [66, 30], [58, 24], [48, 21], [36, 19], [22, 18]],
    },
    {
      id: 'route-04',
      name: '穿梭接驳 04 线',
      shortName: '04 线',
      color: '#7c8fff',
      direction: '北门 → 南校区 → 南门',
      status: '运行中',
      seats: '26 / 26',
      vehicleId: 'bus-11',
      eta: '17:46',
      stops: ['north-gate', 'south-campus', 'south-gate'],
      path: [[14, 84], [18, 74], [22, 62], [26, 48], [30, 36], [32, 24], [46, 30], [58, 42], [68, 56]],
    },
    {
      id: 'route-05',
      name: '共享换乘 05 线',
      shortName: '05 线',
      color: '#14b8a6',
      direction: '南校区 → 图书馆 → 东门',
      status: '调度中',
      seats: '24 / 24',
      vehicleId: 'bus-28',
      eta: '09:12',
      stops: ['south-campus', 'library', 'east-gate'],
      path: [[30, 24], [34, 34], [36, 46], [34, 58], [33, 76], [50, 62], [66, 48], [78, 36], [87, 28]],
    },
    {
      id: 'route-06',
      name: '夜间返程 06 线',
      shortName: '06 线',
      color: '#8b5cf6',
      direction: '研究生院 → 东门 → 南校区',
      status: '候车中',
      seats: '24 / 24',
      vehicleId: 'bus-31',
      eta: '21:05',
      stops: ['graduate', 'east-gate', 'south-campus'],
      path: [[82, 44], [84, 38], [87, 28], [72, 26], [58, 22], [44, 24], [30, 24]],
    },
  ];

  const vehicles = [
    { id: 'bus-17', plate: '湘A·2187', name: '17 号车', routeId: 'route-01', coord: [58, 61], seats: '6 / 34', status: '运行中', speed: '22 km/h' },
    { id: 'bus-23', plate: '湘A·5601', name: '23 号车', routeId: 'route-02', coord: [42, 68], seats: '4 / 28', status: '运行中', speed: '18 km/h' },
    { id: 'bus-05', plate: '湘A·9026', name: '05 号车', routeId: 'route-03', coord: [76, 46], seats: '11 / 30', status: '候车中', speed: '0 km/h' },
    { id: 'bus-11', plate: '湘A·6738', name: '11 号车', routeId: 'route-04', coord: [28, 41], seats: '8 / 26', status: '运行中', speed: '20 km/h' },
    { id: 'bus-28', plate: '湘A·4820', name: '28 号车', routeId: 'route-05', coord: [71, 34], seats: '3 / 24', status: '调度中', speed: '14 km/h' },
    { id: 'bus-31', plate: '湘A·7710', name: '31 号车', routeId: 'route-06', coord: [80, 39], seats: '0 / 24', status: '待出发', speed: '0 km/h' },
  ];

  const stationLookup = Object.fromEntries(stations.map((station) => [station.id, station]));
  const routeLookup = Object.fromEntries(routes.map((route) => [route.id, route]));
  const vehicleLookup = Object.fromEntries(vehicles.map((vehicle) => [vehicle.id, vehicle]));

  const timeSlots = ['06:30', '07:00', '07:30', '08:00', '08:30', '09:00'];
  const timeProfiles = {
    morning: [72, 86, 98, 90, 74, 58],
    noon: [24, 36, 44, 52, 40, 30],
    evening: [56, 71, 84, 96, 90, 68],
  };

  function buildMatrix(profile, biasOffset) {
    return timeSlots.flatMap((_, xIndex) => stations.map((station, yIndex) => {
      const value = Math.round(profile[xIndex] * station.heatWeight + biasOffset + yIndex * 2);
      return [xIndex, yIndex, Math.max(0, Math.min(100, value))];
    }));
  }

  function buildGeoPoints(profile, shift = 0) {
    return stations.map((station, index) => {
      const value = Math.round(profile[index % profile.length] * station.callWeight + shift + index * 3);
      return {
        name: station.name,
        value: [station.x, station.y, Math.max(0, Math.min(100, value))],
      };
    });
  }

  const heatmapPeriods = [
    {
      id: 'morning',
      label: '早高峰',
      range: '07:00 - 09:00',
      suggestion: '北门与图书馆热度最高，建议优先加车并提前提醒司机进入待命。',
      topStation: '北门',
      matrix: buildMatrix(timeProfiles.morning, 2),
      geoPoints: buildGeoPoints([92, 88, 85, 72, 65, 57, 50, 62], 6),
      amapPoints: stations.map((station, index) => {
        const count = Math.round([92, 88, 85, 72, 65, 57, 50, 62][index] * station.callWeight + 6 + index * 2);
        return {
          name: station.name,
          lng: station.amapCoord[0],
          lat: station.amapCoord[1],
          count: Math.max(0, Math.min(100, count)),
        };
      }),
      hotStations: ['北门', '图书馆', '行政楼'],
    },
    {
      id: 'noon',
      label: '午间环线',
      range: '11:30 - 13:30',
      suggestion: '午间需求稳定，图书馆与南校区的换乘流量需要保持均衡。',
      topStation: '图书馆',
      matrix: buildMatrix(timeProfiles.noon, -4),
      geoPoints: buildGeoPoints([42, 48, 36, 54, 45, 30, 33, 39], -2),
      amapPoints: stations.map((station, index) => {
        const count = Math.round([42, 48, 36, 54, 45, 30, 33, 39][index] * station.callWeight - 2 + index * 2);
        return {
          name: station.name,
          lng: station.amapCoord[0],
          lat: station.amapCoord[1],
          count: Math.max(0, Math.min(100, count)),
        };
      }),
      hotStations: ['图书馆', '南门', '南校区'],
    },
    {
      id: 'evening',
      label: '晚高峰',
      range: '17:30 - 19:30',
      suggestion: '南门、研究生院和宿舍区连成高热带，返程线路需要盯紧空座变化。',
      topStation: '南门',
      matrix: buildMatrix(timeProfiles.evening, 5),
      geoPoints: buildGeoPoints([76, 83, 70, 94, 88, 63, 67, 80], 8),
      amapPoints: stations.map((station, index) => {
        const count = Math.round([76, 83, 70, 94, 88, 63, 67, 80][index] * station.callWeight + 8 + index * 2);
        return {
          name: station.name,
          lng: station.amapCoord[0],
          lat: station.amapCoord[1],
          count: Math.max(0, Math.min(100, count)),
        };
      }),
      hotStations: ['南门', '研究生院', '宿舍区'],
    },
  ];

  const dashboard = {
    kicker: '运营总览',
    title: '调度与运营总览',
    summary: '汇总车辆在线、候车热力、订单趋势和共享电动车资格状态，供运营人员快速判断当前运行态势。',
    badge: '固定数据演示',
    metrics: [
      { label: '车辆在线', value: '26', note: '6 条线路运行中', tone: 'primary' },
      { label: '待处理呼叫', value: '08', note: '已同步司机端', tone: 'accent' },
      { label: '退款待审', value: '03', note: '固定演示数据', tone: 'warning' },
      { label: '资格待审', value: '12', note: '线下实操队列', tone: 'success' },
    ],
    quickActions: [
      { id: 'dashboard-route', label: '切换线路' },
      { id: 'dashboard-heat', label: '刷新热力' },
      { id: 'dashboard-export', label: '导出日报' },
    ],
    highlights: [
      { title: '北门候车告警', desc: '北门站点热度达到 92，已建议 17 号车优先抵达。' },
      { title: '午间环线稳定', desc: '12:10 班次空座 5 个，当前供需平衡。' },
      { title: '共享电动车资格', desc: '今日共有 18 名用户进入线下实操待审列。' },
    ],
    orderTrend: [102, 116, 124, 138, 147, 151, 165],
    callTrend: [12, 15, 18, 16, 20, 22, 21],
    refundTrend: [1, 2, 2, 3, 2, 4, 3],
    loadTrend: [42, 48, 53, 60, 66, 70, 74],
    activeRouteId: 'route-01',
    activePeriodId: 'morning',
    map: {
      routes,
      stations,
      vehicles,
      geoJson: campusGeoJson,
    },
    timeline: [
      { time: '07:32', title: '北门站点呼叫上升', text: '北门候车人数达到阈值，已同步给 17 号车。' },
      { time: '12:08', title: '午间环线即将发车', text: '12:10 班次空座 5 个，运营状态正常。' },
      { time: '16:20', title: '共享电动车实操排队', text: '今日共 18 名用户完成线下实操预约。' },
    ],
    table: {
      title: '运营摘要',
      headers: ['指标', '今日', '说明'],
      rows: [
        ['候车呼叫', '18', '较昨日 +4'],
        ['扫码订单', '124', '稳定增长'],
        ['退款申请', '03', '处理中 1'],
        ['资格通过', '128', '含线上考试'],
      ],
    },
  };

  const moduleDefinitions = [
    {
      id: 'dashboard',
      group: '运营中枢',
      label: '首页看板',
      kicker: dashboard.kicker,
      title: dashboard.title,
      summary: dashboard.summary,
      badge: dashboard.badge,
      mode: 'dashboard',
      actions: dashboard.quickActions,
      metrics: dashboard.metrics,
      cards: [
        { title: '地图调度看板', desc: '车辆定位、线路轨迹、站点分布和 ETA 同屏展示。', tags: ['实时位置', '线路轨迹', 'ETA'] },
        { title: '候车热力图', desc: '按时段和站点查看拥挤程度，辅助调度增车。', tags: ['热力图', '高峰站点', '回放'] },
        { title: '订单与退款', desc: '扫码支付订单和退款审核串成一个工作流。', tags: ['订单', '退款', '异常补录'] },
        { title: '共享电动车资格', desc: '展示考试、实操和资格冻结的运营状态。', tags: ['考试', '实操', '资格'] },
      ],
      feed: dashboard.timeline,
      table: dashboard.table,
    },
    {
      id: 'dispatch-map',
      group: '运营中枢',
      label: '地图调度',
      kicker: '调度中心',
      title: '地图调度看板',
      summary: '车辆实时位置、线路轨迹、站点呼叫和热力站点联动展示，方便调度员快速安排车辆。',
      badge: '地图联动',
      mode: 'dispatch',
      actions: [
        { id: 'dispatch-call', label: '发送提醒' },
        { id: 'dispatch-follow', label: '跟随车辆' },
        { id: 'dispatch-detail', label: '查看详情' },
        { id: 'dispatch-alert', label: '标记异常' },
      ],
      metrics: [
        { label: '在线车辆', value: '12', note: '实时定位更新', tone: 'primary' },
        { label: '热点站点', value: '04', note: '当前高热区域', tone: 'accent' },
        { label: 'ETA 更新', value: '28', note: '近 10 分钟刷新', tone: 'success' },
        { label: '异常车辆', value: '01', note: '已标记提醒', tone: 'warning' },
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
      table: {
        title: '调度动作',
        headers: ['动作', '对象', '状态'],
        rows: [
          ['发送提醒', '17 号车', '已完成'],
          ['标记异常', '18 号车', '待确认'],
          ['查看详情', '北门呼叫点', '已打开'],
          ['路线跟随', '午间环线', '已跟随'],
        ],
      },
    },
    {
      id: 'heatmap',
      group: '运营中枢',
      label: '候车热力图',
      kicker: '热度分析',
      title: '候车热力图',
      summary: '按时间段、线路和站点筛选人流密度，辅助司机调度和后台排班优化。',
      badge: '高德热力图',
      mode: 'heatmap',
      actions: [
        { id: 'heat-morning', label: '早高峰' },
        { id: 'heat-noon', label: '午间' },
        { id: 'heat-evening', label: '晚高峰' },
      ],
      metrics: [
        { label: '高热站点', value: '06', note: '热度 > 80', tone: 'warning' },
        { label: '高峰时段', value: '07:00', note: '早高峰最明显', tone: 'primary' },
        { label: '线路覆盖', value: '6 条', note: '重点线路已覆盖', tone: 'accent' },
        { label: '历史记录', value: '30 天', note: '支持回放', tone: 'success' },
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
      table: {
        title: '热力概览',
        headers: ['站点', '热度', '建议'],
        rows: [
          ['北门', '92', '优先加车'],
          ['图书馆', '86', '持续跟踪'],
          ['南门', '89', '返程优先'],
          ['南校区', '74', '保持覆盖'],
        ],
      },
    },
    {
      id: 'users',
      group: '基础数据',
      label: '用户管理',
      kicker: '基础数据',
      title: '用户管理',
      summary: '维护学生、教职工和园区用户的实名信息、乘车记录、支付记录和共享电动车资格状态。',
      badge: '用户档案',
      mode: 'table',
      actions: [
        { id: 'users-add', label: '新增用户' },
        { id: 'users-export', label: '导出名单' },
      ],
      metrics: [
        { label: '用户总数', value: '1,284', note: '固定演示', tone: 'primary' },
        { label: '今日新增', value: '18', note: '申请已通过', tone: 'accent' },
        { label: '资格冻结', value: '03', note: '待复核', tone: 'warning' },
        { label: '活跃用户', value: '286', note: '近 7 天', tone: 'success' },
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
      table: {
        title: '用户列表摘要',
        headers: ['姓名', '角色', '资格', '最近乘车', '状态'],
        rows: [
          ['李同学', '学生', '认证通过', '07:30 01 线', '正常'],
          ['王老师', '教职工', '认证通过', '12:10 02 线', '正常'],
          ['陈同学', '学生', '待实操', '18:00 03 线', '待审核'],
          ['张同学', '学生', '冻结', '无', '已限制'],
        ],
      },
    },
    {
      id: 'drivers',
      group: '基础数据',
      label: '司机管理',
      kicker: '基础数据',
      title: '司机管理',
      summary: '维护司机账号、车辆绑定、任务分配、考勤和评价，保证司机端和后台调度同步。',
      badge: '司机排班',
      mode: 'table',
      actions: [{ id: 'drivers-assign', label: '分配任务' }, { id: 'drivers-export', label: '导出排班' }],
      metrics: [
        { label: '司机总数', value: '24', note: '在岗 21', tone: 'primary' },
        { label: '已绑定车辆', value: '18', note: '运行中 12', tone: 'accent' },
        { label: '待分配任务', value: '05', note: '可手动指派', tone: 'warning' },
        { label: '评分平均', value: '4.9', note: '近 30 天', tone: 'success' },
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
      table: {
        title: '司机排班',
        headers: ['司机', '车辆', '状态', '评分'],
        rows: [
          ['刘师傅', '湘A · 2187', '进行中', '4.9'],
          ['陈师傅', '湘A · 5601', '待出发', '5.0'],
          ['王师傅', '湘A · 9026', '待出发', '4.8'],
          ['赵师傅', '湘A · 6738', '休息', '4.9'],
        ],
      },
    },
    {
      id: 'vehicles',
      group: '基础数据',
      label: '车辆管理',
      kicker: '基础数据',
      title: '车辆管理',
      summary: '统一管理车牌、车型、座位数、状态、保险和年检信息，保证地图与订单显示一致。',
      badge: '车辆档案',
      mode: 'table',
      actions: [{ id: 'vehicles-register', label: '新增车辆' }, { id: 'vehicles-scan', label: '生成二维码' }],
      metrics: [
        { label: '车辆总数', value: '32', note: '运行中 26', tone: 'primary' },
        { label: '维修中', value: '02', note: '已进场维修', tone: 'warning' },
        { label: '停用', value: '01', note: '临时封存', tone: 'accent' },
        { label: '座位二维码', value: '478', note: '可打印', tone: 'success' },
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
      table: {
        title: '车辆摘要',
        headers: ['车牌', '状态', '座位', '保险'],
        rows: [
          ['湘A · 2187', '运行中', '34', '正常'],
          ['湘A · 5601', '运行中', '28', '正常'],
          ['湘A · 9026', '运行中', '34', '正常'],
          ['湘A · 7710', '维修中', '30', '待复检'],
        ],
      },
    },
    {
      id: 'routes',
      group: '基础数据',
      label: '线路管理',
      kicker: '基础数据',
      title: '线路管理',
      summary: '维护线路名称、起终点、站点顺序和线路颜色，保持地图、司机和用户端一致。',
      badge: '线路编排',
      mode: 'table',
      actions: [{ id: 'routes-add', label: '新增线路' }, { id: 'routes-refresh', label: '同步地图' }],
      metrics: [
        { label: '线路数量', value: '06', note: '含穿梭接驳', tone: 'primary' },
        { label: '站点数量', value: '24', note: '覆盖核心区域', tone: 'accent' },
        { label: '在线车辆', value: '12', note: '实时分布', tone: 'success' },
        { label: '调度中', value: '03', note: '临时任务', tone: 'warning' },
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
      table: {
        title: '线路摘要',
        headers: ['线路', '方向', '状态', '车牌'],
        rows: [
          ['早高峰接驳 01 线', '北门 → 南门', '运行中', '湘A·2187'],
          ['午间环线 02 线', '图书馆 → 东门', '运行中', '湘A·5601'],
          ['晚高峰返程 03 线', '南门 → 研究生院', '候车中', '湘A·9026'],
          ['穿梭接驳 05 线', '南校区 → 图书馆', '候车中', '湘A·4820'],
        ],
      },
    },
    {
      id: 'stations',
      group: '基础数据',
      label: '站点管理',
      kicker: '基础数据',
      title: '站点管理',
      summary: '维护站点地址、经纬度、候车范围和所属线路，确保地图和呼叫点统一。',
      badge: '站点网络',
      mode: 'table',
      actions: [{ id: 'stations-add', label: '新增站点' }, { id: 'stations-map', label: '查看地图' }],
      metrics: [
        { label: '站点总数', value: '24', note: '重点站点 8', tone: 'primary' },
        { label: '热门站点', value: '08', note: '候车高热', tone: 'warning' },
        { label: '呼叫点', value: '19', note: '同步司机端', tone: 'accent' },
        { label: '站点异常', value: '01', note: '待复核', tone: 'success' },
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
      table: {
        title: '站点摘要',
        headers: ['站点', '热度', '线路', '候车人数'],
        rows: [
          ['北门', '92', '01 / 04', '12'],
          ['图书馆', '86', '01 / 02 / 05', '10'],
          ['南门', '89', '03 / 04', '11'],
          ['南校区', '74', '05 / 06', '7'],
        ],
      },
    },
    {
      id: 'tasks',
      group: '基础数据',
      label: '班次 / 任务',
      kicker: '基础数据',
      title: '班次 / 任务管理',
      summary: '统一查看今日任务、发车时间、车辆绑定和行程执行状态，便于后台和司机端联动。',
      badge: '任务看板',
      mode: 'table',
      actions: [{ id: 'tasks-publish', label: '发布任务' }, { id: 'tasks-assign', label: '再次分配' }],
      metrics: [
        { label: '今日任务', value: '18', note: '早晚高峰各 6 班', tone: 'primary' },
        { label: '已发车', value: '12', note: '按计划执行', tone: 'success' },
        { label: '待出发', value: '05', note: '可手动催发', tone: 'warning' },
        { label: '延误', value: '01', note: '已标记异常', tone: 'accent' },
      ],
      cards: [
        { title: '任务编排', desc: '发车时间、车牌和司机一屏管理。', tags: ['时间', '车辆', '司机'] },
        { title: '到站确认', desc: '完成情况、延误和回执同步记录。', tags: ['确认', '延误', '回执'] },
        { title: '呼叫提醒', desc: '候车点达到阈值后自动提醒。', tags: ['提醒', '阈值', '联动'] },
        { title: '异常上报', desc: '临时改线和车辆故障统一上报。', tags: ['异常', '上报', '改线'] },
      ],
      feed: [
        { time: '07:05', title: '任务已发布', text: '早高峰 6 班任务全部下发。' },
        { time: '12:05', title: '任务完成回执', text: '午间环线已确认到站。' },
        { time: '18:05', title: '异常任务上报', text: '1 班次因拥堵延后 6 分钟。' },
      ],
      table: {
        title: '任务摘要',
        headers: ['班次', '车辆', '司机', '状态'],
        rows: [
          ['07:30 01 线', '湘A·2187', '刘师傅', '进行中'],
          ['12:10 02 线', '湘A·5601', '陈师傅', '待发车'],
          ['18:00 03 线', '湘A·9026', '王师傅', '待发车'],
          ['21:00 06 线', '湘A·7710', '赵师傅', '待发车'],
        ],
      },
    },
    {
      id: 'calls',
      group: '交易与服务',
      label: '一键呼叫',
      kicker: '服务治理',
      title: '一键呼叫管理',
      summary: '管理乘客在站点的候车呼叫记录，便于调度员统一处理热区提醒和司机通知。',
      badge: '呼叫工单',
      mode: 'table',
      actions: [{ id: 'calls-assign', label: '分派司机' }, { id: 'calls-close', label: '关闭工单' }],
      metrics: [
        { label: '今日呼叫', value: '18', note: '已处理 15', tone: 'primary' },
        { label: '待分派', value: '03', note: '等待司机确认', tone: 'warning' },
        { label: '高热站点', value: '06', note: '已标红', tone: 'accent' },
        { label: '满意度', value: '4.8', note: '固定演示', tone: 'success' },
      ],
      cards: [
        { title: '工单列表', desc: '按站点、时段和司机查看呼叫工单。', tags: ['工单', '站点', '司机'] },
        { title: '调度结果', desc: '已处理、已转派和已关闭状态统一标记。', tags: ['处理', '转派', '关闭'] },
        { title: '站点联动', desc: '呼叫记录可直接联动到地图与热力图。', tags: ['地图', '热力图', '联动'] },
        { title: '短信提醒', desc: '仅演示提醒动作，不接真实短信。', tags: ['提醒', '演示', '固定状态'] },
      ],
      feed: [
        { time: '07:18', title: '北门呼叫增加', text: '已提醒 17 号车提前到站。' },
        { time: '12:02', title: '图书馆呼叫关闭', text: '午间环线已完成派单。' },
        { time: '17:55', title: '研究生院呼叫升级', text: '转入晚高峰返程队列。' },
      ],
      table: {
        title: '呼叫记录',
        headers: ['站点', '人数', '线路', '状态'],
        rows: [
          ['北门', '12', '01 / 04', '已派单'],
          ['图书馆', '10', '01 / 02 / 05', '处理中'],
          ['南门', '11', '03 / 04', '已派单'],
          ['东门', '6', '05 / 06', '已关闭'],
        ],
      },
    },
    {
      id: 'orders',
      group: '交易与服务',
      label: '订单管理',
      kicker: '交易中心',
      title: '订单管理',
      summary: '查看扫码乘车订单、支付状态和退款回流情况，适合后台进行流水核对。',
      badge: '订单流水',
      mode: 'table',
      actions: [{ id: 'orders-export', label: '导出订单' }, { id: 'orders-review', label: '查看异常' }],
      metrics: [
        { label: '扫码订单', value: '124', note: '近 24 小时', tone: 'primary' },
        { label: '已支付', value: '121', note: '成功率 97.6%', tone: 'success' },
        { label: '待退款', value: '03', note: '人工复核中', tone: 'warning' },
        { label: '异常单', value: '02', note: '固定演示', tone: 'accent' },
      ],
      cards: [
        { title: '支付流水', desc: '按线路、班次和支付方式筛查订单。', tags: ['支付', '班次', '线路'] },
        { title: '退款审核', desc: '异常订单支持手动标记和复核。', tags: ['退款', '复核', '异常'] },
        { title: '座位映射', desc: '订单可关联座位二维码和乘车记录。', tags: ['座位', '二维码', '映射'] },
        { title: '支付回执', desc: '状态变化通过固定数据流即时更新。', tags: ['回执', '状态', '流转'] },
      ],
      feed: [
        { time: '09:45', title: '支付成功', text: '早高峰 18 笔订单已结算。' },
        { time: '14:25', title: '退款申请', text: '3 笔订单进入人工审核。' },
        { time: '19:00', title: '流水归档', text: '今天订单流水完成固定演示归档。' },
      ],
      table: {
        title: '订单摘要',
        headers: ['订单号', '用户', '线路', '金额', '状态'],
        rows: [
          ['OD240701', '李同学', '01 线', '2.00', '已支付'],
          ['OD240702', '王老师', '02 线', '2.00', '已支付'],
          ['OD240703', '陈同学', '03 线', '3.00', '退款中'],
          ['OD240704', '张同学', '05 线', '2.00', '异常单'],
        ],
      },
    },
    {
      id: 'refunds',
      group: '交易与服务',
      label: '退款管理',
      kicker: '交易中心',
      title: '退款管理',
      summary: '处理用户退款申请、核对支付记录并追踪退款结果，保持票务闭环。',
      badge: '退款审核',
      mode: 'table',
      actions: [{ id: 'refunds-approve', label: '批量审核' }, { id: 'refunds-archive', label: '归档记录' }],
      metrics: [
        { label: '退款申请', value: '03', note: '今日新增', tone: 'primary' },
        { label: '已通过', value: '02', note: '退款完成', tone: 'success' },
        { label: '待审核', value: '01', note: '材料补充', tone: 'warning' },
        { label: '超时', value: '00', note: '无积压', tone: 'accent' },
      ],
      cards: [
        { title: '申请原因', desc: '支持按迟到、改线和误扣分类查看。', tags: ['原因', '分类', '核对'] },
        { title: '处理进度', desc: '已通过、退款中、已完成状态清晰。', tags: ['进度', '完成', '状态'] },
        { title: '工单备注', desc: '可在固定演示中记录审核意见。', tags: ['备注', '审核', '意见'] },
        { title: '异常回流', desc: '退款异常会回流到订单中心。', tags: ['回流', '异常', '订单'] },
      ],
      feed: [
        { time: '10:20', title: '退款通过', text: '1 笔误扣款已完成退款。' },
        { time: '13:15', title: '补充材料', text: '1 笔申请等待用户补充证明。' },
        { time: '16:00', title: '审核完成', text: '昨日退款已全部归档。' },
      ],
      table: {
        title: '退款摘要',
        headers: ['申请人', '订单号', '金额', '原因', '状态'],
        rows: [
          ['李同学', 'OD240701', '2.00', '班次取消', '已通过'],
          ['王老师', 'OD240702', '2.00', '误扣', '退款中'],
          ['陈同学', 'OD240703', '3.00', '线路调整', '待审核'],
        ],
      },
    },
    {
      id: 'coupons',
      group: '交易与服务',
      label: '优惠券管理',
      kicker: '权益中心',
      title: '优惠券管理',
      summary: '发放、回收和核销乘车优惠券，支撑活动运营与权益激励。',
      badge: '权益发放',
      mode: 'table',
      actions: [{ id: 'coupons-issue', label: '发放优惠券' }, { id: 'coupons-audit', label: '核销记录' }],
      metrics: [
        { label: '已发放', value: '512', note: '固定演示', tone: 'primary' },
        { label: '已核销', value: '278', note: '使用率 54.3%', tone: 'success' },
        { label: '待生效', value: '36', note: '活动预发', tone: 'warning' },
        { label: '已过期', value: '24', note: '历史归档', tone: 'accent' },
      ],
      cards: [
        { title: '发放策略', desc: '按活动、用户和线路配置权益。', tags: ['活动', '用户', '线路'] },
        { title: '核销状态', desc: '使用、过期和冻结状态一目了然。', tags: ['核销', '过期', '冻结'] },
        { title: '发放批次', desc: '批次管理帮助追踪运营效果。', tags: ['批次', '追踪', '运营'] },
        { title: '权益关联', desc: '支持与乘车次数权益联动。', tags: ['联动', '次数', '权益'] },
      ],
      feed: [
        { time: '08:30', title: '新券发放', text: '活动券已分发给 80 名用户。' },
        { time: '12:45', title: '核销上升', text: '午间环线核销率提升。' },
        { time: '18:45', title: '过期归档', text: '今天到期的优惠券已归档。' },
      ],
      table: {
        title: '优惠券摘要',
        headers: ['券种', '发放', '领取', '状态'],
        rows: [
          ['新生体验券', '120', '118', '使用中'],
          ['返程补贴券', '180', '160', '使用中'],
          ['共享电动车券', '76', '54', '待生效'],
          ['活动满减券', '136', '128', '已过期'],
        ],
      },
    },
    {
      id: 'benefits',
      group: '交易与服务',
      label: '乘车次数权益',
      kicker: '权益中心',
      title: '乘车次数权益管理',
      summary: '管理乘车次数包、剩余权益和兑换记录，支持面向固定用户的套餐运营。',
      badge: '权益包',
      mode: 'table',
      actions: [{ id: 'benefits-pack', label: '创建权益包' }, { id: 'benefits-assign', label: '分配用户' }],
      metrics: [
        { label: '权益包数', value: '08', note: '含月卡/学期卡', tone: 'primary' },
        { label: '已发放', value: '264', note: '固定演示', tone: 'success' },
        { label: '剩余次数', value: '1,024', note: '可继续使用', tone: 'accent' },
        { label: '过期包', value: '12', note: '等待归档', tone: 'warning' },
      ],
      cards: [
        { title: '套餐配置', desc: '次数、有效期和适用线路可配置。', tags: ['次数', '有效期', '线路'] },
        { title: '发放记录', desc: '按用户查看权益发放和使用。', tags: ['记录', '使用', '用户'] },
        { title: '异常补发', desc: '可按工单为用户补发权益。', tags: ['补发', '工单', '处理'] },
        { title: '统计趋势', desc: '观察权益发放与消耗。', tags: ['趋势', '消耗', '统计'] },
      ],
      feed: [
        { time: '09:00', title: '权益包发放', text: '学期卡权益包已下发。' },
        { time: '13:50', title: '剩余次数提醒', text: '20 名用户进入低余量提醒。' },
        { time: '18:25', title: '批次归档', text: '本周权益发放完成归档。' },
      ],
      table: {
        title: '权益摘要',
        headers: ['权益包', '发放', '已用', '剩余', '状态'],
        rows: [
          ['月卡 10 次', '120', '64', '56', '使用中'],
          ['月卡 20 次', '88', '32', '56', '使用中'],
          ['学期卡 60 次', '40', '18', '22', '使用中'],
          ['体验包 3 次', '16', '16', '0', '已用尽'],
        ],
      },
    },
    {
      id: 'feedback',
      group: '交易与服务',
      label: '问题反馈',
      kicker: '服务治理',
      title: '问题反馈管理',
      summary: '集中处理线路、司机、车辆和票务相关反馈，支持固定演示中的状态流转。',
      badge: '反馈工单',
      mode: 'table',
      actions: [{ id: 'feedback-close', label: '关闭工单' }, { id: 'feedback-reply', label: '添加回复' }],
      metrics: [
        { label: '反馈总数', value: '16', note: '今日新增 4', tone: 'primary' },
        { label: '待处理', value: '05', note: '处理中', tone: 'warning' },
        { label: '已关闭', value: '09', note: '响应及时', tone: 'success' },
        { label: '高优先级', value: '02', note: '需要回访', tone: 'accent' },
      ],
      cards: [
        { title: '反馈分类', desc: '支持路线、司机、支付和设备分类。', tags: ['分类', '设备', '支付'] },
        { title: '处理流程', desc: '待处理、处理中、已关闭清晰可见。', tags: ['流程', '关闭', '跟进'] },
        { title: '回访记录', desc: '每条工单可保存回访结果。', tags: ['回访', '结果', '备注'] },
        { title: '优先级', desc: '高优先级问题会在顶部置顶。', tags: ['优先级', '置顶', '提醒'] },
      ],
      feed: [
        { time: '08:50', title: '新增反馈', text: '用户反馈北门站点雨棚不足。' },
        { time: '14:10', title: '处理中', text: '司机评价相关反馈已回复。' },
        { time: '19:20', title: '工单关闭', text: '昨日反馈完成归档。' },
      ],
      table: {
        title: '反馈摘要',
        headers: ['用户', '类型', '内容', '状态'],
        rows: [
          ['李同学', '站点', '北门站缺少遮雨设施', '处理中'],
          ['王老师', '支付', '订单重复扣费', '已关闭'],
          ['陈同学', '司机', '晚高峰车辆到站慢', '待处理'],
          ['张同学', '其他', '建议新增临时站点', '已关闭'],
        ],
      },
    },
    {
      id: 'ratings',
      group: '交易与服务',
      label: '司机评价',
      kicker: '服务治理',
      title: '司机评价管理',
      summary: '查看乘客对司机、线路和服务的评价，帮助运营人员监控体验。',
      badge: '评价看板',
      mode: 'table',
      actions: [{ id: 'ratings-review', label: '查看差评' }, { id: 'ratings-export', label: '导出评价' }],
      metrics: [
        { label: '平均评分', value: '4.9', note: '稳定', tone: 'success' },
        { label: '好评数', value: '218', note: '近 30 天', tone: 'primary' },
        { label: '差评数', value: '04', note: '待复核', tone: 'warning' },
        { label: '回复率', value: '96%', note: '已回访', tone: 'accent' },
      ],
      cards: [
        { title: '评分趋势', desc: '可查看按司机和线路统计的评分。', tags: ['评分', '线路', '统计'] },
        { title: '差评回访', desc: '差评可以快速回访和闭环。', tags: ['差评', '回访', '闭环'] },
        { title: '高频表扬', desc: '运营人员可识别服务亮点。', tags: ['表扬', '亮点', '识别'] },
        { title: '反馈联动', desc: '评价可与问题反馈互相关联。', tags: ['联动', '反馈', '处理'] },
      ],
      feed: [
        { time: '10:10', title: '评分更新', text: '刘师傅平均评分保持 4.9。' },
        { time: '13:30', title: '差评回访', text: '1 条低分评价已完成回访。' },
        { time: '17:40', title: '评价归档', text: '今日评价已汇总。' },
      ],
      table: {
        title: '司机评价',
        headers: ['司机', '评分', '评论', '处理'],
        rows: [
          ['刘师傅', '4.9', '准点率高，服务稳', '已回复'],
          ['陈师傅', '5.0', '车内整洁，提醒到位', '已回复'],
          ['王师傅', '4.8', '建议增加语音播报', '处理中'],
          ['赵师傅', '4.9', '高峰期耐心', '已回复'],
        ],
      },
    },
    {
      id: 'ebikes',
      group: '共享电动车',
      label: '共享电动车管理',
      kicker: '共享出行',
      title: '共享电动车管理',
      summary: '统一管理共享电动车车辆、定位、资格和运营状态，方便后台进行资格审核。',
      badge: '共享电动车',
      mode: 'table',
      actions: [{ id: 'ebikes-add', label: '新增车辆' }, { id: 'ebikes-fence', label: '电子围栏' }],
      metrics: [
        { label: '车辆总数', value: '86', note: '已上线 72', tone: 'primary' },
        { label: '可用车辆', value: '54', note: '电量正常', tone: 'success' },
        { label: '待维修', value: '06', note: '已进场', tone: 'warning' },
        { label: '围栏告警', value: '02', note: '已拦截', tone: 'accent' },
      ],
      cards: [
        { title: '车辆分布', desc: '查看校园内共享电动车分布。', tags: ['分布', '定位', '车辆'] },
        { title: '资格联动', desc: '资格审核通过后才可扫码租车。', tags: ['资格', '扫码', '审核'] },
        { title: '围栏管理', desc: '围栏内外的车辆状态可见。', tags: ['围栏', '合规', '区域'] },
        { title: '骑行记录', desc: '骑行轨迹和使用记录可查看。', tags: ['轨迹', '记录', '用车'] },
      ],
      feed: [
        { time: '09:30', title: '车辆上线', text: '12 辆车已完成电量检查。' },
        { time: '13:20', title: '资格通过', text: '8 名用户完成线下实操审核。' },
        { time: '18:55', title: '围栏拦截', text: '2 次违规驶出已拦截。' },
      ],
      table: {
        title: '共享电动车摘要',
        headers: ['车辆', '位置', '电量', '状态'],
        rows: [
          ['EB-018', '北门', '88%', '可用'],
          ['EB-027', '图书馆', '76%', '可用'],
          ['EB-044', '南门', '42%', '待维修'],
          ['EB-061', '南校区', '93%', '可用'],
        ],
      },
    },
    {
      id: 'fences',
      group: '共享电动车',
      label: '电子围栏',
      kicker: '共享出行',
      title: '电子围栏管理',
      summary: '配置共享电动车可骑行区域、禁停区域和告警规则，确保校园管理合规。',
      badge: '围栏规则',
      mode: 'table',
      actions: [{ id: 'fences-add', label: '新增围栏' }, { id: 'fences-switch', label: '切换模式' }],
      metrics: [
        { label: '围栏数', value: '12', note: '启用 10', tone: 'primary' },
        { label: '禁停区', value: '05', note: '已生效', tone: 'warning' },
        { label: '告警次数', value: '02', note: '已处理', tone: 'accent' },
        { label: '合规率', value: '98%', note: '固定演示', tone: 'success' },
      ],
      cards: [
        { title: '区域划分', desc: '教学区、宿舍区和生活区分区管理。', tags: ['区域', '分类', '围栏'] },
        { title: '告警规则', desc: '越界、逆行和禁停统一提醒。', tags: ['告警', '越界', '提醒'] },
        { title: '联动审核', desc: '违规记录进入资格管理。', tags: ['审核', '违规', '联动'] },
        { title: '地图可视化', desc: '围栏在地图中直接展示。', tags: ['地图', '可视化', '规则'] },
      ],
      feed: [
        { time: '10:05', title: '围栏生效', text: '东门禁停区已启用。' },
        { time: '15:35', title: '越界提醒', text: '2 次越界记录已处理。' },
        { time: '20:00', title: '围栏复核', text: '夜间围栏策略检查完成。' },
      ],
      table: {
        title: '围栏摘要',
        headers: ['围栏', '范围', '状态', '告警'],
        rows: [
          ['北门禁停区', '教学区外沿', '启用', '1'],
          ['南门骑行区', '生活区', '启用', '0'],
          ['东门限制区', '东门片区', '启用', '1'],
          ['宿舍区静默区', '南校区', '禁用', '0'],
        ],
      },
    },
    {
      id: 'exams',
      group: '共享电动车',
      label: '线上考试',
      kicker: '共享出行',
      title: '线上考试题库管理',
      summary: '管理共享电动车线上考试题库、通过率和考试记录，为资格审核提供依据。',
      badge: '题库中心',
      mode: 'table',
      actions: [{ id: 'exams-edit', label: '编辑题库' }, { id: 'exams-review', label: '查看记录' }],
      metrics: [
        { label: '题目数', value: '48', note: '覆盖规则', tone: 'primary' },
        { label: '通过率', value: '82%', note: '近 7 天', tone: 'success' },
        { label: '重考', value: '11', note: '待再次学习', tone: 'warning' },
        { label: '考试完成', value: '96', note: '已存档', tone: 'accent' },
      ],
      cards: [
        { title: '题库配置', desc: '题目、答案和解析可在后台管理。', tags: ['题库', '答案', '解析'] },
        { title: '通过统计', desc: '查看在线考试通过趋势。', tags: ['通过', '统计', '趋势'] },
        { title: '补考机制', desc: '未通过用户可再次考试。', tags: ['补考', '资格', '机制'] },
        { title: '记录追踪', desc: '每次考试都有完整记录。', tags: ['记录', '追踪', '归档'] },
      ],
      feed: [
        { time: '09:15', title: '题库更新', text: '新增 6 道交通规范题。' },
        { time: '14:00', title: '考试通过', text: '12 名用户完成线上考试。' },
        { time: '18:40', title: '考试归档', text: '今日考试记录已保存。' },
      ],
      table: {
        title: '考试摘要',
        headers: ['题库', '题数', '通过率', '状态'],
        rows: [
          ['基础规则', '18', '88%', '启用'],
          ['安全骑行', '12', '84%', '启用'],
          ['校园路线', '10', '76%', '启用'],
          ['违规处理', '8', '70%', '草稿'],
        ],
      },
    },
    {
      id: 'practices',
      group: '共享电动车',
      label: '线下实操',
      kicker: '共享出行',
      title: '线下实操审核',
      summary: '跟踪共享电动车线下实操预约、审核和通过结果，确保资格闭环。',
      badge: '实操审核',
      mode: 'table',
      actions: [{ id: 'practices-approve', label: '通过审核' }, { id: 'practices-schedule', label: '排期安排' }],
      metrics: [
        { label: '待实操', value: '18', note: '排队中', tone: 'primary' },
        { label: '已通过', value: '24', note: '当日完成', tone: 'success' },
        { label: '待补充', value: '05', note: '资料不完整', tone: 'warning' },
        { label: '取消', value: '02', note: '用户改期', tone: 'accent' },
      ],
      cards: [
        { title: '预约队列', desc: '查看已预约线下实操的用户。', tags: ['预约', '队列', '审核'] },
        { title: '通过结果', desc: '通过、待补充和取消状态清晰。', tags: ['通过', '补充', '取消'] },
        { title: '排期管理', desc: '可以把实操安排到具体时间段。', tags: ['排期', '时间段', '管理'] },
        { title: '资格回流', desc: '通过结果会同步到资格管理。', tags: ['回流', '资格', '同步'] },
      ],
      feed: [
        { time: '08:10', title: '实操排期完成', text: '上午 10 个名额已排满。' },
        { time: '13:10', title: '实操通过', text: '6 名用户完成线下实操。' },
        { time: '17:10', title: '资料补充', text: '2 名用户待补充身份证明。' },
      ],
      table: {
        title: '实操摘要',
        headers: ['用户', '预约', '状态', '备注'],
        rows: [
          ['李同学', '09:30', '通过', '已完成骑行'],
          ['王同学', '10:00', '待补充', '证件不清晰'],
          ['陈同学', '14:00', '通过', '操作熟练'],
          ['张同学', '15:00', '取消', '改期'],
        ],
      },
    },
    {
      id: 'licenses',
      group: '共享电动车',
      label: '乘车资格',
      kicker: '共享出行',
      title: '共享电动车资格管理',
      summary: '展示考试、实操和资格状态，统一管理共享电动车的可骑行权限。',
      badge: '资格状态',
      mode: 'table',
      actions: [{ id: 'licenses-issue', label: '发放资格' }, { id: 'licenses-freeze', label: '冻结资格' }],
      metrics: [
        { label: '资格通过', value: '128', note: '线上+实操', tone: 'primary' },
        { label: '待审核', value: '12', note: '等待排期', tone: 'warning' },
        { label: '冻结', value: '03', note: '异常处理', tone: 'accent' },
        { label: '失效', value: '07', note: '到期归档', tone: 'success' },
      ],
      cards: [
        { title: '资格总览', desc: '通过、待审、冻结和失效统一管理。', tags: ['资格', '冻结', '失效'] },
        { title: '联动考试', desc: '考试和实操都要通过才可发放资格。', tags: ['考试', '实操', '通过'] },
        { title: '异常冻结', desc: '违规记录可直接冻结资格。', tags: ['异常', '冻结', '违规'] },
        { title: '到期提醒', desc: '到期前可按批次提醒用户。', tags: ['提醒', '到期', '批次'] },
      ],
      feed: [
        { time: '09:05', title: '资格发放', text: '12 名用户通过资格审核。' },
        { time: '13:55', title: '冻结处理', text: '1 名用户因违规被冻结。' },
        { time: '18:15', title: '资格归档', text: '今日资格状态已同步。' },
      ],
      table: {
        title: '资格摘要',
        headers: ['用户', '考试', '实操', '资格', '状态'],
        rows: [
          ['李同学', '通过', '通过', '通过', '正常'],
          ['王同学', '通过', '待审', '待定', '待审核'],
          ['陈同学', '通过', '通过', '冻结', '限制'],
          ['张同学', '通过', '通过', '失效', '已过期'],
        ],
      },
    },
    {
      id: 'statistics',
      group: '基础数据',
      label: '运营统计',
      kicker: '统计中心',
      title: '运营统计',
      summary: '汇总线路、站点、呼叫、退款和共享电动车等核心指标，形成固定演示数据看板。',
      badge: '统计总览',
      mode: 'table',
      actions: [{ id: 'stats-refresh', label: '刷新统计' }, { id: 'stats-export', label: '导出图表' }],
      metrics: [
        { label: '今日总单', value: '124', note: '含乘车和共享电动车', tone: 'primary' },
        { label: '活跃线路', value: '06', note: '全部覆盖', tone: 'success' },
        { label: '高热站点', value: '06', note: '热点已识别', tone: 'warning' },
        { label: '退款率', value: '2.4%', note: '维持低位', tone: 'accent' },
      ],
      cards: [
        { title: '总览指标', desc: '将各模块核心指标汇总到统一面板。', tags: ['总览', '指标', '汇总'] },
        { title: '运营趋势', desc: '观察订单、呼叫和退款的变化。', tags: ['趋势', '订单', '呼叫'] },
        { title: '风险提示', desc: '退款与异常事件在统计中呈现。', tags: ['风险', '异常', '提示'] },
        { title: '共享电动车', desc: '包含资格、考试和骑行数据。', tags: ['共享电动车', '资格', '统计'] },
      ],
      feed: [
        { time: '08:40', title: '指标刷新', text: '全部图表已同步固定数据。' },
        { time: '14:20', title: '趋势稳定', text: '订单与呼叫维持增长。' },
        { time: '19:30', title: '统计归档', text: '今日数据完成归档。' },
      ],
      table: {
        title: '统计摘要',
        headers: ['指标', '今日', '昨日', '变化'],
        rows: [
          ['订单', '124', '116', '+6.9%'],
          ['呼叫', '18', '14', '+28.6%'],
          ['退款', '03', '02', '+50.0%'],
          ['资格', '128', '120', '+6.7%'],
        ],
      },
    },
  ];

  const moduleGroups = [
    { title: '运营中枢', items: ['dashboard', 'dispatch-map', 'heatmap', 'statistics'] },
    { title: '基础数据', items: ['users', 'drivers', 'vehicles', 'routes', 'stations', 'tasks'] },
    { title: '交易与服务', items: ['calls', 'orders', 'refunds', 'coupons', 'benefits', 'feedback', 'ratings'] },
    { title: '共享电动车', items: ['ebikes', 'fences', 'exams', 'practices', 'licenses'] },
  ];

  const moduleMap = Object.fromEntries(moduleDefinitions.map((module) => [module.id, module]));

  window.adminDashboardState = {
    activeModuleId: 'dashboard',
    selectedRouteId: 'route-01',
    selectedHeatPeriodId: 'morning',
    selectedStationId: 'north-gate',
    lastAction: '固定数据演示，可切换模块、线路和热度。',
    searchText: '',
  };

  window.adminDashboardData = {
    campusGeoJson,
    amapCenter,
    stations,
    stationLookup,
    routes,
    routeLookup,
    vehicles,
    vehicleLookup,
    timeSlots,
    heatmapPeriods,
    moduleGroups,
    modules: moduleDefinitions,
    moduleMap,
    dashboard,
    dispatch: {
      routes,
      stations,
      vehicles,
      routeLookup,
      stationLookup,
      vehicleLookup,
    },
    heatmap: {
      timeSlots,
      periods: heatmapPeriods,
      stations,
      stationLookup,
    },
  };
})(window);
