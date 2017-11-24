<template>
  <div id="withdraw-audit" class="content">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>资讯与广告</el-breadcrumb-item>
        <el-breadcrumb-item>广告管理</el-breadcrumb-item>
        <el-breadcrumb-item>广告列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="search">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="从">
          <el-date-picker v-model="formInline.fromDate" align="right" type="date" placeholder="选择起始日期" :picker-options="pickerOptions"></el-date-picker>
        </el-form-item>
        <el-form-item label="到">
          <el-date-picker v-model="formInline.toDate" align="right" type="date" placeholder="选择结束日期" :picker-options="pickerOptions"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-select v-model="formInline.adLocation" placeholder="请选择">
            <el-option v-for="item in adLocationOptions" :label="item.label" :value="item.value" :key="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch" icon="search">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="userlist">
      <el-table :data="tableData" stripe border style="width: 100%" :height="$store.state.tableHeight" type="selection" v-loading="loading">
        <el-table-column label="标题" width="180">
          <template scope="scope">
            <a :href="scope.row.url" target="_blank">{{scope.row.title}}</a>
          </template>
        </el-table-column>
        <el-table-column prop="adLocationLabel" label="位置"></el-table-column>
        <el-table-column prop="adTypeLabel" label="类型" width="100"></el-table-column>
        <el-table-column prop="adStatusLabel" label="状态"></el-table-column>
        <el-table-column prop="beginDate" label="起始时间" width="170"></el-table-column>
        <el-table-column prop="endDate" label="终止时间" width="170"></el-table-column>
        <el-table-column prop="fullName" label="发布区域" width="100"></el-table-column>
        <el-table-column prop="companyName" label="商家" width="200"></el-table-column>
        <el-table-column prop="sortShow" label="排序号"></el-table-column>
        <el-table-column label="操作" width="150" fixed="right">
          <template scope="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="small" type="warning" @click="handleDisable(scope.$index, scope.row)" v-if="scope.row.adStatus == 1">下架</el-button>
            <el-button size="small" type="success" @click="handleDisable(scope.$index, scope.row)" v-if="scope.row.adStatus == 2">上架</el-button>
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
  import { ADVERTISE_INFO } from '@/store/mutation-types'
  export default {
    name: 'user',
    data () {
      return {
        formInline: {
          fromDate: '',
          toDate: '',
          adLocation: ''
        },
        tableData: [],
        currentPage: 1,
        pageSize: 1,
        total: 1,
        fromDate: '',
        endDate: '',
        dialogFormVisible: false,
        form: { cause: '' },
        formLabelWidth: '80px',
        loading: true,
        adLocationOptions: this.$store.state.adLocations,
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
      this.getAdvertise()
    },
    methods: {
      getAdvertise (page = 1) {
        // GET /someUrl
        this.$axios.get(SITEURL.ADV_LIST_URL + '?status=2' + '&page=' + page).then(response => {
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
        if (this.formInline.fromDate === '' && this.formInline.toDate === '' && this.formInline.adLocation === '') {
          this.getAdvertise()
        } else {
          this.$axios.get(SITEURL.ADV_SEARCH_URL + '?status=2&fromDate=' + this.formInline.fromDate + '&toDate=' + this.formInline.toDate + '&location=' + this.formInline.adLocation)
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
      handleDisable (index, row) {
        this.$axios.post(SITEURL.ADV_STATUS_URL, {id: row.id, adStatus: row.adStatus}).then(response => {
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
      handleCreate () {
        this.$router.push({ path: '/inform/advertise/create' })
      },
      handleEdit (index, row) {
        this.$store.commit(ADVERTISE_INFO, row)
        this.$router.push({ path: '/inform/advertise/edit' })
      },
      handleDelete (index, row) {
        console.log(index, row)
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        this.currentPage = val
        this.getAdvertise(val)
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
