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
          <el-button type="primary" @click="handleCreate" icon="setting">新建角色</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="contentlist">
      <el-table :data="tableData" stripe border style="width: 100%" height="730" v-loading="loading">
        <el-table-column prop="display_name" label="角色名称"></el-table-column>
        <el-table-column prop="name" label="角色标签"></el-table-column>
        <el-table-column prop="description" label="角色简介"></el-table-column>
        <el-table-column label="操作" width="200">
          <template scope="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="small" type="info" @click="allocPermission(scope.$index, scope.row)">分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog title="角色修改" v-model="dialogFormVisible" @close="closeEditDialog" size="tiny">
      <el-form :model="form" ref="roleForm" :rules="rules" class="role-edit" v-loading="editLoading">
        <el-form-item label="角色标签" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" placeholder="请填写标签名称" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="角色名称" :label-width="formLabelWidth" prop="display_name">
          <el-input v-model.number="form.display_name"></el-input>
        </el-form-item>
        <el-form-item label="角色简介" :label-width="formLabelWidth">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="info" icon="circle-check" @click="onSubmit('roleForm')" style="width: 150px;">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import * as SITEURL from '@/store/app-urls'
  import { PERMISSION_ROLE } from '@/store/mutation-types'
  export default {
    name: 'user',
    data () {
      return {
        form: {
          id: '',
          name: '',
          display_name: '',
          description: ''
        },
        tableData: [],
        formLabelWidth: '100px',
        dialogFormVisible: false,
        tableDataIndex: 0,
        loading: false,
        editLoading: false,
        rules: {
          name: [
            { required: true, message: '角色标签不能为空', trigger: 'blur' },
            { min: 3, message: '不能低于3个字符', trigger: 'blur' }
          ],
          display_name: [
            { required: true, message: '角色名称不能为空', trigger: 'blur' },
            { min: 2, message: '不能低于2个字符', trigger: 'blur' }
          ]
        }
      }
    },
    created: function () {
      this.loading = true
      this.getRole()
    },
    methods: {
      getRole () {
        this.$axios.get(SITEURL.SYSTEM_ROLE_LIST).then(response => {
          // get body data
          this.loading = false
          this.tableData = response.data.data
        }).catch(error => {
          this.loading = false
          console.log(error)
        })
      },
      onSubmit (formName) {
        this.$refs[formName].validate((valid) => {
          const that = this
          if (valid) {
            that.editLoading = true
            that.$axios.post(SITEURL.SYSTEM_ROLE_EDIT, that.form).then(response => {
              that.editLoading = false
              if (response.data.success) {
                this.$message.success('操作成功，' + response.data.message)
                that.tableData[that.tableDataIndex].id = response.data.data.id
                that.tableData[that.tableDataIndex].name = response.data.data.name
                that.tableData[that.tableDataIndex].display_name = response.data.data.display_name
                that.tableData[that.tableDataIndex].description = response.data.data.description
              } else {
                this.$message.error('操作失败，' + response.data.message)
              }
              that.dialogFormVisible = false
            }).catch(error => {
              that.dialogFormVisible = false
              console.log(error)
            })
          } else {
            that.dialogFormVisible = false
            console.log('error submit!!')
            return false
          }
        })
      },
      handleEdit (index, row) {
        this.tableDataIndex = index
        this.form.id = row.id
        this.form.name = row.name
        this.form.display_name = row.display_name
        this.form.description = row.description
        this.dialogFormVisible = true
      },
      handleCreate () {
        this.$router.push({ path: '/system/role/create' })
      },
      closeEditDialog () {
        this.form = {
          id: '',
          name: '',
          display_name: '',
          description: ''
        }
      },
      allocPermission (index, row) {
        this.$store.commit(PERMISSION_ROLE, row)
        this.$router.push({ name: 'PermissionRole' })
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
</style>
