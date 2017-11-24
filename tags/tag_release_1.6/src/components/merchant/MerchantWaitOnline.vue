<template>
  <div id="merchantlist" class="content">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>商家管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户信息</el-breadcrumb-item>
        <el-breadcrumb-item>商家列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="search">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="商家搜索">
          <el-input class="inline-input" v-model="formInline.search" placeholder="手机号|商家名称|真实姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch" icon="search">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="contentlist">
      <template>
        <el-table :data="tableData" stripe border style="width: 100%" :height="$store.state.tableHeight" type="selection" v-loading="loading">
          <el-table-column prop="createDate" label="申请日期" width="120"></el-table-column>
          <el-table-column prop="username" label="用户昵称"></el-table-column>
          <el-table-column prop="realName" label="真实姓名"></el-table-column>
          <el-table-column prop="companyName" label="商家名称"></el-table-column>
          <el-table-column prop="addr" label="商家地址" width="160"></el-table-column>
          <el-table-column prop="contacts" label="联系人"></el-table-column>
          <el-table-column prop="phoneNumber" label="联系电话"></el-table-column>
          <el-table-column prop="merchantStatusLabel" label="状态"></el-table-column>
          <el-table-column prop="logoImg" label="商家封面图" width="140">
            <template scope="scope">
              <img v-lazy="scope.row.logoImg" class="cover-img" @click="handlePictureCardPreview" />
            </template>
          </el-table-column>
          <el-table-column label="操作" width="140">
            <template scope="scope">
              <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
    <el-dialog v-model="dialogVisible" size="tiny">
      <img width="100%" height="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
  import * as SITEURL from '@/store/app-urls'
  import { MERCHANT_INFO } from '@/store/mutation-types'
  export default {
    name: 'user',
    data () {
      return {
        formInline: {
          search: ''
        },
        tableData: [],
        currentPage: 1,
        pageSize: 1,
        total: 0,
        loading: false,
        dialogImageUrl: '',
        dialogVisible: false
      }
    },
    created: function () {
      this.loading = true
      this.getMerchant()
    },
    methods: {
      getMerchant (page = 1) {
        // GET /someUrl
        this.$axios.get(SITEURL.MERCHANT_WAIT_ONLINE + '?page=' + page).then(response => {
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
        var text = this.formInline.search.trim()
        this.loading = true
        if (!this.formInline.search) {
          this.getMerchant()
        } else {
          this.$axios.get(SITEURL.MERCHANT_WAIT_ONLINE_SEARCH + '?status=1&text=' + text)
            .then(response => {
              // get body data
              this.loading = false
              this.tableData = response.data.data
            }).catch(error => {
              console.log(error)
            })
        }
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      handleEdit (index, row) {
        this.$store.commit(MERCHANT_INFO, row)
        this.$router.push({ path: '/merchant/wait/online/edit' })
      },
      handleShow (index, row) {
        this.$axios.post(SITEURL.MERCHANT_STATUS, {id: row.id, show: !row.isShow}).then(response => {
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
      handleCurrentChange (val) {
        this.currentPage = val
        this.loading = true
        this.getMerchant(val)
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
