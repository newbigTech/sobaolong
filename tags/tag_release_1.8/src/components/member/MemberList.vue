<template>
  <div id="user" class="content">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>消费者管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户信息</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="search" @keyup.enter="onSearch">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="消费者">
          <el-input class="inline-input" v-model="formInline.search" placeholder="推广码|真实姓名|手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch" icon="search">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="userlist">
      <el-table :data="tableData" stripe border style="width: 100%" :height="$store.state.tableHeight" type="selection" v-loading="loading">
        <el-table-column type="expand">
          <template scope="props">
             <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="用户ID"><span>：{{ props.row.id }}</span></el-form-item>
              <el-form-item label="现金账户余额"><span>：{{ props.row.balance }}</span></el-form-item>
              <el-form-item label="上级推荐账号"><span>：{{ props.row.superiorAccount }}</span></el-form-item>
              <el-form-item label="身份证号"><span>：{{ props.row.idcardNumber }}</span></el-form-item>
              <el-form-item label="积分账户余额"><span>：{{ props.row.integralBalance }}</span></el-form-item>
              <el-form-item label="培训费"><span>：{{ props.row.salesPayAmount }}</span></el-form-item>
              <el-form-item label="性别"><span>：{{ props.row.gender }}</span></el-form-item>
              <el-form-item label="缴纳保证金额"><span>：{{ props.row.agentPayAmount }}</span></el-form-item>
              <el-form-item label="代理区域"><span>：{{ props.row.agentAreaLabel }}</span></el-form-item>
              <el-form-item label="生日">：<span>{{ props.row.birthday }}</span></el-form-item>
              <el-form-item label="已返还保证金额"><span>：{{ props.row.returnAgentIntegral }}</span></el-form-item>
              <el-form-item label="注册区域"><span>：{{ props.row.areaLabel }}</span></el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="createDate" label="注册时间" width="180"></el-table-column>
        <el-table-column prop="spreadCode" label="推广码" width="180"></el-table-column>
        <el-table-column prop="realName" label="真实姓名" width="120"></el-table-column>
        <el-table-column prop="phoneNumber" label="电话号码"></el-table-column>
        <el-table-column prop="isAuthenticated" label="实名认证"></el-table-column>
        <el-table-column prop="userType" label="用户类型"></el-table-column>
        <el-table-column prop="agentTypeLabel" label="代理类型"></el-table-column>
        <el-table-column label="操作" width="240">
          <template scope="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="small" type="info" @click="resetQuestion(scope.$index, scope.row)">重置密保</el-button>
            <el-button size="small" type="warning" @click="handleDisable(scope.$index, scope.row)">禁用</el-button>
          </template>
        </el-table-column>
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
      this.getMember()
    },
    methods: {
      getMember (page = 1) {
        this.$axios.get(SITEURL.MEMBER_LIST_URL + '?page=' + page).then(response => {
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
          this.getMember()
        } else {
          this.$axios.get(SITEURL.MEMBER_SEARCH_URL + '?text=' + text + '&disabled=0')
            .then(response => {
              // get body data
              this.loading = false
              this.tableData = response.data.data
            }).catch(error => {
              this.loading = false
              console.log(error)
            })
        }
      },
      resetQuestion (index, row) {
        this.$confirm('是否重置该用户的密保问题?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post(SITEURL.MEMBER_PROTECT_RESET, {userId: row.id}).then(response => {
            if (response.data.success) {
              this.$message.success('操作成功，' + response.data.message)
            } else {
              this.$message.error('操作失败，' + response.data.message)
            }
          }).catch(error => {
            console.log(error)
          })
        }).catch(() => {
          this.$message({type: 'info', message: '已取消!'})
        })
      },
      handleEdit (index, row) {
        this.$store.commit(MEMBER_INFO, row)
        console.log('index==', index)
        console.log('row==', row)
        this.$router.push({ path: '/member/edit' })
      },
      handleDisable (index, row) {
        this.$axios.post(SITEURL.MEMBER_STATUS_URL, {id: row.id, isDisabled: 1}).then(response => {
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
        this.getMember(val)
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
  .el-form-item .el-form-item__label{
    color: red;
  }
</style>
