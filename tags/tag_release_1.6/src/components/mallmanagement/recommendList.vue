<template>
<!-- 订单管理 -->
    <div class='content'>
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>商城管理</el-breadcrumb-item>
                <el-breadcrumb-item>商品管理</el-breadcrumb-item>
                <el-breadcrumb-item>C2C商品管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class='search' @keyup.enter="onSearch()">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
               <el-row>
                <el-col :span="24">
                    <el-row>
                        <el-form-item label="按商品名称查询">
                           <el-input class="inline-input"  v-model='formInline.search' placeholder="买家账号"></el-input>
                        </el-form-item>
                        <el-form-item label="按卖家名或账号查询">
                            <el-input class="inline-input"  v-model='formInline.search' placeholder="按卖家名或账号查询"></el-input>
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
                <el-table-column prop="createDate" label="ID" width="180"></el-table-column>
                <el-table-column  label="商品名称" width="180"></el-table-column>
                <el-table-column  label="商家名称" width="180"></el-table-column>
                <el-table-column  label="销量"></el-table-column>
                <el-table-column  label="价格"></el-table-column>
                <el-table-column  label="上架"></el-table-column>
                <el-table-column  label="推荐"></el-table-column>
                <el-table-column  label="修改时间"></el-table-column>
                <el-table-column  label="状态">
                    <template scope="scope">
                        <span>已推荐</span>
                    </template>
                </el-table-column>
                <el-table-column  label="操作">
                  <template scope="scope">
                    <el-button size="small" type="danger" @click="handleDisable(scope.$index, scope.row)" >删除</el-button>
                          <!-- <el-button size="small" type="success" @click="handleDisable(scope.$index, scope.row)">启用</el-button> -->
                    <el-button size="small" type="warning" @click="handleFreeze(scope.$index, scope.row)" >不推荐</el-button>
                  </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination >
                </el-pagination>
            </div>
        </div>       
    </div>
</template>

<script>
  import * as SITEURL from '@/store/app-urls'
  import { MEMBER_INFO } from '@/store/mutation-types'
  export default {
    name: 'user',
    data () {
      return {
        formInline: {
          search: '',
          fromDate: '',
          toDate: ''
        },
        tableData: [],
        currentPage: 1,  // 当前页
        pageSize: 1,  // 每页多少条记录
        total: 1,  // 共多少条记录
        loading: false,
        fromDate: '',
        endDate: '',
        radio: '1',
        options: [{
          value: '选项1',
          label: '全部'
        }, {
          value: '选项2',
          label: '待付款'
        }, {
          value: '选项3',
          label: '待收货'
        }, {
          value: '选项4',
          label: '已完成'
        }],
        value: '',
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
    created: function () {
      this.loading = true
      this.getCustomer()
    },
    methods: {
      getCustomer (page = 1) {
        this.$axios.get(SITEURL.MEMBER_LIST_URL + '?page=' + page).then(response => {
          // get body data
          this.loading = false
          this.tableData = response.data.data.data
          console.log(response.data.data.data)
          this.currentPage = response.data.data.current_page
          console.log(this.currentPage)
          this.pageSize = response.data.data.per_page
          this.total = response.data.data.total
        }).catch(error => {
          console.log(error)
        })
      },
      onSearch () {
        var text = this.formInline.search.trim()
        this.loading = true
        if (!this.formInline.search) {
          this.getCustomer()
        } else {
          this.$axios.get(SITEURL.MEMBER_SEARCH_URL + '?text=' + text + '&disabled=0')
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
      handleEdit (index, row) {
        this.$store.commit(MEMBER_INFO, row)
        this.$router.push({ path: '/member/edit' })
      },
      handleDisable (index, row) {
        this.$axios.post(SITEURL.MEMBER_STATUS_URL, {id: row.id, disabled: row.isDisabled}).then(response => {
          if (response.data.success) {
            this.tableData.splice(index, 1)
            this.$message.success('操作成功，' + response.data.message)
          } else {
            this.$message.error('操作失败，' + response.data.message)
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
    
</style>
