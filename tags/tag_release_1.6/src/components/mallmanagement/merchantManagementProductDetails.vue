<template>
<!-- 商家管理 -->
    <div class='content'>
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>商城管理</el-breadcrumb-item>
                <el-breadcrumb-item>商家管理</el-breadcrumb-item>
                <el-breadcrumb-item>C2C商家管理</el-breadcrumb-item>
                <el-breadcrumb-item>商品详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="userlist">
            <el-table :data='tableData' stripe border style="width: 100%" :height="$store.state.tableHeight" v-loading="loading">               
                <el-table-column prop="coverImg" label="缩略图">
                    <template scope="scope">
                        <img :src="scope.row.coverImg" alt="" class="cover-img"/>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="商品名称"></el-table-column>
                <el-table-column prop="description" label="描述"></el-table-column>
                <el-table-column prop="saleStatus" label="是否上架"></el-table-column>
                <el-table-column prop="specificationInfo" label="规格"></el-table-column>
                <el-table-column prop="price" label="价格"></el-table-column>
                <el-table-column prop="freight" label="运费"></el-table-column>                                           
                <el-table-column prop="stocks" label="库存"></el-table-column>
                <el-table-column prop="type" label="商品类型"></el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                               :current-page="currentPage"
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
  export default {
    name: 'user',
    data () {
      return {
        tableData: [],
        currentPage: 1,  // 当前页
        pageSize: 5,  // 每页多少条记录
        total: 1,  // 共多少条记录
        loading: false
      }
    },
    created: function () {
      this.loading = true
      this.getCustomer()
    },
    methods: {
      getCustomer (page = 1) {
        // console.log('row idididi==', this.$store.state.id)
        let myJson = {
          id: this.$store.state.id,
          pageNum: this.currentPage,
          pageSize: this.pageSize
        }
        let json = JSON.stringify(myJson)
        let stringJson = encodeURIComponent(json)
        this.$axios.get(SITEURL.GET_GOODS_BY_MERCHANT + '?json=' + stringJson).then(response => {
          // get body data
          this.loading = false
          if (response.data.status.succeed === '1') {
            // 处理字段展示
            for (var i in response.data.data.list) {
              // 处理信息
              if (response.data.data.list[i].saleStatus === 'on') {
                response.data.data.list[i].saleStatus = '是'
              } else {
                response.data.data.list[i].saleStatus = '否'
              }
              if (response.data.data.list[i].type === 'entity') {
                response.data.data.list[i].type = '实体商品'
              } else {
                response.data.data.list[i].type = '虚拟商品'
              }
            }
            this.tableData = response.data.data.list
            // console.log('商品详请', this.tableData)
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
        this.getCustomer(val)
        this.paginationPageMumber = val
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
     .cover-img {
         padding-top: 8px;
         width: 60px;
         height: 56px;
     }
    
</style>
