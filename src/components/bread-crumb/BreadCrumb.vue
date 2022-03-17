<template>
  <!-- 面包屑导航 -->
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item> {{ crumb.item1 ? crumb.item1.name : '' }} </el-breadcrumb-item>
    <el-breadcrumb-item>{{ crumb.item2 ? crumb.item2.name : '' }}</el-breadcrumb-item>
    <el-breadcrumb-item v-if="crumb.item3">{{ crumb.item3.name }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'BreadCrumb',
  computed: {
    crumb () {
      return this.$store.state.breadCrumb
    }
  }
}
</script>
