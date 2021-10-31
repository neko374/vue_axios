<template>
  <el-menu
    :default-active="activemenu"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="iscollapse"
    :unique-opened="true"
    router
  >
    <el-submenu index="/index/welcome">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span slot="title">首页大屏</span>
      </template>
    </el-submenu>
    <el-submenu index="/index/userquery">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span slot="title">商品管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/index/goodsquery">查询</el-menu-item>
        <el-menu-item index="/index/goods">设置</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-user"></i>
        <span slot="title">用户管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/index/userquery">查询</el-menu-item>
        <el-menu-item index="/index/user">设置</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-user"></i>
        <span slot="title">类别管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/index/category">类别列表</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="4">
      <template slot="title">
        <i class="el-icon-user"></i>
        <span slot="title">销售管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/index/saleinfo">销售图表</el-menu-item>
        <el-menu-item index="/index/trendinfo">趋势图</el-menu-item>
        <el-menu-item index="/index/pieinfo">饼图</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      activemenu: "",
    };
  },
  created() {
    this.activemenu = this.$route.path;
  },
  computed: {
    ...mapState(["iscollapse"]),
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>