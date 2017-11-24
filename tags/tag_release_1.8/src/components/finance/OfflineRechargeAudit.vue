<template>
  <div id="withdraw-audit" class="content">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>财务管理</el-breadcrumb-item>
        <el-breadcrumb-item>后台充值</el-breadcrumb-item>
        <el-breadcrumb-item>充值审核</el-breadcrumb-item>
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
        <el-table-column prop="createDate" label="申请时间" width="180"></el-table-column>
        <el-table-column prop="realName" label="用户姓名" width="110"></el-table-column>
        <el-table-column prop="phoneNumber" label="用户手机" width="130"></el-table-column>
        <el-table-column prop="idcardNumber" label="身份证号" width="180"></el-table-column>
        <el-table-column prop="rechargeType" label="充值类型"></el-table-column>
        <el-table-column prop="rechargeExplain" label="充值说明"></el-table-column>
        <el-table-column prop="amount" label="充值数额"></el-table-column>
        <el-table-column prop="remark" label="备注" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="操作" width="170">
          <template scope="scope">
            <el-button size="small" type="success" @click="handlePass(scope.$index, scope.row)" :loading="scope.row.passLoading">通过</el-button>
            <el-button size="small" type="danger" @click="handleRefuse(scope.$index, scope.row)" :loading="scope.row.refuseLoading">驳回</el-button>
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
        tableData: [],
        currentPage: 1,
        pageSize: 1,
        total: 1,
        dialogFormVisible: false,
        formLabelWidth: '80px',
        tableDataIndex: null,
        loading: true,
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
      this.getRechargeAudit()
    },
    methods: {
      getRechargeAudit (page = 1) {
        this.$axios.get(SITEURL.OFFLINE_RECHARGE_AUDIT_LIST + '?page=' + page).then(response => {
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
          this.getRechargeAudit()
        } else {
          this.$axios.get(SITEURL.OFFLINE_RECHARGE_SEARCH + '?fromDate=' + this.formInline.fromDate + '&toDate=' + this.formInline.toDate + '&type=audit')
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
        this.$set(row, 'passLoading', true)
        this.$axios.post(SITEURL.OFFLINE_RECHARGE_AUDIT + '?id=' + row.id + '&audit=1').then(response => {
          this.$set(row, 'passLoading', false)
          if (response.data.success) {
            this.$message.success('操作成功，' + response.data.message)
            this.tableData.splice(index, 1)
          } else {
            this.$set(row, 'passLoading', false)
            this.$message.error('操作失败，' + response.data.message)
          }
        }).catch(error => {
          this.$set(row, 'passLoading', false)
          console.log(error)
        })
      },
      handleRefuse (index, row) {
        this.$set(row, 'refuseLoading', true)
        this.$axios.post(SITEURL.OFFLINE_RECHARGE_AUDIT + '?id=' + row.id + '&audit=0').then(response => {
          this.$set(row, 'refuseLoading', false)
          if (response.data.success) {
            this.$message.success('操作成功，' + response.data.message)
            this.tableData.splice(index, 1)
          } else {
            this.$set(row, 'refuseLoading', false)
            this.$message.error('操作失败，' + response.data.message)
          }
        }).catch(error => {
          this.$set(row, 'refuseLoading', false)
          console.log(error)
        })
      },
      handleCurrentChange (val) {
        this.currentPage = val
        this.loading = true
        this.getRechargeAudit(val)
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
