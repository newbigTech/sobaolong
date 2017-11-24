<template>
    <div class='content'>
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>信息查询</el-breadcrumb-item>
                <el-breadcrumb-item>客户信息</el-breadcrumb-item>
                <el-breadcrumb-item>会员明细</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class='search' @keyup.enter="onSearch()">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-row>
                <el-col :span="24">
                  <el-form-item label="按区域搜索">
                    <el-autocomplete class="inline-input inputarea"  :fetch-suggestions="queryAreaSearch"
                           :trigger-on-focus="false" @select="handleAreaSelect" v-model='formInline.searcharea' placeholder="搜全国或具体区域">
                    </el-autocomplete>
                  </el-form-item> 
                  <el-form-item label="按推荐码搜索">
                    <el-input class="inline-input"  v-model='formInline.searchid' placeholder="请输入推荐码"></el-input>
                  </el-form-item> 
                  <el-form-item label="按姓名搜索">
                    <el-input class="inline-input"  v-model='formInline.searchname' placeholder="请输入姓名"></el-input>
                  </el-form-item> 
                  <el-form-item label="按手机号搜索">
                    <el-input class="inline-input"  v-model='formInline.searchphone' placeholder="请输入手机号"></el-input>
                  </el-form-item>
                  <el-form-item label="从">
                    <el-date-picker v-model="formInline.fromDate" align="right" type="date" placeholder="选择起始日期" :picker-options="pickerOptions"></el-date-picker>
                  </el-form-item>
                  <el-form-item label="到">
                    <el-date-picker v-model="formInline.toDate" align="right" type="date" placeholder="选择结束日期" :picker-options="pickerOptions"></el-date-picker>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="onSearch()" icon="search">查询</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
        </div>
        <div class="userlist">
            <el-table :data="tableData"  stripe border style="width: 100%" :height="$store.state.tableHeight" type="selection" v-loading="loading">
                <el-table-column prop='realName' label="姓名"></el-table-column>
                <el-table-column prop='idcardNumber' label="身份证号" width="180"></el-table-column>
                <el-table-column prop='spreadCode' label="账户" ></el-table-column>
                <el-table-column prop='phoneNumber' label="电话"></el-table-column>              
                <el-table-column prop='userType' label="用户类型"></el-table-column>
                <el-table-column prop='agentType' label="代理类型"></el-table-column>
                <el-table-column prop='superior_phoneNumber' label="推荐人手机号"></el-table-column>
                <el-table-column prop='area' label="注册地址" width="220"></el-table-column>
            </el-table>
             <div class="pagination" v-if="show">
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
        formInline: {
          searcharea: '',
          searchid: '',
          searchname: '',
          searchphone: '',
          fromDate: '',
          toDate: ''
        },
        paginationPageNumber: 1,
        tableData: [],
        currentPage: 1,  // 当前页
        pageSize: 1,  // 每页多少条记录
        total: 1,  // 共多少条记录
        loading: false,
        fromDate: '',
        endDate: '',
        areaall: '',
        show: false,
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
      this.loadingsetTimeout()
    },
    methods: {
      loadingsetTimeout () {
        setTimeout(() => { this.loading = false }, 800)
      },
      onSearch (page = 1) {
        this.loading = true
        var name = this.formInline.searchname.trim()
        var id = this.formInline.searchid.trim()
        var phone = this.formInline.searchphone.trim()
        var area = this.formInline.searcharea.trim()
        let num = ''
        if (!area || area === '全国') {
          num = 1
          area = ''
        }
        // 发送请求
        this.$axios.get(SITEURL.MEMBERDETAILS_SEARCH + '?first_time=' + this.formInline.fromDate + '&last_time=' + this.formInline.toDate, {
          params: {
            area: area,
            area_type: num,
            id: id,
            name: name,
            phone: phone,
            page: page,
            limit: 15
          }
        }).then(response => {
          this.loading = false
          this.show = true
          if (response.data.data || (response.data.data === '')) {
            if (!response.data.data.data) {
              this.tableData = response.data.data
            } else {
              this.tableData = response.data.data.data
              this.total = response.data.data.total
              this.pageSize = parseInt(response.data.data.per_page)
            }
          } else {
            this.$message.warning(response.data.message)
            this.loading = false
            this.tableData = []
            this.total = 0
          }
        }).catch(error => {
          this.loading = false
          console.log(error)
        })
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        this.loading = true
        this.onSearch(val)
        this.paginationPageNumber = val
      },
      queryAreaSearch (queryString, cb) {
        var results = []
        if (/^[\u4e00-\u9fa5]+$/.test(queryString) && queryString.length >= 3) {
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
        this.formInline.areaId = item.id
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
        width: 120px;
    }
    .userlist{
      height:500px;
    }
</style>
