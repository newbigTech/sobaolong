<template>
  <div id="withdraw-list" class="content">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>夺宝开奖</el-breadcrumb-item>
        <el-breadcrumb-item>夺宝订单</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="search" @keyup.enter="onSearch">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="订单查询">
          <el-input class="inline-input" v-model="formInline.search" placeholder="商品名称|姓名|手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch" icon="search">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="orderlist">
      <el-table :data="tableData" stripe border style="width: 100%" :height="780" type="selection" v-loading="loading">
        <el-table-column prop="createDate" label="订单时间"></el-table-column>
        <el-table-column prop="goodsName" label="商品名称"></el-table-column>
        <el-table-column prop="realName" label="真实姓名"></el-table-column>
        <el-table-column prop="phoneNumber" label="手机号"></el-table-column>
        <el-table-column prop="amount" label="支付总额"></el-table-column>
        <el-table-column prop="buyCount" label="购买数量"></el-table-column>
        <el-table-column prop="orderStatus" label="订单状态"></el-table-column>
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
  import * as URL from '@/store/app-urls'
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
        total: 1,
        fromDate: '',
        endDate: '',
        dialogFormVisible: false,
        form: { cause: '' },
        formLabelWidth: '80px',
        loading: false,
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
        },
        options: [{
          value: 'waiting',
          label: '待处理'
        }, {
          value: 'handled',
          label: '已处理'
        }],
        value: ''
      }
    },
    created: function () {
      this.loading = true
      this.getOrders()
    },
    methods: {
      getOrders (page = 1) {
        // GET /someUrl
        this.$axios.get(URL.SNATCH_ORDER_LIST + '?page=' + page).then(response => {
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
          this.getOrders()
        } else {
          this.$axios.get(URL.SNATCH_ORDER_SEARCH + '?text=' + text).then(response => {
            // get body data
            this.loading = false
            this.tableData = response.data.data
            this.currentPage = 1
            this.total = response.data.data.length
          }).catch(error => {
            console.log(error)
          })
        }
      },
      handleEdit (index, row) {
      },
      handleDelete (index, row) {
        console.log(index, row)
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
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
  .orderlist {
    padding-top: 20px;
  }

  .inline-input {
    width: 220px;
  }
</style>
