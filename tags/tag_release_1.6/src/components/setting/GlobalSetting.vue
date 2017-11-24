<template>
  <div id="user" class="content">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>平台设置</el-breadcrumb-item>
        <el-breadcrumb-item>全局设置</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="setting" v-loading="loading">
      <el-form ref="form" :model="form" label-width="180px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="支付通道费率">
              <el-input v-model="form.channelRate"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="系统费率">
              <el-input v-model="form.systemRate"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="平台收取费率">
              <el-input v-model="form.platformScale"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="最低入单金额">
              <el-input v-model="form.minOrderAmount"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="用户返现比例">
              <el-input v-model="form.userReturnScale"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商户返现天数">
              <el-input v-model="form.merchantReturnDays"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="用户返现金额比例">
              <el-input v-model="form.userReturnAmount"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="推荐消费者奖励天数">
              <el-input v-model="form.recommendUserDays"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="推荐商户奖励天数">
              <el-input v-model="form.recommendMerchantDays"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="推荐消费者返现比例">
              <el-input v-model="form.recommendUserScale"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="推荐商户返现比例">
              <el-input v-model="form.recommendMerchantScale"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="用户可领取返现时间">
              <el-input v-model="form.addDays" placeholder="生成返现订单后的天数"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>

          <el-col :span="8">
            <el-form-item label="可提现日期">
              <el-input v-model="form.withdrawDate"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="可提现周">
              <el-input v-model="form.withdrawWeeks"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="最低充值金额">
              <el-input v-model="form.minRechargeAmount"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="消费最低提现">
              <el-input v-model="form.minWithdrawUser"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="消费最高提现">
              <el-input v-model="form.maxWithdrawUser"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="消费提现手续费">
              <el-input v-model="form.feeUser"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="商户最低提现">
              <el-input v-model="form.minWithdrawMerchant"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商户最高提现">
              <el-input v-model="form.maxWithdrawMerchant"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商户提现手续费">
              <el-input v-model="form.feeMerchant"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="直接返推荐奖">
              <el-switch on-color="#13ce66" off-color="#f7ba2a" on-text="是" off-text="否" v-model="form.isDirectReturnRecommend"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="允许生成不付费订单">
              <el-switch on-color="#13ce66" off-color="#f7ba2a" on-text="是" off-text="否" v-model="form.isCreateNonPaymentOrder"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="允许同一用户生成订单">
              <el-switch on-color="#13ce66" off-color="#f7ba2a" on-text="是" off-text="否" v-model="form.isCreateAlikeUserOrder"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="开启自动审核订单">
              <el-switch on-color="#13ce66" off-color="#f7ba2a" on-text="是" off-text="否" v-model="form.isAutoAudit"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="开启自动结算订单">
              <el-switch on-color="#13ce66" off-color="#f7ba2a" on-text="是" off-text="否" v-model="form.isAutoClearing"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="9">
            <el-form-item label="提现周期">
              <el-radio-group v-model="form.withdrawRule">
                <el-radio label="按周提现">按周提现</el-radio>
                <el-radio label="按月提现">按月提现</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="按周提现提前几周">
              <el-input-number v-model="form.intervalWeeksNumber" placeholder="按周提现提前几周" size="small" max="0" class="input-num"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="银行列表">
              <el-input v-model="form.bank"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="IP白名单">
          <el-input type="textarea" :rows="5" placeholder="每个IP之间请用逗号分隔" v-model="form.ipWhitelists"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button @click="onCancel">取消</el-button>
          <el-button type="primary" @click="onSubmit">更新</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import * as SITEURL from '@/store/app-urls'
  export default {
    name: 'user',
    data () {
      return {
        form: {},
        loading: false
      }
    },
    created: function () {
      this.form = this.$store.state.customer
      this.form.isDisabled = this.form.isDisabled !== 1
    },
    methods: {
      onSubmit () {
        this.loading = true
        this.$axios.post(SITEURL.MEMBER_EDIT_URL, {id: this.form.id, isDisabled: this.form.isDisabled, password: this.form.password}).then(response => {
          this.loading = false
          this.$message({
            showClose: true,
            type: 'success',
            message: '操作成功，' + response.data.message
          })
          this.$router.go(-1)
        }).catch(error => {
          this.loading = false
          console.log(error)
        })
      },
      onCancel () {
        this.$router.go(-1)
      },
      handleCurrentChange (val) {
        this.currentPage = val
        console.log(`当前页: ${val}`)
      }
    }
  }
</script>

<style scoped>
  .breadcrumb {
    margin: 20px 0 20px 0;
  }
  .setting {
    display: block;
    width: 90%;
    border: 1px solid #eaeefb;
    border-radius: 4px;
    transition: .2s;
    padding: 24px;
  }
</style>
