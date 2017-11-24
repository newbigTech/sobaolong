<template>
  <div id="withdraw-audit" class="content">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>角色设置</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="search">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-button type="primary" @click="handleCreate" icon="setting">新建管理员</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="contentlist">
      <el-table ref="magagerTable" :data="tableData" stripe border style="width: 100%" height="690" v-loading="loading">
        <el-table-column prop="name" label="账 号" width="130"></el-table-column>
        <el-table-column prop="mobile" label="电话号码" width="130"></el-table-column>
        <el-table-column prop="visit_count" label="登录次数" width="100"></el-table-column>
        <el-table-column prop="last_login" label="最近登录" width="120"></el-table-column>
        <el-table-column prop="type" label="管理员类型" width="120"></el-table-column>
        <el-table-column prop="menu_names" label="可访问菜单"></el-table-column>
        <el-table-column prop="display_names" label="角 色"></el-table-column>
        <el-table-column label="操作" width="250">
          <template scope="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="small" type="success" @click="handleEnable(scope.$index, scope.row)" v-if="!scope.row.is_enabled">允许访问</el-button>
            <el-button size="small" type="warning" @click="handleEnable(scope.$index, scope.row)" v-if="scope.row.is_enabled">禁止访问</el-button>
            <el-button size="small" type="info" @click="handleAllocate(scope.$index, scope.row)">分配角色</el-button>
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

    <el-dialog title="管理员修改" v-model="dialogFormVisible" @close="closeEditDialog" size="tiny">
      <el-form :model="form" ref="managerForm" :rules="rules" class="manager-edit" v-loading="editLoading">
        <el-form-item label="账 号" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" placeholder="请填写管理员账号"></el-input>
        </el-form-item>
        <el-form-item label="电话号码" :label-width="formLabelWidth" prop="mobile">
          <el-input v-model.number="form.mobile"></el-input>
        </el-form-item>
        <el-form-item label="新密码" :label-width="formLabelWidth" prop="password">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="可访问菜单" :label-width="formLabelWidth" v-if="form.type !== '代理商'">
          <el-select v-model="form.menus" multiple placeholder="请选择" style="width: 100%">
            <el-option v-for="item in menuOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="info" icon="circle-check" @click="onSubmit('managerForm')" style="width: 150px;">提 交</el-button>
      </div>
    </el-dialog>

    <el-dialog title="角色分配" v-model="dialogRoleVisible" @close="closeRoleDialog" size="small">
      <el-table ref="roleTable" :data="roleData" stripe border style="width: 100%" height="400" @selection-change="handleSelectionChange" v-loading="roleLoading">
        <el-table-column prop="id" type="selection" width="55" :checked="true"></el-table-column>
        <el-table-column prop="display_name" label="角色名称"></el-table-column>
        <el-table-column prop="name" label="角色标签"></el-table-column>
        <el-table-column prop="description" label="角色简介"></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogRoleVisible = false">取 消</el-button>
        <el-button type="info" icon="circle-check" @click="allocSubmit" style="width: 150px;">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import * as SITEURL from '@/store/app-urls'
  export default {
    name: 'manager',
    data () {
      return {
        form: {
          id: '',
          name: '',
          mobile: null,
          role: '',
          password: '',
          type: '',
          menus: []
        },
        roleForm: {
        },
        userId: '',
        tableData: [],
        roleData: [],
        formLabelWidth: '100px',
        dialogFormVisible: false,
        dialogRoleVisible: false,
        tableDataIndex: 0,
        loading: false,
        editLoading: false,
        roleLoading: false,
        allocLoading: false,
        multipleSelection: [],
        menuOptions: this.$store.state.menuOptions,
        currentPage: 1,  // 当前页
        pageSize: 1,  // 每页多少条记录
        total: 1,  // 共多少条记录
        rules: {
          name: [
            { required: true, message: '账号不能为空', trigger: 'blur' },
            { min: 3, message: '账号不能低于3个字符', trigger: 'blur' }
          ],
          password: [
            { min: 6, message: '密码至少6位', trigger: 'blur' }
          ],
          mobile: [
            { type: 'number', required: true, message: '请输入正确的电话号码', trigger: 'blur' },
            { type: 'number', min: 11, message: '电话号码至少11位数字', trigger: 'change' }
          ]
        }
      }
    },
    mounted: function () {
      this.loading = true
      this.getManager()
    },
    methods: {
      getManager (page = 1) {
        const that = this
        this.$axios.get(SITEURL.SYSTEM_MANAGER_LIST + '?page=' + page).then(response => {
          // get body data
          that.loading = false
          that.tableData = response.data.data.data
        }).catch(error => {
          that.loading = false
          console.log(error)
        })
      },
      onSubmit (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.editLoading = true
            this.$axios.post(SITEURL.SYSTEM_MANAGER_EDIT, this.form).then(response => {
              this.editLoading = false
              if (response.data.success) {
                this.$message.success('操作成功，' + response.data.message)
                this.tableData[this.tableDataIndex].id = response.data.data.id
                this.tableData[this.tableDataIndex].name = response.data.data.name
                this.tableData[this.tableDataIndex].mobile = response.data.data.mobile
                this.tableData[this.tableDataIndex].role_names = response.data.data.role_names
                this.tableData[this.tableDataIndex].display_names = response.data.data.display_names
                this.tableData[this.tableDataIndex].menus = response.data.data.menus
                this.tableData[this.tableDataIndex].menu_names = response.data.data.menu_names
                this.dialogFormVisible = false
              } else {
                this.$message.error('操作失败，' + response.data.message)
                this.dialogFormVisible = false
              }
            }).catch(error => {
              console.log(error)
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      allocSubmit () {
        this.allocLoading = true
        this.$axios.post(SITEURL.SYSTEM_ROLE_USER, {userId: this.userId, roles: this.multipleSelection}).then(response => {
          this.allocLoading = false
          if (response.data.success) {
            this.$message.success('操作成功，' + response.data.message)
            this.tableData[this.tableDataIndex].role_names = response.data.data.role_names
            this.tableData[this.tableDataIndex].display_names = response.data.data.display_names
            this.dialogRoleVisible = false
          } else {
            this.$message.error('操作失败，' + response.data.message)
            this.dialogRoleVisible = false
          }
        }).catch(error => {
          console.log(error)
        })
      },
      handleEdit (index, row) {
        this.tableDataIndex = index
        this.form.id = row.id
        this.form.name = row.name
        this.form.type = row.type
        this.form.mobile = Number(row.mobile)
        this.form.menus = row.menus ? row.menus.split(',') : []
        this.dialogFormVisible = true
      },
      handleCreate () {
        this.$router.push({ path: '/system/manager/create' })
      },
      handleAllocate (index, row) {
        this.tableDataIndex = index
        this.userId = row.id
        this.loading = true
        this.$axios.get(SITEURL.SYSTEM_ROLE_LIST).then(response => {
          this.loading = false
          this.roleData = response.data.data
          this.$nextTick(() => { this.filterData(index) })
          this.dialogRoleVisible = true
        }).catch(error => {
          this.loading = false
          console.log(error)
        })
      },
      closeEditDialog () {
        this.form = {
          id: '',
          name: '',
          type: '',
          mobile: null,
          menus: []
        }
      },
      closeRoleDialog () {
        this.$refs['roleTable'].clearSelection()
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      filterData (index) {
        var roleName = '__,' + this.tableData[index].role_names + ','
        this.roleData.map((value, index) => {
          var match = ',' + value.name + ','
          if (roleName.indexOf(match) > 0) {
            this.$refs['roleTable'].toggleRowSelection(this.roleData[index], true)
          } else {
            this.$refs['roleTable'].toggleRowSelection(this.roleData[index], false)
          }
        })
      },
      handleEnable (index, row) {
        this.tableDataIndex = index
        this.$axios.post(SITEURL.SYSTEM_MANAGER_ENABLED + '?id=' + row.id).then(response => {
          if (response.data.success) {
            this.$message.success('操作成功，' + response.data.message)
            this.tableData[this.tableDataIndex].is_enabled = !this.tableData[this.tableDataIndex].is_enabled
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
        this.getCustomer(val)
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
</style>
