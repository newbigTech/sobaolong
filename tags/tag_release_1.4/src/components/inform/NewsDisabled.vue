<template>
  <div id="withdraw-audit" class="content">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>资讯与广告</el-breadcrumb-item>
        <el-breadcrumb-item>资讯管理</el-breadcrumb-item>
        <el-breadcrumb-item>失效资讯</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="search">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-row>
          <el-col :span="16">
            <el-form-item label="从">
              <el-date-picker v-model="formInline.fromDate" align="right" type="date" placeholder="选择起始日期" :picker-options="pickerOptions"></el-date-picker>
            </el-form-item>
            <el-form-item label="到">
              <el-date-picker v-model="formInline.toDate" align="right" type="date" placeholder="选择结束日期" :picker-options="pickerOptions"></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSearch" icon="search">查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="news-list">
      <el-table :data="tableData" stripe border style="width: 100%" :height="$store.state.tableHeight" type="selection" v-loading="loading">
        <el-table-column prop="sortShow" label="排序号" width="80"></el-table-column>
        <el-table-column prop="createDate" label="创建时间" width="180"></el-table-column>
        <el-table-column prop="title" label="资讯标题"></el-table-column>
        <el-table-column prop="isShowLabel" label="状态"></el-table-column>
        <el-table-column prop="fullName" label="展示地区"></el-table-column>
        <el-table-column prop="coverImg" label="资讯缩略图">
          <template scope="scope">
            <img :src="scope.row.indexImage" class="cover-img" @click="handlePictureCardPreview" />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template scope="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="small" type="success" @click="handlePublish(scope.$index, scope.row)">发布</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
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
</template>

<script>
  import * as SITEURL from '@/store/app-urls'
  import { NEWS_INFO } from '@/store/mutation-types'
  export default {
    name: 'user',
    data () {
      return {
        formInline: {
          fromDate: '',
          toDate: ''
        },
        tableData: [],
        currentPage: 1,
        pageSize: 1,
        total: 1,
        loading: true,
        dialogImageUrl: '',
        dialogVisible: false,
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
      this.getNews()
    },
    methods: {
      getNews () {
        this.$axios.get(SITEURL.NEWS_DISABLED_URL).then(response => {
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
      onSearch () {
        this.formInline.fromDate = typeof this.formInline.fromDate === 'undefined' ? '' : this.formInline.fromDate
        this.formInline.toDate = typeof this.formInline.toDate === 'undefined' ? '' : this.formInline.toDate
        this.loading = true
        if (this.formInline.fromDate === '' && this.formInline.toDate === '') {
          this.getNews()
        } else {
          this.$axios.get(SITEURL.NEWS_SEARCH_URL + '?fromDate=' + this.formInline.fromDate + '&toDate=' + this.formInline.toDate + '&isShow=0')
            .then(response => {
              this.loading = false
              this.tableData = response.data.data.data
              this.currentPage = response.data.data.current_page
              this.pageSize = response.data.data.per_page
              this.total = response.data.data.total
            }).catch(error => {
              console.log(error)
            })
        }
      },
      handleEdit (index, row) {
        this.$store.commit(NEWS_INFO, row)
        this.$router.push({ path: '/inform/news/edit' })
      },
      handlePublish (index, row) {
        this.$axios.post(SITEURL.NEWS_STATUS, {id: row.id, isShow: 1}).then(response => {
          if (response.data.success) {
            this.$message.success('操作成功，' + response.data.message)
            this.tableData.splice(index, 1)
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
        console.log(`当前页: ${val}`)
      },
      handlePictureCardPreview (event) {
        this.dialogImageUrl = event.target.src
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
  .news-list {
    padding-top: 20px;
  }
  .cover-img {
    padding-top: 8px;
    width: 100px;
    height: 60px;
  }
</style>
