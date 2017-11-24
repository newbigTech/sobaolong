<template>
  <div id="snatchGoodsList" class="content">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>夺宝开奖</el-breadcrumb-item>
        <el-breadcrumb-item>夺宝商品</el-breadcrumb-item>
        <el-breadcrumb-item>商品列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="search">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-row>
          <el-col :span="18">
            <el-form-item label="夺宝商品搜索">
              <el-input class="inline-input" v-model="formInline.search" placeholder="商品名称"></el-input>
            </el-form-item>
            <el-form-item>
              <el-select v-model="formInline.snatchStatus" placeholder="守宝状态">
                <el-option v-for="item in statusOptions" :label="item.label" :value="item.value" :key="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="formInline.category" placeholder="商品分类">
                <el-option v-for="item in categoryOptions" :label="item.label" :value="item.value" :key="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSearch" icon="search">搜索</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="text-align: right;">
            <el-form-item>
              <el-button type="success" @click="dialogLotteryVisible=true" icon="information">开奖</el-button>
              <el-button type="primary" @click="handleCreate" icon="setting">新建商品</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="contentlist">
      <template>
        <el-table :data="tableData" stripe border style="width: 100%" :height="770" type="selection" v-loading="loading">
          <el-table-column prop="coverImg" label="商品缩略图" width="140">
            <template scope="scope">
              <img v-lazy="scope.row.coverImg" class="cover-img" @click="handlePictureCardPreview" />
            </template>
          </el-table-column>
          <el-table-column prop="goodsName" label="商品名称"></el-table-column>
          <el-table-column prop="categoryName" label="商品分类" width="100"></el-table-column>
          <el-table-column prop="originalPrice" label="市场价"></el-table-column>
          <el-table-column prop="price" label="单价"></el-table-column>
          <el-table-column prop="raiseAmount" label="预售金额"></el-table-column>
          <el-table-column prop="soldAmount" label="已售金额"></el-table-column>
          <el-table-column prop="snatchStatusLabel" label="夺宝状态"></el-table-column>
          <el-table-column prop="participateNumber" label="参与数量"></el-table-column>
          <el-table-column prop="lotteryPeriods" label="开奖期数"></el-table-column>
          <el-table-column label="操作" width="200">
            <template scope="scope">
              <!--<el-button size="small" type="warning" @click="onReinforce(scope.$index, scope.row)" v-if="scope.row.snatchStatus == 2">补齐</el-button>-->
              <el-button size="small" type="danger" @click="onRefund(scope.$index, scope.row)" v-if="scope.row.snatchStatus == 2">退款</el-button>
              <el-button size="small" @click="handleEdit(scope.$index, scope.row)" v-if="scope.row.snatchStatus == 2">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <div class="pagination">
      <el-pagination @current-change="handleCurrentChange"
       :current-page="currentPage"
       :page-size="pageSize"
       layout="total, prev, pager, next"
       :total="total">
      </el-pagination>
    </div>
    <el-dialog v-model="dialogVisible" size="tiny">
      <img width="100%" height="100%" :src="dialogImageUrl" alt="">
    </el-dialog>

    <div class="lotteryDialog">
      <el-dialog title="夺宝开奖" v-model="dialogLotteryVisible" @close="clearLatteryDialog" size="tiny">
        <el-form :model="form" class="lattery-edit" ref="latteryForm" :rules="rules">
          <el-form-item label="开奖期数" :label-width="formLabelWidth" prop="lotteryPeriods">
            <el-input v-model.number="form.lotteryPeriods" auto-complete="off" placeholder="请填写开奖期数"></el-input>
          </el-form-item>
          <el-form-item label="中奖号码" :label-width="formLabelWidth" prop="winningNumber">
            <el-input v-model="form.winningNumber" auto-complete="off" placeholder='请填写中奖号码，号码之间用英文","分隔'></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="clearLatteryDialog">取 消</el-button>
          <el-button type="primary" @click="onRunLottery('latteryForm')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import * as SITEURL from '@/store/app-urls'
  import { SNATCH_GOODS } from '@/store/mutation-types'
  export default {
    name: 'user',
    data () {
      return {
        formInline: {
          search: '',
          snatchStatus: '',
          category: ''
        },
        form: {
          lotteryPeriods: null,
          winningNumber: null
        },
        formLabelWidth: '80px',
        tableData: [],
        currentPage: 1,
        pageSize: 1,
        total: 0,
        loading: false,
        latteryLoading: false,
        dialogImageUrl: '',
        dialogVisible: false,
        dialogLotteryVisible: false,
        statusOptions: this.$store.state.snatchStatus,
        categoryOptions: [],
        rules: {
          lotteryPeriods: [
            { type: 'number', required: true, min: 7, message: '请输入开奖期数', trigger: 'blur' }
          ],
          winningNumber: [
            { type: 'string', required: true, min: 20, message: '请输入正确的中奖号码', trigger: 'blur' }
          ]
        }
      }
    },
    created: function () {
      this.loading = true
      this.getGoodsCategory()
      this.getGoods()
    },
    methods: {
      getGoods (page = 1) {
        // GET /someUrl
        this.$axios.get(SITEURL.SNATCH_GOODS_LIST + '?status=2,3&page=' + page).then(response => {
          // get body data
          this.loading = false
          this.tableData = response.data.data.data
          this.currentPage = response.data.data.current_page
          this.pageSize = response.data.data.per_page
          this.total = response.data.data.total
        }).catch(error => {
          console.log(error)
        })
      },
      getGoodsCategory () {
        this.$axios.get(SITEURL.SNATCH_GOODS_CATEGORY).then(response => {
          this.categoryOptions = response.data.data
        }).catch(error => {
          console.log(error)
        })
      },
      onSearch () {
        var text = this.formInline.search.trim()
        this.loading = true
        if (!(this.formInline.search || this.formInline.category || this.formInline.snatchStatus)) {
          this.getGoods()
        } else {
          var status = this.formInline.snatchStatus
          if (!status) {
            status = '2,3'
          }
          this.$axios.get(SITEURL.SNATCH_GOODS_SEARCH + '?text=' + text + '&category=' + this.formInline.category + '&status=' + status)
            .then(response => {
              // get body data
              this.loading = false
              this.tableData = response.data.data
            }).catch(error => {
              console.log(error)
            })
        }
      },
      clearLatteryDialog () {
        this.form = {
          lotteryPeriods: null,
          winningNumber: null
        }
        this.dialogLotteryVisible = false
      },
      onRunLottery (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.latteryLoading = true
            this.$axios.post(SITEURL.SNATCH_RUN_LOTTERY, this.form).then(response => {
              this.latteryLoading = false
              if (response.data.success) {
                this.$message.success('操作成功，' + response.data.message)
                this.clearLatteryDialog()
              } else {
                this.$message.error('操作失败，' + response.data.message)
              }
              this.dialogLotteryVisible = false
            }).catch(error => {
              console.log(error)
            })
          }
        })
      },
      onReinforce (index, row) {
        this.$axios.post(SITEURL.SNATCH_REINFORCE, {id: row.id}).then(response => {
          if (response.data.success) {
            this.$message.success('操作成功，' + response.data.message)
          } else {
            this.$message.error('操作失败，' + response.data.message)
          }
        }).catch(error => {
          console.log(error)
        })
      },
      onRefund (index, row) {
        this.$axios.post(SITEURL.SNATCH_REFUND, {id: row.id}).then(response => {
          if (response.data.success) {
            this.$message.success('操作成功，' + response.data.message)
          } else {
            this.$message.error('操作失败，' + response.data.message)
          }
        }).catch(error => {
          console.log(error)
        })
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      handleEdit (index, row) {
        this.$store.commit(SNATCH_GOODS, row)
        this.$router.push({ path: '/snatch/goods/edit' })
      },
      handleCreate () {
        this.$router.push({ path: '/snatch/goods/create' })
      },
      handleCurrentChange (val) {
        this.currentPage = val
        this.loading = true
        this.getGoods(val)
      },
      handlePictureCardPreview (event) {
        this.dialogImageUrl = event.target.src
        this.dialogVisible = true
      }
    }
  }
</script>

<style scoped>
  .contentlist {
    height: 780px;
  }
  .el-form-item {
    margin-bottom: 0 !important;
  }
  .search {
    padding: 20px;
    background: #d3dce6;
  }
  .pagination {
    padding: 10px;
  }
  .cover-img {
    padding-top: 8px;
    width: 100px;
    height: 60px;
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

  .lattery-edit .el-form-item {
    margin: 20px
  }
</style>
