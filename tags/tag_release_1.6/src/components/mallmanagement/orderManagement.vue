<template>
<!-- 订单管理 -->
    <div class='content'>
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>商城管理</el-breadcrumb-item>
                <el-breadcrumb-item>订单管理</el-breadcrumb-item>
                <el-breadcrumb-item>C2C订单管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class='search' @keyup.enter="onSearch()">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
               <el-row>
                <el-col :span="24">
                    <el-row>
                        <el-form-item label="选择买家或商家">
                            <el-radio class="radio" v-model="radio" label="1">买家</el-radio>
                            <el-radio class="radio" v-model="radio" label="0">商家</el-radio>
                        </el-form-item>
                        <el-form-item label="按买家账号查询" v-if="radio==='1'">
                            <el-input class="inline-input"  v-model='formInline.search' placeholder="买家账号"></el-input>
                        </el-form-item>
                        <el-form-item label="按商家账号查询" v-if="radio==='0'">
                            <el-input class="inline-input"  v-model='formInline.search' placeholder="商家账户"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row style="margin-top:10px">
                        <el-form-item label="选择状态或编号">
                            <el-radio class="radio" v-model="orderRadio" label="1">订单状态</el-radio>
                            <el-radio class="radio" v-model="orderRadio" label="2">订单编号</el-radio>
                        </el-form-item>
                        <el-form-item label="按订单状态查询" v-if="orderRadio==='1'">
                            <el-select v-model="value" placeholder="请选择">
                                <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                        </el-select>
                        </el-form-item>
                        <el-form-item label="按订单编号查询" v-if="orderRadio==='2'">
                            <el-input class="inline-input"  v-model='orderId' placeholder="订单编号"></el-input>
                        </el-form-item>
                    </el-row>
                     
                    <el-row style="margin-top:10px">
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
                </el-col>
              </el-row>
            </el-form>
        </div> 

        <div class="userlist">
         
            <el-table :data='tableData' stripe border style="width: 100%" :height="$store.state.tableHeight" type="selection" v-loading="loading">
                <el-table-column prop="orderDate" label="订单日期" width="180"></el-table-column>
                <el-table-column prop="orderId"  label="编号" width="180"></el-table-column>
                <el-table-column prop="buyer"  label="买家账号" width="180"></el-table-column>
                <el-table-column prop="buyerName"  label="买家名称" width="180"></el-table-column>
                <el-table-column prop="business"  label="商家账号"></el-table-column>
                <el-table-column prop="businessName"  label="商家店铺"></el-table-column>
                <el-table-column prop="money"  label="金额"></el-table-column>
                <el-table-column prop="num"  label="数量"></el-table-column>
                <el-table-column prop="goodName"  label="产品名称"></el-table-column>
                <el-table-column prop="status"  label="状态"></el-table-column>
            </el-table>
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
        </div>       
</template>

<script>
  import * as SITEURL from '@/store/app-urls'
  import {formatDate} from '@/common/date.js'
  export default {
    name: 'user',
    data () {
      return {
        orderRadio: '1',
        orderId: '',
        formInline: {
          search: '',
          fromDate: '',
          toDate: ''
        },
        divstyle: {
          background: 'red',
          width: '100px',
          height: '100px'
        },
        classA: 'classa',
        classB: 'classb',
        tableData: [],
        currentPage: 1,  // 当前页
        pageSize: 20,  // 每页多少条记录
        total: 1,  // 共多少条记录
        loading: false,
        fromDate: '',
        endDate: '',
        radio: '1',
        active: true,
        options: [{
          value: '',
          label: '全部'
        },
        {
          value: 'notpayment',
          label: '待支付'
        }, {
          value: 'readysend',
          label: '待发货'
        }, {
          value: 'readyreceive',
          label: '待收货'
        }, {
          value: 'received',
          label: '已完成'
        }],
        value: '',
        pickerOptions: {
        }
      }
    },
    created: function () {
      this.loading = true
      this.getCustomer()
    },
    methods: {
      setStartTime (val) {
        this.formInline.fromDate = val
      },
      setEndTime (val) {
        this.formInline.toDate = val
      },
      getCustomer (page = 1) {
        let myJson = {
          bisinessOrBuyer: this.radio, // 0:商户，1:买家；默认根据商户查询，即：不传的话，默认为0
          name: this.formInline.search, // 账户
          pageNum: this.currentPage, // 必传
          pageSize: this.pageSize, // 必传
          orderStartDate: this.formInline.fromDate,
          orderEndDate: this.formInline.toDate,
          status: this.value, // 有status这个条件就没有orderId
          orderId: this.orderId
        }
        let json = JSON.stringify(myJson)
        let stringJson = encodeURIComponent(json)
        this.$axios.get(SITEURL.GET_LIST + '?json=' + stringJson).then(response => {
          // console.log('response==', response.data.data)
          let suceess = response.data.status.succeed
          if (suceess === '1') {
            this.loading = false
            this.tableData = response.data.data.list
            for (var i = 0; i < this.tableData.length; i++) {
              var time = new Date(this.tableData[i].orderDate)
              this.tableData[i].orderDate = formatDate(time, 'yyyy-MM-dd hh:mm')
              var status = this.tableData[i].status
              if (status === 'paymented') {
                this.tableData[i].status = '已支付'
              } else if (status === 'notpayment') {
                this.tableData[i].status = '未支付'
              } else if (status === 'sended') {
                this.tableData[i].status = '已发货'
              } else if (status === 'notsend') {
                this.tableData[i].status = '未发货'
              } else if (status === 'readysend') {
                this.tableData[i].status = '待发货'
              } else if (status === 'readyreceive') {
                this.tableData[i].status = '待收货'
              } else if (status === 'received') {
                this.tableData[i].status = '已完成'
              }
            }
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
        this.currentPage = val
        this.loading = true
        this.getCustomer(this.currentPage)
      },
      onSearch () {
        this.getCustomer(this.currentPage)
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
        height:520px;
    }
    .userlist .el-table{
        height:520px !important;
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
        width: 220px;
    }
    .tab{
      width:100px;
      height: 100px;
      background:red;
    }
    .classa{
      background:blue;
    }
</style>
