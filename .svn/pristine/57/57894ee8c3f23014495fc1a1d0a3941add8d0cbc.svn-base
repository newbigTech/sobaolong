<template>
  <div id="withdraw-list" class="content">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>消费者管理</el-breadcrumb-item>
        <el-breadcrumb-item>银行卡管理</el-breadcrumb-item>
        <el-breadcrumb-item>银行卡列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="search" @keyup.enter="onSearch">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="银行账号">
          <el-input class="inline-input" v-model="formInline.search" placeholder="公司名|手机号|银行账号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch" icon="search">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="bankcardlist">
      <el-table :data="tableData" stripe border style="width: 100%" :height="$store.state.tableHeight" type="selection" v-loading="loading">
        <el-table-column prop="createDate" label="申请日期" width="120"></el-table-column>
        <el-table-column prop="applyStatusLabel" label="状态" width="70"></el-table-column>
        <el-table-column prop="realName" label="申请人" width="80"></el-table-column>
        <el-table-column prop="companyName" label="公司名称" width="200"></el-table-column>
        <el-table-column prop="bankName" label="银行"></el-table-column>
        <el-table-column prop="bankDetail" label="开户行"></el-table-column>
        <el-table-column prop="cardNumber" label="银行账号" width="180"></el-table-column>
        <el-table-column prop="phoneNumber" label="手机号" width="170"></el-table-column>
        <el-table-column prop="licenseImg" label="开户许可证" width="140">
          <template scope="scope">
            <img v-lazy="scope.row.licenseImg" class="cover-img" @click="handlePictureCardPreview" />
          </template>
        </el-table-column>
        <el-table-column  prop="remark" label="驳回原因" >
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="150">
          <template scope="scope">
            <el-button size="small" type="success" @click="handleAudit(scope.$index, scope.row, 1)" v-if="scope.row.applyStatus === 0">通过</el-button>
            <el-button size="small" type="danger" @click="handleAudit(scope.$index, scope.row, 2)" v-if="scope.row.applyStatus === 0">驳回</el-button>
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
        total: 1,
        fromDate: '',
        endDate: '',
        dialogImageUrl: '',
        dialogFormVisible: false,
        form: { cause: '' },
        formLabelWidth: '80px',
        loading: false,
        dialogVisible: false,
        rejectTxt: '',
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
        },
        options: [{
          value: 'waiting',
          label: '待处理'
        }, {
          value: 'handled',
          label: '已处理'
        }],
        value: ''
      }
    },
    created: function () {
      this.loading = true
      this.getBankInfo()
    },
    methods: {
      getBankInfo (page = 1) {
        // GET /someUrl
        this.$axios.get(SITEURL.BANKCARD_APPLY_LIST + '?page=' + page).then(response => {
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
          this.getBankInfo()
        } else {
          this.$axios.get(SITEURL.BANKCARD_APPLY_SEARCH + '?text=' + text).then(response => {
            // get body data
            this.loading = false
            this.tableData = response.data.data
            this.currentPage = 1
            this.total = response.data.data.length
          }).catch(error => {
            console.log(error)
          })
        }
      },
      // 驳回函数
      handleAudit (index, row, audit) {
        // 驳回，输入驳回原因
        if (audit === 2) {
          this.$prompt('请填写驳回原因（必填）', '驳回原因', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputPattern: /^[\s\S]{1,50}$/,
            inputErrorMessage: '内容必填，50个字符以内'
          }).then(({ value }) => {
            this.$message({
              type: 'success',
              message: '您的驳回原因是: ' + value
            })
            this.$axios.post(SITEURL.BANKCARD_AUDIT, {id: row.id, applyStatus: audit, remark: value}).then(response => {
              if (response.data.success) {
                this.$message.success('操作成功，' + response.data.message)
                this.loading = true
                this.getBankInfo()
                this.tableData[index].applyStatus = audit
              } else {
                this.$message.error('操作失败，' + response.data.message)
              }
            }).catch(error => {
              console.log(error)
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消驳回'
            })
          })
        } else {
          // 审核通过函数
          this.$confirm('此操作将状态改为通过, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$message({
              type: 'success',
              message: '状态修改成功!'
            })
            // 点击确定后执行函数
            this.$axios.post(SITEURL.BANKCARD_AUDIT, {id: row.id, applyStatus: audit, remark: ''}).then(response => {
              if (response.data.success) {
                this.$message.success('操作成功，' + response.data.message)
                this.loading = true
                this.getBankInfo()
                this.tableData[index].applyStatus = audit
              } else {
                this.$message.error('操作失败，' + response.data.message)
              }
            }).catch(error => {
              console.log(error)
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '状态修改失败！'
            })
          })
        }
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        this.currentPage = val
        this.loading = true
        this.getBankInfo(val)
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
  .withdrawlist {
    padding-top: 20px;
  }

  .inline-input {
    width: 220px;
  }

  .cover-img {
    padding-top: 8px;
    width: 100px;
    height: 60px;
  }
</style>
