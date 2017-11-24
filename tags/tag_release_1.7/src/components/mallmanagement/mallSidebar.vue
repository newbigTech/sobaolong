<template>
  <div class="sidebar">
    <el-menu class="el-menu-vertical" @open="handleOpen" @close="handleClose" theme="dark" :default-openeds="openeds">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-star-on"></i>电商统计</template>
        <el-menu-item-group>

          <router-link to="/mallmanagement/onlineretailerstotal"><el-menu-item index="1-1" v-if="roleCheck('/mallmanagement/onlineretailerstotal')">C2C电商统计</el-menu-item></router-link>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-menu"></i>商家管理</template>
        <el-menu-item-group>
          <router-link to="/mallmanagement/merchantmanagement"><el-menu-item index="2-1" v-if="roleCheck('/mallmanagement/merchantmanagement')">C2C商家管理</el-menu-item></router-link>
        </el-menu-item-group>
      </el-submenu>
       <el-submenu index="3">
        <template slot="title"><i class="el-icon-document"></i>订单管理</template>
        <el-menu-item-group>
          <router-link to="/mallmanagement/ordermanagement"><el-menu-item index="3-1" v-if="roleCheck('/mallmanagement/ordermanagement')">C2C订单管理</el-menu-item></router-link>

        </el-menu-item-group>
      </el-submenu>

       <el-submenu index="4">
        <template slot="title"><i class="el-icon-setting"></i>商品管理</template>
        <el-menu-item-group>
          <router-link to="/mallmanagement/goodsmanagement"><el-menu-item index="4-1" v-if="roleCheck('/mallmanagement/goodsmanagement')">C2C商品管理</el-menu-item></router-link>
          <!-- <router-link to="/mallmanagement/recommendlist"><el-menu-item index="4-2" v-if="roleCheck('/infosearch/member')">C2C推荐列表</el-menu-item></router-link> -->
          <router-link to="/mallmanagement/goods/class"><el-menu-item index="4-2" v-if="roleCheck('/mallmanagement/goods/class')">C2C商品分类</el-menu-item></router-link>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'mallmanagement-sidebar',
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

<style>
.sidebar{
  height:900px;
}

</style>
