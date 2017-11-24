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
        <el-table-column prop="idcardNumber" label="身份证号"></el-table-column>
        <el-table-column prop="phoneNumber" label="手机号" width="130"></el-table-column>
        <el-table-column prop="amount" label="申请金额"></el-table-column>
        <el-table-column prop="bankName" label="开户行" show-overflow-tooltip></el-table-column>
        <el-table-column prop="bankCard" label="银行账号" width="200"></el-table-column>
        <el-table-column label="操作" width="170">
          <template scope="scope">
            <el-button size="small" type="success" @click="handlePass(scope.$index, scope.row)">付款完成</el-button>
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
    <div class="withdrawDialog">
      <el-dialog title="提现驳回" v-model="dialogFormVisible" size="tiny">
        <el-form :model="form">
          <el-form-item label="驳回原因" :label-width="formLabelWidth">
            <el-input v-model="form.memo" auto-complete="off" placeholder="请填写原因，以便告知用户"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="refuseConfirm">确 定</el-button>
        </div>
      </el-dialog>
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
      onSearch () {
        this.formInline.fromDate = typeof this.formInline.fromDate === 'undefined' ? '' : this.formInline.fromDate
        this.formInline.toDate = typeof this.formInline.toDate === 'undefined' ? '' : this.formInline.toDate
        this.loading = true
        if (this.formInline.fromDate === '' && this.formInline.toDate === '' && this.formInline.status === '') {
          this.getWithdraw()
        } else {
          this.$axios.get(SITEURL.WITHDRAW_SEARCH_URL + '?fromDate=' + this.formInline.fromDate + '&toDate=' + this.formInline.toDate + '&status=0')
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
      },
      handlePass (index, row) {
        this.$axios.post(SITEURL.WITHDRAW_STATUS_URL + '?id=' + row.id + '&status=3').then(response => {
          if (response.data.success) {
            this.$message.success('操作成功，' + response.data.message)
            this.tableData.splice(index, 1)
          } else {
            this.$message.error('操作失败，' + response.data.message)
          }
        }).catch(error => {
          console.log(error)
        })
      },
      refuseConfirm () {
        this.$axios.post(SITEURL.WITHDRAW_STATUS_URL + '?id=' + this.form.id + '&memo=' + this.form.memo + '&status=2').then(response => {
          if (response.data.success) {
            this.$message.success('操作成功，' + response.data.message)
            this.tableData.splice(this.tableDataIndex, 1)
          } else {
            this.$message.error('操作失败，' + response.data.message)
          }
          this.form.memo = ''
          this.form.id = null
          this.dialogFormVisible = false
        }).catch(error => {
          console.log(error)
        })
      },
      handleCurrentChange (val) {
        this.currentPage = val
        this.loading = true
        this.getWithdraw(val)
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
</style>
