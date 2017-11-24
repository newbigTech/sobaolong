<template>
    <div class='content'>
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>信息查询</el-breadcrumb-item>
                <el-breadcrumb-item>经营信息</el-breadcrumb-item>
                <el-breadcrumb-item>消费明细</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
       <div class='search' @keyup.enter="onSearch()">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
               <el-row>
                <el-col :span="24">
                    <el-form-item label="选择查询">
                      <el-radio class="radio" v-model="radio" label="4">商家所属区域搜索</el-radio>
                      <!-- <el-radio class="radio" v-model="radio" label="">流水号</el-radio> -->
                      <el-radio class="radio" v-model="radio" label="2">收款方</el-radio>
                      <el-radio class="radio" v-model="radio" label="1">付款方</el-radio>
                    </el-form-item>
                    <el-form-item label="">
                       <el-autocomplete class="inline-input" v-if="this.radio==='4'" v-model='formInline.search' placeholder="输入全国或具体地域" :fetch-suggestions="queryAreaSearch"
                           :trigger-on-focus="false" ></el-autocomplete>
                        <el-input class="inline-input"  v-model='formInline.accountNumber' v-if="this.radio==='2'" placeholder="商家名称|流水号"></el-input>
                        <el-input class="inline-input"  v-model='formInline.accountNumber'  v-if="this.radio==='1'" placeholder="付款人姓名|流水号"></el-input>
                    </el-form-item>                                  
                </el-col>
                <el-col style="margin-top:10px;">
                  <el-form-item label="选择类别">
                    <el-radio class="radio" v-model="classRadio" label="1">商圈</el-radio>
                    <el-radio class="radio" v-model="classRadio" label="0">C2C</el-radio>
                  </el-form-item>
                   <el-form-item label="从" class="timeChoose">
                        <el-date-picker v-model="formInline.fromDate" align="right" type="date" placeholder="选择起始日期" :picker-options="pickerOptions"  @change="firstDateChange"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="到">
                        <el-date-picker v-model="formInline.toDate" align="right" type="date" placeholder="选择结束日期" :picker-options="pickerOptions" @change="lastDateChange"></el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSearch()" icon="search">查询</el-button>
                    </el-form-item>
                </el-col>
              </el-row>
            </el-form>
        </div>
        <div class="userlist">
            <el-table :data="tableData"   stripe border style="width: 100%" :height="$store.state.tableHeight" type="selection" v-loading="loading">
                <el-table-column prop="sn" label="业务流水号"></el-table-column>
                <el-table-column prop="user_name" label="付款人"></el-table-column>
                <el-table-column prop="user_phoneNumber" label="付款账号"></el-table-column>
                <el-table-column prop="user_spreadCode" label="推荐码"></el-table-column>
                <el-table-column prop="user_area" label="注册区域"></el-table-column>
                <el-table-column prop="merchant_name" label="收款商家"></el-table-column>
                <el-table-column prop="merchant_phoneNumber" label="商家账号" ></el-table-column>
                <el-table-column prop="deduct_type" label="商家扣点" ></el-table-column>
                <el-table-column prop="merchant_area" label="商家所属区域"></el-table-column>
                <el-table-column prop="amount" label="消费金额"></el-table-column>
                <el-table-column prop="payment_agent" label="付款赠送积分"></el-table-column>
                <el-table-column prop="gathering_agent" label="收款赠送积分"></el-table-column>
                <el-table-column prop="consume_first_trade" label="专员积分（1层）"></el-table-column>
                <el-table-column prop="merchant_first_trade" label="专员积分（2层）"></el-table-column>
                <el-table-column prop="createDate" label="交易时间"></el-table-column>
                <el-table-column prop="PayType" label="交易方式"></el-table-column>
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
          toDate: '',
          accountNumber: ''
        },
        tableData: [],
        currentPage: 1,  // 当前页
        pageSize: 1,  // 每页多少条记录
        total: 1,  // 共多少条记录
        loading: false,
        fromDate: '',
        endDate: '',
        show: false,
        formatFirstTime: '',
        formatLastTime: '',
        radio: '4',
        classRadio: '1',
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
        var codeNumber = this.formInline.accountNumber.trim()
        this.loading = true
        let num = ''
        // var area = '&area='
        if ((!text || text === '全国') && (!codeNumber)) {
          num = 1
        }
        if (this.radio !== '4') {
          text = ''
        } else {
          codeNumber = ''
        }
        this.$axios.get(SITEURL.PAY_SEARCH + '?first_time=' + this.formatFirstTime + '&text=' + codeNumber + '&area=' + text + '&is_from=' + this.classRadio + '&area_type=' + num + '&page=' + page + '&limit=14' + '&last_time=' + this.formatLastTime + '&code_type=' + this.radio).then(response => {
          if (response.data.success) {
            this.loading = false
            this.show = true
            this.tableData = response.data.data.data
            this.total = response.data.data.total
            this.pageSize = parseInt(response.data.data.per_page)
          } else {
            this.loading = false
            this.tableData = []
            this.total = 0
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
      },
      firstDateChange (val) {
        this.formatFirstTime = val
      },
      lastDateChange (val) {
        this.formatLastTime = val
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
        // console.log(item)
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
    .inline-input {
        width: 170px;
        margin-right: 20px;
    }
    .timeChoose {
      margin-left:20px;
    }
    .content{
        height:851px !important;
    }
</style>
