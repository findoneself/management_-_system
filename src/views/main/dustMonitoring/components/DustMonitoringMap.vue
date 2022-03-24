<template>
  <div>
    <BaiduMap
      style="width:100%;height:25rem"
      :center="map.center"
      :zoom="map.zoom"
      @ready="handler"
    >
      <!--缩放-->
      <bm-navigation anchor="BMAP_ANCHOR_TOP_LEFT"></bm-navigation>
      <!--定位-->
      <bm-geolocation
        anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
        :showAddressBar="true"
        :autoLocation="true"
      ></bm-geolocation>
      <!--点-->
      <bm-marker
        :position="map.center"
        :dragging="map.dragging"
        animation="BMAP_ANIMATION_DROP"
      >
        <!--提示信息-->
        <bm-info-window :show="map.show">Hello~</bm-info-window>
      </bm-marker>
    </BaiduMap>
    <!-- <div
      id="page"
      style="width:100%;height:25rem"
    ></div> -->
  </div>
</template>
<script>
var BMap = window.BMap
export default {
  data () {
    return {
      map: {
        center: { lng: 121.4472540000, lat: 31.3236200000 },
        zoom: 15,
        show: true,
        dragging: true
      }
    }
  },
  mounted () {
    // this.getMap()
  },
  methods: {
    getMap () {
      let map = new BMap.Map('page')
      // 创建点坐标

      let point = new BMap.Point(116.404, 39.915)

      // 初始化地图，设置中心点坐标和地图级别
      map.centerAndZoom(point, 15)
      // 创建标注
      // let initMarker = new BMap.Marker(point)
      // 向地图中添加单个覆盖物时会触发此事件
      // map.addOverlay(initMarker)
      // 开启标注拖拽功能
      // initMarker.enableDragging()
      // 将标注点移动到中心位置
      /*
      panBy:将地图在水平位置上移动x像素，垂直位置上移动y像素。
      如果指定像素大于可视区域范围或者在配置这种指定没有动画
      效果，则不执行滑动效果
       */
      map.panBy(350, 225)
      // 添加地图默认控件
      map.addControl(new BMap.NavigationControl())
      // 开启鼠标滚轮缩放
      map.enableScrollWheelZoom(true)
      map.setCurrentCity('北京')
      map.setMapStyle({ style: 'midnight' })
    },
    handler ({ BMap, map }) {
      // let me = this
      console.log(BMap, map)
      // 鼠标缩放
      map.enableScrollWheelZoom(true)
      // 点击事件获取经纬度
      map.addEventListener('click', function (e) {
        console.log(e.point.lng, e.point.lat)
      })
    }
  }

}
</script>