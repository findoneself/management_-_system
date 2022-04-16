<template>
  <div
    id="baidu_map"
    style="width:100%;height:100%"
  >
    <baidu-map
      style="width:100%;height:100%"
      :center="center"
      :zoom="map.zoom"
      ak="y5vpGn7gL7QdbNBrc6GEbizGuaQezXiy"
      @ready="handler"
    >
    </baidu-map>
  </div>
</template>
<script>
import BaiduMap from 'vue-baidu-map/components/map/Map'
var BMaps
var maps
export default {
  data () {
    return {
      map: {
        zoom: 15,
        show: true,
        dragging: true
      }
    }
  },
  components: {
    BaiduMap
  },
  props: {
    // 中心坐标
    center: {
      type: Object,
      default () {
        return {}
      }
    },
    // 是否有标记点击事件（扬尘监测首页有）
    isMarkHandle: {
      type: Boolean,
      default: false
    },
    // 标记数据
    coordinateList: {
      type: Array,
      default () {
        return []
      }
    },
    // 标识颜色
    mapColorList: {
      type: Array,
      default () {
        return []
      }
    },
    title: {
      type: String,
      default () {
        return ''
      }
    }
  },
  watch: {
    center: {
      handler () {
        this.flagHandle(BMaps, maps)
      },
      deep: true
    },
    coordinateList: {
      handler () {
      },
      deep: true
    },
    title: {
      handler () {
        this.flagHandle(BMaps, maps)
      },
      deep: true
    }
  },
  mounted () {
    // this.getColor()
  },
  methods: {
    handler ({ BMap, map }) {
      BMaps = BMap
      maps = map
      // 鼠标缩放
      map.enableScrollWheelZoom(true)
      // 点击事件获取经纬度
      map.setMapStyle({ style: 'midnight' })
      //  console.log(map)
      map.clearOverlays()
      this.flagHandle(BMap, map)
    },
    flagHandle (BMap, map) {
      let that = this
      for (var i = 0; i < this.coordinateList.length; i++) {
        let item = this.coordinateList[i]
        var opts = {
          position: new BMap.Point(item.lng, item.lat), // 指定文本标注所在的地理位置
          offset: new BMap.Size(30, -30) // 设置文本偏移量
        }
        if (this.title === 'project') {
          var icon = new BMap.Icon(require('../../assets/img/maker.png'), new BMap.Size(60, 60))
          var marker = new BMap.Marker(new BMap.Point(item.lng, item.lat), { icon: icon })
          marker.addEventListener('click', function () {
            if (that.isMarkHandle) {
              that.$emit('markHandle', item)
            }

          })
          map.addOverlay(marker)
        } else {
          const { value, status } = item
          let color = this.getColor(value, status)
          var labelvValue
          if (status !== '1') {
            labelvValue = '-'
          } else {
            labelvValue = value
          }
          var label = new BMap.Label(labelvValue, opts)
          label.setStyle({
            color: '#fff',
            borderRadius: '5px',
            borderColor: color,
            backgroundColor: color,
            padding: '8px 0',
            fontSize: '16px',
            width: '35px',
            textAlign: 'center',
            fontFamily: '微软雅黑'
          })
          label.addEventListener('click', function () {
            if (that.isMarkHandle) {
              that.$emit('markHandle', item)
            }

          })
          map.addOverlay(label)
        }

      }
    },
    getColor (value, status) {
      let color
      if (!value || !status || status !== '1') {
        color = 'gray'
      } else {
        const isColor = this.mapColorList.find(item => {
          let section = item.section.split('-')
          return parseInt(value) >= parseInt(section[0]) && parseInt(value) <= parseInt(section[1])
        }) || { color: 'gray' }
        color = isColor.color
      }
      return color
    }
  }
}
</script>
