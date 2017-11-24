<template>
<!-- 商品管理 -->
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
                        <el-form-item label="选择查询方式">
                          <el-select v-model="value" placeholder="请选择">
                            <el-option
                              v-for="item in options"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="查询入口">
                            <el-input class="inline-input"  v-model='formInline.search' placeholder=""></el-input>
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
            <el-table :data='tableData' stripe border style="width: 100%" :height="$store.state.tableHeight" type="selection" v-loading="loading" @expand="onExpand">
               <el-table-column type="expand">
                  <template scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                      <el-form-item label="ID">
                        <span>{{ props.row.id }}</span>  
                      </el-form-item>
                      <el-form-item label="商家ID">
                        <span>{{ props.row.merchantId }}</span>
                      </el-form-item>
                      <el-form-item label="描述">
                        <span>{{ props.row.description }}</span>
                      </el-form-item>
                      <el-form-item label="运费">
                        <span>{{ props.row.freight }}元</span>
                      </el-form-item>
                      <el-form-item label="规格">
                        <span>{{ props.row.specificationInfo }}</span>
                      </el-form-item>
                      <el-form-item label="库存">
                        <span>{{ props.row.stocks }}件</span>
                      </el-form-item>
                      <el-form-item label="商品类型">
                        <span>{{ props.row.type }}</span>
                      </el-form-item>
                      <el-form-item label="商家名称">
                        <span>{{ props.row.merchantName }}</span>
                      </el-form-item>
                      <el-form-item label="商品分类">
                        <span>{{ props.row.categoryName }}</span>
                      </el-form-item>
                      <el-form-item label=" 展示图">
                       
                      </el-form-item>
                      <el-form-item label="" >
                        <i class="goodsimgs" v-for='item in props.row.goodsImgs'>
                            <img :src="item">
                        </i>
                      </el-form-item>
                    </el-form>
                  </template>
                </el-table-column>
                <el-table-column prop="coverImg" label="缩略图" class="small-pic">
                  <template scope="scope">
                    <img :src="scope.row.coverImg" class="cover-img" @click="photoZoom(scope.row.coverImg)">
                  </template>
                </el-table-column>
                
                <el-table-column prop="name" label="商品名称"></el-table-column>
                <el-table-column prop="salesVolume" label="销量"></el-table-column>
                <el-table-column prop="price" label="价格"></el-table-column>
                <el-table-column prop="saleStatus" label="是否上架"></el-table-column>
                <el-table-column prop="scaleBase" label="扣点基数（%）"></el-table-column>
                <el-table-column prop="saleDeductionRatio" label="消费者获得积分比（%）"></el-table-column>
                <el-table-column prop="buyDeductionRatio" label="商家获得积分比（%）"></el-table-column>
                <el-table-column prop="modifyDate" label="修改时间"></el-table-column>
                <el-table-column  label="操作">
                  <template scope="scope">

                    <el-button size="small" type="danger" @click="deleteFn(scope.$index,scope.row)" v-if="!scope.row.isDel">删除</el-button>
                    <el-button size="small" type="warning" @click="recoveryFn(scope.$index,scope.row)" v-if="scope.row.isDel">恢复</el-button>                   
                  </template>
                </el-table-column>
            </el-table>
          <div class="pagination">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="pageSize"
                    layout="total, prev, pager, next"
                    :total="total">
                </el-pagination>
          </div> 
          <el-dialog v-model="dialogVisible" size="tiny">
            <img width="100%" height="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </div>       
    </div>
</template>

