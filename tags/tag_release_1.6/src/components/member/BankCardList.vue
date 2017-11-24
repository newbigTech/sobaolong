<template>
  <div id="withdraw-list" class="content">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>消费者管理</el-breadcrumb-item>
        <el-breadcrumb-item>银行卡管理</el-breadcrumb-item>
        <el-breadcrumb-item>银行卡列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="search" @keyup.enter="onSearch">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="银行账号">
          <el-input class="inline-input" v-model="formInline.search" placeholder="户名|手机号|银行账号|身份证号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch" icon="search">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="withdrawlist">
      <el-table :data="tableData" stripe border style="width: 100%" :height="$store.state.tableHeight" type="selection" v-loading="loading">
        <el-table-column prop="realName" label="真实姓名" width="120"></el-table-column>
        <el-table-column prop="userName" label="户名" width="80"></el-table-column>
        <el-table-column prop="bankName" label="银行" width="220"></el-table-column>
        <el-table-column prop="bankDetail" label="开户行"></el-table-column>
        <el-table-column prop="cardNumber" label="银行账号" width="200"></el-table-column>
        <el-table-column prop="idCard" label="身份证号" width="180"></el-table-column>
        <el-table-column prop="phoneNumber" label="手机号" width="170"></el-table-column>
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
      this.getBankInfo()
    },
    methods: {
      getBankInfo (page = 1) {
        // GET /someUrl
        this.$axios.get(URL.MEMBER_BANKCARD_LIST_URL + '?page=' + page).then(response => {
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
          this.getBankInfo()
        } else {
          this.$axios.get(URL.BANKCARD_SEARCH_URL + '?text=' + text).then(response => {
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
        this.getBankInfo(val)
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
  .withdrawlist {
    padding-top: 20px;
  }

  .inline-input {
    width: 220px;
  }
</style>
