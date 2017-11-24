<template>
  <div class="sidebar">
    <el-menu class="el-menu-vertical" @open="handleOpen" @close="handleClose" theme="dark" :default-openeds="openeds">

      <el-submenu index="1">
        <template slot="title"><i class="el-icon-caret-top"></i>代理商信息</template>
        <el-menu-item-group>
          <router-link to="/agent/list"><el-menu-item index="1-1" v-if="roleCheck('/agent/list')">代理商列表</el-menu-item></router-link>
          <router-link to="/agent/handle"><el-menu-item index="1-2" v-if="roleCheck('/agent/handle')">资料处理</el-menu-item></router-link>
          <router-link to="/agent/audit"><el-menu-item index="1-3" v-if="roleCheck('/agent/audit')">资料审核</el-menu-item></router-link>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="2">
        <template slot="title"><i class="el-icon-caret-top"></i>营销专员</template>
        <el-menu-item-group>
          <router-link to="/salesman/list"><el-menu-item index="2-1" v-if="roleCheck('/salesman/list')">营销专员列表</el-menu-item></router-link>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="3">
        <template slot="title"><i class="el-icon-caret-top"></i>代理商修改</template>
        <el-menu-item-group>
          <router-link to="/agent/recharge"><el-menu-item index="3-1" v-if="roleCheck('/agent/recharge')">代理商充值</el-menu-item></router-link>
          <router-link to="/agent/recharge/list"><el-menu-item index="3-2" v-if="roleCheck('/agent/recharge/list')">补充记录</el-menu-item></router-link>
        </el-menu-item-group>
      </el-submenu>

    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'agent-sidebar',
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
