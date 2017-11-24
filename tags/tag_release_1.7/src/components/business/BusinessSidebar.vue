<template>
  <div class="sidebar">
    <el-menu class="el-menu-vertical" @open="handleOpen" @close="handleClose" theme="dark" :default-openeds="openeds">

      <el-submenu index="1">
        <template slot="title"><i class="el-icon-menu"></i>商家充值</template>
        <el-menu-item-group>
          <router-link to="/business/recharge/list"><el-menu-item index="1-1" v-if="roleCheck('/business/recharge/list')">充值记录</el-menu-item></router-link>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="2">
        <template slot="title"><i class="el-icon-setting"></i>消费订单管理</template>
        <el-menu-item-group>
          <router-link to="/business/order/list"><el-menu-item index="2-1" v-if="roleCheck('/business/order/list')">订单查询</el-menu-item></router-link>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="3">
        <template slot="title"><i class="el-icon-view"></i>商家支付</template>
        <el-menu-item-group>
          <router-link to="/business/order/pay"><el-menu-item index="3-1" v-if="roleCheck('/business/order/pay')">支付记录</el-menu-item></router-link>
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
