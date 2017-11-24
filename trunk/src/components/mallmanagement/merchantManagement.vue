<template>
<!-- 商家管理 -->
    <div class='content'>
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>商城管理</el-breadcrumb-item>
                <el-breadcrumb-item>商家管理</el-breadcrumb-item>
                <el-breadcrumb-item>C2C商家管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class='search' @keyup.enter="onSearch()">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
               <el-row>
                <el-col :span="24">
                    <el-form-item label="查询入口">
                        <el-input class="inline-input"  v-model='formInline.search' placeholder="商家名称|商家账户"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSearch" icon="search">查询</el-button>
                    </el-form-item>
                </el-col>
              </el-row>
            </el-form>
        </div>
        <div class="userlist">
            <el-table :data='tableData' stripe border style="width: 100%" :height="$store.state.tableHeight" type="selection" v-loading="loading">
                <el-table-column prop="businessName" label="商家名称" width="180"></el-table-column>
                <el-table-column prop="account"  label="账号" width="180"></el-table-column>
                <el-table-column prop="onNum"  label="已上架商品个数" width="180"></el-table-column>
                <el-table-column prop="offNum"  label="下架商品个数"></el-table-column>
                <el-table-column prop="totalSaleNum"  label="总销量"></el-table-column>
                <el-table-column prop="totalTradeMoney"  label="总交易额"></el-table-column>
                <!--<el-table-column  label="状态"></el-table-column>-->
                <el-table-column  label="操作">
                    <template scope="scope">
                        <el-button size="small" type="danger" @click="handleDisable(scope.$index, scope.row)" v-if="scope.row.merchantStatus == 0">禁用</el-button>
                        <el-button size="small" type="success" @click="handleDisable(scope.$index, scope.row)" v-if="scope.row.merchantStatus == 2">启用</el-button>
                        <el-button size="small" type="warning" @click="handleEdit(scope.$index, scope.row)" >查看商品</el-button>
                    </template>
                </el-table-column>
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
  import { MERCHANT_MANAGEMENT_INFO } from '@/store/mutation-types'
  export default {
    name: 'user',
    data () {
      return {
        formInline: {
          search: ''
        },
        tableData: [],
        currentPage: 1,  // 当前页
        pageSize: 20,  // 每页多少条记录
        total: 1,  // 共多少条记录
        loading: false,
        fromDate: '',
        endDate: ''
      }
    },
    created: function () {
      this.loading = true
      this.getCustomer()
    },
    methods: {
      getCustomer (page = 1) {
        let myJson = {
          name: this.formInline.search, // 账户
          pageNum: this.currentPage, // 必传
          pageSize: this.pageSize // 必传
        }
        let json = JSON.stringify(myJson)
        let stringJson = encodeURIComponent(json)
        this.$axios.get(SITEURL.GET_MERCHANT_MANAGER + '?json=' + stringJson).then(response => {
          // console.log('GET_MERCHANT_MANAGER response==', response.data.data)
          let suceess = response.data.status.succeed
          if (suceess === '1') {
            this.loading = false
            this.tableData = response.data.data.list
            this.total = response.data.data.total
          } else {
            this.$message.error('操作失败，' + response.data.status.errorDesc)
          }
        }).catch(error => {
          console.log(error)
        })
      },
      onSearch () {
        this.getCustomer(this.currentPage)
      },
      handleEdit (index, row) {
        this.$store.commit(MERCHANT_MANAGEMENT_INFO, row.id)
        this.$router.push({ path: '/mallmanagement/merchantmanagement/productdetail' })
      },
      handleDisable (index, row) {
        const disable = row.merchantStatus === 0 ? 2 : 0
        let myJsonState = {
          id: row.id,
          status: disable
        }
        let json = JSON.stringify(myJsonState)
        let stringJson = encodeURIComponent(json)
        this.$axios.post(SITEURL.GET__MERCHANT_DISABLE + '?json=' + stringJson).then(response => {
          if (response.data.status.succeed === '1' && response.data.data) {
            this.$message.success('操作成功')
            row.merchantStatus = disable
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
        width: 220px;
    }
    
</style>
