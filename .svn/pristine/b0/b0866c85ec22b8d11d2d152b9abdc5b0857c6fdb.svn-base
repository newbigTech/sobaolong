<template>
  <div id="merchant-audit" class="content">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>商家管理</el-breadcrumb-item>
        <el-breadcrumb-item>商家申请</el-breadcrumb-item>
        <el-breadcrumb-item>已审核商家</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="search">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="商家搜索">
          <el-input class="inline-input" v-model="formInline.search" placeholder="手机号|真实姓名|昵称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch" icon="search">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="contentlist">
      <template>
        <el-table :data="tableData" stripe border style="width: 100%" :height="$store.state.tableHeight" type="selection" v-loading="loading">
          <el-table-column prop="createDate" label="申请日期" width="180"></el-table-column>
          <el-table-column prop="username" label="用户昵称"></el-table-column>
          <el-table-column prop="realName" label="真实姓名"></el-table-column>
          <el-table-column prop="contacts" label="联系人"></el-table-column>
          <el-table-column prop="phoneNumber" label="联系方式"></el-table-column>
          <el-table-column prop="UserPhoneNumber" label="注册账号"></el-table-column>
          <el-table-column prop="auditStatusLabel" label="状态"></el-table-column>
        </el-table>
      </template>
    </div>
    <div class="pagination">
      <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import * as SITEURL from '@/store/app-urls'
  import { MERCHANT_APPLY_INFO } from '@/store/mutation-types'
  export default {
    name: 'user',
    data () {
      return {
        formInline: {
          search: ''
        },
        form: {},
        tableData: [],
        currentPage: 1,
        pageSize: 1,
        total: 0,
        loading: false,
        visible2: false
      }
    },
    created: function () {
      this.loading = true
      this.getMerchant()
    },
    methods: {
      getMerchant (page = 1) {
        this.$axios.get(SITEURL.MERCHANT_AUDIT_LIST + '/4?page=' + page).then(response => {
          // get body data
          this.loading = false
          this.tableData = response.data.data.data
          this.currentPage = response.data.data.current_page
          this.pageSize = response.data.data.per_page
          this.total = response.data.data.total
        }).catch(error => {
          console.log(error)
        })
      },
      onSearch () {
        var text = this.formInline.search.trim()
        this.loading = true
        if (this.formInline.search === '') {
          this.getMerchant()
        } else {
          this.$axios.get(SITEURL.MERCHANT_AUDIT_SEARCH + '?status=4&text=' + text).then(response => {
            // get body data
            this.loading = false
            this.tableData = response.data.data
          }).catch(error => {
            console.log(error)
          })
        }
      },
      handleEdit (index, row) {
        this.$store.commit(MERCHANT_APPLY_INFO, row)
        this.$router.push({ path: '/merchant/audit/edit' })
      },
      handleCurrentChange (val) {
        this.currentPage = val
        this.loading = true
        this.getMerchant(val)
      }
    }
  }
</script>

<style scoped>
  .el-form-item {
    margin-bottom: 0 !important;
  }
  .search {
    padding: 20px;
    background: #d3dce6;
  }
  .pagination {
    padding: 10px;
  }
  .inline-input {
    width: 220px;
  }
</style>
