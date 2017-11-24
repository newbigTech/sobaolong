<template>
  <div id="withdraw-audit" class="content">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>财务管理</el-breadcrumb-item>
        <el-breadcrumb-item>后台转账</el-breadcrumb-item>
        <el-breadcrumb-item>转账列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="search">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-row>
          <el-col :span="18">
            <el-form-item label="从">
              <el-date-picker v-model="formInline.fromDate" align="right" type="date" placeholder="选择起始日期" :picker-options="pickerOptions"></el-date-picker>
            </el-form-item>
            <el-form-item label="到">
              <el-date-picker v-model="formInline.toDate" align="right" type="date" placeholder="选择结束日期" :picker-options="pickerOptions"></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSearch" icon="search">查询</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="text-align: right;">
            <el-form-item>
              <el-button type="primary" @click="handleApply" icon="setting">转账申请</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="userlist">
      <el-table :data="tableData" stripe border style="width: 100%" :height="$store.state.tableHeight" type="selection" v-loading="loading">
        <el-table-column prop="createDate" label="申请时间" width="180"></el-table-column>
        <el-table-column prop="companyName" label="商家名称"></el-table-column>
        <el-table-column prop="realName" label="消费者姓名" width="110"></el-table-column>
        <el-table-column prop="phoneNumber" label="消费者手机" width="130"></el-table-column>
        <el-table-column prop="idcardNumber" label="身份证号" width="180"></el-table-column>
        <el-table-column prop="amount" label="转账金额"></el-table-column>
        <el-table-column prop="merchantIntegral" label="商家积分"></el-table-column>
        <el-table-column prop="userIntegral" label="消费者积分"></el-table-column>
        <el-table-column prop="status" label="转账状态">
          <template scope="scope">
            <el-tag :type="scope.row.status === '转账成功' ? 'success' : 'warning'" close-transition>{{scope.row.status}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" :show-overflow-tooltip="true"></el-table-column>
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
          toDate: ''
        },
        form: {
          id: null,
          memo: ''
        },
        tableData: [],
        currentPage: 1,
        pageSize: 1,
        total: 1,
        formLabelWidth: '80px',
        tableDataIndex: null,
        loading: true,
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
      this.getTransferList()
    },
    methods: {
      getTransferList (page = 1) {
        this.$axios.get(SITEURL.OFFLINE_TRANSFER_LIST + '?page=' + page).then(response => {
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
          this.getTransferList()
        } else {
          this.$axios.get(SITEURL.OFFLINE_TRANSFER_SEARCH + '?fromDate=' + this.formInline.fromDate + '&toDate=' + this.formInline.toDate + '&type=list')
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
      handleApply () {
        this.$router.push({ path: '/finance/transfer/apply' })
      },
      handleCurrentChange (val) {
        this.currentPage = val
        this.loading = true
        this.getTransferList(val)
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
