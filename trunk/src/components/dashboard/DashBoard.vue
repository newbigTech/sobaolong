<template>
  <div id="agent-dashboard" class="content" >
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>仪表盘</el-breadcrumb-item>
        <el-breadcrumb-item :to="{name: 'DashBoard'}">统计信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="search">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="从">
          <el-date-picker v-model="formInline.fromDate" align="right" type="date" placeholder="选择起始日期" :picker-options="pickerOptions"></el-date-picker>
        </el-form-item>
        <el-form-item label="到">
          <el-date-picker v-model="formInline.toDate" align="right" type="date" placeholder="选择结束日期" :picker-options="pickerOptions"></el-date-picker>
        </el-form-item>
        <el-form-item label="所属地区">
          <el-autocomplete class="inline-input" v-model="formInline.area" :fetch-suggestions="queryAreaSearch"
                           placeholder="请选择查询区域" :trigger-on-focus="false" @select="handleAreaSelect">
          </el-autocomplete>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"   @click="onSearch" icon="search" :loading="loading" >查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="statistic">
      <el-form label-position="left" inline class="demo-table-expand">
        <el-form-item label="当前现金余额"><span>{{ cashBalance }}</span></el-form-item>
        <el-form-item label="当前积分余额"><span>{{ pointBalance }}</span></el-form-item>
        <el-form-item label="代理已缴保证金额（累计）"><span>{{agent_amount}}</span></el-form-item>
        <el-form-item label="专员已缴保证金（累计）"><span>{{attache_amount}}</span></el-form-item>
      </el-form>
    </div>
    <div class="statistic">
      <el-form label-position="left" inline class="demo-table-expand">
        <el-form-item label="充值笔数"><span>{{ rechargeCount }}</span></el-form-item>
        <el-form-item label="提现笔数"><span>{{ withdrawCount }}</span></el-form-item>
        <el-form-item label="消费笔数"><span>{{ consumeCount }}</span></el-form-item>
        <el-form-item label="转账笔数"><span>{{ transferCount }}</span></el-form-item>
        <el-form-item label="充值金额"><span>{{ rechargeSum }}</span></el-form-item>
        <el-form-item label="提现金额"><span>{{ withdrawSum }}</span></el-form-item>
        <el-form-item label="消费金额"><span>{{ consumeSum }}</span></el-form-item>
        <el-form-item label="转账金额"><span>{{ transferSum }}</span></el-form-item>
      </el-form>
    </div>
    <div class="statistic">
      <el-form label-position="left" inline class="demo-table-expand">
        <el-form-item label="普通会员增长数"><span>{{ memberCount }}</span></el-form-item>
        <el-form-item label="营销专员增长数"><span>{{ salesCount }}</span></el-form-item>
        <el-form-item label="代理增长数"><span>{{ agentCount }}</span></el-form-item>
        <el-form-item label="商户增长数"><span>{{ merchantCount }}</span></el-form-item>
        <el-form-item label="总增长数"><span>{{ totalCount }}</span></el-form-item>
      </el-form>
    </div>
    <el-row>
      <el-col :span="11" class="box-card">
        <el-card class="people-card">
          <div slot="header" class="clearfix">
            <span>会员总数：{{totalMember}}</span>
          </div>
          <div id="member-stat" :style="{width:'100%',height:'300px'}"></div>
        </el-card>
      </el-col>
      <el-col :span="11" class="box-card">
        <el-card class="people-card">
          <div slot="header" class="clearfix">
            <span>商家总数：{{totalMerchant}}</span>
          </div>
          <div id="merchant-stat" :style="{width:'100%',height:'300px'}"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import * as SITEURL from '@/store/app-urls'
  export default {
    name: 'user',
    data () {
      return {
        formInline: {
          fromDate: '',
          toDate: '',
          area: ''
        },
        loading: false,
        rechargeCount: 0,
        rechargeSum: 0,
        withdrawCount: 0,
        withdrawSum: 0,
        consumeCount: 0,
        consumeSum: 0,
        transferCount: 0,
        transferSum: 0,
        memberCount: 0,
        salesCount: 0,
        agentCount: 0,
        merchantCount: 0,
        totalCount: 0,
        totalMember: 0,
        totalMerchant: 0,
        cashBalance: 0,
        pointBalance: 0,
        agent_amount: 0,
        attache_amount: 0,
        areaId: 0,
        userGrow: null,
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
    created () {
      this.getStatistic()
    },
    mounted () {
      this.getMemberStat()
      this.getMerchantStat()
    },
    methods: {
      getStatistic () {
        this.$axios.get(SITEURL.DASHBOARD_STATISTIC).then(response => {
          // get body data
          this.loading = false
          this.rechargeCount = response.data.data.rechargeCount
          this.rechargeSum = response.data.data.rechargeSum
          this.withdrawCount = response.data.data.withdrawCount
          this.withdrawSum = response.data.data.withdrawSum
          this.consumeCount = response.data.data.consumeCount
          this.consumeSum = response.data.data.consumeSum
          this.transferCount = response.data.data.transferCount
          this.transferSum = response.data.data.transferSum
          this.memberCount = response.data.data.memberCount
          this.salesCount = response.data.data.salesCount
          this.agentCount = response.data.data.agentCount
          this.merchantCount = response.data.data.merchantCount
          this.totalCount = response.data.data.totalCount
          this.cashBalance = response.data.data.cashBalance
          this.pointBalance = response.data.data.pointBalance
          this.agent_amount = response.data.data.agent_amount
          this.attache_amount = response.data.data.attache_amount
        }).catch(error => {
          console.log(error)
        })
      },
      getMemberStat () {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('member-stat'))
        // 绘制图表
        myChart.setOption({
          title: {text: '本月会员增长数：'},
          tooltip: {},
          toolbox: {
            feature: { saveAsImage: {} }
          },
          grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
          xAxis: { data: [] },
          yAxis: {},
          series: []
        })
        this.loading = true
        this.$axios.get(SITEURL.DASHBOARD_MEMBER).then(response => {
          this.loading = false
          // console.log('本月会员增长', response)
          var growSum = response.data.data.memberGrow.growSum
          var series = response.data.data.memberGrow.series
          var xAxis = response.data.data.memberGrow.xAxis
          this.totalMember = response.data.data.totalMember
          // 绘制图表
          myChart.setOption({
            title: { text: '本月会员增长数：' + growSum },
            xAxis: { data: xAxis },
            series: series
          })
        }).catch(error => {
          console.log(error)
        })
      },
      getMerchantStat () {
        var myChart = echarts.init(document.getElementById('merchant-stat'))
        // 绘制图表
        myChart.setOption({
          title: { text: '本月商家增长数：' },
          tooltip: {},
          toolbox: {
            feature: { saveAsImage: {} }
          },
          grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
          xAxis: { data: [] },
          yAxis: {},
          series: []
        })
        this.loading = true
        this.$axios.get(SITEURL.DASHBOARD_MERCHANT).then(response => {
          this.loading = false
          var growSum = response.data.data.merchantGrow.growSum
          var series = response.data.data.merchantGrow.series
          var xAxis = response.data.data.merchantGrow.xAxis
          this.totalMerchant = response.data.data.totalMerchant
          // 绘制图表
          myChart.setOption({
            title: { text: '本月商家增长数：' + growSum },
            xAxis: { data: xAxis },
            series: series
          })
        }).catch(error => {
          console.log(error)
        })
      },
      onSearch () {
        this.formInline.fromDate = typeof this.formInline.fromDate === 'undefined' ? '' : this.formInline.fromDate
        this.formInline.toDate = typeof this.formInline.toDate === 'undefined' ? '' : this.formInline.toDate
        // this.areaId = typeof this.areaId === 'undefined' ? 0 : this.areaId
        this.loading = true
        this.$notify.info({title: '消息', message: '正在统计信息，请稍后！'})
        if (!this.formInline.area) {
          this.areaId = 0
        }
        if (this.formInline.fromDate === '' && this.formInline.toDate === '' && this.formInline.adLocation === '') {
          this.getStatistic()
        } else {
          this.$axios.get(SITEURL.DASHBOARD_SEARCH + '?fromDate=' + this.formInline.fromDate + '&toDate=' + this.formInline.toDate + '&areaId=' + this.areaId)
            .then(response => {
              this.loading = false
              this.rechargeCount = response.data.data.rechargeCount
              this.rechargeSum = response.data.data.rechargeSum
              this.withdrawCount = response.data.data.withdrawCount
              this.withdrawSum = response.data.data.withdrawSum
              this.consumeCount = response.data.data.consumeCount
              this.consumeSum = response.data.data.consumeSum
              this.transferCount = response.data.data.transferCount
              this.transferSum = response.data.data.transferSum
              this.memberCount = response.data.data.memberCount
              this.salesCount = response.data.data.salesCount
              this.agentCount = response.data.data.agentCount
              this.merchantCount = response.data.data.merchantCount
              this.totalCount = response.data.data.totalCount
              this.agent_amount = response.data.data.agent_amount
              this.attache_amount = response.data.data.attache_amount
              // this.formInline.area = ''
              // this.formInline.areaId = 0
            }).catch(error => {
              console.log(error)
            })
        }
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
        this.areaId = item.id
      }
    }
  }
</script>

<style scoped>
  .el-form-item {
    margin-bottom: 0 !important;
  }
  .inline-input {
    width: 200px;
  }
  .search {
    padding: 20px;
    background: #d3dce6;
    margin-bottom: 10px;
  }
  .statistic {
    padding: 20px;
    background: #f9f9f9;
    margin-bottom: 10px;
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
    width: 25%;
  }
  .clearfix:before {
    display: table;
    content: "";
  }
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both;
  }

  .box-card {
    margin: 10px 10px 15px 10px;
  }
  .people-card {
    width: 100%;
  }
</style>
