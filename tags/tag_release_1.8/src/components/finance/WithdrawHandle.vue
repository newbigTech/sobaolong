<template>
  <div id="withdraw-audit" class="content">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>财务管理</el-breadcrumb-item>
        <el-breadcrumb-item>提现管理</el-breadcrumb-item>
        <el-breadcrumb-item>提现待付</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="search">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="从">
          <el-date-picker v-model="formInline.fromDate" align="right" type="date" placeholder="选择起始日期" :picker-options="pickerOptions"></el-date-picker>
        </el-form-item>
        <el-form-item label="到">
          <el-date-picker v-model="formInline.toDate" align="right" type="date" placeholder="选择结束日期" :picker-options="pickerOptions"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch" icon="search">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="userlist">
      <el-table :data="tableData" stripe border style="width: 100%" :height="$store.state.tableHeight" type="selection" v-loading="loading">
        <el-table-column prop="createDate" label="申请时间" width="180" show-overflow-tooltip></el-table-column>
        <el-table-column prop="spreadCode" label="推广码" width="130"></el-table-column>
        <el-table-column prop="realName" label="真实姓名" width="100"></el-table-column>
        <el-table-column prop="idcardNumber" label="身份证号" width="180"></el-table-column>
        <el-table-column prop="companyName" label="商家名称" ></el-table-column>
        <el-table-column  label="商家" >
           <template scope="scope">
              <i v-if="scope.row.ismerchant===1" class="el-icon-check"></i>
              <i v-if="scope.row.ismerchant===0" class="el-icon-minus"></i>            
            </template>
        </el-table-column>
        <el-table-column prop="ismarketing" label="营销专员">
           <template scope="scope">
              <i v-if="(scope.row.ismarketing===1)||(scope.row.isagent===1)" class="el-icon-check"></i>
              <i v-if="(scope.row.ismarketing===0)&&(scope.row.isagent!==1)" class="el-icon-minus"></i>            
            </template>
        </el-table-column>
        <el-table-column label="代理商">
           <template scope="scope">
              <i v-if="scope.row.isagent===1" class="el-icon-check"></i>
              <i v-if="scope.row.isagent===0" class="el-icon-minus"></i>            
            </template>
        </el-table-column>
        <el-table-column prop="phoneNumber" label="手机号" width="130"></el-table-column>
        <el-table-column prop="amount" label="申请金额"></el-table-column>
        <el-table-column prop="bankName" label="开户行" width="100" show-overflow-tooltip></el-table-column>
        <el-table-column prop="bankCard" label="银行账号" width="200"></el-table-column>
        <el-table-column label="操作" width="170">
          <template scope="scope">
            <el-button size="small" type="success" @click="handlePass(scope.$index, scope.row)" :loading="scope.row.handleLoading">付款完成</el-button>
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
    name: 'user',
    data () {
      return {
        formInline: {
          fromDate: '',
          toDate: '',
          status: ''
        },
        form: {
          id: null,
          memo: ''
        },
        tableData: [],
        paginationState: false,
        currentPage: 1,
        pageSize: 1,
        total: 1,
        dialogFormVisible: false,
        formLabelWidth: '80px',
        tableDataIndex: null,
        loading: true,
        statusOptions: this.$store.state.withdrawStatus,
        value: '',
        pickerOptions: {
          shortcuts: [{
            text: '今天',
            onClick (picker) {
              picker.$emit('pick', new Date())
            }
          }, {
            text: '昨天',
            onClick (picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          }, {
            text: '一周前',
            onClick (picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }]
        }
      }
    },
    created: function () {
      this.getWithdraw()
    },
    methods: {
      getWithdraw (page = 1) {
        this.$axios.get(SITEURL.WITHDRAW_HANDLE_LIST + '?page=' + page).then(response => {
          this.loading = false
          this.tableData = response.data.data.data
          this.currentPage = response.data.data.current_page
          this.pageSize = response.data.data.per_page
          this.total = response.data.data.total
        }).catch(error => {
          console.log(error)
        })
      },
      onSearch (page = 1) {
        this.formInline.fromDate = typeof this.formInline.fromDate === 'undefined' ? '' : this.formInline.fromDate
        this.formInline.toDate = typeof this.formInline.toDate === 'undefined' ? '' : this.formInline.toDate
        this.loading = true
        if (this.formInline.fromDate === '' && this.formInline.toDate === '' && this.formInline.status === '') {
          this.getWithdraw()
        } else {
          this.$axios.get(SITEURL.WITHDRAW_SEARCH_URL + '?fromDate=' + this.formInline.fromDate + '&toDate=' + this.formInline.toDate + '&status=4&page=' + page)
            .then(response => {
              // get body data
              this.loading = false
              this.tableData = response.data.data.data
              this.currentPage = response.data.data.current_page
              this.pageSize = response.data.data.per_page
              this.total = response.data.data.total
            }).catch(error => {
              console.log(error)
            })
        }
        this.paginationState = true
      },
      handlePass (index, row) {
        this.$set(row, 'handleLoading', true)
        this.$axios.post(SITEURL.WITHDRAW_HANDLE + '?id=' + row.id + '&status=3').then(response => {
          this.$set(row, 'handleLoading', false)
          if (response.data.success) {
            this.$message.success('操作成功，' + response.data.message)
            this.tableData.splice(index, 1)
          } else {
            this.$message.error('操作失败，' + response.data.message)
          }
        }).catch(error => {
          this.$set(row, 'handleLoading', false)
          console.log(error)
        })
      },
      handleCurrentChange (val) {
        this.currentPage = val
        this.loading = true
        if (this.paginationState) {
          this.onSearch(val)
        } else {
          this.getWithdraw(val)
        }
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
  .el-icon-check {
    color:#13ce66;
  }
  .el-icon-minus{
    color:#97a8be;
    font-size:16px;
  }
</style>
