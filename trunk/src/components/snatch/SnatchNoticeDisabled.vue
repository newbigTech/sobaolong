<template>
  <div id="notice-disabled" class="content">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>夺宝公告</el-breadcrumb-item>
        <el-breadcrumb-item>失效公告</el-breadcrumb-item>
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
          <el-col :span="8" style="text-align: right;">
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="userlist">
      <el-table :data="tableData" stripe border style="width: 100%" :height="$store.state.tableHeight" type="selection" v-loading="loading">
        <el-table-column type="expand">
          <template scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="通知内容"><span>{{ props.row.content }}</span></el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="createDate" label="创建时间" width="180"></el-table-column>
        <el-table-column prop="title" label="公告标题"></el-table-column>
        <el-table-column prop="noticeTypeLabel" label="通知种类"></el-table-column>
        <el-table-column prop="isRead" label="是否已读"></el-table-column>
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
  </div>
</template>

<script>
  import * as SITEURL from '@/store/app-urls'
  import { SNATCH_NOTICE_INFO } from '@/store/mutation-types'
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
      this.getNotice()
    },
    methods: {
      getNotice () {
        this.$axios.get(SITEURL.SNATCH_NOTICE_DISABLED).then(response => {
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
          this.getNotice()
        } else {
          this.$axios.get(SITEURL.SNATCH_NOTICE_SEARCH + '?fromDate=' + this.formInline.fromDate + '&toDate=' + this.formInline.toDate + '&isShow=0')
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
        this.$store.commit(SNATCH_NOTICE_INFO, row)
        this.$router.push({ path: '/snatch/notice/edit' })
      },
      handlePublish (index, row) {
        this.$axios.post(SITEURL.SNATCH_NOTICE_STATUS, {id: row.id, isShow: 1}).then(response => {
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
</style>
