<template>
  <div class="sidebar">
    <el-menu class="el-menu-vertical" @open="handleOpen" @close="handleClose" theme="dark" :default-openeds="openeds">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-document"></i>客户信息</template>
        <el-menu-item-group>
          <router-link to="/infosearch/list"><el-menu-item index="1-1" v-if="roleCheck('/infosearch/list')">区域会员</el-menu-item></router-link>
          <router-link to="/infosearch/member"><el-menu-item index="1-2" v-if="roleCheck('/infosearch/member')">会员明细</el-menu-item></router-link>
          <router-link to="/infosearch/recommend"><el-menu-item index="1-3" v-if="roleCheck('/infosearch/recommend')">推荐明细</el-menu-item></router-link>
          <router-link to="/infosearch/cash"><el-menu-item index="1-4" v-if="roleCheck('/infosearch/cash')">现金账户</el-menu-item></router-link>
          <router-link to="/infosearch/integral"><el-menu-item index="1-5" v-if="roleCheck('/infosearch/integral')">积分账户</el-menu-item></router-link>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-star-on"></i>经营信息</template>
        <el-menu-item-group>
          <router-link to="/infosearch/areamanagement"><el-menu-item index="2-1" v-if="roleCheck('/infosearch/areamanagement')">区域经营</el-menu-item></router-link>
          <router-link to="/infosearch/recharge"><el-menu-item index="2-2" v-if="roleCheck('/infosearch/recharge')">充值明细</el-menu-item></router-link>
          <router-link to="/infosearch/pay"><el-menu-item index="2-3" v-if="roleCheck('/infosearch/pay')">消费明细</el-menu-item></router-link>
          <router-link to="/infosearch/transfer"><el-menu-item index="2-4" v-if="roleCheck('/infosearch/transfer')">转账明细</el-menu-item></router-link>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="3">
        <template slot="title"><i class="el-icon-menu"></i>财务信息</template>
        <el-menu-item-group>
          <router-link to="/infosearch/totalincome"><el-menu-item index="3-1" v-if="roleCheck('/infosearch/totalincome')">平台收支汇总</el-menu-item></router-link>
          <!-- <router-link to="/infosearch/totalspend"><el-menu-item index="3-2">平台总支出</el-menu-item></router-link> -->
          <router-link to="/infosearch/training"><el-menu-item index="3-2" v-if="roleCheck('/infosearch/training')">培训费收入</el-menu-item></router-link>
          <!-- <router-link to="/infosearch/servicefee"><el-menu-item index="3-4">服务费收入</el-menu-item></router-link>
          <router-link to="/infosearch/bucklepoint"><el-menu-item index="3-5">商家返佣扣点收入</el-menu-item></router-link>
          <router-link to="/infosearch/transfer"><el-menu-item index="3-6">转账收入</el-menu-item></router-link>-->
          <router-link to="/infosearch/deposit"><el-menu-item index="3-3" v-if="roleCheck('/infosearch/deposit')">保证金汇总</el-menu-item></router-link>
          <router-link to="/infosearch/depositinfo"><el-menu-item index="3-4" v-if="roleCheck('/infosearch/depositinfo')">保证金详情</el-menu-item></router-link>
        </el-menu-item-group>
      </el-submenu>

    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'infoserach-sidebar',
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

<style>


</style>
