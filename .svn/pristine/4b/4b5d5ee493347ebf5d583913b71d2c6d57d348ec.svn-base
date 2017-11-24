<template>
    <div class='content'>
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>信息查询</el-breadcrumb-item>
                <el-breadcrumb-item>财务信息</el-breadcrumb-item>
                <el-breadcrumb-item>平台收支汇总</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class='search' @keyup.enter="onSearch()">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
               <el-row>
                <el-col :span="24">
                    <el-form-item label="按区域搜索">
                        <el-input class="inline-input"  v-model='formInline.search' placeholder="请输入全国或具体区域"></el-input>
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
            <el-table :data="tableData"  stripe border style="width: 100%" :height="$store.state.tableHeight" type="selection" v-loading="loading">
                <el-table-column  prop='fullname' label="区域"></el-table-column>
                <el-table-column  prop='incomeSum'  label="收入合计"></el-table-column>  
                <el-table-column  label="收入合计">
                     <el-table-column prop='amountByAttache' label="专员升级培训费"></el-table-column>
                     <el-table-column prop='amountByFee' label="平台现金服务费12%"></el-table-column>
                     <el-table-column prop='amountByMerchantOne' label="商家返佣扣点5%"></el-table-column>
                     <el-table-column prop='amountByMerchantTwo' label="商家返佣扣点10%"></el-table-column>
                     <el-table-column prop='amountByMerchantThree' label="商家返佣扣点15%"></el-table-column>
                     <el-table-column prop='amountByUserTransfer' label="会员转账15%"></el-table-column>
                </el-table-column>              
            </el-table>
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
        type: '',
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
        var area = this.formInline.search.trim()
        this.loading = true
        let num = ''
        if (!area || area === '全国') {
          num = 1
        }
        this.$axios.get(SITEURL.TOTALINCOME_SEARCH + '?type=' + num + '&area=' + area + '&page=' + page + '&limit=15' + '&first_time=' + this.formInline.fromDate + '&last_time=' + this.formInline.toDate).then(response => {
          if (response.data.success) {
            this.loading = false
            this.tableData = response.data.data
          }
        }).catch(error => {
          this.loading = false
          console.log(error)
        })
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
    }
    
</style>