<script>
  import * as SITEURL from '@/store/app-urls'
  export default {
    name: 'user',
    data () {
      return {
        formInline: {
          search: '',
          fromDate: '',
          toDate: ''
        },
        dialogVisible: false,
        dialogImageUrl: '',
        tableData: [],
        currentPage: 1,  // 当前页
        pageSize: 1,  // 每页多少条记录
        total: 1,  // 共多少条记录
        loading: false,
        fromDate: '',
        endDate: '',
        radio: '1',
        paginationPageMumber: 1,
        coverImg: '',
        isDelState: 0,
        options: [{
          value: '0',
          label: '按商品名称查询'
        }, {
          value: '1',
          label: '按商家名称查询'
        }, {
          value: '2',
          label: '按商家手机号查询'
        }],
        value: '0',
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
      this.getListAll()
    },
    methods: {
      getListAll (pageNum = 1) {
        this.text = this.formInline.search.trim()
        let myJson = {
          pageNum: this.paginationPageMumber,
          pageSize: 9
        }
        let json = JSON.stringify(myJson)
        let stringJson = encodeURIComponent(json)
        this.$axios.get(SITEURL.SEARCH_GOODSALL + '?json=' + stringJson).then(response => {
          // console.log('response=', response)
          this.loading = false
          if (response.data.status.succeed === '1') {
            // 对response里的数据进行转换
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
              var scaleBase = response.data.data.list[i].scaleBase
              var scaleByUser = response.data.data.list[i].scaleByUser
              var scaleByMerchant = response.data.data.list[i].scaleByMerchant
              var saleDeductionRatio = (scaleBase * scaleByUser) / 10
              var buyDeductionRatio = (scaleBase * scaleByMerchant) / 10
              response.data.data.list[i].saleDeductionRatio = saleDeductionRatio
              response.data.data.list[i].buyDeductionRatio = buyDeductionRatio
              this.timeObject = new Date(response.data.data.list[i].modifyDate)
              response.data.data.list[i].modifyDate = this.changeTime(this.timeObject)
            }
            this.tableData = response.data.data.list
            this.isDel = response.data.data.isDel
            this.pageSize = response.data.data.pageSize
            this.coverImg = response.data.data.list.coverImg
            // 处理total问题
            if (response.data.data.total === 0 && response.data.data.list.length) {
              response.data.data.total = this.total
            } else {
              this.total = response.data.data.total
            }
          }
        }).catch(error => {
          console.log(error)
        })
      },
      // 信息查询方法
      onSearch (pageNum = 1) {
        if (this.value === '按商品名称查询') {
          this.value = '0'
        }
        var text = this.formInline.search.trim()
        // 查询条件为空的时候，默认走getList函数
        if (!text) {
          this.loading = true
          this.getListAll()
          return false
        }
        this.loading = true
        if (this.value === '0') {
          let myJson = {
            name: text,
            pageNum: this.paginationPageMumber,
            pageSize: '20'
          }
          let json = JSON.stringify(myJson)
          let stringJson = encodeURIComponent(json)
          this.$axios.get(SITEURL.SEARCH_GOODSNAMES + '?json=' + stringJson)
            .then(response => {
              // get body data
              this.loading = false
              if (response.data.status.succeed === '1') {
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
                  this.timeObject = new Date(response.data.data.list[i].modifyDate)
                  response.data.data.list[i].modifyDate = this.changeTime(this.timeObject)
                  var scaleBase = response.data.data.list[i].scaleBase
                  var scaleByUser = response.data.data.list[i].scaleByUser
                  var scaleByMerchant = response.data.data.list[i].scaleByMerchant
                  var saleDeductionRatio = (scaleBase * scaleByUser) / 10
                  var buyDeductionRatio = (scaleBase * scaleByMerchant) / 10
                  response.data.data.list[i].saleDeductionRatio = saleDeductionRatio
                  response.data.data.list[i].buyDeductionRatio = buyDeductionRatio
                }
                this.tableData = response.data.data.list
                this.total = response.data.data.total
              } else {
                this.$message.error('操作失败，' + response.data.status.errorDesc)
                this.tableData = []
              }
            }).catch(error => {
              this.loading = false
              console.log(error)
            })
        } else {
          // 按商家搜索，包括商家名称和商家手机号搜索
          let myJson1 = {
            name: text,
            pageNum: this.paginationPageMumber,
            pageSize: '20'
          }
          let myJson2 = {
            phone: text,
            pageNum: this.paginationPageMumber,
            pageSize: '20'
          }
          let stringJson1 = encodeURIComponent(JSON.stringify(myJson1))
          let stringJson2 = encodeURIComponent(JSON.stringify(myJson2))
          if (this.value === '1') {
            this.stringJson = stringJson1
          } else {
            this.stringJson = stringJson2
          }
          this.$axios.get(SITEURL.SEARCH_GOODSBYMERCHANT + '?json=' + this.stringJson)
            .then(response => {
              this.loading = false
              // 状态成功了.才有tableData
              if (response.data.status.succeed === '1') {
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
                  this.timeObject = new Date(response.data.data.list[i].modifyDate)
                  response.data.data.list[i].modifyDate = this.changeTime(this.timeObject)
                  var scaleBase = response.data.data.list[i].scaleBase
                  var scaleByUser = response.data.data.list[i].scaleByUser
                  var scaleByMerchant = response.data.data.list[i].scaleByMerchant
                  var saleDeductionRatio = (scaleBase * scaleByUser) / 10
                  var buyDeductionRatio = (scaleBase * scaleByMerchant) / 10
                  response.data.data.list[i].saleDeductionRatio = saleDeductionRatio
                  response.data.data.list[i].buyDeductionRatio = buyDeductionRatio
                }
                this.tableData = response.data.data.list
                this.total = response.data.data.total
                this.pageSize = response.data.data.pageSize
              } else {
                this.$message.error('操作失败，' + response.data.status.errorDesc)
              }
            }).catch(error => {
              this.loading = false
              console.log(error)
            })
        }
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      // 点击分页
      handleCurrentChange (val) {
        this.loading = true
        this.paginationPageMumber = val
        this.getListAll(val)
      },
      // 转换时间戳
      changeTime (time) {
        var year = time.getFullYear()
        var month = time.getMonth() + 1
        var day = time.getDate()
        var hours = time.getHours()
        var minutes = time.getMinutes()
        var seconds = time.getSeconds()
        month = month < 10 ? '0' + month : month
        day = day < 10 ? '0' + day : day
        hours = hours < 10 ? '0' + hours : hours
        minutes = minutes < 10 ? '0' + minutes : minutes
        seconds = seconds < 10 ? '0' + seconds : seconds
        return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
      },
       // 展开的时候。展示另外的信息
      onExpand (row, expanded) {
        if (expanded) {
          let myJson = {
            id: row.id
          }
          let json = JSON.stringify(myJson)
          let stringJson = encodeURIComponent(json)
          this.$axios.get(SITEURL.SEARCH_GOODSINFOMORE + '?json=' + stringJson)
            .then(response => {
              if (response.data.status.succeed === '1') {
                row.merchantName = response.data.data.merchantName
                row.categoryName = response.data.data.categoryName
                row.goodsImgs = response.data.data.goodsImgs
              } else {
                this.$message.error('操作失败，' + response.data.status.errorDesc)
              }
            }).catch(error => {
              console.log(error)
            })
        }
      },
      // 删除函数
      deleteFn (index, row) {
        this.isDelState = row.isDel
        let myJson = {
          id: row.id
        }
        let json = JSON.stringify(myJson)
        let stringJson = encodeURIComponent(json)
        this.$axios.post(SITEURL.DELATE_GOODS + '?json=' + stringJson)
            .then(response => {
              if (response.data.status.succeed === '1') {
                row.isDel = !row.isDel
                this.$message.success('操作成功，该商品状态已更改')
              } else {
                this.$message.error('操作失败，' + response.data.status.errorDesc)
              }
            }).catch(error => {
              console.log(error)
            })
      },
      // 恢复函数
      recoveryFn (index, row) {
        let myJson = {
          id: row.id
        }
        let json = JSON.stringify(myJson)
        let stringJson = encodeURIComponent(json)
        this.$axios.post(SITEURL.RECOVERY_GOODS + '?json=' + stringJson)
            .then(response => {
              if (response.data.status.succeed === '1') {
                row.isDel = !row.isDel
                this.$message.success('操作成功，该商品状态已更改')
              } else {
                this.$message.error('操作失败，' + response.data.status.errorDesc)
              }
            }).catch(error => {
              console.log(error)
            })
      },
      photoZoom (url) {
        this.dialogImageUrl = url
        this.dialogVisible = true
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
    .userlist .el-form-item__content .goodsimgs{
      display: inline-block;
      width:600px;
      height:480px;
      margin-bottom:10px;
    }
    .userlist .el-form-item__content .goodsimgs img{
      width:600px;      
    }
    .imgsWrap{
      height:500px;
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
    .cover-img {
      padding-top: 8px;
      width: 60px;
      height: 48px;
    }
    .goodsimgs {
      margin-top: 50px;
    }
</style>
