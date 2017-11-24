<template>
  <div class="sidebar">
    <el-menu class="el-menu-vertical" @open="handleOpen" @close="handleClose" theme="dark" :default-openeds="openeds">

      <el-submenu index="1">
        <template slot="title"><i class="el-icon-document"></i>商家申请</template>
        <el-menu-item-group>
          <router-link to="/merchant/apply/list"><el-menu-item index="1-1" v-if="roleCheck('/merchant/apply/list')">待完善资料</el-menu-item></router-link>
          <router-link to="/merchant/audit/list"><el-menu-item index="1-2" v-if="roleCheck('/merchant/audit/list')">待审核商家</el-menu-item></router-link>
          <router-link to="/merchant/audit/refused"><el-menu-item index="1-3" v-if="roleCheck('/merchant/audit/refused')">已拒绝商家</el-menu-item></router-link>
          <router-link to="/merchant/audit/pass"><el-menu-item index="1-4" v-if="roleCheck('/merchant/audit/pass')">已完成审核</el-menu-item></router-link>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="2">
        <template slot="title"><i class="el-icon-star-on"></i>商家信息</template>
        <el-menu-item-group>
          <router-link to="/merchant/list"><el-menu-item index="2-1" v-if="roleCheck('/merchant/list')">商家列表</el-menu-item></router-link>
          <router-link to="/merchant/wait/online"><el-menu-item index="2-2" v-if="roleCheck('/merchant/wait/online')">待上线商家</el-menu-item></router-link>
          <router-link to="/merchant/offline"><el-menu-item index="2-3" v-if="roleCheck('/merchant/offline')">已下线商家</el-menu-item></router-link>
          <router-link to="/merchant/disabled"><el-menu-item index="2-4" v-if="roleCheck('/merchant/disabled')">已停用商家</el-menu-item></router-link>
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
      openeds: ['1', '2']
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
   min-height: 910px;
 }
</style>
