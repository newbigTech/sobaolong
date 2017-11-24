<template>
  <div id="withdraw-audit" class="content">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>代理商管理</el-breadcrumb-item>
        <el-breadcrumb-item>代理商信息</el-breadcrumb-item>
        <el-breadcrumb-item>代理商审核</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="search">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="待审用户">
          <el-input class="search-input" v-model="formInline.search" placeholder="真实姓名|手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch" icon="search">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="contentlist">
      <el-table :data="tableData" stripe border style="width: 100%" height="640" v-loading="loading">
        <el-table-column prop="createDate" label="申请时间" width="170"></el-table-column>
        <el-table-column prop="realName" label="真实姓名"></el-table-column>
        <el-table-column prop="phoneNumber" label="电话号码" width="180"></el-table-column>
        <el-table-column prop="amount" label="保证金(参考)"></el-table-column>
        <el-table-column prop="shopTypeLabel" label="申请类型"></el-table-column>
        <el-table-column prop="area" label="代理区域"></el-table-column>
        <el-table-column prop="superiorAccount" label="推荐人"></el-table-column>
        <el-table-column label="操作" width="100">
          <template scope="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">审核</el-button>
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

    <el-dialog title="代理商审核" v-model="dialogFormVisible" @close="closeEditDialog" size="tiny">
      <el-form :model="form" ref="agentForm" :rules="rules" class="agent-edit" v-loading="editLoading">
        <el-form-item label="代理商类型" :label-width="formLabelWidth">
          <el-select v-model="form.shopType" placeholder="请选择" class="inline-input" @change="changeShopType">
            <el-option v-for="item in shopTypeOptions" :label="item.label" :value="item.value" :key="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="代理区域" :label-width="formLabelWidth" :required="true">
          <el-autocomplete class="inline-input" v-model="form.area" :fetch-suggestions="areaSearch"
                           placeholder="请输入并选择代理商所属区域" :trigger-on-focus="false" @select="handleAreaSelect" :disabled="disAreaInput">
          </el-autocomplete>
        </el-form-item>
        <el-form-item label="保证金(实缴)" :label-width="formLabelWidth" prop="amount">
          <el-input v-model.number="form.amount" placeholder="设定保证金额" class="inline-input" @change="changeMoney"><template slot="append">{{chineseMoney}}</template></el-input>
        </el-form-item>
        <el-form-item label="赠送积分" :label-width="formLabelWidth" prop="integral">
          <el-input v-model.number="form.integral" placeholder="设定赠送积分" class="inline-input" @change="changePoint"><template slot="append">{{chinesePoint}}</template></el-input>
        </el-form-item>
        <!--<el-form-item label="推荐佣金比(%)" :label-width="formLabelWidth" prop="brokerageScale">-->
          <!--<el-input-number v-model.number="form.brokerageScale" placeholder="设定推荐佣金比" :controls="false" :min="1" :max="50" class="inline-input" :disabled="true"></el-input-number>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="扣点比例(%)" :label-width="formLabelWidth" prop="deductScale">-->
          <!--<el-input-number v-model.number="form.deductScale" placeholder="设定扣点比例" :controls="false" :min="1" :max="50" class="inline-input" :disabled="true"></el-input-number>-->
        <!--</el-form-item>-->
        <el-form-item label="推荐人信息" :label-width="formLabelWidth">
          <el-input v-model="form.superiorAccount" :disabled="true"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="danger" icon="circle-check" @click="onRefuse('agentForm')" style="width: 140px;">驳 回</el-button>
        <el-button type="info" icon="circle-check" @click="onPass('agentForm')" style="width: 140px;">通 过</el-button>
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
          fromDate: '',
          toDate: ''
        },
        form: {
          id: '',
          area: '',
          areaId: null,
          shopType: 0
        },
        roleForm: {
        },
        userId: '',
        tableData: [],
        shopTypeOptions: this.$store.state.shopTypes,
        formLabelWidth: '120px',
        dialogFormVisible: false,
        tableDataIndex: 0,
        loading: false,
        editLoading: false,
        disAreaInput: false,
        chineseMoney: '',
        chinesePoint: '',
        currentPage: 1,
        pageSize: 1,
        total: 0,
        rules: {
          amount: [
            { type: 'number', required: true, message: '请输入保证金', trigger: 'blur' }
          ],
          brokerageScale: [
            { type: 'number', required: true, message: '请输入推荐佣金比例', trigger: 'blur' }
          ],
          deductScale: [
            { type: 'number', required: true, message: '请输入扣点比例', trigger: 'blur' }
          ],
          integral: [
            { type: 'number', required: true, message: '请输入赠送积分', trigger: 'blur' }
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
        this.$axios.get(SITEURL.AGENT_LIST + '?status=3&page=' + page).then(response => {
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
          this.$axios.get(SITEURL.AGENT_AUDIT_SEARCH + '?text=' + text + '&status=3').then(response => {
            // get body data
            this.loading = false
            this.tableData = response.data.data
          }).catch(error => {
            this.loading = false
            console.log(error)
          })
        }
      },
      onPass (formName) {
        if (!this.form.areaId && this.form.shopType !== 4) {
          this.$message.warning('请选择所属地区！')
          return
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.editLoading = true
            this.form.applyStatus = 1
            this.$axios.post(SITEURL.AGENT_AUDIT, this.form).then(response => {
              this.editLoading = false
              if (response.data.success) {
                this.$message.success('操作成功，' + response.data.message)
                this.closeEditDialog()
                this.tableData.splice(this.tableDataIndex, 1)
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
      onRefuse (formName) {
        if (!this.form.areaId && this.form.shopType !== 4) {
          this.$message.warning('请选择所属地区！')
          return
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.editLoading = true
            this.form.applyStatus = 2
            this.$axios.post(SITEURL.AGENT_AUDIT, this.form).then(response => {
              this.editLoading = false
              if (response.data.success) {
                this.$message.success('操作成功，' + response.data.message)
                this.closeEditDialog()
                this.tableData.splice(this.tableDataIndex, 1)
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
      changeShopType (value) {
        if (value === 4) {
          this.disAreaInput = true
        } else {
          this.disAreaInput = false
        }
      },
      changeMoney (value) {
        this.chineseMoney = smallToBigMoney(value)
      },
      changePoint (value) {
        this.chinesePoint = smallToBigCredits(value)
      },
      handleEdit (index, row) {
        if (row.shopType === 4) {
          this.disAreaInput = true
        }
        this.tableDataIndex = index
        this.form.id = row.id
        this.form.areaId = row.areaId
        this.form.area = row.area
        this.form.user = row.user
        this.form.shopType = row.shopType
        this.form.amount = parseInt(row.amount)
        this.form.brokerageScale = row.brokerageScale
        this.form.deductScale = row.deductScale
        this.form.integral = parseInt(row.integral)
        var superiorAgentType = row.superiorAgentType ? '(' + row.superiorAgentType + ')' : ''
        this.form.superiorAccount = row.superiorAccount + superiorAgentType

        this.chineseMoney = smallToBigMoney(this.form.amount)
        this.chinesePoint = smallToBigCredits(this.form.amount)
        this.dialogFormVisible = true
      },
      closeEditDialog () {
        this.dialogFormVisible = false
        this.form = {
          id: '',
          areaId: null,
          area: '',
          user: '',
          shopType: 0,
          amount: null,
          brokerageScale: null,
          deductScale: null,
          integral: null,
          superiorAccount: ''
        }
        this.chineseMoney = ''
        this.chinesePoint = ''
        this.editLoading = false
        this.disAreaInput = false
      },
      areaSearch (queryString, cb) {
        var results = []
        if (/^[\u4e00-\u9fa5]+$/.test(queryString) && queryString.length >= 2) {
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
        this.form.areaId = item.id
        this.form.area = item.value
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
  .agent-edit .el-form-item {
    margin: 20px
  }
  .inline-input {
    width: 100%;
  }
</style>
