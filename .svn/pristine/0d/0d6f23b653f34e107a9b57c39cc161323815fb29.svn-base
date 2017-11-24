<template>
    <div id='user' class='content'>
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>信息查询</el-breadcrumb-item>
                <el-breadcrumb-item>客户信息</el-breadcrumb-item>
                <el-breadcrumb-item>推荐明细</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class='search' @keyup.enter="onSearch()">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
               <el-row>
                <el-col :span="24">
                    <el-form-item label="按信息查询">
                        <el-input class="inline-input"  v-model='formInline.searchname' placeholder="会员姓名|手机号|推荐码"></el-input>
                    </el-form-item>
                     <el-form-item>
                       <el-radio class="radio" v-model="radio" label="1">实名</el-radio>
                       <el-radio class="radio" v-model="radio" label="2">全部</el-radio>
                    </el-form-item>
                    <el-form-item label="从">
                        <el-date-picker v-model="formInline.fromDate" align="right" type="date" placeholder="选择起始日期" :picker-options="pickerOptions"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="到">
                        <el-date-picker v-model="formInline.toDate" align="right" type="date" placeholder="选择结束日期" :picker-options="pickerOptions"></el-date-picker>
                    </el-form-item>
                   
                     <!-- <el-form-item label="按会员手机号搜索">
                        <el-input class="inline-input"  v-model='formInline.searchphone' placeholder="请输入会员手机号"></el-input>
                    </el-form-item> 
                     <el-form-item label="按推荐码搜索">
                        <el-input class="inline-input"  v-model='formInline.searchcode' placeholder="请输入推荐码"></el-input>
                    </el-form-item>  -->
                    <el-form-item>
                        <el-button type="primary" @click="onSearch(page=1)" icon="search">查询</el-button>
                    </el-form-item>
                </el-col>
              </el-row>
            </el-form>
        </div>
        <div class="userlist">
            <el-table :data="tableData" stripe border style="width: 100%" :height="$store.state.tableHeight" type="selection" v-loading.body="loading">
                <el-table-column prop="realName" label="下级姓名" width="180"></el-table-column>
                <el-table-column prop="phoneNumber" label="下级手机" width="180"></el-table-column>
                <el-table-column prop="spreadCode"  label="下级推荐码" width="180"></el-table-column>
                <el-table-column prop="user_amount"  label="下级现金余额"></el-table-column>
                <el-table-column prop="user_integral_amount" label="下级积分余额"></el-table-column>
                <el-table-column prop="user_integral_integralOut"  label="下级已返积分"></el-table-column>
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
          searchname: '',
          searchphone: '',
          searchcode: '',
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
        radio: '1',
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
        var isAuthenticated = '&isAuthenticated='
        var code = this.formInline.searchname.trim()
        if (this.radio === '1') {
          this.state = '1'
        } else {
          this.state = ''
          isAuthenticated = ''
        }
        this.loading = true
        if (code) {
          this.$axios.get(SITEURL.VIPRECOMMEND_SEARCH + '?code=' + code + '&first_time=' + this.formInline.fromDate + '&page=' + page + '&limit=15' + '&last_time=' + this.formInline.toDate + isAuthenticated + this.state).then(response => {
            if (response.data.success) {
              this.loading = false
              this.show = true
              this.tableData = response.data.data.data
              this.total = response.data.data.total
              this.pageSize = parseInt(response.data.data.per_page)
            } else {
              this.loading = false
              this.$message.warning(response.data.message)
            }
          }).catch(error => {
            this.loading = false
            console.log(error)
          })
        } else {
          this.loadingsetTimeout()
        }
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        this.currentPage = val
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
    .line{
        text-align: center;
    }
    .inline-input{
        width:170px;
    }
    .block{
        display: inline-block;
        margin-left: 30px;
    }
    .el-table th{
        text-align: center;
    }
    .el-form-item[data-v-3178b675]{
        margin-right: 30px;
    }
</style>
