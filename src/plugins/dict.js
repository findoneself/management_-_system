export default [
  // id name  type（类型）   params（自定义参数，比如颜色等）
  // 行政区域
  { id: 'xz-1', name: '区域1', type: 'xzarea', params: '' },
  { id: 'xz-2', name: '区域2', type: 'xzarea', params: '' },
  { id: 'xz-3', name: '区域3', type: 'xzarea', params: '' },
  { id: 'xz-4', name: '区域4', type: 'xzarea', params: '' },
  // 监测站点
  { id: 'zd-1', name: '站点1', type: 'xzarea', params: '' },
  { id: 'zd-2', name: '站点2', type: 'xzarea', params: '' },
  { id: 'zd-3', name: '站点3', type: 'xzarea', params: '' },
  { id: 'zd-4', name: '站点4', type: 'xzarea', params: '' },
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
  // 监控点位
  { id: 'jkdw', name: '监控点位', type: 'jkdwType', params: '' },
  { id: 'jkhJ', name: '监控环境', type: 'jkdwType', params: '' },
  // 项目报警统计排行
  { id: 'zr', name: '今日', type: 'xmbjDate', params: '' },
  { id: 'jz', name: '昨日', type: 'xmbjDate', params: '' },
  { id: 'bz', name: '本周', type: 'xmbjDate', params: '' }
]