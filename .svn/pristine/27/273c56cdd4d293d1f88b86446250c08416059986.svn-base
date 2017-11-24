<template>
    <div class='content'>
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>信息查询</el-breadcrumb-item>
                <el-breadcrumb-item>经营信息</el-breadcrumb-item>
                <el-breadcrumb-item>e商城收款状态</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class='search' @keyup.enter="onSearch()">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-row>
                    <el-col :span="24">
                        <!--<el-form-item label="订单号查询">
                            <el-input class="inline-input"  v-model='formInline.order' placeholder="请输入订单号"></el-input>
                        </el-form-item>-->

                        <el-row style="margin-top:10px">
                            <el-form-item label="付款/收款账户查询">
                                <el-radio class="radio" v-model="radio1" label="1">付款账户查询</el-radio>
                                <el-radio class="radio" v-model="radio1" label="2">收款账户查询</el-radio>
                            </el-form-item>
                            <el-form-item label="" v-if="radio1==='1'">
                                <el-input class="inline-input"  v-model='formInline.order' placeholder="付款账户/订单号"></el-input>
                            </el-form-item>
                            <el-form-item label="" v-if="radio1==='2'">
                                <el-input class="inline-input"  v-model='formInline.order' placeholder="收款账户/订单号"></el-input>
                            </el-form-item>
                        </el-row>

                        <el-row style="margin-top:10px">
                            <el-form-item label="冻结状态">
                                <el-radio-group v-model="radio2">
                                    <el-radio :label="0">所有</el-radio>
                                    <el-radio :label="1">冻结</el-radio>
                                    <el-radio :label="2">解冻</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="从">
                                <el-date-picker v-model="formInline.fromDate" align="right" type="date" placeholder="选择起始日期" :picker-options="pickerOptions" @change="setStartTime"></el-date-picker>
                            </el-form-item>
                            <el-form-item label="到">
                                <el-date-picker v-model="formInline.toDate" align="right" type="date" placeholder="选择结束日期" :picker-options="pickerOptions" @change="setEndTime"></el-date-picker>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="onSearch" icon="search">查询</el-button>
                            </el-form-item>
                        </el-row>

                        <el-row style="margin-top:10px">

                        </el-row>

                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="userlist">
            <el-table :data="tableData" stripe border style="width: 100%" :height="$store.state.tableHeight" type="selection" v-loading="loading">
                <el-table-column prop='id'  label="订单号"></el-table-column>
                <el-table-column prop='uPhone'  label="付款账户"></el-table-column>
                <el-table-column prop='mPhone' label="收款账户"></el-table-column>
                <el-table-column prop='companyName' label="商户名称"></el-table-column>
                <el-table-column prop='payment' label="订单金额"></el-table-column>
                <el-table-column prop='freight' label="运费"></el-table-column>
                <el-table-column prop='paymentTime' label="支付时间"></el-table-column>
                <el-table-column prop='endTime' label="确认时间"></el-table-column>
                <el-table-column prop='status' label="冻结状态"></el-table-column>
            </el-table>
        </div>
        <div style="text-align: right">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
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
    data () {
      return {
        radio1: '1',
        radio2: 0,
        formInline: {
          order: '',
          fromDate: '',
          toDate: ''

        },
        tableData: [],
        currentPage: 1,  // 当前页
        pageSize: 20,  // 每页多少条记录
        total: 1,  // 共多少条记录
        loading: false,
        pickerOptions: {
        }
      }
    },
    created: function () {
      this.loading = true
      this.loadingsetTimeout()
      this.getCustomer()
    },
    methods: {
      setStartTime (val) {
        this.formInline.fromDate = val
      },
      setEndTime (val) {
        this.formInline.toDate = val
      },
      loadingsetTimeout () {
        setTimeout(() => { this.loading = false }, 800)
      },
      getCustomer (page = 1, any = 1) {
        let url = '?last_time=' + this.formInline.toDate + '&first_time=' + this.formInline.fromDate + '&limit=20' + '&any=' + any + '&code_type=' + this.radio1 + '&text=' + this.formInline.order + '&status=' + this.radio2 + '&page=' + this.currentPage
        this.$axios.get(SITEURL.GET_RECEIPT_STATUS + url).then(response => {
          // console.log('response GET_RECEIPT_STATUS==', response)
          let suceess = response.data.success
          if (suceess) {
            this.loading = false
            this.tableData = response.data.data.data
            this.total = response.data.data.total
          } else {
            this.$message.error('操作失败，' + response.data.status.errorDesc)
          }
        }).catch(error => {
          console.log(error)
        })
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        var any = 1
        if (this.formInline.order.replace(/(^s*)|(s*$)/g, '').length === 0) {
          any = 1
        } else {
          any = ''
        }
        this.currentPage = val
        this.loading = true
        this.getCustomer(this.currentPage, any)
      },
      onSearch () {
        var any = 1
        if (this.formInline.order.replace(/(^s*)|(s*$)/g, '').length === 0) {
          any = 1
        } else {
          any = ''
        }
        console.log('any==', any)
        this.getCustomer(this.currentPage, any)
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
    .content{
        height:851px !important;
    }
</style>
