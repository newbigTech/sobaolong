<template>
    <div id='user' class='content'>
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>信息查询</el-breadcrumb-item>
                <el-breadcrumb-item>客户信息</el-breadcrumb-item>
                <el-breadcrumb-item>区域会员</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class='search' @keyup.enter="onSearch()">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
               <el-row>
                <el-col :span="24">
                    <el-form-item label="按区域搜索">
                        <el-input class="inline-input"  v-model='formInline.search' placeholder="请输入全国或具体地域"></el-input>
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
            <el-table :data="tableData" stripe border style="width: 100%" :height="$store.state.tableHeight" type="selection" v-loading.body="loading">
                <el-table-column prop="fullName" label="区域" width="180"></el-table-column>
                <el-table-column prop="user_num" label="注册用户总人数" width="180"></el-table-column>
                <el-table-column prop="Authenticated_user_false_num"  label="会员人数（已实名）" width="180"></el-table-column>
                <el-table-column prop="Authenticated_user_ture_num"  label="会员人数（未实名）"></el-table-column>
                <el-table-column prop="commissioner_num" label="专员人数"></el-table-column>
                <el-table-column prop="merchants_num"  label="商户人数"></el-table-column>
                <el-table-column prop="agent_num" label="代理人数"></el-table-column>
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
      onSearch () {
        var text = this.formInline.search.trim()
        // console.log(this.formInline.fromDate)
        let num = ''
        if (!text || text === '全国') {
          num = 1
        }
        this.loading = true
        this.$axios.get(SITEURL.INFOSEARCH_LIST + '?first_time=' + this.formInline.fromDate + '&last_time=' + this.formInline.toDate, {
          params: {
            full_name: text,
            area_type: num
          }
        }).then(response => {
          this.loading = false
          this.tableData = response.data.data
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
    .el-table tr{
       text-align: center;
    }
</style>
