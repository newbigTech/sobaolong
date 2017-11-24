<template>
  <div class="sidebar">
    <el-menu class="el-menu-vertical" @open="handleOpen" @close="handleClose" theme="dark" :default-openeds="openeds">

      <el-submenu index="1">
        <template slot="title"><i class="el-icon-caret-top"></i>提现管理</template>
        <el-menu-item-group>
          <router-link to="/finance/member/withdraw/list"><el-menu-item index="1-1" v-if="roleCheck('/finance/member/withdraw/list')">提现记录</el-menu-item></router-link>
          <router-link to="/finance/member/withdraw/audit"><el-menu-item index="1-2" v-if="roleCheck('/finance/member/withdraw/audit')">提现待审</el-menu-item></router-link>
          <router-link to="/finance/member/withdraw/handle"><el-menu-item index="1-3" v-if="roleCheck('/finance/member/withdraw/handle')">提现待付</el-menu-item></router-link>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="2">
        <template slot="title"><i class="el-icon-menu"></i>银行卡管理</template>
        <el-menu-item-group>
          <router-link to="/finance/bankcard/list"><el-menu-item index="2-1" v-if="roleCheck('/finance/bankcard/list')">银行卡列表</el-menu-item></router-link>
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

</style>
