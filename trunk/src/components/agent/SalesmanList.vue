<template>
  <div id="agent-list" class="content">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>代理商管理</el-breadcrumb-item>
        <el-breadcrumb-item>代理商信息</el-breadcrumb-item>
        <el-breadcrumb-item>营销专员列表</el-breadcrumb-item>
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
      <el-table :data="tableData" stripe border style="width: 100%" height="640" v-loading="loading">
        <el-table-column type="expand">
          <template scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="创建时间">{{ props.row.createDate }}</el-form-item>
              <el-form-item label="修改时间"><span>{{ props.row.modifyDate }}</span></el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="realName" label="真实姓名" width="100"></el-table-column>
        <el-table-column prop="phoneNumber" label="电话号码" width="130"></el-table-column>
        <el-table-column prop="shopTypeLabel" label="代理商类型"></el-table-column>
        <el-table-column prop="amount" label="培训费(实付)"></el-table-column>
        <el-table-column prop="brokerageScale" label="推荐佣金比(%)" width="140"></el-table-column>
        <el-table-column prop="deductScale" label="扣点比例(%)"></el-table-column>
        <el-table-column prop="integral" label="赠送积分"></el-table-column>
        <el-table-column prop="superiorAccount" label="推荐人" width="130"></el-table-column>
        <el-table-column label="申请状态">
          <template scope="scope">
            <el-tag :type="scope.row.applyStatus === 1 ? 'success' : 'danger'" close-transition>{{scope.row.applyStatusLabel}}</el-tag>
          </template>
        </el-table-column>
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
      this.getSalesman()
    },
    methods: {
      getSalesman (page = 1) {
        this.$axios.get(SITEURL.SALESMAN_LIST + '?page=' + page).then(response => {
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
          this.getSalesman()
        } else {
          this.$axios.get(SITEURL.AGENT_SEARCH + '?text=' + text + '&status=1&type=0')
            .then(response => {
              this.loading = false
              this.tableData = response.data.data.data
              this.total = response.data.data.total
            }).catch(error => {
              this.loading = false
              console.log(error)
            })
        }
      },
      handleCurrentChange (val) {
        this.currentPage = val
        this.loading = true
        this.getSalesman(val)
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
