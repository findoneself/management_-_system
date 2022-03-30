export default [
  // id name  type（类型）   params（自定义参数，比如颜色等）
  // 行政区域
  { id: 'xz-1', name: '区域1', type: 'xzarea', params: '' },
  { id: 'xz-2', name: '区域2', type: 'xzarea', params: '' },
  { id: 'xz-3', name: '区域3', type: 'xzarea', params: '' },
  { id: 'xz-4', name: '区域4', type: 'xzarea', params: '' },
  // 扬尘监测参数类型
  { id: 'kz', name: '控制', type: 'paramsType', params: '' },
  { id: 'wd', name: '温度', type: 'paramsType', params: '' },
  { id: 'sd', name: '湿度', type: 'paramsType', params: '' },
  { id: 'qy', name: '气压', type: 'paramsType', params: '' },
  { id: 'fs', name: '风速', type: 'paramsType', params: '' },
  { id: 'fx', name: '风向', type: 'paramsType', params: '' },
  { id: 'pm2.5', name: 'Pm2.5', type: 'paramsType', params: '' },
  { id: 'pm10', name: 'Pm10', type: 'paramsType', params: '' },
  { id: 'eyht', name: '二氧化氮 ', type: 'paramsType', params: '' },
  { id: 'eyhl', name: '二氧化硫', type: 'paramsType', params: '' },
  { id: 'yyht', name: '一氧化碳', type: 'paramsType', params: '' },
  { id: 'o3', name: 'O3', type: 'paramsType', params: '' },
  { id: 'tvoc', name: 'TVOC', type: 'paramsType', params: '' },
  { id: 'zy', name: '噪音', type: 'paramsType', params: '' },
  { id: 'tsp', name: 'TSP', type: 'paramsType', params: '' },
  { id: 'yy', name: '油烟', type: 'paramsType', params: '' },
  // 项目报警统计排行
  { id: 'zr', name: '今日', type: 'xmbjDate', params: '' },
  { id: 'jz', name: '昨日', type: 'xmbjDate', params: '' },
  { id: 'bz', name: '本周', type: 'xmbjDate', params: '' },
  // 类型
  { id: 'ssj', name: '时数据', type: 'type', params: '' },
  { id: 'tsj', name: '天数据', type: 'type', params: '' },
  { id: 'zsj', name: '周数据', type: 'type', params: '' },
  { id: 'ysj', name: '月数据', type: 'type', params: '' },
  // 报警/异常分类
  { id: 'bj1', name: '反光衣', type: 'alertType', params: '' },
  { id: 'bj2', name: '行人闯入', type: 'alertType', params: '' },
  { id: 'bj3', name: '打电话', type: 'alertType', params: '' },
  { id: 'bj4', name: '抽烟', type: 'alertType', params: '' },
  { id: 'bj5', name: '火焰', type: 'alertType', params: '' },
  { id: 'bj6', name: '安全帽', type: 'alertType', params: '' },
  { id: 'bj7', name: '人员离岗', type: 'alertType', params: '' },
  { id: 'bj8', name: '工作服', type: 'alertType', params: '' },
  // 报警分类
  { id: 'bjfl1', name: '分类1', type: 'warnType', params: '' },
  { id: 'bjfl2', name: '分类2', type: 'warnType', params: '' },
  { id: 'bjfl3', name: '分类3', type: 'warnType', params: '' },
  // 分组名称
  { id: 'bjfz1', name: '分组1', type: 'groupType', params: '' },
  { id: 'bjfz2', name: '分组2', type: 'groupType', params: '' },
  { id: 'bjfz3', name: '分组3', type: 'groupType', params: '' },
  // 整改分类
  { id: 'zgfl1', name: '整改分类1', type: 'modifyType', params: '' },
  { id: 'zgfl2', name: '整改分类2', type: 'modifyType', params: '' },
  { id: 'zgfl3', name: '整改分类3', type: 'modifyType', params: '' }
]