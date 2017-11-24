<template>
    <div class='content'>
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>信息查询</el-breadcrumb-item>
                <el-breadcrumb-item>财务信息</el-breadcrumb-item>
                <el-breadcrumb-item>培训费收入</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class='search' @keyup.enter="onSearch()">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
               <el-row>
                <el-col :span="24">
                    <el-form-item label="按区域搜索">
                        <el-input class="inline-input"  v-model='formInline.searcharea' placeholder="请输入全国或具体区域"></el-input>
                    </el-form-item> 
                    <el-form-item label="按姓名搜索">
                        <el-input class="inline-input"  v-model='formInline.searchname' placeholder="请输入您想查询的姓名"></el-input>
                    </el-form-item> 
                     <el-form-item label="按手机号搜索">
                        <el-input class="inline-input"  v-model='formInline.searchphone' placeholder="请输入手机号"></el-input>
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
                <el-table-column prop="username" label="会员名称"></el-table-column>
                <el-table-column prop='userphoneNumber' label="会员手机号"></el-table-column>              
                <el-table-column prop="remark" label="摘要" width="180"></el-table-column>
                <el-table-column prop="amount"  label="收入金额"></el-table-column>
                <el-table-column prop="PayType"  label="支付方式"></el-table-column>
                <el-table-column prop="userarea" label="区域" width="180"></el-table-column>
                <el-table-column prop="createDate" label="日期"></el-table-column>
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
          searcharea: '',
          searchname: '',
          searchphone: '',
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
        var area = this.formInline.searcharea.trim()
        var name = this.formInline.searchname.trim()
        var phone = this.formInline.searchphone.trim()
        let are = '&area='
        this.loading = true
        let num = ''
        if (!area || area === '全国') {
          num = 1
          are = ''
        }
        this.$axios.get(SITEURL.TRAINING_SEARCH + '?page=' + page + '&limit=15' + '&first_time=' + this.formInline.fromDate + '&last_time=' + this.formInline.toDate + '&name=' + name + '&phone=' + phone + '&type=' + num + are + area).then(response => {
          if (response.data.success) {
            this.loading = false
            this.show = true
            this.tableData = response.data.data.data
            this.total = response.data.data.total
            this.pageSize = parseInt(response.data.data.per_page)
          } else {
            this.$message.warning(response.data.message)
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
    }
    
</style>
