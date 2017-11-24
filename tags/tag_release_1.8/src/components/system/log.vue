<template>
  <div id="withdraw-audit" class="content">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>日志管理</el-breadcrumb-item>
        <el-breadcrumb-item>日志列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="search">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-row>
          <el-col :span="24">
            <el-row style="margin-top:10px">
              <el-form-item label="从">
                <el-date-picker v-model="formInline.fromDate" align="right" type="datetime" placeholder="选择起始日期" :picker-options="pickerOptions" @change="setStartTime"></el-date-picker>
              </el-form-item>
              <el-form-item label="到">
                <el-date-picker v-model="formInline.toDate" align="right" type="datetime" placeholder="选择结束日期" :picker-options="pickerOptions" @change="setEndTime"></el-date-picker>
              </el-form-item>
              <el-form-item label="操作员/接口">
                <el-input class="inline-input"  v-model='formInline.search' placeholder="操作员/接口"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSearch" icon="search">查询</el-button>
              </el-form-item>
            </el-row>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="contentlist">
      <el-table :data="tableData" stripe border style="width: 100%" height="690" v-loading="">
        <el-table-column prop="user" label="操作员"></el-table-column>
        <el-table-column prop="ip" label="IP"></el-table-column>
        <el-table-column prop="url" label="访问接口"></el-table-column>
        <el-table-column prop="time" label="操作时间"></el-table-column>
        <el-table-column label="查看" width="200">
          <template scope="scope">
            <el-button type="small" @click="handleEdit(scope.$index, scope.row)">参数详情</el-button>
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

    <el-dialog title="参数信息" :visible.sync="dialogVisible" width="20%">
      <!--<el-form style="text-align: center;">
        <el-form-item label=""><span class="logInfoSpan">page:</span><span class="logInfoContent">{{logInfo.page}}</span></el-form-item>
        <el-form-item label=""><span class="logInfoSpan">limit:</span><span class="logInfoContent">{{logInfo.limit}}</span></el-form-item>
        <el-form-item label=""><span class="logInfoSpan">first_time:</span><span class="logInfoContent">{{logInfo.first_time}}</span></el-form-item>
        <el-form-item label=""><span class="logInfoSpan">last_time:</span><span class="logInfoContent">{{logInfo.last_time}}</span></el-form-item>
        <el-form-item label=""><span class="logInfoSpan">name:</span><span class="logInfoContent">{{logInfo.name}}</span></el-form-item>
        <el-form-item label=""><span class="logInfoSpan">phone:</span><span class="logInfoContent">{{logInfo.phone}}</span></el-form-item>
        <el-form-item label=""><span class="logInfoSpan">type:</span><span class="logInfoContent">{{logInfo.type}}</span></el-form-item>
      </el-form>-->

      <div v-for="(value, key) in object">
        <span style="display: inline-block;width: 200px;text-align: right;padding: 5px;font-size: 16px;">{{ key }} :</span> <span style="display: inline-block;text-align: left;padding: 5px;font-weight: bold">{{ value }}</span>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import * as SITEURL from '@/store/app-urls'
  export default {
    name: 'user',
    data () {
      return {
        currentPage: 1,  // 当前页
        pageSize: 20,  // 每页多少条记录
        total: 1,  // 共多少条记录
        formInline: {
          search: '',
          fromDate: '',
          toDate: ''
        },
        logInfo: {
          page: '',
          limit: '',
          first_time: '',
          last_time: '',
          name: '',
          phone: '',
          type: ''
        },
        object: {},
        tableData: [],
        formLabelWidth: '100px',
        loading: false,
        pickerOptions: {},
        dialogVisible: false
      }
    },
    created: function () {
      this.loading = true
      this.getCustomer()
    },
    methods: {
      setStartTime (val) {
        this.formInline.fromDate = val
      },
      setEndTime (val) {
        this.formInline.toDate = val
      },
      getCustomer (page = 1) {
        var stringStartTime = Date.parse(new Date(this.formInline.fromDate))
        var stringEndTime = Date.parse(new Date(this.formInline.toDate))
        stringStartTime = stringStartTime / 1000
        stringEndTime = stringEndTime / 1000
        if (isNaN(stringStartTime)) {
          stringStartTime = ''
        }
        if (isNaN(stringEndTime)) {
          stringEndTime = ''
        }
        let url = '?first_time=' + stringStartTime + '&last_time=' + stringEndTime + '&limit=20' + '&text=' + this.formInline.search + '&page=' + this.currentPage
        this.$axios.get(SITEURL.GET_OPERATIONLOGS + url).then(response => {
          // console.log('response GET_RECEIPT_STATUS==', response)
          let suceess = response.data.success
          if (suceess) {
            this.loading = false
            this.tableData = response.data.data.data
            this.total = response.data.data.total
          } else {
            this.$message.error('操作失败，' + response.data.status.errorDesc)
          }
        }).catch(error => {
          console.log(error)
        })
      },
      onSubmit () {
        this.getCustomer(this.currentPage)
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        this.currentPage = val
        this.loading = true
        this.getCustomer(this.currentPage)
      },
      onSearch () {
        this.getCustomer(this.currentPage)
      },
      handleEdit (index, row) {
        delete row._id
        this.object = row
        this.dialogVisible = true
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
  .role-edit .el-form-item {
    margin: 20px
  }
  .logInfoSpan{
    display: inline-block;
    text-align: right;
    padding: 5px;
    font-size: 18px;
  }
  .logInfoContent{
    display: inline-block;
    text-align: left;
    padding: 5px;
    font-size: 18px;
  }
</style>
