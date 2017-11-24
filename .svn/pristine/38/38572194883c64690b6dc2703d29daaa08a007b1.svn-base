<template>
  <div id="agent-list" class="content">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>代理商管理</el-breadcrumb-item>
        <el-breadcrumb-item>代理商信息</el-breadcrumb-item>
        <el-breadcrumb-item>代理商列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="search" @keyup.enter="onSearch">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="查询">
          <el-input class="inline-input" v-model="formInline.search" placeholder="真实姓名|手机号|代理区域"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch()" icon="search">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="contentlist">
      <el-table ref="agentTable" :data="tableData" stripe border style="width: 100%" height="640" v-loading="loading" @expand="onExpand">
        <el-table-column type="expand">
          <template scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="创建时间"><span>{{ props.row.createDate }}</span></el-form-item>
              <el-form-item label="修改时间"><span>{{ props.row.modifyDate }}</span></el-form-item>
              <el-form-item label="审核时间"><span>{{ props.row.auditTime }}</span></el-form-item>
              <el-form-item label="推荐佣金比(%)"><span>{{ props.row.scale }}</span></el-form-item>
              <el-form-item label="扣点比例(%)"><span>{{ props.row.deduction }}</span></el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="realName" label="真实姓名" width="100"></el-table-column>
        <el-table-column prop="phoneNumber" label="电话号码" width="130"></el-table-column>
        <el-table-column prop="shopTypeLabel" label="代理商类型"></el-table-column>
        <el-table-column prop="area" label="代理区域"></el-table-column>
        <el-table-column prop="amount" label="保证金(实缴)"></el-table-column>
        <el-table-column prop="integral" label="赠送积分"></el-table-column>
        <el-table-column prop="superiorAccount" label="推荐人" width="130"></el-table-column>
        <el-table-column label="申请状态" width="100">
          <template scope="scope">
            <el-tag :type="scope.row.applyStatus === 1 ? 'success' : 'danger'" close-transition>{{scope.row.applyStatusLabel}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template scope="scope">
            <el-button size="small" type="danger" @click="handleDisable(scope.$index, scope.row)" v-if="scope.row.isProhibitAgent == 0">禁用</el-button>
            <el-button size="small" type="success" @click="handleDisable(scope.$index, scope.row)" v-if="scope.row.isProhibitAgent == 1">启用</el-button>
            <el-button size="small" type="warning" @click="handleFreeze(scope.$index, scope.row)" v-if="scope.row.isFreezePrepaid == 0">冻结余额</el-button>
            <el-button size="small" type="success" @click="handleFreeze(scope.$index, scope.row)" v-if="scope.row.isFreezePrepaid == 1">解冻余额</el-button>
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
  </div>
</template>

<script>
  import * as SITEURL from '@/store/app-urls'
  export default {
    name: 'agent',
    data () {
      return {
        formInline: {
          search: ''
        },
        tableData: [],
        formLabelWidth: '100px',
        loading: false,
        currentPage: 1,
        pageSize: 1,
        total: 0,
        area: '',
        showPagination: true,
        totalNum: '',
        isSearch: false
      }
    },
    mounted: function () {
      this.loading = true
      this.getAgent()
    },
    methods: {
      getAgent (page = 1) {
        this.$axios.get(SITEURL.AGENT_LIST + '?status=1,2&page=' + page).then(response => {
          // get body data
          this.loading = false
          this.tableData = response.data.data.data
          this.currentPage = response.data.data.current_page
          this.pageSize = response.data.data.per_page
          this.total = response.data.data.total
        }).catch(error => {
          this.loading = false
          console.log(error)
        })
      },
      onSearch (page = 1) {
        var text = this.formInline.search.trim()
        if (!text) {
          this.loading = true
          this.getAgent()
          return false
        }
        this.isSearch = true
        this.loading = true
        this.$axios.get(SITEURL.AGENT_SEARCH + '?text=' + text + this.area + '&type=1,2,3,4' + '&page=' + page)
          .then(response => {
            // get body data
            this.loading = false
            this.tableData = response.data.data.data
            this.total = response.data.data.total
            this.pageSize = 20
          }).catch(error => {
            this.loading = false
            console.log(error)
          })
      },
      onExpand (row, expanded) {
        if (expanded) {
          this.$axios.get(SITEURL.SETTING_AGENT_SCALE + '?shopType=' + row.shopType)
            .then(response => {
              row.scale = response.data.data.scale * 100
              row.deduction = response.data.data.deduction * 100
            }).catch(error => {
              console.log(error)
            })
        }
      },
      handleDisable (index, row) {
        const disable = row.isProhibitAgent === 0 ? 1 : 0
        // console.log(index)
        this.$axios.post(SITEURL.AGENT_DISABLE, {user: row.user, isProhibitAgent: disable}).then(response => {
          if (response.data.success) {
            this.$message.success('操作成功，' + response.data.message)
            row.isProhibitAgent = disable
          } else {
            this.$message.error('操作失败，' + response.data.message)
          }
        }).catch(error => {
          console.log(error)
        })
      },
      handleFreeze (index, row) {
        const freeze = row.isFreezePrepaid === 0 ? 1 : 0
        this.$axios.post(SITEURL.AGENT_FREEZE, {user: row.user, isFreezePrepaid: freeze}).then(response => {
          if (response.data.success) {
            this.$message.success('操作成功，' + response.data.message)
            row.isFreezePrepaid = freeze
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
        if (this.isSearch) {
          this.onSearch(val)
        } else {
          this.getAgent(val)
        }
        // 查看状态的改变
        // console.log(this.isSearch)
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
  .manager-edit .el-form-item {
    margin: 20px
  }
  .inline-input {
    width: 240px;
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
</style>
