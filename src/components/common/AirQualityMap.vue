<template>
  <div style="width:100%;height:100%">
    <baidu-map
      style="width:100%;height:100%"
      :center="map.center"
      :zoom="map.zoom"
      @ready="handler"
    >
      <!--缩放-->
      <bm-navigation anchor="BMAP_ANCHOR_TOP_LEFT"></bm-navigation>
      <!--定位-->
    </baidu-map>
  </div>
</template>
<script>

export default {
  data () {
    return {
      map: {
        center: { lng: 116.404, lat: 39.915 },
        zoom: 15,
        show: true,
        dragging: true
      }
    }
  },
  props: {
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
    }
  },
  mounted () {
  },
  methods: {
    handler ({ BMap, map }) {
      let that = this
      console.log(BMap, map)
      console.log(this.isMarkHandle)
      // console.lng(BMap.CanvasLayer)
      // 鼠标缩放
      map.enableScrollWheelZoom(true)
      // 点击事件获取经纬度
      map.addEventListener('click', function (e) {
        if (that.isMarkHandle) {
          that.$emit('markHandle', e)
        }

      })
      map.setMapStyle({ style: 'midnight' })
      this.flagHandle(BMap, map)
    },
    flagHandle (BMap, map) {
      for (var i = 0; i < this.coordinateList.length; i++) {
        let item = this.coordinateList[i]
        var opts = {
          position: new BMap.Point(item.lng, item.lat), // 指定文本标注所在的地理位置
          offset: new BMap.Size(30, -30) // 设置文本偏移量
        }
        var label = new BMap.Label(item['pm2.5'], opts)
        label.setStyle({
          color: '#fff',
          borderRadius: '5px',
          borderColor: item.color,
          backgroundColor: item.color,
          padding: '8px 0',
          fontSize: '16px',
          width: '35px',
          textAlign: 'center',
          fontFamily: '微软雅黑'
        })
        map.addOverlay(label)
      }
    }
  }
}
</script>