<template>
  <div id="studentChecking" class="content">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>学生计划</el-breadcrumb-item>
        <el-breadcrumb-item>已审核大学生</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="contentlist">
     <template>
        <el-table :data="tableData" stripe border style="width: 100%" :height="$store.state.tableHeight" type="selection" v-loading="loading">
          <el-table-column prop="realName" label="姓名"></el-table-column>
          <el-table-column prop="phoneNumber" label="手机号"></el-table-column>
          <el-table-column prop="school" label="学校名称"></el-table-column>
          <el-table-column prop="startTime" label="入学日期"></el-table-column>
          <el-table-column prop="degree" label="学历"></el-table-column>
          <el-table-column prop="period" label="学制" ></el-table-column>
          <el-table-column prop="studentNumber" label="学号"></el-table-column>
          <el-table-column prop="" label="审核状态">
             <template scope="scope">
              <el-tag type="success">审核通过</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template scope="scope">
              <el-button size="small" @click="handleEdit(scope.$index,scope.row)">查看</el-button>
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
  </div>
</template>

<script>
  import * as SITEURL from '@/store/app-urls'
  import { STUDENT_INFO } from '@/store/mutation-types'
  export default {
    name: 'studentPass',
    data () {
      return {
        formInline: {
          search: ''
        },
        tableData: [],
        currentPage: 1,
        pageSize: 1,
        total: 0,
        loading: false
      }
    },
    created: function () {
      this.loading = true
      this.getMerchant()
    },
    methods: {
      getMerchant (page = 1) {
        // GET /someUrl
        this.$axios.get(SITEURL.GET_STUDENTINFO + '?status=1' + '&page=' + page).then(response => {
          // get body data
          this.loading = false
          this.tableData = response.data.data.data
          this.tableData = this.changeList(this.tableData)
          this.currentPage = response.data.data.current_page
          this.pageSize = response.data.data.per_page
          this.total = response.data.data.total
        }).catch(error => {
          console.log(error)
        })
      },
      handleEdit (index, row) {
        this.$store.commit(STUDENT_INFO, row)
        this.$router.push({ path: '/member/studentpass/check' })
      },
      handleCurrentChange (val) {
        this.currentPage = val
        this.loading = true
        this.getMerchant(val)
      },
      changeList (arr) {
        for (var i in arr) {
          if (arr[i].degree === 0) {
            arr[i].degree = '专科'
          } else if (arr[i].degree === 1) {
            arr[i].degree = '本科'
          } else {
            arr[i].degree = '研究生'
          }
        }
        return arr
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
</style>
