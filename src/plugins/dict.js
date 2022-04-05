export default [
  // 字典数据，id name  type（类型）   params（自定义参数，比如颜色等）,parentId（树结构的层级关系）
  // 行政区域
  { id: 'xz-1', name: '区域1', type: 'xzarea', params: '', parentId: '' },
  { id: 'xz-2', name: '区域2', type: 'xzarea', params: '', parentId: '' },
  { id: 'xz-3', name: '区域3', type: 'xzarea', params: '', parentId: '' },
  { id: 'xz-4', name: '区域4', type: 'xzarea', params: '', parentId: '' },
  // 扬尘监测参数类型
  { id: 'kz', name: '控制', type: 'paramsType', params: '', parentId: '' },
  { id: 'wd', name: '温度', type: 'paramsType', params: '', parentId: '' },
  { id: 'sd', name: '湿度', type: 'paramsType', params: '', parentId: '' },
  { id: 'qy', name: '气压', type: 'paramsType', params: '', parentId: '' },
  { id: 'fs', name: '风速', type: 'paramsType', params: '', parentId: '' },
  { id: 'fx', name: '风向', type: 'paramsType', params: '', parentId: '' },
  { id: 'pm2.5', name: 'Pm2.5', type: 'paramsType', params: '', parentId: '' },
  { id: 'pm10', name: 'Pm10', type: 'paramsType', params: '', parentId: '' },
  { id: 'eyht', name: '二氧化氮 ', type: 'paramsType', params: '', parentId: '' },
  { id: 'eyhl', name: '二氧化硫', type: 'paramsType', params: '', parentId: '' },
  { id: 'yyht', name: '一氧化碳', type: 'paramsType', params: '', parentId: '' },
  { id: 'o3', name: 'O3', type: 'paramsType', params: '', parentId: '' },
  { id: 'tvoc', name: 'TVOC', type: 'paramsType', params: '', parentId: '' },
  { id: 'zy', name: '噪音', type: 'paramsType', params: '', parentId: '' },
  { id: 'tsp', name: 'TSP', type: 'paramsType', params: '', parentId: '' },
  { id: 'yy', name: '油烟', type: 'paramsType', params: '', parentId: '' },
  // 项目报警统计排行
  { id: 'jr', name: '今日', type: 'dayDate', params: '', parentId: '' },
  { id: 'zr', name: '昨日', type: 'dayDate', params: '', parentId: '' },
  { id: 'bz', name: '本周', type: 'dayDate', params: '', parentId: '' },
  // 类型
  { id: 'ssj', name: '时数据', type: 'type', params: '', parentId: '' },
  { id: 'tsj', name: '天数据', type: 'type', params: '', parentId: '' },
  { id: 'zsj', name: '周数据', type: 'type', params: '', parentId: '' },
  { id: 'ysj', name: '月数据', type: 'type', params: '', parentId: '' },
  // 报警/异常分类
  { id: 'bj1', name: '反光衣', type: 'alertType', params: '', parentId: '' },
  { id: 'bj2', name: '行人闯入', type: 'alertType', params: '', parentId: '' },
  { id: 'bj3', name: '打电话', type: 'alertType', params: '', parentId: '' },
  { id: 'bj4', name: '抽烟', type: 'alertType', params: '', parentId: '' },
  { id: 'bj5', name: '火焰', type: 'alertType', params: '', parentId: '' },
  { id: 'bj6', name: '安全帽', type: 'alertType', params: '', parentId: '' },
  { id: 'bj7', name: '人员离岗', type: 'alertType', params: '', parentId: '' },
  { id: 'bj8', name: '工作服', type: 'alertType', params: '', parentId: '' },
  // 报警分类
  { id: 'bjfl1', name: '分类1', type: 'warnType', params: '', parentId: '' },
  { id: 'bjfl2', name: '分类2', type: 'warnType', params: '', parentId: '' },
  { id: 'bjfl3', name: '分类3', type: 'warnType', params: '', parentId: '' },
  // 分组名称
  { id: 'bjfz1', name: '分组1', type: 'groupType', params: '', parentId: '' },
  { id: 'bjfz2', name: '分组2', type: 'groupType', params: '', parentId: '' },
  { id: 'bjfz3', name: '分组3', type: 'groupType', params: '', parentId: '' },
  // 整改分类
  { id: 'zgfl1', name: '整改分类1', type: 'modifyType', params: '', parentId: '' },
  { id: 'zgfl2', name: '整改分类2', type: 'modifyType', params: '', parentId: '' },
  { id: 'zgfl3', name: '整改分类3', type: 'modifyType', params: '', parentId: '' }
]