<template>
  <div id="withdraw-audit" class="content">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>商务中心</el-breadcrumb-item>
        <el-breadcrumb-item>消费订单管理</el-breadcrumb-item>
        <el-breadcrumb-item>订单审核</el-breadcrumb-item>
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
          <el-select v-model="formInline.status" placeholder="请选择">
            <el-option v-for="item in statusOptions" :label="item.label" :value="item.value" :key="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch" icon="search">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="userlist">
      <el-table :data="tableData" stripe border style="width: 100%" :height="$store.state.tableHeight" type="selection" v-loading="loading">
        <el-table-column type="expand">
          <template scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="消费者(应返)金额"><span>{{ props.row.userAmount }}</span></el-form-item>
              <el-form-item label="商家(应返)金额"><span>{{ props.row.merchantAmount }}</span></el-form-item>
              <el-form-item label="消费者(已返)现金额"><span>{{ props.row.returnUserAmount }}</span></el-form-item>
              <el-form-item label="商家(已返)现金额"><span>{{ props.row.returnMerchantAmount }}</span></el-form-item>
              <el-form-item label="消费者(已领取)返现金额"><span>{{ props.row.receiveUserAmount }}</span></el-form-item>
              <el-form-item label="商家(已领取)返现金额"><span>{{ props.row.receiveMerchantAmount }}</span></el-form-item>
              <el-form-item label="返现时间"><span>{{ props.row.returnDate }}</span></el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="createDate" label="订单时间" width="120"></el-table-column>
        <el-table-column prop="sn" label="订单号" width="170"></el-table-column>
        <el-table-column prop="amount" label="订单金额"></el-table-column>
        <el-table-column prop="companyName" label="商家名称"></el-table-column>
        <el-table-column prop="phoneNumber" label="商家电话"></el-table-column>
        <el-table-column prop="takeAmount" label="已付平台费用"></el-table-column>
        <el-table-column prop="orderStatusLabel" label="订单状态" width="100"></el-table-column>
        <el-table-column label="操作" width="180">
          <template scope="scope">
            <el-button size="small" type="danger" @click="handleVerify(scope.$index, scope.row)" v-if="scope.row.orderStatus == 4">暂停返现</el-button>
            <el-button size="small" type="success" @click="handleContinue(scope.$index, scope.row)" v-if="scope.row.orderStatus == 3">继续返现</el-button>
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
        fromDate: '',
        endDate: '',
        dialogFormVisible: false,
        form: { cause: '' },
        formLabelWidth: '80px',
        loading: false,
        statusOptions: this.$store.state.merchantOrderStatus,
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
      this.loading = true
      this.getOrders()
    },
    methods: {
      getOrders (page = 1) {
        this.$axios.get(SITEURL.CONSUMPTION_ORDER_URL + '?page=' + page).then(response => {
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
        this.formInline.fromDate = typeof this.formInline.fromDate === 'undefined' ? '' : this.formInline.fromDate
        this.formInline.toDate = typeof this.formInline.toDate === 'undefined' ? '' : this.formInline.toDate
        this.loading = true
        if (this.formInline.fromDate === '' && this.formInline.toDate === '' && this.formInline.status === '') {
          this.getOrders()
        } else {
          this.$axios.get(SITEURL.CONSUMPTION_ORDER_SEARCH_URL + '?fromDate=' + this.formInline.fromDate + '&toDate=' + this.formInline.toDate + '&status=' + this.formInline.status)
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
      handleVerify (index, row) {
        // 3-verify:等待核实
        this.$axios.post(SITEURL.CONSUMPTION_ORDER_STATUS_URL, {id: row.id, status: 3}).then(response => {
          if (response.data.success) {
            this.$message.success('操作成功，' + response.data.message)
            row.orderStatus = 3
            row.orderStatusLabel = '等待核实'
          } else {
            this.$message.error('操作失败，' + response.data.message)
          }
        }).catch(error => {
          console.log(error)
        })
      },
      handleContinue (index, row) {
        // 4-start:返现中
        this.$axios.post(SITEURL.CONSUMPTION_ORDER_STATUS_URL, {id: row.id, status: 4}).then(response => {
          if (response.data.success) {
            this.$message.success('操作成功，' + response.data.message)
            row.orderStatus = 4
            row.orderStatusLabel = '返现中'
          } else {
            this.$message.error('操作失败，' + response.data.message)
          }
        }).catch(error => {
          console.log(error)
        })
      },
      handleCurrentChange (val) {
        this.currentPage = val
        this.loading = true
        this.getOrders(val)
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
</style>
