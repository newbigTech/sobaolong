<template>
    <div class='content'>
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>信息查询</el-breadcrumb-item>
                <el-breadcrumb-item>经营信息</el-breadcrumb-item>
                <el-breadcrumb-item>个人转账</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
       <div class='search' @keyup.enter="onSearch()">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
               <el-row>
                <el-col :span="24">
                    <el-form-item label="按区域搜索">
                        <el-input class="inline-input"  v-model='formInline.search' placeholder="输入全国或具体地域"></el-input>
                    </el-form-item> 
                    <el-form-item label="从">
                        <el-date-picker v-model="formInline.fromDate" align="right" type="date" placeholder="选择起始日期" :picker-options="pickerOptions"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="到">
                        <el-date-picker v-model="formInline.toDate" align="right" type="date" placeholder="选择结束日期" :picker-options="pickerOptions"></el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSearch()" icon="search">查询</el-button>
                    </el-form-item>
                </el-col>
              </el-row>
            </el-form>
        </div>
        <div class="userlist">
            <el-table :data="tableData" stripe border style="width: 100%" :height="$store.state.tableHeight" type="selection" v-loading="loading">
                <el-table-column prop="sn" label="业务流水号" width="180"></el-table-column>              
                <el-table-column prop="user_name" label="转出姓名"></el-table-column>
                <el-table-column prop="phoneNumber" label="转出手机号" width="180"></el-table-column>
                <el-table-column prop="user_area" label="转出方注册地址" width="180"></el-table-column>
                <el-table-column prop="receiptUser_name" label="转入姓名"></el-table-column>
                <el-table-column prop="receiptUser_phoneNumber" label="转入手机号" width="180"></el-table-column>
                <el-table-column prop="receiptUser_area" label="转入方注册地址"  width="180"></el-table-column>
                <el-table-column prop="amount" label="转账金额"></el-table-column>
                <el-table-column prop="createDate" label="交易时间" width="168"></el-table-column>
                <el-table-column prop="PayType" label="支付方式" width="170"></el-table-column>
            </el-table>
            <div class="pagination" v-if="show">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="pageSize"
                    layout="total, prev, pager, next"
                    :total="total">
                </el-pagination>
            </div>
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
          search: '',
          fromDate: '',
          toDate: ''
        },
        tableData: [],
        currentPage: 1,  // 当前页
        pageSize: 1,  // 每页多少条记录
        total: 1,  // 共多少条记录
        loading: false,
        fromDate: '',
        endDate: '',
        show: false,
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
      this.loadingsetTimeout()
    },
    methods: {
      loadingsetTimeout () {
        setTimeout(() => { this.loading = false }, 800)
      },
      onSearch (page = 1) {
        var text = this.formInline.search.trim()
        this.loading = true
        let num = ''
        if (!text || text === '全国') {
          num = 1
        }
        this.$axios.get(SITEURL.TRANSFER_SEARCH + '?first_time=' + this.formInline.fromDate + '&area=' + text + '&page=' + page + '&limit=15' + '&last_time=' + this.formInline.toDate + '&area_type=' + num).then(response => {
          if (response.data.success) {
            this.loading = false
            this.show = true
            this.tableData = response.data.data.data
            this.total = response.data.data.total
            this.pageSize = parseInt(response.data.data.per_page)
          }
        }).catch(error => {
          this.loading = false
          console.log(error)
        })
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        this.loading = true
        this.onSearch(val)
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
        width: 170px;
        margin-right: 20px;
    }
    
</style>
