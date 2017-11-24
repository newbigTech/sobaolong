<template>
  <div id="agent-list" class="content">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>代理商管理</el-breadcrumb-item>
        <el-breadcrumb-item>代理商信息</el-breadcrumb-item>
        <el-breadcrumb-item>代理商列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="search" @keyup.enter="onSearch">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="用户">
          <el-input class="inline-input" v-model="formInline.search" placeholder="真实姓名|手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch" icon="search">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="contentlist">
      <el-table ref="agentTable" :data="tableData" stripe border style="width: 100%" height="640" v-loading="loading" @expand="onExpand">
        <el-table-column type="expand">
          <template scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="创建时间"><span>{{ props.row.createDate }}</span></el-form-item>
              <el-form-item label="修改时间"><span>{{ props.row.modifyDate }}</span></el-form-item>
              <el-form-item label="审核时间"><span>{{ props.row.auditTime }}</span></el-form-item>
              <el-form-item label="推荐佣金比(%)"><span>{{ props.row.scale }}</span></el-form-item>
              <el-form-item label="扣点比例(%)"><span>{{ props.row.deduction }}</span></el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="realName" label="真实姓名" width="100"></el-table-column>
        <el-table-column prop="phoneNumber" label="电话号码" width="130"></el-table-column>
        <el-table-column prop="shopTypeLabel" label="代理商类型"></el-table-column>
        <el-table-column prop="area" label="代理区域"></el-table-column>
        <el-table-column prop="amount" label="保证金(实缴)"></el-table-column>
        <el-table-column prop="integral" label="赠送积分"></el-table-column>
        <el-table-column prop="superiorAccount" label="推荐人" width="130"></el-table-column>
        <el-table-column label="申请状态" width="100">
          <template scope="scope">
            <el-tag :type="scope.row.applyStatus === 1 ? 'success' : 'danger'" close-transition>{{scope.row.applyStatusLabel}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template scope="scope">
            <el-button size="small" @click="handleRecharge(scope.$index, scope.row)">充值</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination @current-change="handleCurrentChange"
                     :current-page="currentPage"
                     :page-size="pageSize"
                     layout="total, prev, pager, next"
                     :total="total">
      </el-pagination>
    </div>

    <el-dialog title="代理商充值" v-model="dialogFormVisible" @close="closeRechargeDialog" size="tiny">
      <el-form :model="form" ref="agentForm" :rules="rules" class="agent-edit" v-loading="editLoading">
        <el-form-item label="现金充值" :label-width="formLabelWidth" prop="amount">
          <el-input v-model.number="form.amount" placeholder="输入充值现金金额" class="dialog-input" @change="changeMoney"><template slot="append">{{chineseMoney}}</template></el-input>
        </el-form-item>
        <el-form-item label="积分充值" :label-width="formLabelWidth" prop="integral">
          <el-input v-model.number="form.integral" placeholder="输入充值积分额" class="dialog-input" @change="changePoint"><template slot="append">{{chinesePoint}}</template></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="info" icon="circle-check" @click="rechargeSubmit('agentForm')" style="width: 150px;">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import * as SITEURL from '@/store/app-urls'
  import {smallToBigMoney, smallToBigCredits} from '../../../static/js/currency'
  export default {
    name: 'agent',
    data () {
      return {
        formInline: {
          search: ''
        },
        form: {
          id: null
        },
        tableData: [],
        chineseMoney: '',
        chinesePoint: '',
        formLabelWidth: '80px',
        dialogFormVisible: false,
        editLoading: false,
        loading: false,
        tableDataIndex: 0,
        currentPage: 1,
        pageSize: 1,
        total: 0,
        rules: {
          amount: [
            { type: 'number', required: true, message: '请输入充值现金金额', trigger: 'blur' }
          ],
          integral: [
            { type: 'number', required: true, message: '请输入充值积分额', trigger: 'blur' }
          ]
        }
      }
    },
    mounted: function () {
      this.loading = true
      this.getAgent()
    },
    methods: {
      getAgent (page = 1) {
        this.$axios.get(SITEURL.AGENT_LIST + '?status=1,2&page=' + page).then(response => {
          // get body data
          this.loading = false
          this.tableData = response.data.data.data
          this.currentPage = response.data.data.current_page
          this.pageSize = response.data.data.per_page
          this.total = response.data.data.total
        }).catch(error => {
          this.loading = false
          console.log(error)
        })
      },
      onSearch () {
        var text = this.formInline.search.trim()
        this.loading = true
        if (!this.formInline.search) {
          this.getAgent()
        } else {
          this.$axios.get(SITEURL.AGENT_SEARCH + '?text=' + text + '&type=1,2,3,4')
            .then(response => {
              // get body data
              this.loading = false
              this.tableData = response.data.data
            }).catch(error => {
              this.loading = false
              console.log(error)
            })
        }
      },
      onExpand (row, expanded) {
        if (expanded) {
          this.$axios.get(SITEURL.SETTING_AGENT_SCALE + '?shopType=' + row.shopType)
            .then(response => {
              row.scale = response.data.data.scale * 100
              row.deduction = response.data.data.deduction * 100
            }).catch(error => {
              console.log(error)
            })
        }
      },
      handleRecharge (index, row) {
        this.tableDataIndex = index
        this.form.id = row.id
        this.dialogFormVisible = true
      },
      rechargeSubmit (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.editLoading = true
            this.$axios.post(SITEURL.AGENT_RECHARGE, this.form).then(response => {
              this.editLoading = false
              if (response.data.success) {
                this.$message.success('操作成功，' + response.data.message)
                this.tableData[this.tableDataIndex].amount = response.data.data.amount
                this.tableData[this.tableDataIndex].integral = response.data.data.integral
                this.closeRechargeDialog()
              } else {
                this.$message.error('操作失败，' + response.data.message)
              }
              this.dialogFormVisible = false
            }).catch(error => {
              console.log(error)
            })
          }
        })
      },
      closeRechargeDialog () {
        this.dialogFormVisible = false
        this.form = {
          id: null,
          amount: null,
          integral: null
        }
        this.chineseMoney = ''
        this.chinesePoint = ''
        this.editLoading = false
      },
      changeMoney (value) {
        this.chineseMoney = smallToBigMoney(value)
      },
      changePoint (value) {
        this.chinesePoint = smallToBigCredits(value)
      },
      handleCurrentChange (val) {
        this.currentPage = val
        this.loading = true
        this.getAgent(val)
      }
    }
  }
</script>

<style scoped>
  .el-form-item {
    margin-bottom: 0 !important;
  }
  .search {
    padding: 20px;
    background: #d3dce6;
  }
  .manager-edit .el-form-item {
    margin: 20px
  }
  .inline-input {
    width: 240px;
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
  .agent-edit .el-form-item {
    margin: 20px
  }
  .inline-input {
    width: 240px;
  }
  .dialog-input {
    width: 100%;
  }
</style>
