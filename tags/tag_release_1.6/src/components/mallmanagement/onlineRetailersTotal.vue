<template>
<!-- 订单管理 -->
    <div class='content' v-loading="loading2">
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>商城管理</el-breadcrumb-item>
                <el-breadcrumb-item>电商统计</el-breadcrumb-item>
                <el-breadcrumb-item>C2C电商统计</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="getdata" v-if="roleCheck()">
            <el-button type="primary" @click="refresh">搜索同步</el-button>
        </div>
        <div class="statistic">
            <el-form  inline class="demo-table-expand">
                <el-form-item label="商家总数"><span>{{businessTotal}}</span></el-form-item>
                <el-form-item label="已禁用商家数"><span>{{disableBusinessNum}}</span></el-form-item>
                <el-form-item label="上架商家数"><span>{{onBusinessNum}}</span></el-form-item>
            </el-form>
        </div>
        <div class="statistic">
            <el-form inline class="demo-table-expand">
                <el-form-item label="已支付订单总数"><span>{{orderNum}}</span></el-form-item>
                <el-form-item label="已确定订单总数"><span>{{confirmOrderNum}}</span></el-form-item>
                <el-form-item label="在售商品"><span>{{goodNum}}</span></el-form-item>
            </el-form>
        </div>
        <div class="statistic">
            <el-form  inline class="demo-table-expand">
                <el-form-item label="交易额总数"><span>{{tradeTotalMoney}}</span></el-form-item>
                <el-form-item label="已确认订单金额"><span>{{confirmOrderMoney}}</span></el-form-item>
                <el-form-item label="产生消费积分总数"><span>{{integral}}</span></el-form-item>
            </el-form>
        </div>
        
    </div>
</template>

<script>
  import * as SITEURL from '@/store/app-urls'
  export default {
    data () {
      return {
        businessTotal: '',
        disableBusinessNum: '',
        onBusinessNum: '',
        orderNum: '',
        confirmOrderNum: '',
        tradeTotalMoney: '',
        confirmOrderMoney: '',
        integral: '',
        goodNum: '',
        loading2: true
      }
    },
    created: function () {
      this.loading2 = false
      this.getCustomer()
    },
    methods: {
      getCustomer () {
        this.$axios.get(SITEURL.GET__RETAILERS_COUNT).then(response => {
          // console.log('GET__RETAILERS_COUNT==', response.data.data)
          if (response.data.status.succeed === '1') {
            this.businessTotal = response.data.data.businessTotal
            this.disableBusinessNum = response.data.data.disableBusinessNum
            this.onBusinessNum = response.data.data.onBusinessNum
            this.orderNum = response.data.data.orderNum
            this.goodNum = response.data.data.goodNum
            this.confirmOrderNum = response.data.data.confirmOrderNum
            this.tradeTotalMoney = response.data.data.tradeTotalMoney
            this.confirmOrderMoney = response.data.data.confirmOrderMoney
            this.integral = response.data.data.integral
          } else {
            this.$message.error('操作失败，' + response.data.status.errorDesc)
          }
        }).catch(error => {
          console.log(error)
        })
      },
      roleCheck () {
        if (this.$store.state.role.indexOf('superadmin') > 0) {
          return true
        }
        return false
      },
      refresh () {
        this.loading2 = true
        this.$axios.get(SITEURL.REFRESH_MALLDATA).then(response => {
          if (response.data.status.succeed === '1') {
            this.loading2 = false
            this.$message.success('操作成功，搜索同步成功！')
          } else {
            this.$message.error('操作失败，' + response.data.status.errorDesc)
          }
        }).catch(error => {
          console.log(error)
        })
      }
    }
  }
</script>



<style scoped>
    .breadcrumb {
        margin: 20px 0 20px 0;
    }
    .statistic {
        padding-top: 20px;
    }
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 100px;
        color: #99a9bf;
    }
    .statistic {
        padding: 20px;
        background: #f9f9f9;
        margin-bottom: 10px;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 30%;
    }
    .getdata {
        margin-top: 20px;
        margin-bottom:20px;
    }
</style>
