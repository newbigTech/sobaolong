<template>
  <div class="sidebar">
    <el-menu class="el-menu-vertical" @open="handleOpen" @close="handleClose" theme="dark" :default-openeds="openeds">

      <el-submenu index="1">
        <template slot="title"><i class="el-icon-star-on"></i>用户信息</template>
        <el-menu-item-group>
          <router-link to="/member/list"><el-menu-item index="1-1" v-if="roleCheck('/member/list')">用户列表</el-menu-item></router-link>
          <router-link to="/member/disabled"><el-menu-item index="1-2" v-if="roleCheck('/member/disabled')">已禁用用户</el-menu-item></router-link>
          <router-link to="/member/superior/non"><el-menu-item index="1-3" v-if="roleCheck('/member/superior/non')">无推荐人用户</el-menu-item></router-link>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="2">
        <template slot="title"><i class="el-icon-caret-bottom"></i>用户积分</template>
        <el-menu-item-group>
          <router-link to="/member/integral"><el-menu-item index="2-1" v-if="roleCheck('/member/integral')">积分列表</el-menu-item></router-link>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="3">
        <template slot="title"><i class="el-icon-menu"></i>银行卡管理</template>
        <el-menu-item-group>
          <router-link to="/member/bankcard/list"><el-menu-item index="3-1" v-if="roleCheck('/member/bankcard/list')">银行卡列表</el-menu-item></router-link>
          <router-link to="/member/bankcard/apply/list"><el-menu-item index="3-2" v-if="roleCheck('/member/bankcard/apply/list')">对公账号申请</el-menu-item></router-link>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="4">
        <template slot="title"><i class="el-icon-edit"></i>学生计划</template>
        <el-menu-item-group>
          <router-link to="/member/student/checking"><el-menu-item index="4-1" v-if="roleCheck('/member/student/checking')">待审核大学生</el-menu-item></router-link>
          <router-link to="/member/student/pass"><el-menu-item index="4-2" v-if="roleCheck('/member/student/pass')">已审核大学生</el-menu-item></router-link>
        </el-menu-item-group>
      </el-submenu>

    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'member-sidebar',
  data () {
    return {
      openeds: ['1', '2', '3', '4']
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
  .sidebar{
    min-height: 900px;
  }
</style>
