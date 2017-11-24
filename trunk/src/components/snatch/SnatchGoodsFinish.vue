<template>
  <div id="snatchGoodsList" class="content">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>夺宝开奖</el-breadcrumb-item>
        <el-breadcrumb-item>商品列表</el-breadcrumb-item>
        <el-breadcrumb-item>夺宝结束</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="search">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="夺宝商品搜索">
          <el-input class="inline-input" v-model="formInline.search" placeholder="商品名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch" icon="search">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="contentlist">
      <template>
        <el-table :data="tableData" stripe border style="width: 100%" :height="770" type="selection" v-loading="loading">
          <el-table-column type="expand">
            <template scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="中奖用户"><span>{{ props.row.realName }}</span></el-form-item>
                <el-form-item label="中奖手机"><span>{{ props.row.phoneNumber }}</span></el-form-item>
              </el-form>
            </template>
          </el-table-column>

          <el-table-column prop="coverImg" label="商品缩略图">
            <template scope="scope">
              <img v-lazy="scope.row.coverImg" class="cover-img" @click="handlePictureCardPreview" />
            </template>
          </el-table-column>
          <el-table-column prop="lotteryPeriods" label="开奖期数"></el-table-column>
          <el-table-column prop="lotteryTime" label="开奖时间"></el-table-column>
          <el-table-column prop="lotteryNmber" label="开奖号码"></el-table-column>
          <el-table-column prop="participateNumber" label="参与数量"></el-table-column>
          <el-table-column prop="goodsName" label="商品名称"></el-table-column>
          <el-table-column prop="categoryName" label="商品分类"></el-table-column>
          <el-table-column prop="originalPrice" label="市场价"></el-table-column>
          <el-table-column prop="price" label="单价"></el-table-column>
          <el-table-column prop="raiseAmount" label="预售金额"></el-table-column>
          <el-table-column prop="soldAmount" label="已售金额"></el-table-column>
          <el-table-column label="操作" width="210">
            <template scope="scope">
              <el-button size="small" @click="showOrder(scope.$index, scope.row)">收货信息</el-button>
              <el-button size="small" type="info" @click="onReceive(scope.$index, scope.row)" v-if="scope.row.isReceiving == 0" :loading="scope.row.btnLoading">确认收货</el-button>
              <el-button size="small" @click="onReceive(scope.$index, scope.row)" v-if="scope.row.isReceiving == 1" :disabled="true">已收货</el-button>
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
    <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
      <el-table :data="orderData">
        <el-table-column property="createDate" label="订单日期" width="110"></el-table-column>
        <el-table-column property="sn" label="订单号" width="180"></el-table-column>
        <el-table-column property="realName" label="姓名" width="80"></el-table-column>
        <el-table-column property="phoneNumber" label="联系电话" width="170"></el-table-column>
        <el-table-column property="address" label="收货地址"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
  import * as SITEURL from '@/store/app-urls'
  export default {
    name: 'user',
    data () {
      return {
        formInline: {
          search: ''
        },
        form: {
          lotteryPeriods: null,
          winningNumber: null
        },
        formLabelWidth: '80px',
        tableData: [],
        orderData: [],
        currentPage: 1,
        pageSize: 1,
        total: 0,
        loading: false,
        dialogImageUrl: '',
        dialogVisible: false,
        dialogTableVisible: false,
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
      this.getGoods()
    },
    methods: {
      getGoods (page = 1) {
        // GET /someUrl
        this.$axios.get(SITEURL.SNATCH_GOODS_LIST + '?status=5&page=' + page).then(response => {
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
      showOrder (index, row) {
        this.$axios.get(SITEURL.SNATCH_ORDER_USER + '?user=' + row.user + '&goods=' + row.id).then(response => {
          this.orderData = response.data.data.orders
          this.dialogTableVisible = true
        }).catch(error => {
          console.log(error)
        })
      },
      onReceive (index, row) {
        if (!row.isReceiving) {
          this.$set(row, 'btnLoading', true)
          this.$axios.post(SITEURL.SNATCH_RECEIVE, {id: row.id, isReceiving: 1}).then(response => {
            row.btnLoading = false
            if (response.data.success) {
              this.$message.success('操作成功，' + response.data.message)
              row.isReceiving = true
            } else {
              row.btnLoading = false
              this.$message.error('操作失败，' + response.data.message)
            }
          }).catch(error => {
            console.log(error)
          })
        }
      },
      onSearch () {
        var text = this.formInline.search.trim()
        this.loading = true
        if (!this.formInline.search) {
          this.getGoods()
        } else {
          this.$axios.get(SITEURL.SNATCH_GOODS_SEARCH + '?status=5&text=' + text)
            .then(response => {
              // get body data
              this.loading = false
              this.tableData = response.data.data
            }).catch(error => {
              console.log(error)
            })
        }
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
