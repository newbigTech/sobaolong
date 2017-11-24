<template>
  <div id="user" class="content">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>权限设置</el-breadcrumb-item>
        <el-breadcrumb-item>权限分配</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="contentlist" v-loading="loading">
      <el-form ref="permissionForm" :model="form" label-width="100px">
        <el-table ref="permissionTable" :data="permissionData" stripe border style="width: 100%" height="690" @selection-change="handleSelectionChange">
          <el-table-column prop="id" type="selection" width="55" :checked="true"></el-table-column>
          <el-table-column prop="display_name" label="权限名称"></el-table-column>
          <el-table-column prop="name" label="权限标签"></el-table-column>
          <el-table-column prop="description" label="权限简介"></el-table-column>
        </el-table>
        <el-form-item style="margin-top: 20px">
          <el-button @click="onCancel">返回</el-button>
          <el-button type="info" icon="circle-check" @click="allocSubmit" :disabled="submitBtnDis" style="width: 150px;">保 存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import * as SITEURL from '@/store/app-urls'
  export default {
    name: 'user',
    data () {
      return {
        form: {
        },
        submitBtnDis: false,
        permissionData: [],
        multipleSelection: [],
        loading: false
      }
    },
    created: function () {
      this.form = this.$store.state.permissionRole
      this.getPermission()
    },
    methods: {
      getPermission () {
        this.loading = true
        this.$axios.get(SITEURL.SYSTEM_PERMISSION_LIST + '?id=' + this.form.id).then(response => {
          this.loading = false
          this.permissionData = response.data.data.permissions
          var selected = response.data.data.selected
          this.$nextTick(() => { this.filterData(selected) })
        }).catch(error => {
          this.loading = false
          console.log(error)
        })
      },
      allocSubmit () {
        this.loading = true
        this.$axios.post(SITEURL.SYSTEM_PERMISSION_ALLOC, {role_id: this.form.id, permissions: this.multipleSelection}).then(response => {
          this.loading = false
          if (response.data.success) {
            this.$message.success('操作成功，' + response.data.message)
//            this.$router.go(-1)
          } else {
            this.$message.error('操作失败，' + response.data.message)
          }
        }).catch(error => {
          console.log(error)
        })
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      filterData (selected) {
        this.$refs['permissionTable'].clearSelection()
        selected = '__,' + selected + ','
        this.permissionData.map((value, index) => {
          var match = ',' + value.id + ','
          if (selected.indexOf(match) > 0) {
            this.$refs['permissionTable'].toggleRowSelection(this.permissionData[index], true)
          } else {
            this.$refs['permissionTable'].toggleRowSelection(this.permissionData[index], false)
          }
        })
      },
      onCancel () {
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>
  .inline-input {
    width: 100%;
  }
</style>
