<template>
  <div class="sidebar">
    <el-menu class="el-menu-vertical" @open="handleOpen" @close="handleClose" theme="dark" :default-openeds="openeds" :unique-opened="uniqueOpened">

      <el-submenu index="1">
        <template slot="title"><i class="el-icon-setting"></i>APP设置</template>
        <el-menu-item-group>
          <router-link to="/setting/merchant/category/list"><el-menu-item index="1-1" v-if="roleCheck('/setting/merchant/category/list')">商家分类</el-menu-item></router-link>
          <router-link to="/setting/tag/list"><el-menu-item index="1-2" v-if="roleCheck('/setting/tag/list')">标签管理</el-menu-item></router-link>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="2">
        <template slot="title"><i class="el-icon-star-on"></i>扣点模式</template>
        <el-menu-item-group>
          <router-link to="/setting/scale/list"><el-menu-item index="2-1" v-if="roleCheck('/setting/scale/list')">扣点设置</el-menu-item></router-link>
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
      openeds: ['1', '2'],
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
    height: 900px;
  }
</style>
