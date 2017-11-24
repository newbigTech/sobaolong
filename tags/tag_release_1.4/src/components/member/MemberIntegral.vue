<template>
  <div id="user" class="content">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>会员管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户信息</el-breadcrumb-item>
        <el-breadcrumb-item>用户积分</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="search" @keyup.enter="onSearch">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="消费者">
          <el-input class="inline-input" v-model="formInline.search" placeholder="昵称|真实姓名|手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch" icon="search">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="userlist">
      <el-table :data="tableData" stripe border style="width: 100%" :height="$store.state.tableHeight" type="selection" v-loading="loading">
        <el-table-column prop="createDate" label="结算时间" width="180"></el-table-column>
        <el-table-column prop="username" label="用户名" width="180"></el-table-column>
        <el-table-column prop="realName" label="真实姓名" width="180"></el-table-column>
        <el-table-column prop="phoneNumber" label="电话号码" width="180"></el-table-column>
        <el-table-column prop="integralIn" label="积分收入"></el-table-column>
        <el-table-column prop="integralOut" label="积分支出"></el-table-column>
        <el-table-column prop="integralTypeLabel" label="积分类型"></el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
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
  import { MEMBER_INFO } from '@/store/mutation-types'
  export default {
    name: 'user',
    data () {
      return {
        formInline: {
          search: ''
        },
        tableData: [],
        currentPage: 1,  // 当前页
        pageSize: 1,  // 每页多少条记录
        total: 1,  // 共多少条记录
        loading: false
      }
    },
    created: function () {
      this.loading = true
      this.getCustomer()
    },
    methods: {
      getCustomer (page = 1) {
        this.$axios.get(SITEURL.MEMBER_INTEGRAL_LIST + '?page=' + page).then(response => {
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
          this.getCustomer()
        } else {
          this.$axios.get(SITEURL.MEMBER_INTEGRAL_SEARCH + '?text=' + text)
            .then(response => {
              // get body data
              this.loading = false
              this.tableData = response.data.data
              this.currentPage = 1
              this.total = response.data.data.length
            }).catch(error => {
              this.loading = false
              console.log(error)
            })
        }
      },
      handleEdit (index, row) {
        this.$store.commit(MEMBER_INFO, row)
        this.$router.push({ path: '/customer/edit' })
      },
      handleDisable (index, row) {
        this.$axios.post(SITEURL.MEMBER_STATUS_URL, {id: row.id, disabled: row.isDisabled}).then(response => {
          if (response.data.success) {
            this.tableData.splice(index, 1)
            this.$message.success('操作成功，' + response.data.message)
          } else {
            this.$message.error('操作失败，' + response.data.message)
          }
        }).catch(error => {
          console.log(error)
        })
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        this.currentPage = val
        this.loading = true
        this.getCustomer(val)
      }
    }
  }
</script>

<style scoped>
  .el-form-item {
    margin-bottom: 0 !important;
  }
  .breadcrumb {
    margin: 20px 0 20px 0;
  }
  .search {
    padding: 20px;
    background: #d3dce6;
  }
  .userlist {
    padding-top: 20px;
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
