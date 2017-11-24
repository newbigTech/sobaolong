<template>
  <div id="merchantlist" class="content">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>商家管理</el-breadcrumb-item>
        <el-breadcrumb-item>商家充值</el-breadcrumb-item>
        <el-breadcrumb-item>充值记录</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="search" @keyup.enter="onSearch">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="商家搜索">
          <el-input class="inline-input" v-model="formInline.search" placeholder="推广码|手机号|真实姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch" icon="search">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="contentlist">
      <template>
        <el-table :data="tableData" stripe border style="width: 100%" :height="$store.state.tableHeight" :row-class-name="tableRowClassName" v-loading="loading">
          <el-table-column prop="sn" label="支付订单号" width="170"></el-table-column>
          <el-table-column prop="createDate" label="创建时间" width="170"></el-table-column>
          <el-table-column prop="spreadCode" label="推广码"></el-table-column>
          <el-table-column prop="realName" label="真实姓名"></el-table-column>
          <el-table-column prop="phoneNumber" label="电话号码" width="125"></el-table-column>
          <el-table-column prop="amount" label="充值金额"></el-table-column>
          <el-table-column prop="fee" label="手续费"></el-table-column>
          <el-table-column prop="payWayLabel" label="支付方式"></el-table-column>
          <el-table-column prop="payStatusLabel" label="支付状态"></el-table-column>
        </el-table>
      </template>
    </div>
    <div class="pagination">
      <el-pagination @current-change="handleCurrentChange"
       :current-page="currentPage"
       :page-size="pageSize"
       layout="total, prev, pager, next"
       :total="total">
      </el-pagination>
    </div>
    <el-dialog v-model="dialogVisible" size="tiny">
      <img width="100%" height="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
  import * as SITEURL from '@/store/app-urls'
  export default {
    name: 'user',
    data () {
      return {
        formInline: {
          search: ''
        },
        tableData: [],
        currentPage: 1,
        pageSize: 1,
        total: 0,
        loading: false,
        dialogImageUrl: '',
        dialogVisible: false
      }
    },
    created: function () {
      this.loading = true
      this.getRecharge()
    },
    methods: {
      getRecharge (page = 1) {
        // GET /someUrl
        this.$axios.get(SITEURL.MEMBER_RECHARGE_LIST + '?page=' + page).then(response => {
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
        if (!this.formInline.search) {
          this.getRecharge()
        } else {
          this.$axios.get(SITEURL.MEMBER_RECHARGE_SEARCH + '?text=' + text)
            .then(response => {
              // get body data
              this.loading = false
              this.tableData = response.data.data
              this.total = response.data.data.length
              this.currentPage = 1
            }).catch(error => {
              console.log(error)
            })
        }
      },
      handleCurrentChange (val) {
        this.currentPage = val
        this.loading = true
        this.getRecharge(val)
      },
      tableRowClassName (row, index) {
        if (row.payWay === 1) {
          return 'positive-row'
        } else if (row.payWay === 2) {
          return 'info-row'
        }
        return ''
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
  .cover-img {
    padding-top: 8px;
    width: 100px;
    height: 60px;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 100px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 30%;
  }
  .inline-input {
    width: 220px;
  }
</style>

<style>
  .el-table .info-row {
    background: #c9e5f5;
  }
  .el-table .positive-row {
    background: #e2f0e4;
  }
</style>
