<template>
  <div class="sidebar">
    <el-menu class="el-menu-vertical" @open="handleOpen" @close="handleClose" theme="dark" :default-openeds="openeds" :unique-opened="uniqueOpened">

      <el-submenu index="1">
        <template slot="title"><i class="el-icon-star-on"></i>权限管理</template>
        <el-menu-item-group>
          <router-link to="/system/manager"><el-menu-item index="1-1" v-if="roleCheck('/system/manager')">管理员信息</el-menu-item></router-link>
          <router-link to="/system/role"><el-menu-item index="1-2" v-if="roleCheck('/system/role')">角色设置</el-menu-item></router-link>
          <router-link to="/system/permission"><el-menu-item index="1-3" v-if="roleCheck('/system/permission')">权限设置</el-menu-item></router-link>
        </el-menu-item-group>
      </el-submenu>

      <!--<el-submenu index="2">-->
        <!--<template slot="title"><i class="el-icon-document"></i>平台设置</template>-->
        <!--<el-menu-item-group>-->
          <!--<router-link to="/system/global/setting"><el-menu-item index="2-1">全局设置</el-menu-item></router-link>-->
          <!--<router-link to="/system/app/upgrade"><el-menu-item index="2-2">APP升级</el-menu-item></router-link>-->
        <!--</el-menu-item-group>-->
      <!--</el-submenu>-->

    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'merchant-sidebar',
  data () {
    return {
      openeds: ['1'],
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
