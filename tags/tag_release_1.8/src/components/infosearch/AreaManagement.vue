<template>
    <div class='content'>
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>信息查询</el-breadcrumb-item>
                <el-breadcrumb-item>经营信息</el-breadcrumb-item>
                <el-breadcrumb-item>区域经营</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class='search' @keyup.enter="onSearch()">
              <el-form :inline="true" :model="formInline" class="demo-form-inline">
               <el-row>
                <el-col :span="24">
                   <!-- <el-form-item label="按商家所属区域搜索">
                        <el-autocomplete class="inline-input"  v-model='formInline.search' placeholder="输入全国或具体地域" :fetch-suggestions="queryAreaSearch"
                           :trigger-on-focus="false" @select="handleAreaSelect"></el-autocomplete>
                    </el-form-item> -->
                    <el-form-item label="按区域搜索">
                        <el-autocomplete class="inline-input"  v-model='formInline.search' placeholder="输入全国或具体地域" :fetch-suggestions="queryAreaSearch"
                           :trigger-on-focus="false" @select="handleAreaSelect"></el-autocomplete>
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
                <el-table-column prop='fullName'  label="区域"></el-table-column>
                <el-table-column prop='user_num'  label="用户数"></el-table-column>
                <el-table-column prop='user_recharge_num' label="充值数"></el-table-column>
                <el-table-column prop='merchant_order_pay_num' label="消费数"></el-table-column>
                <el-table-column prop='user_transfer_num' label="转账数"></el-table-column>
                <el-table-column  class="cashmoney" prop='user_amount' label="现金账户金额余额">
                </el-table-column>
                <el-table-column  prop='user_integral_amount' label="积分账户金额余额">
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
        this.loading = true
        var text = this.formInline.search.trim()
        let num = ''
        if (!text || text === '全国') {
          num = 1
        }
        this.$axios.get(SITEURL.AREAMANAGE_SEARCH + '?first_time=' + this.formInline.fromDate + '&page=' + page + '&full_name=' + text + '&area_type=' + num + '&last_time=' + this.formInline.toDate).then(response => {
          if (response.data.success) {
            this.loading = false
            this.tableData = response.data.data
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
      },
      queryAreaSearch (queryString, cb) {
        var results = []
        if (/^[\u4e00-\u9fa5]+$/.test(queryString) && queryString.length >= 3) {
          this.$axios.get(SITEURL.AUTOCOMPLETE_AREA + '?text=' + queryString).then(response => {
            results = response.data.data
            // 调用 callback 返回建议列表的数据
            cb(results)
          }).catch(error => {
            console.log(error)
          })
        } else {
          cb(results)
        }
      },
      handleAreaSelect (item) {
        this.formInline.areaId = item.id
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
        margin-right: 20px;
    }
    .block{
        display: inline-block;
        margin-left: 30px;
    }
    .userlist .cashmoney{
      color:red;
    }
</style>
