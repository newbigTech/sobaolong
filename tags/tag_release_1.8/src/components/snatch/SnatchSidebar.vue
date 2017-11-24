<template>
  <div class="sidebar">
    <el-menu class="el-menu-vertical" @open="handleOpen" @close="handleClose" theme="dark" :default-openeds="openeds" :unique-opened="uniqueOpened">

      <el-submenu index="1">
        <template slot="title"><i class="el-icon-star-on"></i>夺宝开奖</template>
        <el-menu-item-group>
          <router-link to="/snatch/goods"><el-menu-item index="1-1" v-if="roleCheck('/snatch/goods')">夺宝商品</el-menu-item></router-link>
          <router-link to="/snatch/goods/finish"><el-menu-item index="1-2" v-if="roleCheck('/snatch/goods')">已开奖</el-menu-item></router-link>
          <router-link to="/snatch/goods/not/finish"><el-menu-item index="1-3" v-if="roleCheck('/snatch/goods')">未完成结束</el-menu-item></router-link>
          <router-link to="/snatch/order"><el-menu-item index="1-4" v-if="roleCheck('/snatch/goods')">夺宝订单</el-menu-item></router-link>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="2">
        <template slot="title"><i class="el-icon-message"></i>夺宝公告</template>
        <el-menu-item-group>
          <router-link to="/snatch/notice/list"><el-menu-item index="2-1" v-if="roleCheck('/snatch/notice')">公告列表</el-menu-item></router-link>
          <router-link to="/snatch/notice/disabled"><el-menu-item index="2-2" v-if="roleCheck('/snatch/notice')">失效公告</el-menu-item></router-link>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="3">
        <template slot="title"><i class="el-icon-setting"></i>夺宝设置</template>
        <el-menu-item-group>
          <router-link to="/snatch/category"><el-menu-item index="3-1" v-if="roleCheck('/snatch/category')">商品分类</el-menu-item></router-link>
        </el-menu-item-group>
      </el-submenu>

    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'merchant-sidebar',
  data () {
    return {
      openeds: ['1', '2', '3'],
      uniqueOpened: false
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    roleCheck (menu) {
      menu = ',' + menu + ','
      if (this.$store.state.role.indexOf('superadmin') > 0) {
        return true
      }
      if (this.$store.state.menus.indexOf(menu) > 0) {
        return true
      }
      return false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .sidebar {
    height: 1000px;
  }
</style>
