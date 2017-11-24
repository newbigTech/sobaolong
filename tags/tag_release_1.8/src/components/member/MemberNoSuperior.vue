<template>
  <div id="user" class="content">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>消费者管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户信息</el-breadcrumb-item>
        <el-breadcrumb-item>无推荐人用户</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="search" @keyup.enter="onSearch">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="消费者">
          <el-input class="inline-input" v-model="formInline.search" placeholder="推广码|真实姓名|手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch" icon="search">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="userlist">
      <el-table :data="tableData" stripe border style="width: 100%" :height="$store.state.tableHeight" type="selection" v-loading="loading">
        <el-table-column prop="createDate" label="注册时间" width="180"></el-table-column>
        <el-table-column prop="spreadCode" label="推广码" width="180"></el-table-column>
        <el-table-column prop="realName" label="真实姓名" width="120"></el-table-column>
        <el-table-column prop="phoneNumber" label="电话号码"></el-table-column>
        <el-table-column prop="isAuthenticated" label="实名认证"></el-table-column>
        <el-table-column prop="userType" label="用户类型"></el-table-column>
        <el-table-column prop="agentTypeLabel" label="代理类型"></el-table-column>
        <el-table-column label="操作" width="240">
          <template scope="scope">
            <el-button size="small" @click="allocSuperior(scope.$index, scope.row)">指定推荐人</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next"
        :total="total">
      </el-pagination>
    </div>

    <el-dialog title="指定推荐人" v-model="dialogFormVisible" @close="closeEditDialog" size="tiny">
      <el-form :model="form" ref="superiorForm" class="superior-allocate" v-loading="editLoading">
        <el-row style="text-align: center">
          <el-col :span="12">手机号：{{form.phoneNumber}}</el-col>
          <el-col :span="12">真实姓名：{{form.realName}}</el-col>
        </el-row>
        <el-form-item label="推荐人手机号" :label-width="formLabelWidth" :required="true">
          <el-autocomplete class="inline-input" v-model="form.superiorPhone" :fetch-suggestions="userSearch"
                           placeholder="请输入并选择推荐人手机号" :trigger-on-focus="false" @select="handleUserSelect">
          </el-autocomplete>
        </el-form-item>
        <el-form-item label="推荐人昵称" :label-width="formLabelWidth" prop="brokerageScale">
          <el-input v-model="form.superiorUsername" class="inline-input" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="推荐人真实姓名" :label-width="formLabelWidth" prop="deductScale">
          <el-input v-model="form.superiorRealName" class="inline-input" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="推荐人证件号" :label-width="formLabelWidth" prop="deductScale">
          <el-input v-model="form.superiorIdcardNumber" class="inline-input" :disabled="true"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="info" icon="circle-check" @click="onSubmit()" style="width: 150px;">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import * as SITEURL from '@/store/app-urls'
  export default {
    name: 'member-superior',
    data () {
      return {
        formInline: {
          search: ''
        },
        form: {
          phoneNumber: '',
          realName: '',
          superiorPhone: '',
          superiorUsername: '',
          superiorRealName: '',
          superiorIdcardNumber: ''
        },
        formLabelWidth: '120px',
        tableData: [],
        currentPage: 1,  // 当前页
        pageSize: 1,  // 每页多少条记录
        total: 1,  // 共多少条记录
        loading: false,
        editLoading: false,
        dialogFormVisible: false,
        tableDataIndex: 0
      }
    },
    created: function () {
      this.loading = true
      this.getMember()
    },
    methods: {
      getMember (page = 1) {
        this.$axios.get(SITEURL.MEMBER_NO_SUPERIOR + '?page=' + page).then(response => {
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
      onSubmit () {
        if (!this.form.superiorId) {
          this.$message.warning('请输入并选择推荐人！')
          return
        }
        const that = this
        that.editLoading = true
        that.$axios.post(SITEURL.MEMBER_SUPERIOR_ALLOC, that.form).then(response => {
          that.editLoading = false
          if (response.data.success) {
            that.$message.success('操作成功，' + response.data.message)
            that.closeEditDialog()
            that.tableData.splice(that.tableDataIndex, 1)
          } else {
            that.$message.error('操作失败，' + response.data.message)
          }
          that.dialogFormVisible = false
        }).catch(error => {
          console.log(error)
        })
      },
      onSearch () {
        var text = this.formInline.search.trim()
        this.loading = true
        if (!this.formInline.search) {
          this.getMember()
        } else {
          this.$axios.get(SITEURL.MEMBER_SUPERIOR_SEARCH + '?text=' + text)
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
      allocSuperior (index, row) {
        this.tableDataIndex = index
        this.form.userId = row.id
        this.form.phoneNumber = row.phoneNumber
        this.form.realName = row.realName
        this.dialogFormVisible = true
      },
      closeEditDialog () {
        this.dialogFormVisible = false
        this.form = {
          id: '',
          phoneNumber: '',
          realName: '',
          superiorPhone: '',
          superiorUsername: '',
          superiorRealName: '',
          superiorIdcardNumber: ''
        }
      },
      handleCurrentChange (val) {
        this.currentPage = val
        this.loading = true
        this.getMember(val)
      },
      userSearch (queryString, cb) {
        var results = []
        if (queryString.length > 2) {
          this.$axios.get(SITEURL.AUTOCOMPLETE_USER_PHONE + '?text=' + queryString).then(response => {
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
      handleUserSelect (item) {
        this.form.superiorPhone = item.value
        this.form.superiorId = item.id
        this.$axios.get(SITEURL.MEMBER_USERINFO + '?userId=' + item.id).then(response => {
          this.form.superiorUsername = response.data.data.username
          this.form.superiorRealName = response.data.data.realName
          this.form.superiorIdcardNumber = response.data.data.idcardNumber
        }).catch(error => {
          console.log(error)
        })
      }
    }
  }
</script>

<style scoped>
  .el-form-item {
    margin-bottom: 0 !important;
  }
  .superior-allocate .el-form-item {
    margin: 20px
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
    width: 220px;
  }
  .el-form-item .el-form-item__label{
    color: red;
  }
</style>
