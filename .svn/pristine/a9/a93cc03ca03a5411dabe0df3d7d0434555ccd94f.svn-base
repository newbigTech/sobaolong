<template>
  <div id="agent-list" class="content">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>代理商管理</el-breadcrumb-item>
        <el-breadcrumb-item>代理商信息</el-breadcrumb-item>
        <el-breadcrumb-item>代理商充值记录</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="search" @keyup.enter="onSearch">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="用户">
          <el-input class="inline-input" v-model="formInline.search" placeholder="真实姓名|手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch" icon="search">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="contentlist">
      <el-table ref="agentTable" :data="tableData" stripe border style="width: 100%" height="640" v-loading="loading">
        <el-table-column prop="createDate" label="充值时间" width="180"></el-table-column>
        <el-table-column prop="realName" label="真实姓名" width="100"></el-table-column>
        <el-table-column prop="phoneNumber" label="电话号码" width="130"></el-table-column>
        <el-table-column prop="shopTypeLabel" label="代理商类型"></el-table-column>
        <el-table-column prop="area" label="代理区域"></el-table-column>
        <el-table-column prop="amount" label="充值金额"></el-table-column>
        <el-table-column prop="integral" label="充值积分"></el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination @current-change="handleCurrentChange"
                     :current-page="currentPage"
                     :page-size="pageSize"
                     layout="total, prev, pager, next"
                     :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import * as SITEURL from '@/store/app-urls'
  export default {
    name: 'agent',
    data () {
      return {
        formInline: {
          search: ''
        },
        tableData: [],
        formLabelWidth: '100px',
        loading: false,
        currentPage: 1,
        pageSize: 1,
        total: 0
      }
    },
    mounted: function () {
      this.loading = true
      this.getAgent()
    },
    methods: {
      getAgent (page = 1) {
        this.$axios.get(SITEURL.AGENT_RECHARGE_LIST + '?page=' + page).then(response => {
          // get body data
          this.loading = false
          this.tableData = response.data.data.data
          this.currentPage = response.data.data.current_page
          this.pageSize = response.data.data.per_page
          this.total = response.data.data.total
        }).catch(error => {
          this.loading = false
          console.log(error)
        })
      },
      onSearch () {
        var text = this.formInline.search.trim()
        this.loading = true
        if (!this.formInline.search) {
          this.getAgent()
        } else {
          this.$axios.get(SITEURL.AGENT_RECHARGE_SEARCH + '?text=' + text)
            .then(response => {
              // get body data
              this.loading = false
              this.tableData = response.data.data
              this.currentPage = 1
              this.total = this.tableData.length
            }).catch(error => {
              this.loading = false
              console.log(error)
            })
        }
      },
      handleCurrentChange (val) {
        this.currentPage = val
        this.loading = true
        this.getAgent(val)
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
  .manager-edit .el-form-item {
    margin: 20px
  }
  .inline-input {
    width: 240px;
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
</style>
