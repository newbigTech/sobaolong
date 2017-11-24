<template>
  <div class="sidebar">
    <el-menu class="el-menu-vertical" @open="handleOpen" @close="handleClose" theme="dark" :default-openeds="openeds">

      <el-submenu index="1">
        <template slot="title"><i class="el-icon-picture"></i>广告管理</template>
        <el-menu-item-group>
          <router-link to="/inform/advertise/list"><el-menu-item index="1-1" v-if="roleCheck('/inform/advertise/list')">广告列表</el-menu-item></router-link>
          <router-link to="/inform/advertise/disabled"><el-menu-item index="1-2" v-if="roleCheck('/inform/advertise/disabled')">失效广告</el-menu-item></router-link>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="2">
        <template slot="title"><i class="el-icon-message"></i>公告管理</template>
        <el-menu-item-group>
          <router-link to="/inform/notice/list"><el-menu-item index="2-1" v-if="roleCheck('/inform/notice/list')">公告列表</el-menu-item></router-link>
          <router-link to="/inform/notice/disabled"><el-menu-item index="2-2" v-if="roleCheck('/inform/notice/disabled')">失效公告</el-menu-item></router-link>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="3">
        <template slot="title"><i class="el-icon-share"></i>资讯管理</template>
        <el-menu-item-group>
          <router-link to="/inform/news/list"><el-menu-item index="3-1" v-if="roleCheck('/inform/news/list')">资讯列表</el-menu-item></router-link>
          <router-link to="/inform/news/disabled"><el-menu-item index="3-2" v-if="roleCheck('/inform/news/disabled')">失效资讯</el-menu-item></router-link>
        </el-menu-item-group>
      </el-submenu>

    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'customer-sidebar',
  data () {
    return {
      openeds: ['1', '2', '3']
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

</style>
